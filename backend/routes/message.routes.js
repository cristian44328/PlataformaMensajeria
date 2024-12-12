import express from "express";
import { getMessages, getUsersForSidebar, sendMessage } from "../controllers/message.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";
import { authRequire } from "../middlewares/validateToken.js";

const router = express.Router();

router.get("/users", authRequire, getUsersForSidebar);
router.get("/:id", authRequire, getMessages);
router.post("/send/:id", authRequire, sendMessage);

export default router;