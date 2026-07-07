const express = require("express");

// ! Express app
const app = express();
const PORT = 3000;

// Normal Middleware (Global)
app.use((req, res, next) => {
  const error = new Error("Oops! Something went wrong");
  next(error); // Without this, the route below won't run
});

// Home route
app.get("/", (req, res) => {
  res.send("Home page");
});

//About
app.get("/about", (req, res) => {
  res.send("About Page");
});

//  Error-handling middleware
app.use((err, req, res, next) => {
  console.log("Error", err.message);
  res.send("Something broke!");
});

// ! Start the server
app.listen(PORT, console.log("Server is up and running"));
