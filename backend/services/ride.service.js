import RideModel from "../models/ride.model.js";
import { getAddressCoordinates, getDistance } from "./maps.service.js";

const getOtp = (num) => {
  if (!num || num < 1) return "";
  let otp = "";
  for (let i = 0; i < num; i++) {
    otp += Math.floor(Math.random() * 10).toString();
  }
  return otp;
};
const getFare = (distanceInKm, vehicleType) => {
  if (distanceInKm > 1000) {
    throw new Error(
      "The selected route is too long for a ride. Please choose a valid pickup and destination within the same region."
    );
  }
  const fareRates = {
    auto: { base: 10, perKm: 5 },
    bike: { base: 5, perKm: 4 },
    car: { base: 15, perKm: 8 },
    largecar: { base: 25, perKm: 12 },
  };
  const rates = fareRates[vehicleType] || fareRates["car"];
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

  const pickupCoords = await getAddressCoordinates(pickupLocation);
  const destinationCoords = await getAddressCoordinates(destination);

  const { distanceInKm, timeInMinutes } = await getDistance(
    pickupCoords,
    destinationCoords
  );

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
    otp: getOtp(6),
  });

  return newRide;
};

export { getFare, createRide };
