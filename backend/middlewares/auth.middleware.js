import DriverModel from "../models/driver.model.js";
import UserModel from "../models/user.model.js";
import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token" });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    let user = await UserModel.findById(decodedToken.id);
    if (user) {
      req.user = user;
      return next();
    }

    let driver = await DriverModel.findById(decodedToken.id);
    if (driver) {
      req.driver = driver;
      return next();
    }

    return res.status(401).json({ message: "Unauthorized: User not found" });
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

export default authMiddleware;
