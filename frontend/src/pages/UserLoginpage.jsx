import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";

const UserLoginpage = () => {
  const [userLoginCredentials, setUserLoginCredentials] = useState({
    email: "",
    password: "",
  });

  const handleOnChange = (event) => {
    setUserLoginCredentials({
      ...userLoginCredentials,
      [event.target.name]: event.target.value,
    });
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    console.log(userLoginCredentials);
    setUserLoginCredentials({
      email: "",
      password: "",
    });
  };

  return (
    <div className="p-7 min-h-screen relative bg-white">
      <div className="mb-10">
        <h1 className="font-bold text-xl">Drivio</h1>
      </div>
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
          className="bg-[#eeeeee] mb-7 w-full py-2 px-4 text-sm rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <Button className="w-full">Login</Button>
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
