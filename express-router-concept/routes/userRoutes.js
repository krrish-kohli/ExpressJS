const express = require("express");

// ! Express Router
const userRouter = express.Router();

// Static mock data
const users = [
  { id: 1, username: "Alice" },
  { id: 2, username: "Bob" },
];

// USER ROUTES
userRouter.get("/", (req, res) => {
  res.json(users);
});

userRouter.get("/:id", (req, res) => {
  res.json({ message: `Get user with id ${req.params.id}` });
});

userRouter.post("/", (req, res) => {
  res.json({ message: "User created" });
});

userRouter.put("/:id", (req, res) => {
  res.json({ message: "User updated" });
});

userRouter.delete("/:id", (req, res) => {
  res.json({ message: "User deleted" });
});

// ! Export Router
module.exports = userRouter;
