import { Router } from "express";
import { register, login, validate } from "../controllers/auth.js";
const router = Router();
// router.post("/register", multerMiddlewareSingle, register);
router.post("/register", register);
router.post("/login", login);
router.get("/validate-token", validate);
export default router;
//# sourceMappingURL=auth.js.map