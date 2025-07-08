import { Server } from "socket.io";
import UserModel from "./models/user.model.js";
import DriverModel from "./models/driver.model.js";

let io = null;
const connectedSockets = new Map();

export function initializeSocket(server) {
  io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    connectedSockets.set(socket.id, socket);
    console.log(`Socket connected: ${socket.id}`);

    socket.on("join", async ({ userId, userType }) => {
      try {
        if (userType === "user") {
          await UserModel.findByIdAndUpdate(userId, { socketID: socket.id });
        } else if (userType === "driver") {
          await DriverModel.findByIdAndUpdate(userId, {
            socketID: socket.id,
            currentStatus: "online",
          });
        }
        console.log(`${userType} joined with ID: ${userId}`);
      } catch (error) {
        console.error("Error saving socketId:", error.message);
      }
    });

    socket.on("updateLocationCaptain", async (data) => {
      const { userId, location } = data;
      console.log("Incoming location update:", data);

      if (
        !location ||
        typeof location.lat !== "number" ||
        typeof location.lng !== "number" ||
        isNaN(location.lat) ||
        isNaN(location.lng)
      ) {
        console.error("Invalid location data received:", location);
        socket.emit("locationUpdateError", {
          message: "Invalid location data. 'lat' and 'lng' must be numbers.",
        });
        return;
      }

      try {
        const result = await DriverModel.findByIdAndUpdate(
          userId,
          {
            currentLocation: {
              lat: location.lat,
              lng: location.lng,
            },
            location: {
              type: "Point",
              coordinates: [location.lng, location.lat],
            },
          },
          { new: true, runValidators: true }
        );

        if (!result) {
          console.error("No driver found with id:", userId);
        } else {
          console.log(
            `Location updated for driver: ${userId}`,
            result.currentLocation,
            result.location
          );
        }
      } catch (err) {
        console.error("Error updating location:", err.message);
      }
    });

    socket.on("disconnect", async () => {
      connectedSockets.delete(socket.id);
      // Set driver offline if this was a driver socket
      try {
        // Find the driver with this socketID
        const driver = await DriverModel.findOne({ socketID: socket.id });
        if (driver) {
          await DriverModel.findByIdAndUpdate(driver._id, {
            currentStatus: "offline",
            socketID: null,
          });
        }
      } catch (err) {
        console.error(
          "Error setting driver offline on disconnect:",
          err.message
        );
      }
      console.log(`Socket disconnected: ${socket.id}`);
    });
  });
}

export function sendMessageToSocketId(socketId, messageObject) {
  if (io && connectedSockets.has(socketId)) {
    connectedSockets
      .get(socketId)
      .emit(messageObject.event, messageObject.data);
  }
}

export default initializeSocket;
