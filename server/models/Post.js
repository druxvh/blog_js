import mongoose, { Schema, model } from "mongoose";

const PostSchema = new Schema({
    title: {type:String, required: true},
    summary: {type:String, required: true},
    content: {type:String, required: true},
    coverImage: {type:String, required: true}
},{timestamps:true})

const Post = model('Post',PostSchema)

export default Post