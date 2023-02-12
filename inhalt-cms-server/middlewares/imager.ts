import { Request, Response, NextFunction } from "express";
import multer, { FileFilterCallback } from "multer";

// file filter for images
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

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.cwd() + "/public/uploads/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      Date.now() +
        "-" +
        Math.round(Math.random() * 1e9) +
        file.originalname.replace(/\s+/g, "-")
    );
  },
});

// const upload = multer({ fileFilter, storage }).array("images", 12);
// export default function multerMiddleware(
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) {
//   upload(req, res, (err: any) => {
//     if (err instanceof multer.MulterError) return res.send({ status: err });
//     else if (err) return res.send({ status: err });

//     req.body.contentImages = (req.files as Express.Multer.File[]).map(
//       (file: any) => `${process.env.SERVER_URL}/uploads/${file.filename}`
//     );

//     if (req.body.fileUrls && req.body.fileUrls.length > 0)
//       req.body.coverImage = req.body.fileUrls.shift();

//     next();
//   });
// }
// TODO: Check multer file naming configuration
const uploadSingle = multer({ fileFilter, storage }).single("image");
export function multerMiddlewareSingle(
  req: Request,
  res: Response,
  next: NextFunction
) {
  uploadSingle(req, res, (err: any) => {
    if (err instanceof multer.MulterError) {
      // console.log(err);
      return res.send({ status: err });
    } else if (err) {
      // console.log(err);
      return res.send({ status: err });
    }
    req.body.image = `${process.env.SERVER_URL}/media/${
      (req.file as Express.Multer.File).filename
    }`;

    next();
  });
}
