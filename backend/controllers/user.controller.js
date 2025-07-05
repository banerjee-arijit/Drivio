import UserModel from "../models/user.model.js";
import { validationResult } from "express-validator";

//controller for registering a new user
const registerUser = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }
    const newUser = await UserModel.create({ username, email, password });

    const token = await newUser.generateAuthToken();
    res
      .status(201)
      .json({ message: "User registered successfully.", token, user: newUser });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

//controller for login a user
const loginUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }
    const user = await UserModel.findOne({ email });
    const isMatch = await user.comparePassword(password);
    if (!user || !isMatch) {
      return res.status(401).json({ message: "Invalid credentials." });
    }
    const token = await user.generateAuthToken();
    res.cookie("token", token);
    res.json({ message: "User logged in successfully.", token, user });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

//controller for getting user profile
const getUserProfile = async (req, res) => {
  res.json({ user: req.user });
};

//controller for logout a user
const logoutUser = async (req, res) => {
  res.clearCookie("token");
  res.json({ message: "User logged out successfully." });
};

export { registerUser, loginUser, getUserProfile, logoutUser };
