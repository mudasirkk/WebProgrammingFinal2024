require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports = {
  create_secret() {
    return process.env.JWT_SECRET;
  },
  verifyToken(token) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          reject(err);
        } else {
          resolve(decoded);
        }
      });
    });
  },
};
