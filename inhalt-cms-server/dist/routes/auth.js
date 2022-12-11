import { Router } from "express";
import { login } from "../controllers/auth.js";
const router = Router();
// router.post("/register", register); // REGISTER DISABLED
router.post("/login", login);
export default router;
