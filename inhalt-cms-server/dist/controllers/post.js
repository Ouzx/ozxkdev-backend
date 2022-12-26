var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Types } from "mongoose";
import Post from "../models/post.js";
export const getPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // wait 2 seconds to simulate a slow connection
    // await new Promise((resolve) => setTimeout(resolve, 2000));
    const { id } = req.params;
    const page = +id + 1;
    const ITEMS_PER_PAGE = 5;
    try {
        const totalItems = yield Post.find().countDocuments();
        const posts = yield Post.find()
            .sort({ createdAt: -1 })
            .skip((+page - 1) * ITEMS_PER_PAGE)
            .limit(ITEMS_PER_PAGE);
        res.status(200).json({ posts, totalItems });
    }
    catch (e) {
        if (e instanceof Error) {
            res.status(404).json({ message: e.message });
        }
        else
            res.status(500).json({ message: "Something went wrong" });
    }
});
export const getPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const post = yield Post.findById(id);
        res.status(200).json(post);
    }
    catch (e) {
        if (e instanceof Error) {
            res.status(404).json({ message: e.message });
        }
        else
            res.status(500).json({ message: "Something went wrong" });
    }
});
export const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, content, category, tags, coverImage } = req.body;
    const newPost = new Post({
        title,
        content,
        category,
        tags,
        // coverImage,
    });
    try {
        yield newPost.save();
        res.status(201).json(newPost);
    }
    catch (e) {
        if (e instanceof Error)
            res.status(409).json({ message: e.message });
        else
            res.status(500).json({ message: "Something went wrong" });
    }
});
export const updatePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { title, content, category, tags, coverImage } = req.body;
    if (!Types.ObjectId.isValid(id))
        return res.status(404).send(`No post with id: ${id}`);
    const updatedPost = { title, content, category, tags, coverImage, _id: id };
    yield Post.findByIdAndUpdate(id, updatedPost, { new: true });
    res.json(updatedPost);
});
export const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!Types.ObjectId.isValid(id))
        return res.status(404).send(`No post with id: ${id}`);
    yield Post.findByIdAndRemove(id);
    res.json({ message: "Post deleted successfully." });
});
// via pagination
export const searchPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm, pageIndex } = req.params;
    const page = +pageIndex + 1;
    const ITEMS_PER_PAGE = 5;
    const title = new RegExp(searchTerm, "i");
    try {
        const totalItems = yield Post.find({ $or: [{ title }] }).countDocuments();
        const posts = yield Post.find({ $or: [{ title }] })
            .sort({ createdAt: -1 })
            .skip((+page - 1) * ITEMS_PER_PAGE)
            .limit(ITEMS_PER_PAGE);
        if (!posts.length)
            throw new Error("No posts found");
        res.status(200).json({ posts, totalItems });
    }
    catch (e) {
        if (e instanceof Error) {
            res.status(404).json({ message: e.message });
        }
        else
            res.status(500).json({ message: "Something went wrong" });
    }
});
//# sourceMappingURL=post.js.map