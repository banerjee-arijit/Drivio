import { mongoose } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//defining the driver schema with necessary fields
const driverschema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      maxlength: 20,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      maxlength: 20,
    },
    socketID: {
      type: String,
      unique: true,
    },
    currentStatus: {
      type: String,
      enum: ["online", "offline", "onTrip"],
      default: "offline",
    },
    vehicle: {
      capacity: {
        type: Number,
        required: true,
      },
      vehicleType: {
        type: String,
        enum: ["car", "bike", "auto"],
        required: true,
      },
      vehicleNumber: {
        type: String,
        required: true,
      },
    },

    currentLocation: {
      latitude: {
        type: Number,
      },
      longitude: {
        type: Number,
      },
    },
    currentTrip: {},
  },
  { timestamps: true }
);

//generating a JWT token for user authentication
driverschema.methods.generateAuthToken = function () {
  const token = jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  return token;
};

//checking the password against the hashed password stored in the database
driverschema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

//hashing the password before saving it to the database
driverschema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
  }
  next();
});

const DriverModel = mongoose.model("Driver", driverschema);

export default DriverModel;
