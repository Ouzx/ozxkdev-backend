import multer from "multer";
// file filter for images
const fileFilter = (req, file, cb) => {
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
const uploadSingle = multer({ fileFilter, storage }).single("image");
export function multerMiddlewareSingle(req, res, next) {
  uploadSingle(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      console.log(err);
      return res.send({ status: err });
    } else if (err) {
      console.log(err);
      return res.send({ status: err });
    }
    req.body.image = `${process.env.SERVER_URL}/media/${req.file.filename}`;
    next();
  });
}
//# sourceMappingURL=imager.js.map
