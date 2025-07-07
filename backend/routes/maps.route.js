import express from "express";
const maprouter = express.Router();
import authMiddleware from "../middlewares/auth.middleware.js";
import { query } from "express-validator";
import {
  getCoordinates,
  getDistance,
  getSuggestions,
} from "../controllers/maps.controller.js";

maprouter.get(
  "/get-coordinates",
  query("address").isString().isLength({ min: 3 }),
  authMiddleware,
  getCoordinates
);

maprouter.get(
  "/get-distance",
  query("origin").isString().isLength({ min: 3 }),
  query("destination").isLength({ min: 3 }),
  authMiddleware,
  getDistance
);

maprouter.get(
  "/get-suggestions",
  query("input").isString().isLength({ min: 3 }),
  authMiddleware,
  getSuggestions
);
export default maprouter;
