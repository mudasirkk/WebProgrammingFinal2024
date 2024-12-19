const model = require("../models/users");
const express = require("express");
const app = express.Router();

app
  .get("/", (req, res, next) => {
    model
      .getAll()
      .then((x) => res.send(x))
      .catch(next);
  })

  .get("/search", (req, res, next) => {
    const query = req.query.q;
    model
      .search(query)
      .then((x) => res.send(x))
      .catch(next);
  })

  .get("/:id", (req, res, next) => {
    const id = req.params.id;
    model
      .get(+id)
      .then((x) => res.send(x))
      .catch(next);
  })

  .post("/", (req, res, next) => {
    model
      .add(req.body)
      .then((x) => res.send(x))
      .catch(next);
  })

  .post("/login", (req, res, next) => {
    model
      .login(req.body.email, req.body.password)
      .then((x) => res.send(x))
      .catch(next);
  })

  .patch("/:id", (req, res, next) => {
    console.log("Received request:", req.body);
    const id = +req.params.id;
    model
      .update(id, req.body)
      .then((x) => res.send(x))
      .catch(next);
  })

  .delete("/:id", (req, res, next) => {
    const id = +req.params.id;
    model
      .remove(id)
      .then((x) => res.send(x))
      .catch(next);
  })
  .post("/seed", (req, res, next) => {
    model
      .seed()
      .then((x) => res.send(x))
      .catch(next);
  });

module.exports = app;
