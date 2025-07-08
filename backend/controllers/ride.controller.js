import { createRide, getFare } from "../services/ride.service.js";
import { validationResult } from "express-validator";
import {
  getAddressCoordinates,
  getCaptainsInTheRadius,
  getDistance,
} from "../services/maps.service.js";
import DriverModel from "../models/driver.model.js";
import { sendMessageToSocketId } from "../socket.js";

const handleCreateRide = async (req, res) => {
  try {
    // Remove location/radius check (not needed for ride creation)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { userId, pickupLocation, destination, vehicleType } = req.body;
    const ride = await createRide({
      userId,
      pickupLocation,
      destination,
      vehicleType,
    });

    // Respond to user immediately
    res.status(201).json(ride);

    // Notify all online drivers (do not send OTP)
    const allDrivers = await DriverModel.find({
      socketID: { $exists: true, $ne: null },
      currentStatus: "online",
    });

    // Prepare ride data for drivers (exclude OTP)
    const rideForDriver = {
      _id: ride._id,
      pickupLocation: ride.pickupLocation,
      destination: ride.destination,
      fare: ride.fare,
      vehicleType: ride.vehicleType,
      distance: ride.distance,
      duration: ride.duration,
      user: ride.user,
      // Add more fields as needed, but exclude OTP
    };

    allDrivers.forEach((driver) => {
      sendMessageToSocketId(driver.socketID, {
        event: "new-ride",
        data: rideForDriver,
      });
    });
  } catch (error) {
    console.error("Error in creating ride:", error);
    if (!res.headersSent) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

const getfare = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ errors: error.array() });
  }
  const { pickup, destination, vehicleType } = req.query;
  try {
    const pickupCoords = await getAddressCoordinates(pickup);
    const destinationCoords = await getAddressCoordinates(destination);
    const { distanceInKm } = await getDistance(pickupCoords, destinationCoords);
    const fare = getFare(parseFloat(distanceInKm), vehicleType);
    res.json({ fare });
  } catch (error) {
    console.error("Error in getting fare:", error);
    res.status(500).json({ message: "Error getting fare." });
  }
};

export { handleCreateRide, getfare };
