import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const DriverSignUpPage = () => {
  const navigate = useNavigate();
  const [driverSignupCredentials, setDriverSignupCredentials] = useState({
    username: "",
    email: "",
    password: "",
    vehicle: {
      capacity: "",
      vehicleType: "",
      vehicleNumber: "",
    },
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleOnChange = (event) => {
    const { name, value } = event.target;

    if (name.startsWith("vehicle.")) {
      const vehicleField = name.split(".")[1];
      setDriverSignupCredentials({
        ...driverSignupCredentials,
        vehicle: {
          ...driverSignupCredentials.vehicle,
          [vehicleField]: value,
        },
      });
    } else {
      setDriverSignupCredentials({
        ...driverSignupCredentials,
        [name]: value,
      });
    }
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    if (driverSignupCredentials.password.length < 8) {
      setError("Password must be at least 8 characters long");
      setLoading(false);
      return;
    }

    if (
      !driverSignupCredentials.vehicle.vehicleType ||
      !driverSignupCredentials.vehicle.vehicleNumber ||
      !driverSignupCredentials.vehicle.capacity
    ) {
      setError("Please fill in all vehicle details");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/drivers/register",
        {
          username: driverSignupCredentials.username,
          email: driverSignupCredentials.email,
          password: driverSignupCredentials.password,
          vehicle: driverSignupCredentials.vehicle,
        }
      );

      if (response.status === 201) {
        setDriverSignupCredentials({
          username: "",
          email: "",
          password: "",
          vehicle: {
            capacity: "",
            vehicleType: "",
            vehicleNumber: "",
          },
        });
        navigate("/driver/login");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-7 min-h-screen relative bg-white">
      <div className="mb-10">
        <h1 className="font-bold text-xl">
          Drivio <span className="text-blue-500">captain</span>
        </h1>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleOnSubmit}>
        <label htmlFor="username" className="text-xs mb-2 block">
          What's captain Fullname
        </label>
        <input
          type="text"
          name="username"
          id="username"
          placeholder="john Doe"
          value={driverSignupCredentials.username}
          onChange={handleOnChange}
          className="bg-[#eeeeee] mb-7 w-full py-2 px-4 text-sm rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <label htmlFor="email" className="text-xs mb-2 block">
          What's captain Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="example@example.com"
          value={driverSignupCredentials.email}
          onChange={handleOnChange}
          className="bg-[#eeeeee] mb-7 w-full py-2 px-4 text-sm rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <label htmlFor="password" className="text-xs mb-2 block">
          What's captain Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="password"
          value={driverSignupCredentials.password}
          onChange={handleOnChange}
          className="bg-[#eeeeee] mb-7 w-full py-2 px-4 text-sm rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <label htmlFor="vehicleType" className="text-xs mb-2 block">
          Vehicle Type
        </label>
        <select
          name="vehicle.vehicleType"
          id="vehicleType"
          value={driverSignupCredentials.vehicle.vehicleType}
          onChange={handleOnChange}
          className="bg-[#eeeeee] mb-7 w-full py-2 px-4 text-sm rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">Select vehicle type</option>
          <option value="car">Car</option>
          <option value="bike">Bike</option>
          <option value="auto">Auto</option>
        </select>

        <label htmlFor="vehicleNumber" className="text-xs mb-2 block">
          Vehicle Number
        </label>
        <input
          type="text"
          name="vehicle.vehicleNumber"
          id="vehicleNumber"
          placeholder="Enter vehicle number"
          value={driverSignupCredentials.vehicle.vehicleNumber}
          onChange={handleOnChange}
          className="bg-[#eeeeee] mb-7 w-full py-2 px-4 text-sm rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <label htmlFor="capacity" className="text-xs mb-2 block">
          Vehicle Capacity
        </label>
        <input
          type="number"
          name="vehicle.capacity"
          id="capacity"
          placeholder="Enter passenger capacity"
          value={driverSignupCredentials.vehicle.capacity}
          onChange={handleOnChange}
          className="bg-[#eeeeee] mb-7 w-full py-2 px-4 text-sm rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Registering..." : "Create Captain"}
        </Button>
      </form>

      <div>
        <p className="text-center mt-4 text-sm">
          Already have an account?{" "}
          <Link to={"/driver/login"} className="text-blue-500 hover:underline">
            login here
          </Link>
        </p>
      </div>

      <div className="absolute bottom-6 left-0 w-full px-7">
        <Link to={"/signup"}>
          <Button className="w-full">join as user</Button>
        </Link>
      </div>
    </div>
  );
};

export default DriverSignUpPage;
