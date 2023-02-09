import { Router } from "express";

import {
  getPosts,
  getPost,
  searchPosts,
  getCategories,
} from "../controllers/general.js";

const router = Router();

router.get("/page/:category/:pageIndex", getPosts);
router.get("/post/:slug", getPost);
router.get("/search/:searchTerm/:pageIndex", searchPosts);
router.get("/categories", getCategories);

export default router;
