import { Types } from "mongoose";
import { Request, Response } from "express";
import Post, { iPost } from "../models/post.js";
var _ = require("lodash");

const ITEMS_PER_PAGE = 5;

export const getPosts = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    if (!id) throw `No page with id: ${id}`;

    const totalItems = await Post.find().countDocuments();

    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .skip((+id - 1) * ITEMS_PER_PAGE)
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

  try {
    if (!Types.ObjectId.isValid(id)) throw new Error(`No post with id: ${id}`);

    const post = await Post.findById(id);
    res.status(200).json(post);
  } catch (e) {
    if (e instanceof Error) {
      res.status(404).json({ message: e.message });
    } else res.status(500).json({ message: "Something went wrong" });
  }
};

export const createPost = async (req: Request, res: Response) => {
  try {
    const { _id, ...post } = req.body as iPost;

    if (
      !post.title ||
      !post.content ||
      !post.category ||
      !post.tags ||
      !post.thumbnail ||
      !post.shortContent
    ) {
      throw new Error("Please fill all fields");
    }

    let existingPost = await Post.findOne({ title: post.title });

    if (existingPost) {
      const title = post.title;
      let num = 1;

      while (true) {
        const newTitle = `${title} #${num}`;
        const checkPost = await Post.findOne({ title: newTitle });

        if (!checkPost) {
          post.title = newTitle;
          break;
        }

        num++;
      }
    }

    const newPost = new Post(post);
    await newPost.save();

    res.status(201).json(newPost);
  } catch (e) {
    if (e instanceof Error) {
      res.status(409).json({ message: e.message });
    } else {
      res.status(500).json({ message: "Something went wrong" });
    }
  }
};

export const updatePost = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    if (!Types.ObjectId.isValid(id)) throw new Error(`No post with id: ${id}`);

    const post: iPost = req.body;
    if (
      !post.title ||
      !post.content ||
      !post.category ||
      !post.tags ||
      !post.thumbnail
    )
      throw new Error("Please fill all fields");

    post.category = encodeURIComponent(post.category);
    post.tags = post.tags.map((tag) => encodeURIComponent(tag));

    post.updatedAt = new Date();

    await Post.findByIdAndUpdate(id, post, { new: true });
    res.json(post);
  } catch (e) {
    if (e instanceof Error) res.status(404).json({ message: e.message });
    else res.status(500).json({ message: "Something went wrong" });
  }
};

export const deletePost = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    if (!Types.ObjectId.isValid(id)) throw `No post with id: ${id}`;
    await Post.findByIdAndRemove(id);
    res.json({ message: "Post deleted successfully." });
  } catch (e) {
    if (e instanceof Error) res.status(404).json({ message: e.message });
    else res.status(500).json({ message: "Something went wrong" });
  }
};

const searchPostsByTerm = (searchTerm: string) => {
  var safeSearchTerm = _.escapeRegExp(searchTerm);

  const regexSearchTerm = new RegExp(safeSearchTerm, "i");

  return {
    $or: [
      { title: regexSearchTerm },
      { body: regexSearchTerm },
      { tags: { $in: [regexSearchTerm] } },
      { category: regexSearchTerm },
    ],
  };
};

const minChars = 3;
export const searchPosts = async (req: Request, res: Response) => {
  const { pageIndex, searchTerm } = req.params;

  try {
    if (!searchTerm) throw new Error("Please enter a search term");
    if (!pageIndex) throw new Error("Please enter a page index");

    if (searchTerm.length < minChars)
      throw new Error(
        `Search term must be at least ${minChars} characters long`
      );

    const totalItems = await Post.find(
      searchPostsByTerm(searchTerm)
    ).countDocuments();

    const posts = await Post.find(searchPostsByTerm(searchTerm))
      .skip((+pageIndex - 1) * ITEMS_PER_PAGE)
      .limit(ITEMS_PER_PAGE);

    if (!posts.length) throw new Error("No posts found");
    res.status(200).json({ posts, totalItems });
  } catch (e) {
    if (e instanceof Error) {
      res.status(404).json({ message: e.message });
    } else res.status(500).json({ message: "Something went wrong" });
  }
};
