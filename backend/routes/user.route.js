import express from "express";
const router = express.Router();
import { body } from "express-validator";
import { registerUser } from "../controllers/user.controller.js";

router.post(
  "/register",
  [
    body("username").notEmpty().withMessage("Username is required"),
    body("email").isEmail().withMessage("Invalid email"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long"),
  ],
  registerUser
);

export default router;
