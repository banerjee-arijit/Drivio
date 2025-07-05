import express from "express";
const driverRouter = express.Router();
import { body } from "express-validator";
import { registerDriver } from "../controllers/driver.controller.js";

driverRouter.post(
  "/register",
  [
    body("username").notEmpty().withMessage("Username is required"),
    body("email").isEmail().withMessage("Invalid email"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long"),
    body("vehicle.capacity")
      .isInt({ min: 1 })
      .withMessage("Capacity must be a valid number"),
    body("vehicle.vehicleType")
      .isIn(["car", "bike", "auto"])
      .withMessage("Invalid vehicle type"),
    body("vehicle.vehicleNumber")
      .notEmpty()
      .withMessage("Vehicle number is required"),
  ],
  registerDriver
);

export default driverRouter;
