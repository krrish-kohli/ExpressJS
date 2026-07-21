const express = require("express");
const app = express();
const PORT = 3000;

// Simulate an error in the middleware
app.use((req, res, next) => {
  // ! Simulate an error condition
  const isError = true;
  if (isError) {
    // Create an error obj
    const err = new Error("An error occurred");
    next(err);
  } else {
    next();
  }
});

// Regular route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to built-in error handler",
  });
});

// Start the server
app.listen(PORT, console.log("Server is running..."));
