import "dotenv/config";
import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import multer from "multer";
import path from "path";
// import fs from "fs"

import User from "./models/User.js";
import Post from "./models/Post.js";

const app = express();
const port = process.env.PORT || 4000;
const uri = process.env.MONGO_DB_URI;
const secret = process.env.JWT_SECRET;

app.use(cookieParser());

//CORS configuration
app.use(
  cors({
    // Optional additional configuration for cors
    origin: process.env.FRONT_END_URL, // frontend's URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    return cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

app.use(express.json());

//MongoDB connection
mongoose
  .connect(uri)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1); // Exit process with failure
  });

// Register user route
app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(
      password,
      parseInt(process.env.SALT_ROUNDS)
    );

    const userDoc = await User.create({ username, password: hashedPassword });

    res.status(201).json(userDoc);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// Login user route
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const userDoc = await User.findOne({ username });
    if (!userDoc) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    const isPasswordValid = bcrypt.compareSync(password, userDoc.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    //Logged In, Generating a token and saving into the cookie
    const token = jwt.sign(
      {
        id: userDoc._id,
        username,
      },
      secret,
      { expiresIn: "3d" }
    );

    res.cookie("token", token, { httpOnly: true }); //saves the jwt token to cookies
    res.status(201).json({
      id: userDoc._id,
      username,
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Error during login" });
  }
});

// Accessing the user's profile after login
app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }
  try {
    const decoded = jwt.verify(token, secret);
    res.json({ message: "Profile Accessed", username: decoded.username });
  } catch (error) {
    res.status(401).json({ message: "Invalid Token" });
  }
});

// Logging out the user
app.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logged Out Successfully" });
});

// Posting route with image upload using Multer middleware
app.post("/post", upload.single("image"), async (req, res) => {
  const { title, summary, content } = req.body;

  if (!title || !summary || !content || !req.file) {
    return res.status(400).json({ message: "All fields are required" });
  }
  // Start a session
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const newPost = new Post({
      title,
      summary,
      content,
      coverImage: req.file.filename,
    });
    const savedPost = await newPost.save({ session });

     // If everything is successful, commit the transaction
    await session.commitTransaction();
    session.endSession();


    res.status(201).json(savedPost);



  } catch (error) {
  // If there's an error, abort the transaction
    console.error("Error creating post:", error);
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ message: "Failed to create post" });

  }

});

// Server running
app.listen(port, () => {
  console.log(`Server running on the port: ${port}`);
});
