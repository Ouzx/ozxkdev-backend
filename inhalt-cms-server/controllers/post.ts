import { Types } from "mongoose";
import { Request, Response } from "express";
import Post from "../models/post.js";

export const getPosts = async (req: Request, res: Response) => {
  // wait 2 seconds to simulate a slow connection
  // await new Promise((resolve) => setTimeout(resolve, 2000));
  const { id } = req.params;

  if (!id) return res.status(404).send(`No page with id: ${id}`);

  const page: number = +id + 1;
  const ITEMS_PER_PAGE = 5;
  try {
    const totalItems = await Post.find().countDocuments();

    // if (!totalItems) throw new Error("No posts found");

    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .skip((+page - 1) * ITEMS_PER_PAGE)
      .limit(ITEMS_PER_PAGE);

    res.status(200).json({ posts, totalItems });
  } catch (e) {
    if (e instanceof Error) {
      res.status(404).json({ message: e.message });
    } else res.status(500).json({ message: "Something went wrong" });
  }
};

export const getPost = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!Types.ObjectId.isValid(id)) throw new Error(`No post with id: ${id}`);

  try {
    const post = await Post.findById(id);
    res.status(200).json(post);
  } catch (e) {
    if (e instanceof Error) {
      res.status(404).json({ message: e.message });
    } else res.status(500).json({ message: "Something went wrong" });
  }
};

export const createPost = async (req: Request, res: Response) => {
  const { title, content, category, tags, coverImage, contentImages } =
    req.body;

  if (!title || !content || !category || !tags || !coverImage)
    throw new Error("Please fill all fields");

  const newPost = new Post({
    title,
    content,
    category,
    tags,
    coverImage,
  });
  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (e) {
    if (e instanceof Error) res.status(409).json({ message: e.message });
    else res.status(500).json({ message: "Something went wrong" });
  }
};

export const updatePost = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!Types.ObjectId.isValid(id)) throw new Error(`No post with id: ${id}`);

  const { title, content, category, tags, coverImage, contentImages } =
    req.body;

  if (!title || !content || !category || !tags || !coverImage)
    throw new Error("Please fill all fields");

  const updatedPost = { title, content, category, tags, coverImage, _id: id };
  try {
    await Post.findByIdAndUpdate(id, updatedPost, { new: true });
    res.json(updatedPost);
  } catch (e) {
    if (e instanceof Error) res.status(404).json({ message: e.message });
    else res.status(500).json({ message: "Something went wrong" });
  }
};

export const deletePost = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  try {
    await Post.findByIdAndRemove(id);
    res.json({ message: "Post deleted successfully." });
  } catch (e) {
    if (e instanceof Error) res.status(404).json({ message: e.message });
    else res.status(500).json({ message: "Something went wrong" });
  }
};

// via pagination
export const searchPosts = async (req: Request, res: Response) => {
  const { searchTerm, pageIndex } = req.params;
  const page: number = +pageIndex + 1;
  const ITEMS_PER_PAGE = 5;
  const title = new RegExp(searchTerm, "i");
  try {
    const totalItems = await Post.find({ $or: [{ title }] }).countDocuments();
    const posts = await Post.find({ $or: [{ title }] })
      .sort({ createdAt: -1 })
      .skip((+page - 1) * ITEMS_PER_PAGE)
      .limit(ITEMS_PER_PAGE);
    if (!posts.length) throw new Error("No posts found");
    res.status(200).json({ posts, totalItems });
  } catch (e) {
    if (e instanceof Error) {
      res.status(404).json({ message: e.message });
    } else res.status(500).json({ message: "Something went wrong" });
  }
};
