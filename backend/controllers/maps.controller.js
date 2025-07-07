import {
  getAddressCoordinates,
  getDistance as calculateDistance,
  getAutocompleteSuggestions,
} from "../services/maps.service.js";
import { validationResult } from "express-validator";

const getCoordinates = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { address } = req.query;
  try {
    const coordinates = await getAddressCoordinates(address);
    res.json({ coordinates });
  } catch (error) {
    console.error("Error in getCoordinates:", error);
    return res.status(500).json({ message: "Error fetching coordinates." });
  }
};

const getDistance = async (req, res) => {
  const { from, to } = req.query;

  if (!from || !to) {
    return res
      .status(400)
      .json({ message: "'from' and 'to' query parameters are required" });
  }

  try {
    const originCoords = await getAddressCoordinates(from);
    const destinationCoords = await getAddressCoordinates(to);

    const distanceResult = await calculateDistance(
      originCoords,
      destinationCoords
    );

    res.json({
      from,
      to,
      originCoords,
      destinationCoords,
      ...distanceResult,
    });
  } catch (error) {
    console.error("Error in getDistance:", error);
    return res.status(500).json({ message: "Error calculating distance." });
  }
};

const getSuggestions = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { input } = req.query;
  if (!input) {
    return res
      .status(400)
      .json({ message: "'input' query parameter is required" });
  }

  try {
    const suggestions = await getAutocompleteSuggestions(input);
    res.json({ suggestions }); // ✅ You missed this
  } catch (error) {
    console.error("Error in getSuggestions:", error);
    return res.status(500).json({ message: "Error fetching suggestions." });
  }
};

export { getCoordinates, getDistance, getSuggestions };
