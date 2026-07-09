const express = require("express");
const userRouter = require("./routes/userRoutes");
const postRouter = require("./routes/postRoutes");

// ! Express Instance
const app = express();
const PORT = 3000;

// Routes here
app.use("/users", userRouter);
app.use("/posts", postRouter);

// ! Start the server
app.listen(PORT, console.log("Server is running..."));
