const express = require("express");

// ! Initialize express
const app = express();

// Routes for books
// // ! Get all books
// app.get("/books", (req, res) => {
//   res.send("Get all books");
// });

// // ! Post a new books
// app.post("/books", (req, res) => {
//   res.send("Post a new book");
// });

// // ! Delete all books
// app.delete("/books", (req, res) => {
//   res.send("Delete all books");
// });

//---ROUTE CHAINING---
app
  .route("/books")
  .get((req, res) => {
    res.send("Get all books");
  })
  .post((req, res) => {
    res.send("Post a new book");
  })
  .delete((req, res) => {
    res.send("Delete all books");
  });

// // ! Get a single book
// app.get("/books/:id", (req, res) => {
//   res.send("Get a single book", req.params.id);
// });

// // ! Update a book
// app.put("/books/:id", (req, res) => {
//   res.send("PUT: Update a book");
// });

// // ! Delete a book
// app.delete("/books/:id", (req, res) => {
//   res.send("DELETE: Delete a book");
// });

// Route for /books/:id
app
  .route("/books/:id")
  .get((req, res) => {
    res.send(`Get a single book - ${req.params.id}`);
  })
  .put((req, res) => {
    res.send("PUT: Update a book");
  })
  .delete((req, res) => {
    res.send("DELETE: Delete a book");
  });

// ! Start the server
app.listen(3000, () => {
  console.log("server is up and running");
});
