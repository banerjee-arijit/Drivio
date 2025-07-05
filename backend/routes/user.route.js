import express from "express";
const router = express.Router();
import { body } from "express-validator";
import { registerUser, loginUser } from "../controllers/user.controller.js";

//resister user
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

//login user
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid email"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  loginUser
);

export default router;
