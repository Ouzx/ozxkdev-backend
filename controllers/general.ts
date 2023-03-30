import { Request, Response } from "express";
import Post, { iPost } from "../models/post.js";
import User from "../models/user.js";
import _ from "lodash";

const GENERAL_SELECTOR = "-content -_id -__v";
const ITEMS_PER_PAGE = 5;

export const getPosts = async (req: Request, res: Response) => {
  const { category, pageIndex } = req.params;

  try {
    if (!category) throw new Error(`No category with id: ${category}`);
    if (!pageIndex) throw new Error(`No page with id: ${pageIndex}`);

    if (isNaN(+pageIndex) || +pageIndex < 1)
      throw new Error(`Invalid page index: ${pageIndex}`);

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

    // deep copy posts
    const postsCopy = JSON.parse(JSON.stringify(posts));

    // get user names
    const userIds = postsCopy.map((post: iPost) => post.user);
    const users = await User.find({ _id: { $in: userIds } }).select("name");

    // create an object where the keys are user ids and the values are user names
    const userNames: { [key: string]: string } = {};
    users.forEach((user) => {
      userNames[user._id.toString()] = user.name;
    });

    // add user names to posts
    postsCopy.forEach((_post: any) => {
      const authorName = userNames[_post.user];
      if (authorName) {
        _post.author = authorName;
      }
      delete _post._id;
      delete _post.user;
    });

    res.status(200).json({ posts: postsCopy, totalItems });
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

    const post = await Post.findOne({ slug, category }).select("-__v");

    const previousPost = await Post.findOne({
      createdAt: { $lte: post?.createdAt },
      _id: { $ne: post?._id },
    }).select("slug category");

    const nextPost = await Post.findOne({
      createdAt: { $gt: post?.createdAt },
      _id: { $ne: post?._id },
    }).select("slug category");

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
    delete postCopy._id;

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
    if (!searchTerm) throw new Error(`No search term: ${searchTerm}`);
    if (!pageIndex) throw new Error(`No page with id: ${pageIndex}`);

    if (isNaN(+pageIndex) || +pageIndex < 1)
      throw new Error(`Invalid page index: ${pageIndex}`);

    if (searchTerm.length < minChars)
      throw new Error(
        `Search term must be at least ${minChars} characters long`
      );

    const totalItems = await Post.countDocuments(searchPostsByTerm(searchTerm));

    const posts = await Post.find(searchPostsByTerm(searchTerm))
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
