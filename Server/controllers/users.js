const model = require("../models/users");
const express = require("express");
const app = express.Router();

/**
 * @typedef {import('express').Request} Request
 * @typedef {import('express').Response} Response
 * @typedef {import('express').NextFunction} NextFunction
 */

/**
 * @typedef {Request & { user?: any, token?: string }} CustomRequest
 */

app
  .get("/", (req, rest, next) => {
    model
      .getAll()
      .then((x) => rest.send(x))
      .catch(next);
  })

  .get("/:id", (req, rest, next) => {
    const id = req.params.id;
    model
      .get(id)
      .then((x) => rest.send(x))
      .catch(next);
  })

  .post("/", (req, rest, next) => {
    model
      .add(req.body)
      .then((x) => rest.send(x))
      .catch(next);
  })

  .post("/seed", (req, rest, next) => {
    model
      .seed()
      .then((x) => rest.send(x))
      .catch(next);
  })

  .post("/login", async (req, rest, next) => {
    try {
      const { email, password } = req.body;
      const response = await model.login(email, password);
      if (response.isSuccess) {
        /** @type {CustomRequest} */ (req).user = response.data.user;
        /** @type {CustomRequest} */ (req).token = response.data.token;
        rest.send(response);
      } else {
        rest.status(401).send(response.message);
      }
    } catch (error) {
      next(error);
    }
  })

  .patch("/:id", (req, rest, next) => {
    const id = req.params.id;
    model
      .update(+id, req.body)
      .then((x) => rest.send(x))
      .catch(next);
  })

  .delete("/:id", (req, rest, next) => {
    const id = req.params.id;
    model
      .remove(+id)
      .then((x) => rest.send(x))
      .catch(next);
  });

module.exports = app;
