const express = require("express");

// ! Initialize express
const app = express();

//---ROUTES HERE---
// ! Home route
app.get("/", (req, res) => {
  res.send("Welcome to my Mini Express Store!");
});

// ! Product Route
app.get("/products", (req, res) => {
  res.send("Here are our amazing products");
});

// ! About Route
app.get("/about", (req, res) => {
  res.send("About us: We sell cool stuffs");
});

// ! Contact Route
app.get("/contact", (req, res) => {
  res.send("Contact us at janedoe@store.com");
});

// Route parameters
// app.get("/products/:productId", (req, res) => {
//   console.log(req.params.productId);
//   res.send(`You requested product with ID = ${req.params.productId}`);
// });

// ! Query string
app.get("/products/search", (req, res) => {
  console.log(req.query);
  res.send("Query string demo");
});

// ! Start the server
app.listen(3000, () => {
  console.log("server is up and running");
});
