import "dotenv/config";
import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

import User from "./models/User.js";
import Post from "./models/Post.js";
import { ADDRGETNETWORKPARAMS } from "dns";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
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
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Configure Multer for file uploads
const storage = multer.diskStorage({ //to define where and how to store uploaded files.
  destination: function (req, file, cb) {
    return cb(null, path.join(__dirname, "uploads"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = 
    file.originalname.split(path.extname(file.originalname))[0] + '-' + Date.now() +  path.extname(file.originalname);


    return cb(null, uniqueSuffix);
  },
});
const upload = multer({ storage });

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
    const isPasswordValid = bcrypt.compareSync(password, userDoc.password);

    if (!userDoc || !isPasswordValid) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    //Logged In, Generating a token and saving into the cookie
    const token = jwt.sign(
      {
        id: userDoc._id,
        username,
      },
      secret,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, { httpOnly: true, sameSite: "none", secure: true}); //saves the jwt token to cookies
    res.status(201).json({
      id: userDoc._id,
      username,
    })
    console.log("UserDoc_login: ", userDoc);
    
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Error during login" });
  }
});

// Accessing the user's profile after login
app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({ message: "No JWT token was provided" });
  }
  try {
    const decodedToken = jwt.verify(token, secret);
    res.json({ message: "Profile Accessed", username: decodedToken.username });
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
  const { token } = req.cookies;
  const { title, description, content } = req.body;

  if (!title || !description || !content || !req.file) {
    return res.status(400).json({ message: "All fields are required" });
  }

  let userId;

  try {
    const decodedToken = jwt.verify(token, secret);
    userId = decodedToken.id;
  } catch (error) {
    return res.status(401).json({ message: "Invalid Token" });
  }

 // Start a session
const session = await mongoose.startSession();
session.startTransaction();

try {
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const newPost = new Post({
    title,
    description,
    content,
    coverImage: req.file.filename,
    author: user._id,
  });

  const savedPost = await newPost.save({ session });

  // If everything is successful, commit the transaction
  await session.commitTransaction();
  res.status(201).json({ message: "Post saved successfully", post: savedPost });
} catch (error) {
  console.error("Error creating post:", error);
  await session.abortTransaction();
  res.status(500).json({ message: "Failed to create post" });
} finally {
  session.endSession();
}
});

//Fetching all posts
app.get("/posts", async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("author", ["username"])
      .sort({ createdAt: -1 })
      .limit(20);
    res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ message: "Error fetching posts" });
  }
});

//Post Page
app.get("/post/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id).populate("author", ["username"]);
    res.json(post);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
  } catch (error) {
    console.error("Error fetching post:", error);
    res.status(500).json({ message: "Failed to fetch post" });
  }
});

//Update and Edit the Post
app.put(`/post/:id`, upload.single("image"), async (req, res) => {
  const { token } = req.cookies;

  // Verify token and get user ID
  let userId;

  try {
    const decoded = jwt.verify(token, secret);
    userId = decoded.id;
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }

  const { id } = req.params;
  const { title, description, content } = req.body;

  try {
    const postDoc = await Post.findById(id);
    if (!postDoc) {
      // Added check for post existence
      return res.status(404).json({ message: "Post not found" });
    }

    // Check if the user is authorized to update the post
    if (postDoc.author.toString() !== userId) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    // Prepare the update data
    const updateData = { title, description, content };
    if (req.file) {
      updateData.coverImage = req.file.filename;
    } else {
      updateData.coverImage = postDoc.coverImage; // retains the old image
    }

    // Update the post
    const updatedPost = await Post.updateOne({ _id: id }, { $set: updateData });

    res.json({ message: "Post updated successfully", post: updatedPost });
  } catch (error) {
    console.error("Error updating post:", error);
    res.status(500).json({ message: "Failed to update post" });
  }
});

//Delete Post
app.delete(`/post/:id`, async (req, res) => {
  const { token } = req.cookies;

  // Verify token and get user ID
  let userId;

  try {
    const decoded = jwt.verify(token, secret);
    userId = decoded.id;
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }

  const { id } = req.params;
  try {
    const postDoc = await Post.findById(id);
    if (!postDoc) {
      // Added check for post existence
      return res.status(404).json({ message: "Post not found" });
    }

    // Check if the user is authorized to update the post
    if (postDoc.author.toString() !== userId) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    // delete the post
    const deletePost = await Post.findByIdAndDelete(id);

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ message: "Failed to delete post" });
  }
});

// Image upload route Froala Editor
app.post('/upload_image', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  res.json({ link: `http://127.0.0.1:4000/uploads/${req.file.filename}` });
});

// Server running
app.listen(port, () => {
  console.log(`Server running on the port: ${port}`);
});
