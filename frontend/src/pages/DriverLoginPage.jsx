import React from "react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
const DriverLoginPage = () => {
  const navigate = useNavigate();
  const [driverLoginCredentials, setDriverLoginCredentials] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleOnChange = (event) => {
    setDriverLoginCredentials({
      ...driverLoginCredentials,
      [event.target.name]: event.target.value,
    });
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/drivers/login",
        driverLoginCredentials,
        { withCredentials: true }
      );
      if (response.status === 200) {
        console.log("Login successful", response.data);
        setDriverLoginCredentials({
          email: "",
          password: "",
        });
        navigate("/driver/dashboard");
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Login failed. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-7 min-h-screen relative bg-white">
      <div className="mb-10">
        <h1 className="font-bold text-xl">
          Drivio
          <span className="text-blue-500"> captain</span>
        </h1>
      </div>
      <form onSubmit={handleOnSubmit}>
        <label htmlFor="email" className="text-xs mb-2 block">
          What's captain Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="email@example.com"
          value={driverLoginCredentials.email}
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
          value={driverLoginCredentials.password}
          onChange={handleOnChange}
          className="bg-[#eeeeee] mb-7 w-full py-2 px-4 text-sm rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <Button className="w-full">Login</Button>
      </form>

      <div>
        <p className="text-center mt-4 text-sm">
          New here?{" "}
          <Link to={"/driver/signup"} className="text-blue-500 hover:underline">
            Register as a Captain
          </Link>
        </p>
      </div>

      <div className="absolute bottom-6 left-0 w-full px-7">
        <Link to={"/login"}>
          <Button className="w-full">login as user</Button>
        </Link>
      </div>
    </div>
  );
};

export default DriverLoginPage;
