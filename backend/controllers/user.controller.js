import UserModel from "../models/user.model.js";
import { validationResult } from "express-validator";

const registerUser = async (req, res) => {
  const erros = validationResult(req);

  if (!erros.isEmpty()) {
    return res.status(400).json({ errors: erros.array() });
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

export { registerUser };
