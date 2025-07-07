import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { MapPin, Clock, Navigation, DollarSign } from "lucide-react";

const CaptainRiding = () => {
  const navigate = useNavigate();
  const [timeRemaining, setTimeRemaining] = useState("12 min");
  const [distance, setDistance] = useState("2.3 mi");
  const [fare] = useState("$12.50");

  const handleEndRide = () => {
    navigate("/captain-payment");
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-black text-white p-4">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold">En route to destination</h1>
            <p className="text-sm text-gray-300">Trip in progress</p>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold">{fare}</p>
            <p className="text-xs text-gray-300">Trip fare</p>
          </div>
        </div>
      </header>

      <div className="max-w-md mx-auto p-4 space-y-4">
        {/* Navigation Map */}
        <Card>
          <CardContent className="p-4">
            <div className="h-80 bg-gray-200 rounded-lg flex items-center justify-center mb-4 relative">
              <div className="text-center">
                <Navigation className="w-16 h-16 mx-auto mb-3 text-blue-500" />
                <p className="text-gray-600 font-medium">Navigation Active</p>
                <p className="text-sm text-gray-500">Turn left in 0.2 miles</p>
              </div>
              {/* Speed indicator */}
              <div className="absolute top-4 right-4 bg-black text-white px-3 py-1 rounded-full text-sm">
                35 mph
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium">
                  {timeRemaining} remaining
                </span>
              </div>
              <div className="text-sm text-gray-600">{distance} to go</div>
            </div>
          </CardContent>
        </Card>

        {/* Trip Details */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Trip Details</h3>
              <span className="text-sm text-gray-600">UberX</span>
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-full mt-1"></div>
                <div className="flex-1">
                  <p className="font-medium">123 Main Street</p>
                  <p className="text-sm text-gray-600">Pickup completed</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-3 h-3 bg-red-500 rounded-full mt-1"></div>
                <div className="flex-1">
                  <p className="font-medium">456 Oak Avenue</p>
                  <p className="text-sm text-gray-600">Destination</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button variant="outline" className="w-full">
            Contact Support
          </Button>

          <Button
            onClick={handleEndRide}
            className="w-full bg-red-500 hover:bg-red-600 text-white"
          >
            End Ride
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CaptainRiding;
