import { Request, Response } from "express";
import Post, { iPost } from "../models/post.js";
import User from "../models/user.js";

const GENERAL_SELECTOR = "-content -_id -__v -user";

export const getPosts = async (req: Request, res: Response) => {
  const { category, pageIndex } = req.params;

  try {
    if (!category) throw new Error(`No category with id: ${category}`);
    if (!pageIndex) throw new Error(`No page with id: ${pageIndex}`);

    const ITEMS_PER_PAGE = 5;

    let totalItems: number = 0;
    let posts: iPost[] = [];
    if (category.toLowerCase() === "all") {
      totalItems = await Post.find().countDocuments();
      posts = await Post.find()
        .select(GENERAL_SELECTOR)
        .sort({ createdAt: -1 })
        .skip((+pageIndex - 1) * ITEMS_PER_PAGE)
        .limit(ITEMS_PER_PAGE);
    } else {
      totalItems = await Post.find({ category: category }).countDocuments();
      posts = await Post.find({ category: category })
        .select(GENERAL_SELECTOR)
        .sort({ createdAt: -1 })
        .skip((+pageIndex - 1) * ITEMS_PER_PAGE)
        .limit(ITEMS_PER_PAGE);
    }

    res.status(200).json({ posts, totalItems });
  } catch (e) {
    if (e instanceof Error) {
      res.status(404).json({ message: e.message });
    } else res.status(500).json({ message: "Something went wrong" });
  }
};

export const getPost = async (req: Request, res: Response) => {
  const { category, slug } = req.params;

  try {
    if (!slug) throw new Error(`No post with slug: ${slug}`);
    if (!category) throw new Error(`No category with id: ${category}`);

    const post = await Post.findOne({ slug, category }).select("-__v -_id");

    const previousPost = await Post.findOne({
      createdAt: { $lt: post?.createdAt },
    }).select("slug");

    const nextPost = await Post.findOne({
      createdAt: { $gt: post?.createdAt },
    }).select("slug");

    const relatedPosts = await Post.find({
      category: post?.category,
      _id: { $ne: post?._id },
    })
      .select(GENERAL_SELECTOR)
      .sort({ createdAt: -1 })
      .limit(3);

    // get user name
    const user = await User.findById(post?.user).select("name");

    // create deep copy of post
    const postCopy = JSON.parse(JSON.stringify(post));
    postCopy.author = user?.name;

    res.status(200).json({
      post: postCopy,
      relatedPosts,
      previousPost,
      nextPost,
    });
  } catch (e) {
    if (e instanceof Error) {
      res.status(404).json({ message: e.message });
    } else res.status(500).json({ message: "Something went wrong" });
  }
};

export const searchPosts = async (req: Request, res: Response) => {
  const { pageIndex, searchTerm } = req.params;
  try {
    if (!searchTerm) throw new Error(`No search term: ${searchTerm}`);
    if (!pageIndex) throw new Error(`No page with id: ${pageIndex}`);

    const decodedSearchTerm = decodeURIComponent(searchTerm);

    const ITEMS_PER_PAGE = 5;

    const totalItems = await Post.find({
      $text: { $search: decodedSearchTerm },
    }).countDocuments();

    const posts = await Post.find({ $text: { $search: decodedSearchTerm } })
      .select(GENERAL_SELECTOR)
      .sort({ createdAt: -1 })
      .skip((+pageIndex - 1) * ITEMS_PER_PAGE)
      .limit(ITEMS_PER_PAGE);

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
