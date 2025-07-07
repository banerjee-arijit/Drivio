import RideModel from "../models/ride.model.js";
import { getAddressCoordinates, getDistance } from "./maps.service.js";

const getFare = (distanceInKm, vehicleType) => {
  const fareRates = {
    auto: { base: 30, perKm: 10 },
    bike: { base: 20, perKm: 8 },
    car: { base: 40, perKm: 15 },
    largecar: { base: 60, perKm: 20 },
  };

  const rates = fareRates[vehicleType] || fareRates["car"];
  // Calculate fare
  const fare = rates.base + rates.perKm * distanceInKm;
  return Math.round(fare);
};

const createRide = async ({
  userId,
  pickupLocation,
  destination,
  vehicleType,
}) => {
  if (!userId || !pickupLocation || !destination || !vehicleType)
    throw new Error("All fields are required");

  // Convert addresses to coordinates
  const pickupCoords = await getAddressCoordinates(pickupLocation);
  const destinationCoords = await getAddressCoordinates(destination);

  // Get distance and duration
  const { distanceInKm, timeInMinutes } = await getDistance(
    pickupCoords,
    destinationCoords
  );

  // Calculate fare
  const fare = getFare(parseFloat(distanceInKm), vehicleType);

  const newRide = await RideModel.create({
    user: userId,
    pickupLocation,
    destination,
    vehicleType,
    fare,
    distance: parseFloat(distanceInKm),
    duration: timeInMinutes,
    estimatedTime: new Date(Date.now() + timeInMinutes * 60000),
  });

  return newRide;
};

export { getFare, createRide };
