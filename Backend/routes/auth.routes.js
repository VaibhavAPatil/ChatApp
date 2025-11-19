import express from "express";
import {
  registerUser,
  loginUser,
  getLoggedInUser,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", getLoggedInUser);

export default router;
