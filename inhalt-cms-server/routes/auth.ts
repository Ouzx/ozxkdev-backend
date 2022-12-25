import { Router } from "express";
import { register, login, validate } from "../controllers/auth.js";

const router = Router();

// router.post("/register", register); // REGISTER DISABLED
router.post("/login", login);
router.get("/validate-token", validate);

export default router;
