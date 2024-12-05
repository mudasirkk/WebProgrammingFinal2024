const data = require("../data/workouts.json");
const { getConnection } = require("./supabase");
const conn = getConnection();

async function getAll() {
  const { data, error, count } = await conn
    .from("workouts")
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
    .from("workouts")
    .select("*")
    .eq("id", id)
    .single();
  return {
    isSuccess: !error,
    message: error?.message,
    data: data[0],
  };
}

async function getByUser(userid) {
  const { data, error, count } = await conn
    .from("workouts")
    .select("*")
    .eq("userid", userid);
  return {
    isSuccess: !error,
    message: error?.message,
    data: data,
    total: count,
  };
}

async function add(workout) {
  const { data, error } = await conn
    .from("workouts")
    .insert([
      {
        userid: workout.userid,
        username: workout.username,
        description: workout.description,
        title: workout.title,
        date: workout.date,
        duration: workout.duration,
        location: workout.location,
        type: workout.type,
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

async function seed() {
  for (const workout of data.workouts) {
    await add(workout);
  }
}

async function update(id, updatedWorkout) {
  const { data, error } = await conn
    .from("workouts")
    .update({
      userid: updatedWorkout.userid,
      username: updatedWorkout.username,
      description: updatedWorkout.description,
      title: updatedWorkout.title,
      date: updatedWorkout.date,
      duration: updatedWorkout.duration,
      location: updatedWorkout.location,
      type: updatedWorkout.type,
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
  const { data, error } = await conn
    .from("workouts")
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

module.exports = {
  getAll,
  get,
  getByUser,
  add,
  update,
  remove,
  seed,
};
