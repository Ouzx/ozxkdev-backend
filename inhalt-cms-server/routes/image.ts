import { Router } from "express";
import { multerMiddlewareSingle } from "../middlewares/imager.js";

import { byFile, byURL } from "../controllers/image.js";

const router = Router();

router.post("/by-file", multerMiddlewareSingle, byFile);
router.post("/by-url", multerMiddlewareSingle, byURL);

export default router;
