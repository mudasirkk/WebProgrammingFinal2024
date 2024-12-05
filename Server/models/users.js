// @ts-check

const data = require("../data/users.json");
const { getConnection } = require("./supabase");
const conn = getConnection();
const jwt = require("jsonwebtoken");

async function getAll() {
  const { data, count, error } = await conn
    .from("users")
    .select("*", { count: "estimated" });
  return {
    isSuccess: !error,
    message: error?.message,
    data: data,
    total: count,
  };
}

async function get(id) {
  const { data, error } = await conn
    .from("users")
    .select("*")
    .eq("id", id) //check user by id
    .single();
  return {
    isSuccess: !error,
    message: error?.message,
    data: data,
  };
}

async function login(email, password) {
  console.log(`Logging in to ${email}`);
  const { data, error } = await conn
    .from("users")
    .select("*")
    .eq("email", email) // if email is there
    .eq("password", password) //if pass matches email
    .single();

  if (error) {
    console.error("Login Failed");
    return {
      isSuccess: false,
      message: error.message,
      data: null,
      token: null,
    };
  }

  const token = await createToken(data, 3600000);
  console.log(`Login successful for  ${email}, token: ${token}`);
  return {
    isSuccess: true,
    message: "Login successful",
    data: { user: data, token: token },
  };
}

async function add(user) {
  const { data, error } = await conn
    .from("users")
    .insert([
      {
        fname: user.fname,
        lname: user.lname,
        username: user.username,
        email: user.email,
        password: user.password,
        isAdmin: user.isAdmin,
      },
    ])
    .single();
  return {
    isSuccess: !error,
    message: error?.message,
    data: data,
  };
}

async function seed() {
  for (const user of data.users) {
    await add(user);
  }
}

async function update(id, user) {
  const { data, error } = await conn
    .from("users")
    .update({
      fname: user.fname,
      lname: user.lname,
      username: user.username,
      email: user.email,
      password: user.password,
      isAdmin: user.isAdmin,
    })
    .eq("id", id)
    .select("*")
    .single();
  return {
    isSuccess: !error,
    message: error?.message,
    data: data,
  };
}

async function remove(id) {
  const { error } = await conn
    .from("users")
    .delete()
    .eq("id", id)
    .select("*")
    .single();
  return {
    isSuccess: !error,
    message: error?.message,
  };
}

async function createToken(user, expiresIn) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET ?? "",
      { expiresIn },
      (err, token) => {
        if (err) {
          reject(err);
        } else {
          resolve(token);
        }
      }
    );
  });
}

async function verifyToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET ?? "", (err, user) => {
      if (err) {
        reject(err);
      } else {
        resolve(user);
      }
    });
  });
}

module.exports = {
  getAll,
  get,
  add,
  update,
  remove,
  seed,
  login,
  createToken,
  verifyToken,
};
