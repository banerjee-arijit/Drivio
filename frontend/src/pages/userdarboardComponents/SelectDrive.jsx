import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, User, Clock } from "lucide-react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { useTripStore } from "@/store/tripStore";

const SelectDrive = () => {
  const navigate = useNavigate();
  const pickup = useTripStore((state) => state.pickup);
  const destination = useTripStore((state) => state.destination);
  const selectedVehicle = useTripStore((state) => state.selectedVehicle);
  const setSelectedVehicle = useTripStore((state) => state.setSelectedVehicle);
  const [fares, setFares] = useState({});
  const [loadingFares, setLoadingFares] = useState(false);
  const [fareError, setFareError] = useState(null);

  const rideOptions = [
    {
      id: 1,
      name: "RideShare",
      vehicleType: "car",
      img: "https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png",
      seats: 4,
      time: "2 mins away",
      desc: "Affordable, compact ride",
    },
    {
      id: 2,
      name: "RideShare XL",
      vehicleType: "largecar",
      img: "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1596627972/assets/e7/e861a8-30ec-4d57-8045-7186f6c5ec35/original/comfort.png",
      seats: 6,
      time: "3 mins away",
      desc: "Spacious ride for more people",
    },
    {
      id: 3,
      name: "Auto",
      vehicleType: "auto",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiYZNGPspo5yDiYR9DP05wsjLh1skE79Jfng&s",
      seats: 3,
      time: "6 mins away",
      desc: "Quick and economical",
    },
    {
      id: 4,
      name: "Moto",
      vehicleType: "bike",
      img: "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png",
      seats: 1,
      time: "2 mins away",
      desc: "Fast ride",
    },
  ];

  React.useEffect(() => {
    const fetchFares = async () => {
      if (!pickup || !destination) return;
      setLoadingFares(true);
      setFareError(null);
      try {
        const results = await Promise.all(
          rideOptions.map(async (ride) => {
            const res = await axios.get(
              "http://localhost:3000/api/rides/get-fare",
              {
                params: {
                  pickup,
                  destination,
                  vehicleType: ride.vehicleType,
                },
                withCredentials: true,
              }
            );
            return { id: ride.id, fare: res.data.fare };
          })
        );
        const fareMap = {};
        results.forEach(({ id, fare }) => {
          fareMap[id] = fare;
        });
        setFares(fareMap);
      } catch (err) {
        setFareError("Failed to fetch fares");
      } finally {
        setLoadingFares(false);
      }
    };
    fetchFares();
  }, [pickup, destination]);

  const handleContinue = () => {
    if (selectedVehicle) {
      navigate("/searching");
    }
  };

  const handleSelectRide = (ride) => {
    setSelectedVehicle(ride.vehicleType);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <button
              onClick={() => navigate("/search")}
              className="p-2 text-gray-600 hover:text-black transition-colors mr-4"
            >
              <ArrowLeft className="h-6 w-6" />
            </button>
            <h1 className="text-xl font-semibold text-black">Choose a ride</h1>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Trip Details */}
        <div className="bg-gray-50 rounded-2xl p-6 mb-6">
          <div className="flex items-center space-x-4 mb-4">
            <div className="bg-black rounded-full w-3 h-3"></div>
            <span className="text-gray-600">{pickup}</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="bg-gray-400 rounded-full w-3 h-3"></div>
            <span className="text-gray-600">{destination}</span>
          </div>
          <div className="mt-4 flex items-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>20 min trip</span>
            </div>
            <span>•</span>
            <span>8.5 km</span>
          </div>
        </div>

        {/* Select Your Ride */}
        <div className="mt-2 sm:mt-4 bg-gray-50 rounded-lg shadow p-2 sm:p-4 mb-24">
          <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-4 text-black">
            Select Your Ride
          </h3>
          <div className="flex flex-col gap-3 sm:gap-4">
            {rideOptions.map((ride) => (
              <div
                key={ride.id}
                onClick={() => handleSelectRide(ride)}
                className={`flex flex-col sm:flex-row items-center justify-between p-3 sm:p-4 rounded-lg shadow hover:shadow-md transition cursor-pointer gap-2 sm:gap-4 active:scale-[0.98] ${
                  selectedVehicle === ride.vehicleType
                    ? "bg-black text-white"
                    : "bg-white hover:bg-gray-50"
                }`}
              >
                <div className="flex flex-row sm:flex-col items-center gap-3 sm:gap-4 w-full sm:w-auto">
                  <img
                    src={ride.img}
                    alt={ride.name}
                    className="w-20 h-12 sm:w-24 sm:h-16 object-contain flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4
                      className={`text-sm sm:text-md font-semibold flex items-center gap-1 truncate ${
                        selectedVehicle === ride.vehicleType
                          ? "text-white"
                          : "text-gray-800"
                      }`}
                    >
                      {ride.name}
                      <span
                        className={`flex items-center gap-1 text-xs sm:text-sm ml-2 ${
                          selectedVehicle === ride.vehicleType
                            ? "text-gray-300"
                            : "text-gray-600"
                        }`}
                      >
                        <User className="w-4 h-4" />
                        {ride.seats}
                      </span>
                    </h4>
                    <p
                      className={`text-xs sm:text-sm truncate ${
                        selectedVehicle === ride.vehicleType
                          ? "text-gray-300"
                          : "text-gray-500"
                      }`}
                    >
                      {ride.time}
                    </p>
                    <p
                      className={`text-xs truncate ${
                        selectedVehicle === ride.vehicleType
                          ? "text-gray-400"
                          : "text-gray-400"
                      }`}
                    >
                      {ride.desc}
                    </p>
                  </div>
                </div>
                <div className="text-right w-full sm:w-auto mt-2 sm:mt-0">
                  <span
                    className={`text-base sm:text-lg font-bold ${
                      selectedVehicle === ride.vehicleType
                        ? "text-white"
                        : "text-black"
                    }`}
                  >
                    {loadingFares
                      ? "..."
                      : fares[ride.id] !== undefined
                      ? `₹${fares[ride.id]}`
                      : "-"}
                  </span>
                </div>
              </div>
            ))}
          </div>
          {fareError && (
            <div className="text-red-500 text-center my-2">{fareError}</div>
          )}
        </div>

        {/* Continue Button */}
        <div className="fixed bottom-6 left-4 right-4 max-w-7xl mx-auto">
          <Button
            onClick={handleContinue}
            disabled={!selectedVehicle}
            className="w-full bg-black text-white p-6 rounded-md font-semibold text-lg disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-gray-800 transition-colors"
          >
            {selectedVehicle
              ? `Trip with ${
                  rideOptions.find((r) => r.vehicleType === selectedVehicle)
                    ?.name
                }`
              : "Select a ride"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SelectDrive;
