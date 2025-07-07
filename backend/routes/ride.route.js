import express from "express";
import { body } from "express-validator";
import { handleCreateRide } from "../controllers/ride.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const rideRouter = express.Router();

rideRouter.post(
  "/create",
  body("userId")
    .isString()
    .isLength({ min: 24, max: 24 })
    .withMessage("Invalid user ID"),
  body("pickupLocation")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Invalid pickup location"),
  body("destination")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Invalid destination"),
  body("vehicleType")
    .isString()
    .isIn(["car", "bike", "auto", "largecar"])
    .withMessage("Invalid vehicle type"),
  authMiddleware,
  handleCreateRide
);
export default rideRouter;
