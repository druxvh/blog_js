import "dotenv/config";
import mongoose from "mongoose";
import User from "./models/User.js";
import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

const app = express();
const port = process.env.PORT || 4000;
const uri = process.env.MONGO_DB_URI;
const secret = process.env.JWT_SECRET;

app.use(cookieParser());

app.use(
  cors({
    // Optional additional configuration for cors
    origin: process.env.FRONT_END_URL, // frontend's URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

//MongoDB connection
mongoose
  .connect(uri)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1); // Exit process with failure
  });

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

    //Logged In
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
      username
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Error during login" });
  }
});

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

app.post("/logout", (req, res) => {
  res.clearCookie('token')
  res.status(200).json({message: "Logged Out Successfully"})
});

app.listen(port, () => {
  console.log(`Server running on the port: ${port}`);
});
