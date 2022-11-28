"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const postSchema = new mongoose_1.Schema({
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
const Post = (0, mongoose_1.model)("Post", postSchema);
exports.default = Post;
