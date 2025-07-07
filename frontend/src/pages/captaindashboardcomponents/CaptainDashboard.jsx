import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useNavigate } from "react-router-dom";
import { User, MapPin, Clock, Star } from "lucide-react";
import RideNotification from "@/components/RideNotification";

const CaptainDashboard = () => {
  const navigate = useNavigate();
  const [isOnline, setIsOnline] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [earnings, setEarnings] = useState(125.5);

  useEffect(() => {
    // Simulate incoming ride request when online
    if (isOnline) {
      const timer = setTimeout(() => {
        setShowNotification(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isOnline]);

  const handleAcceptRide = () => {
    setShowNotification(false);
    navigate("/captain-pickup");
  };

  const handleDeclineRide = () => {
    setShowNotification(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-black text-white p-4">
        <div className="max-w-md mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <User className="w-8 h-8 bg-gray-800 p-1 rounded-full" />
            <div>
              <h1 className="text-lg font-semibold">Captain John</h1>
              <p className="text-sm text-gray-300">Toyota Camry • ABC 123</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm">{isOnline ? "Online" : "Offline"}</span>
            <Switch checked={isOnline} onCheckedChange={setIsOnline} />
          </div>
        </div>
      </header>

      <div className="max-w-md mx-auto p-4 space-y-4">
        {/* Status Card */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className={`w-3 h-3 rounded-full ${
                    isOnline ? "bg-green-500" : "bg-gray-400"
                  }`}
                ></div>
                <span className="font-medium">
                  {isOnline ? "You are online" : "You are offline"}
                </span>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold">${earnings}</p>
                <p className="text-sm text-gray-600">Today's earnings</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Map View */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Your Location
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gray-200 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-12 h-12 mx-auto mb-2 text-gray-500" />
                <p className="text-gray-600">Map would appear here</p>
                <p className="text-sm text-gray-500">
                  Downtown Area, Main Street
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold">4.9</div>
              <div className="text-sm text-gray-600 flex items-center justify-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                Rating
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold">12</div>
              <div className="text-sm text-gray-600">Rides Today</div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Recent Rides
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">Downtown to Airport</p>
                  <p className="text-sm text-gray-600">15 min ago</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">+$25.00</p>
                </div>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">Mall to Office</p>
                  <p className="text-sm text-gray-600">1 hour ago</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">+$12.50</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Ride Notification Popup */}
      {showNotification && (
        <RideNotification
          onAccept={handleAcceptRide}
          onDecline={handleDeclineRide}
        />
      )}
    </div>
  );
};

export default CaptainDashboard;
