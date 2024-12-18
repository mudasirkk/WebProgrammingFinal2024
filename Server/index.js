const express = require("express");
const app = express();
const userController = require("./controllers/users");
const workoutController = require("./controllers/workouts");
const postController = require("./controllers/posts");

const PORT = 3000;

// Middleware
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

app.use(express.json());
app.use(express.static(__dirname + "/dist"));

// Controllers
app
  .get("/", (req, res, next) => {
    res.send("Hello World");
  })
  .use("/api/v1/users", userController)
  .use("/api/v1/workouts", workoutController)
  .use("/api/v1/posts", postController)

  .get("*", (req, res, next) => {
    res.sendFile(__dirname + "/dist/index.html");
  });

// Error Handling
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status ?? 500).send(err);
});

console.log("Step #1");
app.listen(PORT, (err, data) => {
  console.log("Step #2");
  console.log("Server is running at http://localhost:" + PORT);
});
console.log("Step #3");
