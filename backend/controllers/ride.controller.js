import { createRide } from "../services/ride.service.js";
import { validationResult } from "express-validator";

const handleCreateRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { userId, pickupLocation, destination, vehicleType } = req.body;
  try {
    const ride = await createRide({
      userId,
      pickupLocation,
      destination,
      vehicleType,
    });
    res.status(201).json(ride);
  } catch (error) {
    console.error("Error in creating ride:", error);
    res.status(500).json({ message: "Error creating ride." });
  }
};

export { handleCreateRide };
