const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

// ! Express app
const app = express();
const PORT = 3000;

//=======================
//1. Built-in Middleware
//=======================
app.use(express.json()); // Parse json data
app.use(express.static("public"));

//=========================
//2. Third-party Middleware
//=========================
app.use(morgan("dev")); // Log HTTP request
app.use(cors()); // Allow Cross-Origin Requests

//=====================
//3. Custom Middleware
//=====================
app.use((req, res, next) => {
  console.log(`Custom Logger: ${req.method} - ${req.url}`);
  req.requestTime = new Date();
  next();
});

//================================
//4. Application-Level Middleware
//================================
app.get(
  "/admin",
  (req, res, next) => {
    console.log("Checking admin access...");
    // Authentication
    next();
  },
  (req, res) => {
    res.json({ message: "Welcome to Admin Panel!" });
  },
);

//===========================
//5. Router-Level Middleware
//===========================
const userRouter = express.Router();
userRouter.use((req, res, next) => {
  console.log("User router middleware called");
  next();
});
userRouter.get("/profile", (req, res) => {
  res.json({ message: "User profile loaded!" });
});

app.use("/", userRouter);

app.get("/about", (req, res) => {
  console.log(req.requestTime);
  res.json({ message: "Welcome to about page" });
});

// ! Start the server
app.listen(PORT, console.log("Server is up and running"));
