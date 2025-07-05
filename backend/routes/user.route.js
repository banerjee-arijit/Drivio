import express from "express";
const userRouter = express.Router();
import { body } from "express-validator";
import {
  registerUser,
  loginUser,
  getUserProfile,
  logoutUser,
} from "../controllers/user.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

//resister user
userRouter.post(
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
userRouter.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid email"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  loginUser
);

//profile page
userRouter.get("/profile", authMiddleware, getUserProfile);

//logout user
userRouter.get("/logout", authMiddleware, logoutUser);

export default userRouter;
