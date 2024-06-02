import "dotenv/config";
import mongoose from "mongoose";
import User from "./models/User.js";
import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";

const app = express();
const port = process.env.PORT || 4000;

const uri = process.env.MONGO_DB_URI;




app.use(
  cors({
    // Optional additional configuration for cors
    origin: process.env.FRONT_END_URL, // frontend's URL
    methods: ["GET", "POST", "PUT", "DELETE"],
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
  
    const hashedPassword = await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS));
  
    const userDoc = await User.create({ username, password: hashedPassword });
  
    res.status(201).json(userDoc);
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
});

app.listen(port, () => {
  console.log(`Server running on the port: ${port}`);
});
