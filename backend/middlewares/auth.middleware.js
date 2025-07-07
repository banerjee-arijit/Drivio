import DriverModel from "../models/driver.model.js";
import UserModel from "../models/user.model.js";
import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    token = req.headers.authorization.split(" ")[1];
    console.log("Token from header:", token);
  } else if (req.cookies.token) {
    token = req.cookies.token;
    console.log("Token from cookie:", token);
  }

  if (!token) {
    console.log("No token found");
    return res.status(401).json({ message: "Unauthorized: No token" });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token:", decodedToken);

    let user = await UserModel.findById(decodedToken.id);
    if (user) {
      console.log("User found:", user._id);
      req.user = user;
      return next();
    }

    let driver = await DriverModel.findById(decodedToken.id);
    if (driver) {
      console.log("Driver found:", driver._id);
      req.driver = driver;
      return next();
    }

    console.log("No user or driver found for id:", decodedToken.id);
    return res.status(401).json({ message: "Unauthorized: User not found" });
  } catch (error) {
    console.log("JWT error:", error.message);
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

export default authMiddleware;
