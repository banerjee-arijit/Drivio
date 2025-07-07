import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Car,
  MapPin,
  Clock,
  User,
  Star,
  Menu,
  Plus,
  Home,
  Building2,
} from "lucide-react";

const UserDashboard = () => {
  const navigate = useNavigate();

  const quickDestinations = [
    { name: "Home", icon: Home, address: "123 Main St" },
    { name: "Work", icon: Building2, address: "456 Business Ave" },
    { name: "Airport", icon: MapPin, address: "Airport Terminal" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <span className="text-xl font-bold">Drivio</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black mb-2">
            Good afternoon, John
          </h1>
          <p className="text-gray-600">Where would you like to go today?</p>
        </div>

        {/* Search Bar */}
        <div className="bg-gray-50 rounded-2xl p-6 mb-8">
          <button
            onClick={() => navigate("/search")}
            className="w-full bg-white rounded-xl p-4 flex items-center space-x-4 hover:shadow-md transition-shadow"
          >
            <div className="bg-black rounded-full w-3 h-3"></div>
            <span className="text-gray-500 text-left flex-1">Where to?</span>
            <MapPin className="h-5 w-5 text-gray-400" />
          </button>
        </div>

        {/* Quick Destinations */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-black mb-4">
            Quick destinations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {quickDestinations.map((dest, index) => (
              <button
                key={index}
                onClick={() => navigate("/search")}
                className="bg-gray-50 rounded-xl p-4 text-left hover:shadow-md transition-shadow"
              >
                <div className="flex items-center space-x-3">
                  <div className="bg-black rounded-full w-10 h-10 flex items-center justify-center">
                    <dest.icon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-black">{dest.name}</h3>
                    <p className="text-sm text-gray-600">{dest.address}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
