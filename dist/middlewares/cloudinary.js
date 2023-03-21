var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg") {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
};
const _multer = multer({
    storage: multer.diskStorage({}),
    fileFilter,
    limits: { fileSize: 5000000 },
}).single("image");
export const uploader = (req, res, next) => {
    _multer(req, res, (err) => {
        if (err) {
            console.log(err);
            return res.status(400).json({ message: err.message });
        }
        next();
    });
};
export default function cloudImageMiddleWare(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const file = req.file;
            if (!file) {
                return next();
            }
            // console.log(file);
            const result = yield cloudinary.uploader.upload(file.path);
            req.body.image = result.secure_url;
        }
        catch (err) {
            console.log(err);
        }
        finally {
            next();
        }
    });
}
//# sourceMappingURL=cloudinary.js.map