import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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
    },
    currentStatus: {
      type: String,
      enum: ["online", "offline", "onTrip"],
      default: "offline",
      index: true,
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
      lat: {
        type: Number,
      },
      lng: {
        type: Number,
      },
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number], // [lng, lat]
        default: [0, 0],
      },
    },
    currentTrip: {},
  },
  { timestamps: true }
);

// JWT token generation
driverschema.methods.generateAuthToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

// Compare hashed password
driverschema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Hash password before saving
driverschema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

driverschema.index({ location: "2dsphere" });

const DriverModel = mongoose.model("Driver", driverschema);

export default DriverModel;
