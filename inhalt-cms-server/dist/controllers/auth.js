var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
/* Register */
export const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, name, surname, email, password } = req.body;
        const salt = yield bcrypt.genSalt(10);
        const hashedPassword = yield bcrypt.hash(password, salt);
        const newUser = new User({
            username,
            name,
            surname,
            email,
            password: hashedPassword,
        });
        const user = yield newUser.save();
        res.status(201).json(user);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(409).json({ message: error.message });
        }
        else
            res.status(500).json({ message: "Something went wrong" });
    }
});
/* Login */
export const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const user = yield User.findOne({ username });
        if (!user)
            return res.status(404).json({ message: "Invalid Credentials" });
        const validPassword = yield bcrypt.compare(password, user.password);
        if (!validPassword)
            return res.status(400).json({ message: "Invalid Creadentials" });
        const secret = process.env.JWT_SECRET;
        if (!secret)
            throw new Error("Unknown error J.23");
        const accessToken = jwt.sign({ id: user._id }, secret);
        const tempUser = {
            username: user.username,
            name: user.name,
            surname: user.surname,
            email: user.email,
        };
        res.status(200).json({ accessToken, user: tempUser });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(409).json({ message: error.message });
        }
        else
            res.status(500).json({ message: "Something went wrong" });
    }
});
/* Validate Token */
export const validate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        const secret = process.env.JWT_SECRET;
        if (!secret)
            throw new Error("Unknown error J.23");
        const decodedData = jwt.verify(token, secret);
        const _data = decodedData;
        const user = yield User.findById(_data.id).select("-password");
        if (!user)
            return res.status(404).json({ message: "User not found" });
        res.status(200).json({ token });
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