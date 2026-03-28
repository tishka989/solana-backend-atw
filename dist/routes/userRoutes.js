import { Router } from "express";
import { getUserHandler, updateUserHandler } from "../controllers/userController.js";
const router = Router();
router.get("/:wallet", getUserHandler);
router.put("/:wallet", updateUserHandler);
export default router;
