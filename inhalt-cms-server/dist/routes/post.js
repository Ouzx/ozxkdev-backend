import { Router } from "express";
import { multerMiddlewareSingle } from "../middlewares/imager.js";
import { getPosts, getPost, createPost, updatePost, deletePost, searchPosts, } from "../controllers/post.js";
const router = Router();
router.get("/page/:id", getPosts);
router.get("/:id", getPost);
router.post("/", multerMiddlewareSingle, createPost);
router.patch("/:id", multerMiddlewareSingle, updatePost);
router.delete("/:id", deletePost);
router.get("/search/:searchTerm/:pageIndex", searchPosts);
export default router;
//# sourceMappingURL=post.js.map