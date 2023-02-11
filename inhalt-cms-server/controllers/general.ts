import { Types } from "mongoose";
import { Request, Response } from "express";
import Post, { iPost } from "../models/post.js";

export const getPosts = async (req: Request, res: Response) => {
  const { category, pageIndex } = req.params;

  try {
    if (!category) throw new Error(`No category with id: ${category}`);
    if (!pageIndex) throw new Error(`No page with id: ${pageIndex}`);

    const page: number = +pageIndex + 1;
    const ITEMS_PER_PAGE = 5;

    let totalItems: number = 0;

    let posts: iPost[] = [];
    // TODO: Make category case insensitive
    if (category.toLowerCase() === "all") {
      totalItems = await Post.find().countDocuments();
      posts = await Post.find()
        .sort({ createdAt: -1 })
        .skip((+page - 1) * ITEMS_PER_PAGE)
        .limit(ITEMS_PER_PAGE);
    } else {
      totalItems = await Post.find({ category: category }).countDocuments();
      posts = await Post.find({ category: category })
        .sort({ createdAt: -1 })
        .skip((+page - 1) * ITEMS_PER_PAGE)
        .limit(ITEMS_PER_PAGE);
    }
    posts.forEach((post) => {
      post.content = "";
      post.raw = "";
    });

    res.status(200).json({ posts, totalItems });
  } catch (e) {
    if (e instanceof Error) {
      res.status(404).json({ message: e.message });
    } else res.status(500).json({ message: "Something went wrong" });
  }
};

export const getPost = async (req: Request, res: Response) => {
  const { slug } = req.params;

  try {
    if (!slug) throw new Error(`No post with slug: ${slug}`);

    const post = await Post.find({ urlSuffix: slug });
    const previousPost = await Post.findOne({
      createdAt: { $lt: post[0].createdAt },
    });

    const nextPost = await Post.findOne({
      createdAt: { $gt: post[0].createdAt },
    });

    const relatedPosts = await Post.find({
      category: post[0].category,
      _id: { $ne: post[0]._id },
    })
      .sort({ createdAt: -1 })
      .limit(3);

    post.forEach((post) => {
      post.raw = "";
    });

    relatedPosts.forEach((post) => {
      post.content = "";
      post.raw = "";
    });

    const prevPost = previousPost?.urlSuffix;
    const nexPost = nextPost?.urlSuffix;
    res.status(200).json({
      post: post[0],
      relatedPosts,
      prevPost,
      nexPost,
    });
  } catch (e) {
    if (e instanceof Error) {
      res.status(404).json({ message: e.message });
    } else res.status(500).json({ message: "Something went wrong" });
  }
};

// TODO: Move search term to body
export const searchPosts = async (req: Request, res: Response) => {
  const { searchTerm, pageIndex } = req.params;

  try {
    if (!searchTerm) throw new Error(`No search term: ${searchTerm}`);
    if (!pageIndex) throw new Error(`No page with id: ${pageIndex}`);

    const page: number = +pageIndex + 1;
    const ITEMS_PER_PAGE = 5;

    const totalItems = await Post.find().countDocuments();

    const posts = await Post.find({ $text: { $search: searchTerm } })
      .sort({ createdAt: -1 })
      .skip((+page - 1) * ITEMS_PER_PAGE)
      .limit(ITEMS_PER_PAGE);

    posts.forEach((post) => {
      post.content = "";
    });

    res.status(200).json({ posts, totalItems });
  } catch (e) {
    if (e instanceof Error) {
      res.status(404).json({ message: e.message });
    } else res.status(500).json({ message: "Something went wrong" });
  }
};

export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await Post.find().distinct("category");

    res.status(200).json(categories);
  } catch (e) {
    if (e instanceof Error) {
      res.status(404).json({ message: e.message });
    } else res.status(500).json({ message: "Something went wrong" });
  }
};
