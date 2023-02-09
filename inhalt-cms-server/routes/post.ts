import { Router } from "express";

import {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  searchPosts,
} from "../controllers/post.js";

const router = Router();

router.get("/page/:id", getPosts);
router.get("/:id", getPost);
router.post("/", createPost);
router.patch("/:id", updatePost);
router.delete("/:id", deletePost);
router.get("/search/:searchTerm/:pageIndex", searchPosts);

export default router;
