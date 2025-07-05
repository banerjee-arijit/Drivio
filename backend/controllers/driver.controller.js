import DriverModel from "../models/driver.model.js";
import { validationResult } from "express-validator";

//controller for registering a new driver
const registerDriver = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { username, email, password, vehicle } = req.body;

    if (
      !username ||
      !email ||
      !password ||
      !vehicle?.capacity ||
      !vehicle?.vehicleType ||
      !vehicle?.vehicleNumber
    ) {
      return res.status(400).json({ message: "All fields are required." });
    }
    const existingDriver = await DriverModel.findOne({ email });
    if (existingDriver) {
      return res.status(400).json({ message: "Email already exists." });
    }

    const newDriver = await DriverModel.create({
      username,
      email,
      password,
      vehicle,
    });

    const token = await newDriver.generateAuthToken();

    res.status(201).json({
      message: "Driver registered successfully.",
      token,
      driver: newDriver,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//controller for login a driver
const loginDriver = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }
    const driver = await DriverModel.findOne({ email });
    const isMatch = await driver.comparePassword(password);
    if (!driver || !isMatch) {
      return res.status(401).json({ message: "Invalid credentials." });
    }
    const token = await driver.generateAuthToken();
    res.cookie("token", token);
    res.json({ message: "Driver logged in successfully.", token, driver });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

//controller for getting driver profile
const getDriverProfile = async (req, res) => {
  res.json({ driver: req.driver });
};

//controller for logout a driver
const logoutDriver = async (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Driver logged out successfully." });
};

export { registerDriver, loginDriver, getDriverProfile, logoutDriver };
