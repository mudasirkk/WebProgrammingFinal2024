/**
 * @type {{ users: User[]}}
 */
const data = require("../data/users.json");
const { getConnection } = require("./supabase");
const conn = getConnection();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

function mapToUserType(data) {
  return {
    id: data.id || 0,
    fname: data.fname || data.username || "",
    lname: data.lname || "",
    email: data.email || (data.username ? `${data.username}@example.com` : ""),
    username: data.username || "",
    password: data.password || "",
    isAdmin: data.isAdmin || false,
  };
}

function mapForInsertion(user) {
  return {
    // Existing columns
    id: user.id,
    fname: user.fname,
    lname: user.lname,
    email: user.email,
    username: user.username,
    password: user.password,
    isAdmin: user.isAdmin,

    // Additional columns with default values
    createdat: new Date().toISOString(),
    date: new Date().toISOString(),
    description: user.description || "",
    duration: user.duration || 0,
    location: user.location || "",
    title: user.title || "",
    type: user.type || "user",
    updatedat: new Date().toISOString(),
    userid: user.id,
  };
}

/**
 * @template T
 * @typedef {import("../../Client/src/models/dataEnvelope").DataEnvelope} DataEnvelope
 * @typedef {import("../../Client/src/models/dataEnvelope").DataListEnvelope} DataListEnvelope
 */

/**
 * @typedef {import("../../Client/src/models/users").User} User
 */

/**
 * Get all Users
 * @returns {Promise<DataListEnvelope<User>>}
 */
async function getAll() {
  const { data, count, error } = await conn
    .from("users")
    .select("*", { count: "estimated" });

  // Map the data to ensure all User properties are present
  const mappedData = data ? data.map(mapToUserType) : [];

  return {
    isSuccess: !error,
    message: error?.message,
    data: data ? data.map(mapToUserType) : [],
    total: count,
  };
}

/**
 * Get a user by id
 * @param {number} id
 * @returns {Promise<DataEnvelope<User>>}
 */
async function get(id) {
  const { data, error } = await conn
    .from("users")
    .select("*")
    .eq("id", id) //check user by id
    .single();
  return {
    isSuccess: !error,
    message: error?.message,
    data: data ? mapToUserType(data) : null,
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
  if (error || !data) {
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

/**
 * Add a new user
 * @param {User} user
 * @returns {Promise<DataEnvelope<User>>}
 */

async function add(user) {
  // Use the mapping to ensure all required fields
  const completeUser = mapToUserType(user);

  const { data, error } = await conn
    .from("users")
    .insert([
      {
        // Map the User properties to the table's expected structure
        id: user.id,
        createdat: new Date().toISOString(), // Add current timestamp
        date: new Date().toISOString(), // Add current date
        description: "", // Add a default or empty string
        duration: 0, // Add a default value
        location: "", // Add a default or empty string
        title: "", // Add a default or empty string
        type: "user", // Add a default type
        updatedat: new Date().toISOString(), // Add current timestamp
        userid: user.id,
        username: user.username,

        // Original User properties
        fname: user.fname,
        lname: user.lname,
        email: user.email,
        password: user.password,
        isAdmin: user.isAdmin,
      },
    ])
    .single();

  return {
    isSuccess: !error,
    message: error?.message,
    data: data ? mapToUserType(data) : null,
  };
}

async function seed() {
  for (const user of data.users) {
    await add(user);
  }
}

/**
 * Update a user
 * @param {number} id
 * @param {User} user
 * @returns {Promise<DataEnvelope<User>>}
 */

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

/**
 * Remove a user
 * @param {number} id
 * @returns {Promise<DataEnvelope<number>>}
 */

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

/**
 * Create a token
 * @param {User} user
 * @param {number} expiresIn
 * @returns {Promise<DataEnvelope<number>>}
 */

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
