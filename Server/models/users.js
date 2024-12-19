/** @type {{ items: User[] }} */
const data = require("../data/users.json");
const { getConnection } = require("./supabase");

const conn = getConnection();

require("dotenv").config();

/**
 * @template T
 * @typedef {import("../../Client/src/models/dataEnvelope").DataEnvelope} DataEnvelope
 * @typedef {import("../../Client/src/models/dataEnvelope").DataListEnvelope} DataListEnvelope
 */

/**
 * @typedef {import("../../Client/src/models/users").User} User
 */

/**
 * Get all users
 * @returns {Promise<DataListEnvelope<User>>}
 */
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

/**
 * Get a user by id
 * @param {number} id
 * @returns {Promise<DataEnvelope<User>>}
 */
async function get(id) {
  const { data, error } = await conn
    .from("users")
    .select("*")
    .eq("id", id)
    .single();
  if (error || !data) {
    throw {
      isSuccess: false,
      message: "The user with the given ID was not found. ID:" + id,
      data: null,
      status: 404,
    };
  }
  return {
    isSuccess: !error,
    message: error?.message,
    data: data,
  };
}

/**
 * Add a new user
 * @param {User} user
 * @returns {Promise<DataEnvelope<User>>}
 */
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
    .select("*")
    .single();
  return {
    isSuccess: !error,
    message: error?.message,
    data: data,
  };
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

  if (!data) {
    return {
      isSuccess: false,
      message: "User not found",
      data: null,
    };
  }
  return {
    isSuccess: !error,
    message: error?.message || "Update successful",
    data: data,
  };
}

/**
 * Remove a user
 * @param {number} id
 * @returns {Promise<DataEnvelope<number>>}
 */
async function remove(id) {
  const { data, error } = await conn
    .from("users")
    .delete()
    .eq("id", id)
    .select("*")
    .single();
  return {
    isSuccess: !error,
    message: error?.message,
    data: data,
  };
}

async function login(email, password) {
  const { data, error } = await conn
    .from("users")
    .select("*")
    .eq("email", email)
    .single();
  if (!data) {
    return {
      isSuccess: false,
      message: `The email ${email} does not exist`,
      data: null,
    };
  }
  if (data.password === password) {
    return {
      isSuccess: true,
      message: "Login successful",
      data: data,
    };
  } else {
    return {
      isSuccess: false,
      message: "Incorrect password",
      data: null,
    };
  }
}

async function seed() {
  for (const User of data.items) {
    await add(User);
  }
}

module.exports = {
  getAll,
  get,
  add,
  update,
  remove,
  login,
  seed,
};
