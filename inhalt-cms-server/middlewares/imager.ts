import { Request, Response, NextFunction } from "express";
import multer, { FileFilterCallback } from "multer";

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  // Only accept image files
  if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
    return cb(null, false);
  }
  cb(null, true);
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.cwd() + "/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname.replace(/\s+/g, "-"));
  },
});

const upload = multer({ fileFilter: fileFilter, storage }).array("images", 12);

export default function multerMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  upload(req, res, (err: any) => {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      res.send({ status: err });
    } else if (err) {
      // An unknown error occurred when uploading.
      res.send({ status: err });
    }
    // Everything went fine.
    req.body.fileUrls = (req.files as Express.Multer.File[]).map(
      (file: any) => `${process.env.SERVER_URL}/uploads/${file.filename}`
    );

    next();
  });
}
