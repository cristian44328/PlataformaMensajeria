import { Router } from "express";
import { login, register, logout, verifyToken, profile, checkAuth} from "../controllers/auth.controller.js";
import { authRequire } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validatoMiddlewares.js";
import { registerSchema,loginSchema } from "../schemas/authSchemas.js";

const router = Router();

router.post("/register", validateSchema(registerSchema), register);
router.post("/login", validateSchema(loginSchema), login);
router.post("/logout", logout);
router.get("/verify", verifyToken);
router.get("/profile", authRequire, profile);
router.get("/check", authRequire, checkAuth);

export default router;