var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { Types } from "mongoose";
import Post from "../models/post.js";
import _ from "lodash";
const ITEMS_PER_PAGE = 10;
export const getPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: pageIndex } = req.params;
    try {
        if (!pageIndex)
            throw `No page with id: ${pageIndex}`;
        if (isNaN(+pageIndex) || +pageIndex < 1)
            throw new Error(`Invalid page index: ${pageIndex}`);
        const totalItems = yield Post.find().countDocuments();
        const posts = yield Post.find()
            .sort({ createdAt: -1 })
            .skip((+pageIndex - 1) * ITEMS_PER_PAGE)
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
        if (!Types.ObjectId.isValid(id))
            throw new Error(`No post with id: ${id}`);
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
    try {
        const _a = req.body, { _id } = _a, post = __rest(_a, ["_id"]);
        if (!post.title ||
            !post.content ||
            !post.category ||
            !post.tags ||
            !post.thumbnail ||
            !post.shortContent) {
            throw new Error("Please fill all fields");
        }
        let existingPost = yield Post.findOne({ title: post.title });
        if (existingPost) {
            const title = post.title;
            let num = 1;
            while (true) {
                const newTitle = `${title} #${num}`;
                const checkPost = yield Post.findOne({ title: newTitle });
                if (!checkPost) {
                    post.title = newTitle;
                    break;
                }
                num++;
            }
        }
        const newPost = new Post(post);
        yield newPost.save();
        res.status(201).json(newPost);
    }
    catch (e) {
        if (e instanceof Error) {
            res.status(409).json({ message: e.message });
        }
        else {
            res.status(500).json({ message: "Something went wrong" });
        }
    }
});
export const updatePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        if (!Types.ObjectId.isValid(id))
            throw new Error(`No post with id: ${id}`);
        const post = req.body;
        if (!post.title ||
            !post.content ||
            !post.category ||
            !post.tags ||
            !post.thumbnail)
            throw new Error("Please fill all fields");
        post.updatedAt = new Date();
        const updatedPost = yield Post.findByIdAndUpdate(id, post, {
            new: true,
        }).lean();
        res.json(updatedPost);
    }
    catch (e) {
        if (e instanceof Error)
            res.status(404).json({ message: e.message });
        else
            res.status(500).json({ message: "Something went wrong" });
    }
});
export const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        if (!Types.ObjectId.isValid(id))
            throw `No post with id: ${id}`;
        const removedPost = yield Post.findByIdAndRemove(id);
        res.json(removedPost);
    }
    catch (e) {
        if (e instanceof Error)
            res.status(404).json({ message: e.message });
        else
            res.status(500).json({ message: "Something went wrong" });
    }
});
const searchPostsByTerm = (searchTerm) => {
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
export const searchPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { pageIndex, searchTerm } = req.params;
    try {
        if (!searchTerm)
            throw new Error("Please enter a search term");
        if (!pageIndex)
            throw new Error("Please enter a page index");
        if (isNaN(+pageIndex) || +pageIndex < 1)
            throw new Error(`Invalid page index: ${pageIndex}`);
        if (searchTerm.length < minChars)
            throw new Error(`Search term must be at least ${minChars} characters long`);
        const totalItems = yield Post.find(searchPostsByTerm(searchTerm)).countDocuments();
        const posts = yield Post.find(searchPostsByTerm(searchTerm))
            .skip((+pageIndex - 1) * ITEMS_PER_PAGE)
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