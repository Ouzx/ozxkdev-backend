import { multerMiddlewareSingle } from "./imager.js";
import cloudImageMiddleWare from "./cloud-imager.js";
const SELECTED_MIDDLEWARE = process.env.IMAGE_MIDDLEWARE || "multer";
function imageMiddleWare(req, res, next) {
    if (SELECTED_MIDDLEWARE === "multer") {
        return multerMiddlewareSingle(req, res, next);
    }
    else if (SELECTED_MIDDLEWARE === "cloudinary") {
        return cloudImageMiddleWare(req, res, next);
    }
}
//# sourceMappingURL=index.js.map