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
  destination: (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, destination: string) => void
  ) => {
    cb(null, "public/assets");
  },
  filename: (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, filename: string) => void
  ) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage, fileFilter: fileFilter }).array(
  "images",
  12
);

export default function multerMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  upload(req, res, (err: any) => {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      res.send({ status: "error" });
    } else if (err) {
      // An unknown error occurred when uploading.
      res.send({ status: "error" });
    }
    // Everything went fine.
    req.body.fileUrls = (req.files as Express.Multer.File[]).map(
      (file: any) => `${process.env.SERVER_URL}/assets/${file.filename}`
    );

    console.log(req.body.fileUrls);
    next();
  });
}
