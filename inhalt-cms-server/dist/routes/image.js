import { Router } from "express";
import { multerMiddlewareSingle } from "../middlewares/imager.js";
import { byFile, byURL } from "../controllers/image.js";
const router = Router();
router.post("/by-file", multerMiddlewareSingle, byFile);
router.post("/by-url", byURL);
export default router;
//# sourceMappingURL=image.js.map