const model = require("../models/workouts");
const express = require("express");
const app = express.Router();

app.get("/", (req, res, next) => {
  model
    .getAll()
    .then((workouts) => res.send(workouts))
    .catch(next);
});

app.get("/:id", (req, res, next) => {
  const id = req.params.id;
  model
    .get(+id)
    .then((workout) => res.send(workout))
    .catch(next);
});

app.get("/user/:userid", (req, res, next) => {
  const userid = req.params.userid;
  model
    .getByUser(+userid)
    .then((workouts) => res.send(workouts))
    .catch(next);
});

app.post("/", (req, res, next) => {
  model
    .add(req.body)
    .then((newWorkout) => res.send(newWorkout))
    .catch(next);
});

app.patch("/:id", (req, res, next) => {
  const id = req.params.id;
  model
    .update(+id, req.body)
    .then((updatedWorkout) => res.send(updatedWorkout))
    .catch(next);
});

app.delete("/:id", (req, res, next) => {
  const id = req.params.id;
  model
    .remove(+id)
    .then((result) => res.send(result))
    .catch(next);
});

module.exports = app;
