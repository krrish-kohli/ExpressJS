const express = require("express");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const path = require("path");

const app = express();
const PORT = 3000;

// Connect to mongoose
mongoose
  .connect("YOUR MONGODB SERVER")
  .then(() => {
    console.log("DB has been connected");
  })
  .catch((err) => {
    console.log(err);
  });

// Create the user schema
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  role: {
    type: String,
    default: "user",
  },
});
// Complete the schema to form model
const User = mongoose.model("User", userSchema);

// ! Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ! Set the view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//-----CUSTOM MIDDLEWARES-----
// ! IsAuthenticated (Authentication)
const isAuthenticated = (req, res, next) => {
  // Check the user in the cookies
  const userDataCookie = req.cookies.userData;
  try {
    const userData = userDataCookie && JSON.parse(userDataCookie);
    if (userData && userData.username) {
      // ! Add the login user into the req object
      req.userData = userData;
      return next();
    } else {
      res.send("You are not logged in!");
    }
  } catch (error) {
    console.log(error);
  }
};
// ! IsAdmin (Authorization)
const isAdmin = (req, res, next) => {
  if (req.userData && req.userData.role === "admin") {
    return next();
  } else {
    res.send("Forbidden: You don't have access: ADMIN ONLY");
  }
};

// Home Route
app.get("/", (req, res) => {
  res.render("home");
});

// Login Route (login form)
app.get("/login", (req, res) => {
  res.render("login");
});

// Register Route (register form)
app.get("/register", (req, res) => {
  res.render("register");
});

// Admin Route (Admin page)
app.get("/admin-only", isAuthenticated, isAdmin, (req, res) => {
  // We have access to the login as req.userData
  // console.log(req.userData);
  res.render("admin");
});

// Register Logic
app.post("/register", async (req, res) => {
  // ! Destructure the req.body
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const newUser = await User.create({
      username: username,
      password: hashedPassword,
    });
    // Redirect to login
    res.redirect("/login");
  } catch (error) {}
});

// Login Route Logic
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  // ! Find the user login details in the db
  const userFound = await User.findOne({
    username,
  });
  if (userFound && (await bcrypt.compare(password, userFound.password))) {
    // ! Create some cookies (cookie)
    // * Prepare the login user data
    // ? Setting the cookie with the userdata
    res.cookie(
      "userData",
      JSON.stringify({
        username: userFound.username,
        role: userFound.role,
      }),
      {
        maxAge: 3 * 24 * 60 * 1000, // 3 days expiration
        httpOnly: true,
        secure: false,
        sameSite: "strict",
      },
    );
    res.redirect("/dashboard");
  } else {
    res.send("Invalid Login credentials");
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
    res.render("dashboard", { username });
  } else {
    // ! Redirect to login
    res.redirect("/login");
  }
});

// Logout Route
app.get("/logout", (req, res) => {
  // ! Logout
  res.clearCookie("userData");
  res.redirect("/login");
});

// ! Start the server
app.listen(PORT, console.log("The server is running"));
