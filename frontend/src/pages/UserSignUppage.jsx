import React from "react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const UserSignUppage = () => {
  const navigate = useNavigate();
  const [userSignupCredentials, setUserSignupCredentials] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleOnChange = (event) => {
    setUserSignupCredentials({
      ...userSignupCredentials,
      [event.target.name]: event.target.value,
    });
    if (error) setError("");
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    // Frontend validation
    if (!userSignupCredentials.username.trim()) {
      setError("Username is required");
      setLoading(false);
      return;
    }

    if (!userSignupCredentials.email.trim()) {
      setError("Email is required");
      setLoading(false);
      return;
    }

    if (!userSignupCredentials.password) {
      setError("Password is required");
      setLoading(false);
      return;
    }

    if (userSignupCredentials.password.length < 8) {
      setError("Password must be at least 8 characters long");
      setLoading(false);
      return;
    }

    if (userSignupCredentials.username.length > 20) {
      setError("Username must be 20 characters or less");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/register",
        {
          username: userSignupCredentials.username.trim(),
          email: userSignupCredentials.email.trim(),
          password: userSignupCredentials.password,
        }
      );

      if (response.status === 201) {
        setUserSignupCredentials({
          username: "",
          email: "",
          password: "",
        });
        navigate("/login");
      }
    } catch (err) {
      console.error("Registration error:", err.response?.data);

      // Handle validation errors from express-validator
      if (
        err.response?.data?.errors &&
        Array.isArray(err.response.data.errors)
      ) {
        const errorMessages = err.response.data.errors
          .map((error) => error.msg)
          .join(", ");
        setError(errorMessages);
      }
      // Handle other backend errors
      else if (err.response?.data?.message) {
        setError(err.response.data.message);
      }
      // Handle network or other errors
      else {
        setError(
          "Registration failed. Please check your connection and try again."
        );
      }
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
        <label htmlFor="username" className="text-xs mb-2 block">
          What's your Username
        </label>
        <input
          type="text"
          name="username"
          id="username"
          placeholder="john_doe"
          value={userSignupCredentials.username}
          onChange={handleOnChange}
          required
          className="bg-[#eeeeee] mb-7 w-full py-2 px-4 text-sm rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <label htmlFor="email" className="text-xs mb-2 block">
          What's your Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="example@example.com"
          value={userSignupCredentials.email}
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
          value={userSignupCredentials.password}
          onChange={handleOnChange}
          required
          className="bg-[#eeeeee] mb-7 w-full py-2 px-4 text-sm rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Signing Up..." : "Sign Up"}
        </Button>
      </form>

      <div>
        <p className="text-center mt-4 text-sm">
          Already have an account?{" "}
          <Link to={"/login"} className="text-blue-500 hover:underline">
            login here
          </Link>
        </p>
      </div>

      <div className="absolute bottom-6 left-0 w-full px-7">
        <Link to={"/driver/signup"}>
          <Button className="w-full">Register as Captain</Button>
        </Link>
      </div>
    </div>
  );
};

export default UserSignUppage;
