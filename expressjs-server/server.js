const express = require("express");
// Initialize express
const app = express();

// Basic Route
app.get("/", (req, res) => {
  res.send("Hello from Express");
});

// About Route
app.get("/about", (req, res) => {
  res.send("About Us Page");
});

// Contact Route
app.get("/contact", (req, res) => {
  res.send("Contact Us Page");
});

// Signup Route
app.get("/register", (req, res) => {
  res.send("Register route");
});

//GET - Get data
//POST - Send data
//PUT/PATCH - Update data
//DELETE - delete

// Start the server
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
