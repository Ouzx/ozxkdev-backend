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
import User from "../models/user.js";
import _ from "lodash";
const GENERAL_SELECTOR = "-content -_id -__v";
const ITEMS_PER_PAGE = 5;
export const getPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { category, pageIndex } = req.params;
    try {
        if (!category)
            throw new Error(`No category with id: ${category}`);
        if (!pageIndex)
            throw new Error(`No page with id: ${pageIndex}`);
        if (isNaN(+pageIndex) || +pageIndex < 1)
            throw new Error(`Invalid page index: ${pageIndex}`);
        let totalItems = 0;
        let posts = [];
        // exclude the non shared posts
        if (category.toLowerCase() === "all") {
            totalItems = yield Post.find().countDocuments();
            posts = yield Post.find({
                shared: true,
            })
                .select(GENERAL_SELECTOR)
                .sort({ createdAt: -1 })
                .skip((+pageIndex - 1) * ITEMS_PER_PAGE)
                .limit(ITEMS_PER_PAGE);
        }
        else {
            totalItems = yield Post.find({
                category: category,
                shared: true,
            }).countDocuments();
            posts = yield Post.find({ category: category, shared: true })
                .select(GENERAL_SELECTOR)
                .sort({ createdAt: -1 })
                .skip((+pageIndex - 1) * ITEMS_PER_PAGE)
                .limit(ITEMS_PER_PAGE);
        }
        // deep copy posts
        const postsCopy = JSON.parse(JSON.stringify(posts));
        // get user names
        const userIds = postsCopy.map((post) => post.user);
        const users = yield User.find({ _id: { $in: userIds } }).select("name");
        // create an object where the keys are user ids and the values are user names
        const userNames = {};
        users.forEach((user) => {
            userNames[user._id.toString()] = user.name;
        });
        // add user names to posts
        postsCopy.forEach((_post) => {
            const authorName = userNames[_post.user];
            if (authorName) {
                _post.author = authorName;
            }
            delete _post._id;
            delete _post.user;
        });
        res.status(200).json({ posts: postsCopy, totalItems });
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
    const { category, slug } = req.params;
    try {
        if (!slug)
            throw new Error(`No post with slug: ${slug}`);
        if (!category)
            throw new Error(`No category with id: ${category}`);
        const post = yield Post.findOne({
            slug,
            category,
            shared: true,
        }).select("-__v");
        const _previousPost = yield Post.find({
            createdAt: { $lte: post === null || post === void 0 ? void 0 : post.createdAt },
            _id: { $ne: post === null || post === void 0 ? void 0 : post._id },
            shared: true,
        })
            .select("slug category")
            .sort({ createdAt: -1 })
            .limit(1);
        const previousPost = _previousPost[0];
        const _nextPost = yield Post.find({
            createdAt: { $gte: post === null || post === void 0 ? void 0 : post.createdAt },
            _id: { $ne: post === null || post === void 0 ? void 0 : post._id },
            shared: true,
        })
            .select("slug category")
            .sort({ createdAt: -1 })
            .limit(1);
        const nextPost = _nextPost[0];
        const relatedPosts = yield Post.find({
            category: post === null || post === void 0 ? void 0 : post.category,
            _id: { $ne: post === null || post === void 0 ? void 0 : post._id },
            shared: true,
        })
            .select(GENERAL_SELECTOR)
            .sort({ createdAt: -1 })
            .limit(3);
        // get user name
        const user = yield User.findById(post === null || post === void 0 ? void 0 : post.user).select("name");
        // create deep copy of post
        const postCopy = JSON.parse(JSON.stringify(post));
        postCopy.author = user === null || user === void 0 ? void 0 : user.name;
        delete postCopy._id;
        res.status(200).json({
            post: postCopy,
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
const searchPostsByTerm = (searchTerm) => {
    var safeSearchTerm = _.escapeRegExp(searchTerm);
    const regexSearchTerm = new RegExp(safeSearchTerm, "i");
    return {
        $or: [
            { title: regexSearchTerm },
            { body: regexSearchTerm },
            { tags: { $in: [regexSearchTerm] } },
            { category: regexSearchTerm },
            { shared: true },
        ],
    };
};
const minChars = 3;
export const searchPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { pageIndex, searchTerm } = req.params;
    try {
        if (!searchTerm)
            throw new Error(`No search term: ${searchTerm}`);
        if (!pageIndex)
            throw new Error(`No page with id: ${pageIndex}`);
        if (isNaN(+pageIndex) || +pageIndex < 1)
            throw new Error(`Invalid page index: ${pageIndex}`);
        if (searchTerm.length < minChars)
            throw new Error(`Search term must be at least ${minChars} characters long`);
        const totalItems = yield Post.countDocuments(searchPostsByTerm(searchTerm));
        const posts = yield Post.find(searchPostsByTerm(searchTerm))
            .select(GENERAL_SELECTOR)
            .sort({ createdAt: -1 })
            .skip((+pageIndex - 1) * ITEMS_PER_PAGE)
            .limit(ITEMS_PER_PAGE);
        // deep copy posts
        const postsCopy = JSON.parse(JSON.stringify(posts));
        // get user names
        const userIds = postsCopy.map((post) => post.user);
        const users = yield User.find({ _id: { $in: userIds } }).select("name");
        // create an object where the keys are user ids and the values are user names
        const userNames = {};
        users.forEach((user) => {
            userNames[user._id.toString()] = user.name;
        });
        // add user names to posts
        postsCopy.forEach((_post) => {
            const authorName = userNames[_post.user];
            if (authorName) {
                _post.author = authorName;
            }
            delete _post._id;
            delete _post.user;
        });
        res.status(200).json({ posts: postsCopy, totalItems });
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
        const categories = yield Post.find({ shared: true }).distinct("category");
        res.status(200).json(categories);
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