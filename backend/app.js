import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRouter from "./routes/user.route.js";
import driverRouter from "./routes/driver.route.js";
import cookieParser from "cookie-parser";
import maprouter from "./routes/maps.route.js";
import rideRouter from "./routes/ride.route.js";
import jwt from "jsonwebtoken";
import initializeSocket from "./socket.js";

dotenv.config();
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

connectDB();

app.use("/api/users", userRouter);
app.use("/api/drivers", driverRouter);
app.use("/api/maps", maprouter);
app.use("/api/rides", rideRouter);

const server = app.listen(3000, () => {
  console.log("Server is running on port 3000 (with Socket.IO)");
});

initializeSocket(server);
