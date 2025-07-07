import React, { useState } from "react";
import { MapPin, User, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

const SearchingDrive = ({ ride, onClose }) => {
  const [isFound, setIsFound] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsFound(true);
    }, 2000);
  });

  if (!ride) return null;

  const currentLocation = "Sector 5, Salt Lake City";
  const destinationLocation = "Howrah Station";

  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-gradient-to-br from-gray-50 to-white">
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 py-8">
        {/* 🔴 Close Button */}
        <button
          className="absolute top-4 right-4 bg-black text-white p-2 rounded-full hover:bg-gray-800 transition"
          onClick={onClose}
        >
          <X className="w-5 h-5" />
        </button>

        {!isFound ? (
          <div className="text-center text-gray-800">
            <div className="mb-8">
              <h1 className="text-2xl font-bold mb-4 text-black animate-pulse">
                Looking for nearest ride...
              </h1>
              <p className="text-lg text-gray-600">
                Please wait while we find the perfect driver for you
              </p>
            </div>

            <div className="mb-12">
              <img
                src={ride.img}
                alt={ride.name}
                className="w-48 h-36 object-contain mx-auto mb-6 drop-shadow-lg"
              />
              <h2 className="text-2xl font-bold text-black mb-2">
                {ride.name}
              </h2>
              <p className="text-gray-600 mb-4">{ride.desc}</p>

              <div className="flex justify-center gap-6 mb-8">
                <span className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full text-sm font-semibold">
                  <User className="w-5 h-5" /> {ride.seats} seats
                </span>
                <span className="bg-gray-200 text-black px-6 py-3 rounded-full text-sm font-semibold">
                  {ride.price}
                </span>
              </div>
            </div>

            <div className="max-w-md mx-auto space-y-4">
              <div className="flex items-center gap-3 text-black">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Pickup</p>
                  <p className="font-semibold">{currentLocation}</p>
                </div>
              </div>

              <div className="flex justify-center">
                <div className="w-0.5 h-8 bg-gradient-to-b from-green-500 to-red-500"></div>
              </div>

              <div className="flex items-center gap-3 text-black">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Drop</p>
                  <p className="font-semibold">{destinationLocation}</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center text-black">
            <div className="mb-8">
              <h1 className="text-2xl font-bold mb-4 text-black">
                Driver Found!
              </h1>
            </div>

            <div className="mb-12">
              <img
                src={ride.img}
                alt={ride.name}
                className="w-48 h-36 object-contain mx-auto mb-6 drop-shadow-lg"
              />
              <h2 className="text-2xl font-bold text-black mb-2">
                {ride.name}
              </h2>
              <p className="text-gray-600 mb-4">{ride.desc}</p>

              <div className="flex justify-center gap-6 mb-8">
                <span className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full text-sm font-semibold">
                  <User className="w-5 h-5" /> {ride.seats} seats
                </span>
                <span className="bg-gray-200 text-black px-6 py-3 rounded-full text-sm font-semibold">
                  {ride.price}
                </span>
              </div>
            </div>

            <div className="max-w-md mx-auto mb-8">
              <div className="bg-gray-100 rounded-2xl p-6 mb-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center text-white font-bold text-xl">
                    AB
                  </div>
                  <div className="text-left">
                    <h3 className="text-xl font-bold text-black">
                      Arijit Banerjee
                    </h3>
                    <p className="text-gray-600">WBAE2837</p>
                    <p className="text-gray-600">Maruti-800A</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <Button className={`absolute bottom-0 m-4 flex w-40 `}>
          {isFound ? "Confirm Ride" : "Cancel Ride"}
        </Button>
      </div>
    </div>
  );
};

export default SearchingDrive;
