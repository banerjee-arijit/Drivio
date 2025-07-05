import DriverModel from "../models/driver.model.js";
import { validationResult } from "express-validator";

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

export { registerDriver };
