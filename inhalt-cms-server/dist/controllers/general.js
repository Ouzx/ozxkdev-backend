var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Post from "../models/post.js";
export const getPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { category, pageIndex } = req.params;
    try {
        if (!category)
            throw new Error(`No category with id: ${category}`);
        if (!pageIndex)
            throw new Error(`No page with id: ${pageIndex}`);
        const page = +pageIndex + 1;
        const ITEMS_PER_PAGE = 5;
        const totalItems = yield Post.find().countDocuments();
        let posts = [];
        // TODO: Make category case insensitive
        if (category.toLowerCase() === "all") {
            posts = yield Post.find()
                .sort({ createdAt: -1 })
                .skip((+page - 1) * ITEMS_PER_PAGE)
                .limit(ITEMS_PER_PAGE);
        }
        else {
            posts = yield Post.find({ category: category })
                .sort({ createdAt: -1 })
                .skip((+page - 1) * ITEMS_PER_PAGE)
                .limit(ITEMS_PER_PAGE);
        }
        posts.forEach((post) => {
            post.content = "";
        });
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
    const { slug } = req.params;
    try {
        if (!slug)
            throw new Error(`No post with slug: ${slug}`);
        const post = yield Post.find({ urlSuffix: slug });
        const previousPost = yield Post.find({
            createdAt: { $lt: post[0].createdAt },
        })
            .sort({ createdAt: -1 })
            .limit(1);
        const nextPost = yield Post.find({
            createdAt: { $gt: post[0].createdAt },
        })
            .sort({ createdAt: 1 })
            .limit(1);
        const relatedPosts = yield Post.find({
            category: post[0].category,
            _id: { $ne: post[0]._id },
        })
            .sort({ createdAt: -1 })
            .limit(3);
        relatedPosts.forEach((post) => {
            post.content = "";
        });
        previousPost.forEach((post) => {
            post.content = "";
        });
        nextPost.forEach((post) => {
            post.content = "";
        });
        res.status(200).json({
            post: post[0],
            relatedPosts,
            previousPost,
            nextPost,
        });
    }
    catch (e) {
        if (e instanceof Error) {
            res.status(404).json({ message: e.message });
        }
        else
            res.status(500).json({ message: "Something went wrong" });
    }
});
export const searchPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm, pageIndex } = req.params;
    try {
        if (!searchTerm)
            throw new Error(`No search term: ${searchTerm}`);
        if (!pageIndex)
            throw new Error(`No page with id: ${pageIndex}`);
        const page = +pageIndex + 1;
        const ITEMS_PER_PAGE = 5;
        const totalItems = yield Post.find().countDocuments();
        const posts = yield Post.find({ $text: { $search: searchTerm } })
            .sort({ createdAt: -1 })
            .skip((+page - 1) * ITEMS_PER_PAGE)
            .limit(ITEMS_PER_PAGE);
        posts.forEach((post) => {
            post.content = "";
        });
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
export const getCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield Post.find().distinct("category");
        res.status(200).json({ categories });
    }
    catch (e) {
        if (e instanceof Error) {
            res.status(404).json({ message: e.message });
        }
        else
            res.status(500).json({ message: "Something went wrong" });
    }
});
//# sourceMappingURL=general.js.map