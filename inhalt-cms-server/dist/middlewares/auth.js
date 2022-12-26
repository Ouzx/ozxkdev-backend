var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import jwt from "jsonwebtoken";
import User from "../models/user.js";
export const verifyToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        if (!token)
            return res.status(401).json({ message: "Unauthorized" });
        const secret = process.env.JWT_SECRET;
        if (!secret)
            throw new Error("JWT_SECRET is not defined");
        const decoded = jwt.verify(token, secret);
        const _data = decoded;
        const user = yield User.findById(_data.id).select("-password");
        if (!user)
            return res.status(404).json({ message: "User not found" });
        req.body.user = user;
        // console.log(req.body.user);
        next();
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(409).json({ message: error.message });
        }
        else
            res.status(500).json({ message: "Something went wrong" });
    }
});
//# sourceMappingURL=auth.js.map