import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { MapPin, Clock, Phone, User } from "lucide-react";

const CaptainPickup = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [arrivalTime] = useState("2 min");

  const handleStartRide = () => {
    if (otp === "1234") {
      navigate("/captain-riding");
    } else {
      alert("Invalid OTP. Try 1234");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-black text-white p-4">
        <div className="max-w-md mx-auto">
          <h1 className="text-xl font-semibold">Going to pickup</h1>
          <p className="text-sm text-gray-300">Arriving in {arrivalTime}</p>
        </div>
      </header>

      <div className="max-w-md mx-auto p-4 space-y-4">
        {/* Map View */}
        <Card>
          <CardContent className="p-4">
            <div className="h-64 bg-gray-200 rounded-lg flex items-center justify-center mb-4">
              <div className="text-center">
                <MapPin className="w-12 h-12 mx-auto mb-2 text-gray-500" />
                <p className="text-gray-600">Navigation to pickup</p>
                <p className="text-sm text-gray-500">123 Main Street</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-500" />
                <span className="text-sm">ETA: {arrivalTime}</span>
              </div>
              <div className="text-sm text-gray-600">2.3 miles</div>
            </div>
          </CardContent>
        </Card>

        {/* Passenger Info */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Passenger Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-gray-600" />
                </div>
                <div>
                  <p className="font-semibold">Sarah Johnson</p>
                  <p className="text-sm text-gray-600">⭐ 4.8 rating</p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                <Phone className="w-4 h-4" />
              </Button>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <div>
                  <p className="font-medium">123 Main Street</p>
                  <p className="text-sm text-gray-600">Pickup location</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div>
                  <p className="font-medium">456 Oak Avenue</p>
                  <p className="text-sm text-gray-600">Destination</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* OTP Section */}
        <Card>
          <CardHeader>
            <CardTitle>Start Ride</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                Ask the passenger for the OTP to start the ride
              </p>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Enter OTP
                </label>
                <Input
                  type="text"
                  placeholder="Enter 4-digit OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  maxLength={4}
                  className="text-center text-lg tracking-widest"
                />
              </div>
              <Button
                onClick={handleStartRide}
                className="w-full bg-green-500 hover:bg-green-600 text-white"
                disabled={otp.length !== 4}
              >
                Start Ride
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="flex gap-3">
          <Button variant="outline" className="flex-1">
            Call Passenger
          </Button>
          <Button variant="outline" className="flex-1">
            I've Arrived
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CaptainPickup;
