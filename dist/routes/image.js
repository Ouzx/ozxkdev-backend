import { Router } from "express";
import { multerMiddlewareSingle } from "../middlewares/imager.js";
import cloudImageMiddleWare, { uploader } from "../middlewares/cloudinary.js";
import dotenv from "dotenv";
dotenv.config();
import { byFile } from "../controllers/image.js";
const router = Router();
if (process.env.IMAGE_MIDDLEWARE === "multer")
    router.post("/by-file", multerMiddlewareSingle, byFile);
else if (process.env.IMAGE_MIDDLEWARE === "CLOUDINARY")
    router.post("/by-file", uploader, cloudImageMiddleWare, byFile);
export default router;
//# sourceMappingURL=image.js.map