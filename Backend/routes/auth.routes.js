import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  getLoggedInUser,
  getAllUsers,
} from "../controllers/auth.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.get("/me", getLoggedInUser);
router.get("/", authMiddleware, getAllUsers);

export default router;
