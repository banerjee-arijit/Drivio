import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { X, Clock } from "lucide-react";
import { useTripStore } from "@/store/tripStore";
import { useSocketStore } from "@/store/socketStore"; // ✅ Import socket store
import axios from "axios";

const SearchingDrive = () => {
  const navigate = useNavigate();
  const [searchTime, setSearchTime] = useState(0);
  const [foundDriver, setFoundDriver] = useState(false);

  const pickup = useTripStore((state) => state.pickup);
  const destination = useTripStore((state) => state.destination);
  const selectedVehicle = useTripStore((state) => state.selectedVehicle);
  const rideDetails = useTripStore((state) => state.rideDetails);
  const setRideDetails = useTripStore((state) => state.setRideDetails);

  const { onMessage, offMessage } = useSocketStore(); // ✅ Destructure socket listeners

  useEffect(() => {
    if (!pickup || !destination || !selectedVehicle) {
      console.warn("Missing trip data, redirecting...");
      navigate("/select-drive");
    }
  }, [pickup, destination, selectedVehicle, navigate]);

  useEffect(() => {
    const timer = setInterval(() => {
      setSearchTime((prev) => prev + 1);
    }, 1000);

    const driverTimer = setTimeout(async () => {
      setFoundDriver(true);
      try {
        const userRes = await axios.get(
          "http://localhost:3000/api/users/profile",
          { withCredentials: true }
        );
        const userId = userRes.data.user?._id;
        if (!userId) throw new Error("User not found");

        const res = await axios.post(
          "http://localhost:3000/api/rides/create",
          {
            userId,
            pickupLocation: pickup,
            destination: destination,
            vehicleType: selectedVehicle,
          },
          { withCredentials: true }
        );

        setRideDetails(res.data);
        console.log("Ride created:", res.data);
      } catch (err) {
        console.error(
          "Ride creation failed:",
          err.response?.data || err.message
        );
        setRideDetails({ error: "Failed to create ride" });
      }

      // ⛔️ DO NOT navigate here. Wait for driver confirmation via socket.
      // setTimeout(() => {
      //   navigate("/confirm");
      // }, 2000);
    }, 2000);

    return () => {
      clearInterval(timer);
      clearTimeout(driverTimer);
    };
  }, [navigate, pickup, destination, selectedVehicle, setRideDetails]);

  // ✅ NEW: Listen for driver confirmation via socket
  useEffect(() => {
    const handler = (msg) => {
      console.log("Ride confirmed by driver:", msg);
      setRideDetails((prev) => ({
        ...prev,
        driver: {
          name: msg.driver.name,
          vehicle: msg.driver.vehicle,
          plate: msg.driver.plate,
          driverId: msg.driver.driverId,
        },
        rideId: msg.rideId,
      }));
      navigate("/confirm");
    };
    onMessage("ride-confirmed", handler);

    return () => {
      offMessage?.("ride-confirmed", handler);
    };
  }, [onMessage, offMessage, setRideDetails, navigate]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleCancel = () => {
    navigate("/select-drive");
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-xl font-semibold text-black">
              {foundDriver ? "Driver found!" : "Finding your ride..."}
            </h1>
            <button
              onClick={handleCancel}
              className="p-2 text-gray-600 hover:text-black transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto mt-10 px-4 sm:px-6 lg:px-8 py-6">
        <div className="text-center mb-8">
          <div className="relative mx-auto mb-6">
            <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
              <img
                src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png"
                alt="logo"
              />
            </div>

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-40 h-40 border-2 border-black rounded-full animate-ping opacity-20"></div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="w-48 h-48 border-2 border-black rounded-full animate-ping opacity-10"
                style={{ animationDelay: "0.5s" }}
              ></div>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-black mb-2">
            {foundDriver
              ? "Great! We found your driver"
              : "Looking for nearby drivers"}
          </h2>
          <p className="text-gray-600 mb-4">
            {foundDriver
              ? "Your driver is on the way"
              : "This usually takes less than a minute"}
          </p>

          <div className="bg-gray-50 rounded-xl p-4 inline-block">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-gray-600" />
              <span className="text-lg font-mono">
                {formatTime(searchTime)}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-2xl p-6 mb-6">
          <h3 className="font-semibold text-black mb-4">Trip details</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-4">
              <div className="bg-black rounded-full w-3 h-3"></div>
              <span className="text-gray-600">{pickup}</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-gray-400 rounded-full w-3 h-3"></div>
              <span className="text-gray-600">{destination}</span>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">{selectedVehicle || "-"}</span>
              <span className="font-semibold text-black">₹12.50</span>
            </div>
          </div>
        </div>

        {foundDriver && (
          <div className="bg-green-50 border border-green-200 rounded-2xl p-6 mb-6">
            <div className="text-center">
              <div className="bg-green-500 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <img
                  src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png"
                  alt=""
                />
              </div>
              <h3 className="font-semibold text-green-800 mb-2">
                Driver found!
              </h3>
              <p className="text-green-700">
                Connecting you with your driver...
              </p>
            </div>
          </div>
        )}

        {foundDriver && rideDetails && (
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-6">
            <div className="text-center">
              <h3 className="font-semibold text-blue-800 mb-2">Ride Details</h3>
              {rideDetails.error ? (
                <p className="text-red-600">{rideDetails.error}</p>
              ) : (
                <>
                  <p>Pickup: {rideDetails.pickupLocation}</p>
                  <p>Destination: {rideDetails.destination}</p>
                  <p>Vehicle: {rideDetails.vehicleType}</p>
                  <p>Fare: ₹{rideDetails.fare}</p>
                </>
              )}
            </div>
          </div>
        )}

        <div className="fixed bottom-6 left-4 right-4 max-w-7xl mx-auto">
          <button
            onClick={handleCancel}
            className="w-full bg-gray-100 text-black py-4 rounded-xl font-semibold text-lg hover:bg-gray-200 transition-colors"
          >
            Cancel request
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchingDrive;
