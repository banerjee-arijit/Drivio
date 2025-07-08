import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useNavigate } from "react-router-dom";
import { User, MapPin, Clock, Star } from "lucide-react";
import RideNotification from "@/components/RideNotification";
import axios from "axios";
import { useSocketStore } from "../../store/socketStore";

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

function getUserIdFromToken() {
  const token = getCookie("token");
  if (!token) return null;
  try {
    const payload = token.split(".")[1];
    const decoded = JSON.parse(atob(payload));
    return decoded.id;
  } catch (e) {
    return null;
  }
}

const CaptainDashboard = () => {
  const navigate = useNavigate();
  const [isOnline, setIsOnline] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [earnings, setEarnings] = useState(125.5);
  const [captainName, setCaptainName] = useState("Captain");
  const [loading, setLoading] = useState(true);
  const [statusError, setStatusError] = useState("");
  const [rideRequest, setRideRequest] = useState(null);
  const { sendMessage, onMessage } = useSocketStore();

  useEffect(() => {
    // Socket join logic using cookie token
    const userId = getUserIdFromToken();
    if (userId) {
      sendMessage("join", { userId, userType: "driver" });
    }
    // Listen for messages
    onMessage("message", (msg) => {
      console.log("Received message:", msg);
    });
  }, []);

  // Send captain's location to server every 10 seconds via socket.io
  useEffect(() => {
    let intervalId = null;

    // Helper to get current position
    const sendLocation = () => {
      if (!navigator.geolocation) return;
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const userId = getUserIdFromToken();
          if (userId) {
            const locationData = {
              userId,
              location: { lat: latitude, lng: longitude },
            };
            // console.log("Emitting updateLocationCaptain:", locationData);
            sendMessage("updateLocationCaptain", locationData);
          }
        },
        (err) => {
          // Optionally handle error
        }
      );
    };

    intervalId = setInterval(sendLocation, 10000);
    sendLocation();
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    onMessage("new-ride", (msg) => {
      // msg may be { event: 'new-ride', data: ride }
      const ride = msg?.data || msg;
      console.log("New ride received:", ride);
      setRideRequest(ride);
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 5000);
    });
  }, [onMessage]);

  // Fetch captain profile on mount
  useEffect(() => {
    const fetchCaptainProfile = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "http://localhost:3000/api/drivers/profile",
          {
            withCredentials: true,
          }
        );

        if (response.data && response.data.driver) {
          setCaptainName(response.data.driver.username || "Captain");
        }
      } catch (error) {
        console.error("❌ Failed to fetch captain profile", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCaptainProfile();
  }, []);

  // Handle online/offline toggle
  const handleStatusToggle = async (checked) => {
    setStatusError("");
    try {
      const response = await axios.patch(
        "http://localhost:3000/api/drivers/status",
        { status: checked ? "online" : "offline" },
        { withCredentials: true }
      );
      if (response.data && response.data.driver) {
        setIsOnline(response.data.driver.currentStatus === "online");
      }
    } catch (error) {
      setStatusError(
        error.response?.data?.message || "Failed to update status."
      );
    }
  };

  // Accept/Decline ride handlers
  const handleAcceptRide = () => {
    setShowNotification(false);
    if (rideRequest) {
      navigate("/captain-pickup");
    }
    setRideRequest(null);
  };

  const handleDeclineRide = () => {
    setShowNotification(false);
    if (rideRequest) {
      // No socket.io emit for now, just navigate
      navigate("/captain-pickup");
    }
    setRideRequest(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-black text-white p-4">
        <div className="max-w-md mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <User className="w-8 h-8 bg-gray-800 p-1 rounded-full" />
            <div>
              <h1 className="text-lg font-semibold">
                {loading ? "Loading..." : `Captain ${captainName}`}
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm">{isOnline ? "Online" : "Offline"}</span>
            <Switch checked={isOnline} onCheckedChange={handleStatusToggle} />
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
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

        {/* Recent Rides */}
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
      {showNotification && rideRequest && (
        <RideNotification
          pickup={rideRequest.pickup}
          destination={rideRequest.destination}
          fare={rideRequest.fare}
          vehicleType={rideRequest.vehicleType}
          onAccept={handleAcceptRide}
          onDecline={handleDeclineRide}
        />
      )}
      {/* Show error if status update fails */}
      {statusError && (
        <div className="max-w-md mx-auto p-2 mt-2 bg-red-100 text-red-700 border border-red-400 rounded">
          {statusError}
        </div>
      )}
    </div>
  );
};

export default CaptainDashboard;
