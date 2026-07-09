const express = require("express");

// ! Express Router
const postRouter = express.Router();

const posts = [
  { id: 1, title: "Hello Express" },
  { id: 2, title: "Router Magic" },
];

// POST ROUTES
postRouter.get("/", (req, res) => {
  res.json(posts);
});

postRouter.get("/:id", (req, res) => {
  res.json({ message: "Post details" });
});

postRouter.put("/:id", (req, res) => {
  res.json({ message: "Post updated" });
});

postRouter.delete("/:id", (req, res) => {
  res.json({ message: "Post deleted" });
});

// ! Export Router
module.exports = postRouter;
