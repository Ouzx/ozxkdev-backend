import multer from "multer";
const fileFilter = (req, file, cb) => {
    // Only accept image files
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
        return cb(null, false);
    }
    cb(null, true);
};
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/assets");
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name);
    },
});
const upload = multer({ storage: storage, fileFilter: fileFilter }).array("images", 12);
export default function multerMiddleware(req, res, next) {
    upload(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            // A Multer error occurred when uploading.
            res.send({ status: "error" });
        }
        else if (err) {
            // An unknown error occurred when uploading.
            res.send({ status: "error" });
        }
        // Everything went fine.
        req.body.fileUrls = req.files.map((file) => `${process.env.SERVER_URL}/assets/${file.filename}`);
        next();
    });
}
