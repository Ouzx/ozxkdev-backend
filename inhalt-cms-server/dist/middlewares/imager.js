import multer from "multer";
const fileFilter = (req, file, cb) => {
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
export default function multerMiddleware(req, res, next) {
    upload(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            // A Multer error occurred when uploading.
            res.send({ status: err });
        }
        else if (err) {
            // An unknown error occurred when uploading.
            res.send({ status: err });
        }
        // Everything went fine.
        req.body.fileUrls = req.files.map((file) => `${process.env.SERVER_URL}/uploads/${file.filename}`);
        next();
    });
}
//# sourceMappingURL=imager.js.map