const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const dotenv = require("dotenv").config();

const PORT = 3000;
const app = express();

// Connect to mongodb
mongoose
  .connect(
    "YOUR_MONGODB_URI",
  )
  .then(() => {
    console.log("DB connected!");
  })
  .catch((err) => {
    console.log(err);
  });

// Image schema
const imageSchema = new mongoose.Schema({
  url: String,
  public_id: String,
});
// Model
const Image = mongoose.model("Image", imageSchema);

// Configure cloudinary
cloudinary.config({
  api_key: process.env.CLOUDINARY_API_KEY,
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure multer storage cloudinary
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "images-folder",
    format: async (req, file) => "jpg",
    public_id: (req, file) => file.fieldname + "_" + Date.now(),
    transformation: [
      {
        width: 800,
        height: 600,
        crop: "fill",
      },
    ],
  },
});

// Configure multer
const upload = multer({
  storage,
  limits: 1024 * 1024 * 5, // 5MB Limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Not an image! Please upload an image"));
    }
  },
});

// Upload route
app.post("/upload", upload.single("file"), async (req, res) => {
  console.log(req.file);
  const uploaded = await Image.create({
    url: req.file.path,
    public_id: req.file.filename,
  });
  res.json({ message: "File upload", uploaded });
});

// Get all images
app.get("/images", async (req, res) => {
  try {
    const images = await Image.find();
    res.json({ images });
  } catch (error) {
    res.json(error);
  }
});

// ! Start the server
app.listen(PORT, console.log(`Server is up and running ${PORT}`));
