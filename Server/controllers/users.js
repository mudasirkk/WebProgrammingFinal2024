const model = require("../models/users");
const express = require("express");
const app = express.Router();
// Extend the Request type to include user and token properties
/**
 * @typedef {import('express').Request} Request
 * @typedef {import('express').Response} Response
 * @typedef {import('express').NextFunction} NextFunction
 */

/**
 * @typedef {Request & { user?: any, token?: string }} CustomRequest
 */
app
  .get("/", (req, res, next) => {
    model
      .getAll()
      .then((x) => res.send(x))
      .catch(next);
  })

  .get("/:id", (req, res, next) => {
    const id = req.params.id;
    model
      .get(id)
      .then((x) => res.send(x))
      .catch(next);
  })

  .post("/", (req, res, next) => {
    model
      .add(req.body)
      .then((x) => res.send(x))
      .catch(next);
  })

  .post("/login", async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const response = await model.login(email, password);
      if (response.isSuccess) {
        /** @type {CustomRequest} */ (req).user = response.data.user;
        /** @type {CustomRequest} */ (req).token = response.data.token;
        res.send(response);
      } else {
        res.status(401).send(response.message);
      }
    } catch (error) {
      next(error);
    }
  })

  .patch("/:id", (req, res, next) => {
    const id = req.params.id;
    model
      .update(+id, req.body)
      .then((x) => res.send(x))
      .catch(next);
  })

  .delete("/:id", (req, res, next) => {
    const id = req.params.id;
    model
      .remove(+id)
      .then((x) => res.send(x))
      .catch(next);
  });

module.exports = app;
