const data = require("../data/users.json");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { getConnection } = require("./supabase");
const conn = getConnection();

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
    .eq("id", id)
    .single();
  return {
    isSuccess: !error,
    message: error?.message,
    data: data,
  };
}

async function login(email, password) {
  console.log(`Logging in to ${email}`);

  // First, find the user by email
  const { data, error } = await conn
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  // Check if user exists
  if (error) {
    console.error("Login Failed: User not found");
    return {
      isSuccess: false,
      message: "Invalid email or password",
      data: null,
      token: null,
    };
  }

  // Compare hashed passwords
  const isPasswordValid = await bcrypt.compare(password, data.password);

  if (!isPasswordValid) {
    console.error("Login Failed: Incorrect password");
    return {
      isSuccess: false,
      message: "Invalid email or password",
      data: null,
      token: null,
    };
  }

  // Generate token if password is correct
  const token = await createToken(data, 3600000);
  console.log(`Login successful for ${email}, token: ${token}`);
  return {
    isSuccess: true,
    message: "Login successful",
    data: { user: data, token: token },
  };
}

async function add(user) {
  const hiddenPass = await bcrypt.hash(user.password, 10);
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

async function getByEmail(email) {
  const { data, error } = await conn
    .from("users")
    .select("*")
    .eq("email", email)
    .single();
  return {
    isSuccess: !error,
    message: error?.message,
    data: data,
  };
}

module.exports = {
  getAll,
  get,
  add,
  update,
  remove,
  login,
  createToken,
  verifyToken,
  getByEmail,
};
