import { Button } from "@/components/ui/button";
import React from "react";

const Homepage = () => {
  return (
    <div className="min-h-screen w-full bg-black text-white flex flex-col">
      {/* Header */}
      <header className="p-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold">Drivio</h1>
      </header>

      {/* Hero section */}
      <main className="flex-1 flex flex-col justify-center items-center px-6 text-center">
        <h2 className="text-5xl font-bold mb-4">Get started with Drivio</h2>
        <p className="text-xl max-w-xl mb-8 text-gray-300">
          Book a ride, become a driver, or explore our services. Your journey
          starts here.
        </p>
      </main>

      {/* Footer CTA bar */}
      <footer className="bg-white p-10 text-black text-center shadow-inner rounded-t-3xl">
        <h3 className="text-2xl font-semibold mb-3">Ready to roll?</h3>
        <p className="mb-6 text-black">
          Drivio connects you to your destination — one tap away.
        </p>
        <Button className="bg-white text-indigo-600 font-bold px-6 py-3 text-lg rounded-full hover:bg-gray-100 transition-all duration-300 shadow-md">
          Continue
        </Button>
      </footer>
    </div>
  );
};

export default Homepage;
