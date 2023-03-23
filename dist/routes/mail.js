import { Router } from "express";
import { sendMail } from "../controllers/mail.js";
const router = Router();
router.post("/send", sendMail);
export default router;
//# sourceMappingURL=mail.js.map