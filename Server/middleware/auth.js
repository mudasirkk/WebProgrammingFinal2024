const jwt = require("../models/jwt");
const express = require("express");
const app = express.Router();

async function checkToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];
  if (!token) {
    return next();
  }
  try {
    const payload = await jwt.verifyToken(token);
    if (payload) {
      req.user = payload;
    }
  } catch (error) {
    console.error("Issue verifying Token: ", error);
  }
  next();
}

function checkAdmin(isAdmin = false) {
  return function (req, res, next) {
    const user = req.user;
    if (!user) {
      return next({
        status: 401,
        message: "Please Login to perform this action.",
      });
    }

    if (!isAdmin) {
      return next({
        status: 403,
        message: "Only Admins can perform this action.",
      });
    }
    next();
  };
}

module.exports = { checkToken, checkAdmin };
