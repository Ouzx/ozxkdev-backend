import mongoose, { Document, Schema, model } from "mongoose";
import User from "./user.js";

export interface iPost extends Document {
  title: string;
  content: string;
  category: string;
  tags?: string[] | null;
  thumbnail: string;
  shared: boolean;
  slug: string;
  keyword: string;
  shortContent: string;
  createdAt: Date;
  updatedAt: Date;
  user: typeof User;
}

const postSchema = new Schema<iPost>({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
  },
  content: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
  },
  thumbnail: {
    type: String,
    required: true,
  },
  shared: {
    type: Boolean,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  keyword: {
    type: String,
    required: true,
  },
  shortContent: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 100,
  },
  user: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  updatedAt: {
    type: Date,
    default: new Date(),
  },
});

const Post = model("Post", postSchema);

export default Post;
