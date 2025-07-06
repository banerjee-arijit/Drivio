import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";

const DriverSignUpPage = () => {
  const [driverSignupCredentials, setDriverSignupCredentials] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleOnChange = (event) => {
    setDriverSignupCredentials({
      ...driverSignupCredentials,
      [event.target.name]: event.target.value,
    });
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();
    console.log(driverSignupCredentials);
    setDriverSignupCredentials({
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };
  return (
    <div className="p-7 min-h-screen relative bg-white">
      <div className="mb-10">
        <h1 className="font-bold text-xl">
          Drivio <span className="text-blue-500">captain</span>
        </h1>
      </div>
      <form onSubmit={handleOnSubmit}>
        <label htmlFor="text" className="text-xs mb-2 block">
          What's captain Fullname
        </label>
        <input
          type="text"
          name="text"
          id="text"
          placeholder="john Doe"
          value={driverSignupCredentials.fullName}
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
        <label htmlFor="confirmpassword" className="text-xs mb-2 block">
          Confirm Password
        </label>
        <input
          type="password"
          name="confirmpassword"
          id="confirmpassword"
          placeholder="confirm password"
          value={driverSignupCredentials.confirmPassword}
          onChange={handleOnChange}
          className="bg-[#eeeeee] mb-7 w-full py-2 px-4 text-sm rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <Button className="w-full">Login</Button>
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
