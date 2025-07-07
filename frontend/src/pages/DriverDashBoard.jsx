import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import axios from "axios";

const DriverDashBoard = () => {
  const navigate = useNavigate();
  const [driverProfile, setDriverProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentStatus, setCurrentStatus] = useState("offline");

  useEffect(() => {
    fetchDriverProfile();
  }, []);

  const fetchDriverProfile = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/drivers/profile",
        {
          withCredentials: true,
        }
      );
      setDriverProfile(response.data.driver);
      setCurrentStatus(response.data.driver.currentStatus || "offline");
      setLoading(false);
    } catch (error) {
      console.error("Error fetching profile:", error);
      setError("Failed to load profile");
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:3000/api/drivers/logout", {
        withCredentials: true,
      });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      navigate("/driver/login");
    }
  };

  const handleStatusChange = async (newStatus) => {
    try {
      // You would need to implement this endpoint in the backend
      await axios.patch(
        "http://localhost:3000/api/drivers/status",
        {
          status: newStatus,
        },
        {
          withCredentials: true,
        }
      );
      setCurrentStatus(newStatus);
    } catch (error) {
      console.error("Status update error:", error);
      setError("Failed to update status");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">
              Driver Dashboard
            </h1>
            <Button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700"
            >
              Logout
            </Button>
          </div>

          {driverProfile && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Profile Information */}
              <div className="lg:col-span-1">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-blue-800 mb-4 text-lg">
                    Profile Information
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <span className="font-medium text-gray-700">Name:</span>
                      <p className="text-blue-600">{driverProfile.username}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Email:</span>
                      <p className="text-blue-600">{driverProfile.email}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Status:</span>
                      <span
                        className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                          currentStatus === "online"
                            ? "bg-green-100 text-green-800"
                            : currentStatus === "onTrip"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {currentStatus}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Vehicle Information */}
              <div className="lg:col-span-1">
                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-green-800 mb-4 text-lg">
                    Vehicle Details
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <span className="font-medium text-gray-700">
                        Vehicle Type:
                      </span>
                      <p className="text-green-600 capitalize">
                        {driverProfile.vehicle?.vehicleType}
                      </p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">
                        Vehicle Number:
                      </span>
                      <p className="text-green-600">
                        {driverProfile.vehicle?.vehicleNumber}
                      </p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">
                        Capacity:
                      </span>
                      <p className="text-green-600">
                        {driverProfile.vehicle?.capacity} passengers
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Status Management */}
              <div className="lg:col-span-1">
                <div className="bg-purple-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-purple-800 mb-4 text-lg">
                    Status Management
                  </h3>
                  <div className="space-y-3">
                    <Button
                      onClick={() => handleStatusChange("online")}
                      className={`w-full ${
                        currentStatus === "online"
                          ? "bg-green-600 hover:bg-green-700"
                          : "bg-gray-600 hover:bg-gray-700"
                      }`}
                    >
                      Go Online
                    </Button>
                    <Button
                      onClick={() => handleStatusChange("offline")}
                      className={`w-full ${
                        currentStatus === "offline"
                          ? "bg-red-600 hover:bg-red-700"
                          : "bg-gray-600 hover:bg-gray-700"
                      }`}
                    >
                      Go Offline
                    </Button>
                    <Button
                      onClick={() => handleStatusChange("onTrip")}
                      className={`w-full ${
                        currentStatus === "onTrip"
                          ? "bg-yellow-600 hover:bg-yellow-700"
                          : "bg-gray-600 hover:bg-gray-700"
                      }`}
                    >
                      On Trip
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Additional Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            <div className="bg-orange-50 p-4 rounded-lg">
              <h3 className="font-semibold text-orange-800 mb-2">Earnings</h3>
              <p className="text-orange-600">
                Track your daily and weekly earnings here.
              </p>
            </div>

            <div className="bg-indigo-50 p-4 rounded-lg">
              <h3 className="font-semibold text-indigo-800 mb-2">
                Trip History
              </h3>
              <p className="text-indigo-600">
                View your completed trips and ratings.
              </p>
            </div>

            <div className="bg-teal-50 p-4 rounded-lg">
              <h3 className="font-semibold text-teal-800 mb-2">Location</h3>
              <p className="text-teal-600">
                Update your current location for better ride matching.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverDashBoard;
