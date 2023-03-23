var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
function isEmail(email) {
    var emailFormat = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    if (email !== "" && email.match(emailFormat)) {
        return true;
    }
    return false;
}
export const sendMail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, message } = req.body;
    if (!name || !email || !message)
        return res.status(400).json({ message: "Please fill in all fields." });
    if (!isEmail(email))
        return res.status(400).json({ message: "Please enter a valid email." });
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_APP_PASSWORD,
            },
        });
        yield transporter.sendMail({
            from: process.env.EMAIL_USERNAME,
            to: process.env.EMAIL_TO,
            subject: `New message from ${name} (${email})`,
            text: message,
        });
        res.status(200).json({ message: "Email sent successfully." });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong." });
    }
});
//# sourceMappingURL=mail.js.map