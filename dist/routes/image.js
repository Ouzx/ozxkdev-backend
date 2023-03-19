import { Router } from "express";
import { multerMiddlewareSingle } from "../middlewares/imager.js";
import { byFile } from "../controllers/image.js";
const router = Router();
router.post("/by-file", multerMiddlewareSingle, byFile);
export default router;
//# sourceMappingURL=image.js.map