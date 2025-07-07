import React from "react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const UserLoginpage = () => {
  const navigate = useNavigate();
  const [userLoginCredentials, setUserLoginCredentials] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleOnChange = (event) => {
    setUserLoginCredentials({
      ...userLoginCredentials,
      [event.target.name]: event.target.value,
    });
    if (error) setError("");
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/login",
        userLoginCredentials,
        { withCredentials: true }
      );

      if (response.status === 200) {
        console.log("Login successful", response.data);
        setUserLoginCredentials({
          email: "",
          password: "",
        });
        navigate("/dashboard");
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
        <h1 className="font-bold text-xl">Drivio</h1>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleOnSubmit}>
        <label htmlFor="email" className="text-xs mb-2 block">
          What's your Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="email@example.com"
          value={userLoginCredentials.email}
          onChange={handleOnChange}
          required
          className="bg-[#eeeeee] mb-7 w-full py-2 px-4 text-sm rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <label htmlFor="password" className="text-xs mb-2 block">
          What's your Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="password"
          value={userLoginCredentials.password}
          onChange={handleOnChange}
          required
          className="bg-[#eeeeee] mb-7 w-full py-2 px-4 text-sm rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Logging In..." : "Login"}
        </Button>
      </form>

      <div>
        <p className="text-center mt-4 text-sm">
          New here?{" "}
          <Link to={"/signup"} className="text-blue-500 hover:underline">
            create a new Account
          </Link>
        </p>
      </div>

      <div className="absolute bottom-6 left-0 w-full px-7">
        <Link to={"/driver/login"}>
          <Button className="w-full">join as Captain</Button>
        </Link>
      </div>
    </div>
  );
};

export default UserLoginpage;
