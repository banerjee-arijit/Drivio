import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Phone,
  MessageCircle,
  User,
  CreditCard,
  Smartphone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTripStore } from "@/store/tripStore";
import { useSocketStore } from "@/store/socketStore";

const ConfirmRide = () => {
  const navigate = useNavigate();
  const [selectedPayment, setSelectedPayment] = useState("card");

  const rideDetails = useTripStore((state) => state.rideDetails); // ✅ Fetch ride details from store
  const setRideDetails = useTripStore((state) => state.setRideDetails);

  const { onMessage, offMessage } = useSocketStore(); // ✅ Use offMessage if available

  const handleConfirmRide = () => {
    navigate("/riding");
  };

  const driver = rideDetails?.driver;

  if (!driver) {
    return (
      <div className="min-h-screen bg-white">
        {/* Header */}
        <header className="bg-black text-white p-4">
          <div className="max-w-md mx-auto flex items-center gap-4">
            <button
              className="text-white hover:bg-gray-800 p-2 rounded transition-colors"
              onClick={() => navigate("/searching")}
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-semibold">Confirm your ride</h1>
          </div>
        </header>

        <div className="max-w-md mx-auto p-4 space-y-4">
          {/* Driver Info */}
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">
                      {driver?.name || "Driver Name"}
                    </p>
                    <p className="text-sm text-gray-600">
                      {driver?.vehicle || "Vehicle"} •{" "}
                      {driver?.plate || "XYZ 0000"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Trip Details */}
          <div className="border border-gray-200 rounded-lg">
            <div className="p-4">
              <div className="space-y-3 mb-4">
                <div className="flex items-start gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full mt-1"></div>
                  <div>
                    <p className="text-sm font-medium">
                      {rideDetails?.pickupLocation || "-"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-3 h-3 bg-red-500 rounded-full mt-1"></div>
                  <div>
                    <p className="text-sm font-medium">
                      {rideDetails?.destination || "-"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    RideShare • 20 min • 8.5 km
                  </span>
                  <span className="font-semibold">3:45 PM pickup</span>
                </div>
              </div>
            </div>
          </div>

          {/* Price Breakdown */}
          <div className="border border-gray-200 rounded-lg">
            <div className="p-4 pb-3">
              <h3 className="text-lg font-semibold">Price details</h3>
            </div>
            <div className="px-4 pb-4 space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Trip fare</span>
                <span>{rideDetails ? `₹${rideDetails.fare}` : "-"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Service fee</span>
                <span>₹25.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Taxes & tolls</span>
                <span>₹12.50</span>
              </div>
              <div className="border-t border-gray-200 pt-3 flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>{rideDetails ? `₹${rideDetails.fare}` : "-"}</span>
              </div>
            </div>
          </div>

          {/* Confirm Button */}
          <Button
            onClick={handleConfirmRide}
            className="w-full bg-black hover:bg-gray-800 text-white font-semibold p-6 text-lg rounded-lg transition-colors"
          >
            Confirm Ride
          </Button>

          <p className="text-xs text-gray-500 text-center px-4">
            By confirming your ride, you agree to the terms and conditions.
          </p>
        </div>
      </div>
    );
  }
};

export default ConfirmRide;
