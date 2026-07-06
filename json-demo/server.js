const express = require("express");

// ! Initialize express app
const app = express();

// Sending JSON Data as response
app.post("/", (req, res) => {
  res.json({ message: "Welcome to Express", author: "Krrish" });
});

// Making post request
//clients: postman/browser/mobile/thunder clients
//req.body - contains data a user is sending into our server for processing

//Pass incoming data from a user/client
app.use(express.json());
app.post("/books", (req, res) => {
  res.json({ message: "Book added successfully", data: req.body });
});

// ! Start teh server
app.listen(3000, () => {
  console.log("Server is up and running");
});
