const express = require("express");
const app = express();
const axios = require("axios");
const PORT = 3000;

// Route to fetch posts
app.get("/posts", async (req, res, next) => {
  try {
    const response = await axios.get(
      "https://notjsonplaceholder.typicode.com/posts",
    );
    res.json(response.data);
  } catch (error) {
    next(error);
  }
});

// Regular route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to built-in error handler",
  });
});

// Custom error handling middleware
app.use((err, req, res, next) => {
  // check if it's an axios error
  if (err.response) {
    res.status(err.response.status).json(err.response.data);
  } else if (err.request) {
    res.status(503).json({ message: "Service Unavailable" });
  } else {
    res.status(500).json({ message: "Something broke!!!" });
  }
});

// Start the server
app.listen(PORT, console.log("Server is running..."));
