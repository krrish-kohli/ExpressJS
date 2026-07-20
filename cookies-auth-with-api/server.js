const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");

const app = express();
const PORT = 3000;

// ! Middlewares
app.use(express.json());
app.use(cookieParser());

// Simulated db of users
const users = [
  { username: "john", password: "123", role: "admin" },
  { username: "Sarah", password: "456", role: "user" },
];

// Home Route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the API" });
});

// Login Route Logic
app.post("/login", (req, res) => {
  // ! Find the user login details
  const { username, password } = req.body;
  const userFound = users.find((user) => {
    return user.username === username && user.password === password;
  });
  console.log(userFound);
  // ! Create some cookies (cookie)
  // * Prepare the login user data
  // ? Setting the cookie with the userdata
  res.cookie("userData", JSON.stringify(userFound), {
    maxAge: 3 * 24 * 60 * 1000, // 3 days expiration
    httpOnly: true,
    secure: false,
    sameSite: "strict",
  });
  // ! Render the user dashboard
  if (userFound) {
    res.json({ message: "Login Successful!" });
  } else {
    res.json({ message: "Login Failed" });
  }
});

// Dashboard Route
app.get("/dashboard", (req, res) => {
  // ! Grab the user from the cookie
  const userData = req.cookies.userData
    ? JSON.parse(req.cookies.userData)
    : null;
  const username = userData ? userData.username : null;
  // ! Render the template
  if (username) {
    res.json({ message: ` Welcome ${username}, role: ${userData.role}` });
  } else {
    // ! Redirect to login
    res.json({ message: "Unauthorized! Please login first" });
  }
});

// Logout Route
app.get("/logout", (req, res) => {
  // ! Logout
  res.clearCookie("userData");
  res.json({ message: "Logout Successfully" });
});

// ! Start the server
app.listen(PORT, console.log("The server is running"));
