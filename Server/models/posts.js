const data = require("../data/posts.json");
const { getConnection } = require("./supabase");

const conn = getConnection();

/**
 * @template T
 * @typedef {import("../../Client/src/models/dataEnvelope").DataEnvelope} DataEnvelope
 * @typedef {import("../../Client/src/models/dataEnvelope").DataListEnvelope} DataListEnvelope
 */

/**
 * @typedef {import("../../Client/src/models/posts").Post} Post
 */

/**
 * Get all posts
 * @returns {Promise<DataListEnvelope<Post>>}
 */
async function getAll() {
  const { data, error, count } = await conn
    .from("posts")
    .select("*", { count: "estimated" });
  return {
    isSuccess: !error,
    message: error?.message,
    data: data,
    total: count,
  };
}

/**
 * Get a post by id
 * @param {number} id
 * @returns {Promise<DataEnvelope<Post>>}
 */
async function get(id) {
  const { data, error } = await conn
    .from("posts")
    .select("*")
    .eq("id", id)
    .single();
  return {
    isSuccess: !error,
    message: error?.message,
    data: data,
  };
}

/**
 * Add a new post
 * @param {Post} post
 * @returns {Promise<DataEnvelope<Post>>}
 */
async function add(post) {
  const { data, error } = await conn
    .from("posts")
    .insert([
      {
        workoutType: post.workoutType,
        description: post.description,
        date: post.date,
        location: post.location,
        userId: post.userId,
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
 * Update a post
 * @param {number} id
 * @param {Post} post
 * @returns {Promise<DataEnvelope<Post>>}
 */
async function update(id, post) {
  const { data, error } = await conn
    .from("posts")
    .update({
      workoutType: post.workoutType,
      description: post.description,
      date: post.date,
      location: post.location,
      userId: post.userId,
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
 * Remove a post
 * @param {number} id
 * @returns {Promise<DataEnvelope<number>>}
 */
async function remove(id) {
  const { data, error } = await conn
    .from("posts")
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

async function getByUser(userid) {
  const { data, error, count } = await conn
    .from("posts")
    .select("*")
    .eq("userId", userid);
  return {
    isSuccess: !error,
    message: error?.message,
    data: data,
    total: count,
  };
}

async function seed() {
  for (const Post of data.items) {
    await add(Post);
  }
}

module.exports = {
  getAll,
  get,
  add,
  update,
  remove,
  getByUser,
  seed,
};
