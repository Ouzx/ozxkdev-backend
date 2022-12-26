import { Schema, model } from "mongoose";
const postSchema = new Schema({
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
const Post = model("Post", postSchema);
export default Post;
//# sourceMappingURL=post.js.map