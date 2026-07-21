const express = require("express");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const { MongoStore } = require("connect-mongo");
const bcrypt = require("bcryptjs");
const path = require("path");

const app = express();
const PORT = 3000;

// Connect to mongoose
mongoose
  .connect("Your MongoDB URI")
  .then(() => {
    console.log("DB has been connected");
  })
  .catch((err) => {
    console.log(err);
  });

// Create the userSchema
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
  // Check the user in the session
  const username = req.session.userData ? req.session.userData.username : null;
  if (username) {
    return next();
  } else {
    res.redirect("/login");
  }
};

// ! IsAdmin (Authorization)
const isAdmin = (req, res, next) => {
  const admin = req?.session?.userData?.role === "admin";
  if (admin) {
    return next();
  } else {
    res.send("Forbidden: ACCESS DENIED!!!");
  }
};

// ! configure Express Session
app.use(
  session({
    secret: "fwfjn3i4234",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 60 * 60 * 1000, //Expires in 1hr
    },
    store: MongoStore.create({
      mongoUrl: "Your MongoDB URI",
    }),
  }),
);

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
app.get("/admin-only", (req, res) => {
  res.render("admin");
});

// Register Logic
app.post("/register", async (req, res) => {
  // ! Destructure the req.body
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    username: username,
    password: hashedPassword,
  });
  // Redirect to login
  res.redirect("/login");
});

// Login Route Logic
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  // ! Find the user login details in the db
  const userFound = await User.findOne({
    username,
  });
  if (userFound && (await bcrypt.compare(password, userFound.password))) {
    // ! Create session (save the user into session)
    req.session.userData = {
      username: userFound.username,
      role: userFound.role,
    };

    // ! Add the login user ton session
    res.redirect("/dashboard");
  } else {
    res.send("Invalid Login credentials");
  }
});

// Dashboard Route
app.get("/dashboard", isAuthenticated, isAdmin, (req, res) => {
  // Take the login user from session
  const username = req.session.userData ? req.session.userData.username : null;
  res.render("dashboard", {
    username,
  });
});

// Logout Route
app.get("/logout", (req, res) => {
  // ! Logout
  req.session.destroy();
  res.redirect("/login");
});

// ! Start the server
app.listen(PORT, console.log("The server is running"));
