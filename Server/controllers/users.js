const model = require("../models/users");
const express = require("express");
const app = express.Router();

// Helper function to handle errors and send standardized responses
const handleNotFound = (res, data, entity = "Resource") => {
  if (!data) {
    res.status(404).send({ error: `${entity} not found` });
    return true;
  }
  return false;
};

app
  .get("/", async (req, res, next) => {
    try {
      const users = await model.getAll();
      res.status(200).send(users);
    } catch (error) {
      next(error);
    }
  })

  .get("/:id", async (req, res, next) => {
    try {
      const id = +req.params.id; // Convert ID to a number
      const user = await model.get(id);
      if (handleNotFound(res, user, "User")) return;
      res.status(200).send(user);
    } catch (error) {
      next(error);
    }
  })

  .post("/", async (req, res, next) => {
    try {
      const newUser = await model.add(req.body);
      res.status(201).send(newUser);
    } catch (error) {
      next(error);
    }
  })

  .patch("/:id", async (req, res, next) => {
    try {
      const id = +req.params.id;
      const updatedUser = await model.update(id, req.body);
      if (handleNotFound(res, updatedUser, "User")) return;
      res.status(200).send(updatedUser);
    } catch (error) {
      next(error);
    }
  })

  .delete("/:id", async (req, res, next) => {
    try {
      const id = +req.params.id;
      const deletedUser = await model.remove(id);
      if (handleNotFound(res, deletedUser, "User")) return;
      res.status(204).send(); // No Content
    } catch (error) {
      next(error);
    }
  })

  .post("/seed", async (req, res, next) => {
    try {
      const seededData = await model.seed();
      res.status(201).send(seededData);
    } catch (error) {
      next(error);
    }
  });

module.exports = app;
