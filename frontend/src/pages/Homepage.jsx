import React from "react";
import { Button } from "@/components/ui/button";
import backGround from "../asserts/backgroundBG.jpg";
import { Link } from "react-router-dom";

const Homepage = () => {
  return (
    <div
      className="min-h-screen w-full flex flex-col bg-cover bg-center text-white relative"
      style={{
        backgroundImage: `url(${backGround})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <footer className="fixed bottom-0 left-0 w-full bg-white/90 p-8 text-black text-center z-50">
        <p className="mb-2 text-lg font-medium">Ready to ride or drive?</p>
        <div className="w-full flex justify-center">
          <Link to="/login" className="w-full max-w-xs">
            <Button className="w-full">Get Started</Button>
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;
