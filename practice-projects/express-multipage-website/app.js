const express = require("express");
const path = require("path");

// ! Express Instance
const app = express();
const PORT = 3000;

//Serve the static assets
app.use(express.static(path.join(__dirname, "public")));

// ! Home Route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

// ! About Route
app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "about.html"));
});

// ! Contact Route
app.get("/contact", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "contact.html"));
});

// ! Start the server
app.listen(PORT, console.log("Server is up and running..."));
