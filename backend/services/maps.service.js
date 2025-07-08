import axios from "axios";
import DriverModel from "./../models/driver.model.js";
const getAddressCoordinates = async (address) => {
  if (!address) throw new Error("Address is required");

  const apiKey = process.env.GEOAPIFY_API_KEY;
  const url = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(
    address
  )}&apiKey=${apiKey}`;

  try {
    const response = await axios.get(url);
    const features = response.data.features;

    if (!features || features.length === 0) {
      throw new Error("No results found for this address");
    }

    const [lng, lat] = features[0].geometry.coordinates;
    return { lat, lng };
  } catch (error) {
    console.error("Geoapify error:", error.response?.data || error.message);
    throw new Error(`Failed to get coordinates: ${error.message}`);
  }
};

const getDistance = async (origin, destination) => {
  if (!origin || !destination)
    throw new Error("Origin and destination are required");

  const apiKey = process.env.GEOAPIFY_API_KEY;
  const url = `https://api.geoapify.com/v1/routing?waypoints=${origin.lat},${origin.lng}|${destination.lat},${destination.lng}&mode=drive&apiKey=${apiKey}`;

  try {
    const response = await axios.get(url);
    if (!response.data.features || !response.data.features[0]) {
      console.error("Geoapify response:", response.data);
      throw new Error("No route found between the given points.");
    }
    const route = response.data.features[0].properties;

    return {
      distanceInKm: (route.distance / 1000).toFixed(2),
      timeInMinutes: Math.ceil(route.time / 60),
    };
  } catch (error) {
    console.error(
      "Geoapify Routing error:",
      error.response?.data || error.message
    );
    throw new Error(`Failed to get distance: ${error.message}`);
  }
};

const getAutocompleteSuggestions = async (query) => {
  if (!query) throw new Error("Query is required");

  const apiKey = process.env.GEOAPIFY_API_KEY;
  const url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(
    query
  )}&apiKey=${apiKey}`;

  try {
    const response = await axios.get(url);

    const suggestions = response.data.features
      .map((feature) => feature.properties?.formatted)
      .filter((item) => item !== null);

    return suggestions;
  } catch (error) {
    console.error("Geoapify error:", error.response?.data || error.message);
    throw new Error(`Failed to get autocomplete suggestions: ${error.message}`);
  }
};

const getCaptainsInTheRadius = async (lat, lng, radius) => {
  if (!lat || !lng || !radius)
    throw new Error("Location and radius are required");
  const captains = await DriverModel.find({
    location: {
      $geoWithin: {
        $centerSphere: [[lng, lat], radius / 6371],
      },
    },
  });
  if (captains.length > 0) {
    console.log("Nearest driver:", captains[0]);
  } else {
    console.log("No drivers found in radius");
  }
  return captains;
};

export {
  getAddressCoordinates,
  getDistance,
  getAutocompleteSuggestions,
  getCaptainsInTheRadius,
};
