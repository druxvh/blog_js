import mongoose, { Schema, model } from "mongoose";

const PostSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    content: { type: String, required: true },
    coverImage: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: "User" }, // Reference to User collection
  },
  { timestamps: true }
);

const Post = model("Post", PostSchema);

export default Post;
