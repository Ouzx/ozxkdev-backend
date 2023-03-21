import { Request, Response, NextFunction } from "express";
import multer, { FileFilterCallback } from "multer";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const _multer = multer({
  storage: multer.diskStorage({}),
  fileFilter,
  limits: { fileSize: 5000000 },
}).single("image");

export const uploader = (req: Request, res: Response, next: NextFunction) => {
  _multer(req, res, (err) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ message: err.message });
    }
    next();
  });
};

export default async function cloudImageMiddleWare(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const file = req.file;
    console.log(file);
    if (!file) {
      return next();
    }

    const result = await cloudinary.uploader.upload(file.path);
    req.body.image = result.secure_url;
  } catch (err) {
    console.log(err);
  } finally {
    next();
  }
}
