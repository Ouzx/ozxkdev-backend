import { Document, Schema, model } from "mongoose";

export interface iPost extends Document {
  title: string;
  content: string;
  category: string;
  tags?: string[] | null;
  coverImage: string;
  createdAt: Date;
  updatedAt: Date;
}

const postSchema = new Schema<iPost>({
  title: String,
  content: String,
  category: String,
  tags: [String],
  coverImage: String,
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
