const express = require("express");

const {
  showCreateForm,
  showPostList,
  createPostLogic,
} = require("../controllers/postController");

// Router
const postRouter = express.Router();

//! Show the create form
postRouter.get("/create", showCreateForm);

//! To get all posts
postRouter.get("/list", showPostList);

//! Create the post (The main logic)
postRouter.post("/create", createPostLogic);

module.exports = postRouter;
