const express = require("express");
// ! Initialize the express app
const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());
// Simulated book data (static object for now)
let books = [
  { id: 1, title: "Nodejs Masterclass", author: "Smith" },
  { id: 2, title: "Mastering MERN Stack", author: "Krrish" },
];

// ! Get all books
app.get("/books", (req, res) => {
  res.json(books);
});

// ! Add new book
app.post("/books", (req, res) => {
  const newBook = req.body;
  newBook.id = books.length + 1;
  //Push new book into the existing array
  books.push(newBook);
  res.json({ message: "Book Added", newBook: newBook, allBooks: books });
});

// ! Get a book by ID
app.get("/books/:id", (req, res) => {
  // get the id from params
  const bookId = Number(req.params.id); // convert string to number
  const bookFound = books.find((book) => {
    return book.id === bookId;
  });
  if (!bookFound) {
    return res.json({ message: "Book not found" });
  } else {
    return res.json(bookFound);
  }
});

// ! Delete a book by ID
app.delete("/books/:id", (req, res) => {
  const bookId = Number(req.params.id);
  books = books.filter((book) => {
    return book.id !== bookId;
  });
  res.json({ message: "Book deleted successfully", books });
});

// ! Update book by id
app.put("/books/:id", (req, res) => {
  const bookId = Number(req.params.id);
  const index = books.findIndex((book) => {
    return book.id === bookId;
  });
  if (index === -1) {
    return res.json({ message: "Book not found" });
  }
  // Update
  const updatedBook = { ...books[index], ...req.body };
  books[index] = updatedBook;
  res.json({ message: "Book updated", data: updatedBook });
});

// ! Start the server
app.listen(PORT, () => {
  console.log("Server is up and running");
});
