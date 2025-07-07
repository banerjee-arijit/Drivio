import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, Search, Clock, Star, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const LocalSearchPanel = () => {
  const navigate = useNavigate();
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [showPickupResults, setShowPickupResults] = useState(false);
  const [showDestinationResults, setShowDestinationResults] = useState(false);

  const QuickPickUp = [
    { name: "Home", address: "123 Main Street, Downtown", icon: "🏠" },
    { name: "Work", address: "456 Business Ave, City Center", icon: "🏢" },
    { name: "Airport", address: "Airport Terminal, International", icon: "✈️" },
  ];

  const searchResults = [
    {
      name: "Central Park",
      address: "New York, NY",
      type: "Popular destination",
    },
    { name: "Times Square", address: "New York, NY", type: "Tourist spot" },
    { name: "Brooklyn Bridge", address: "New York, NY", type: "Landmark" },
  ];

  const handleContinue = () => {
    if (pickup && destination) {
      navigate("/select-drive");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <button
              onClick={() => navigate("/dashboard")}
              className="p-2 text-gray-600 hover:text-black transition-colors mr-4"
            >
              <ArrowLeft className="h-6 w-6" />
            </button>
            <h1 className="text-xl font-semibold text-black">Where to?</h1>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Search Form */}
        <div className="bg-gray-50 rounded-2xl p-6 mb-6">
          <div className="space-y-4">
            {/* Pickup Location */}
            <div className="relative">
              <div className="flex items-center space-x-4">
                <div className="bg-black rounded-full w-3 h-3 flex-shrink-0"></div>
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Pickup location"
                    value={pickup}
                    onChange={(e) => setPickup(e.target.value)}
                    onFocus={() => setShowPickupResults(true)}
                    className="w-full bg-[#eeee] rounded-xl p-4 border-none focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
              </div>
            </div>

            {/* Destination */}
            <div className="relative">
              <div className="flex items-center space-x-4">
                <div className="bg-gray-400 rounded-full w-3 h-3 flex-shrink-0"></div>
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Where to?"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    onFocus={() => setShowDestinationResults(true)}
                    className="w-full bg-[#eeee] rounded-xl p-4 border-none focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Places */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-black mb-4">
            Recent places
          </h2>
          <div className="space-y-3">
            {QuickPickUp.map((place, index) => (
              <button
                key={index}
                onClick={() => {
                  if (!pickup) {
                    setPickup(place.address);
                  } else {
                    setDestination(place.address);
                  }
                }}
                className="w-full bg-gray-50 rounded-xl p-4 text-left hover:shadow-md transition-shadow"
              >
                <div className="flex items-center space-x-4">
                  <div className="bg-black rounded-full w-10 h-10 flex items-center justify-center">
                    <span className="text-white text-sm">{place.icon}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-black">{place.name}</h3>
                    <p className="text-sm text-gray-600">{place.address}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Search Results */}
        {(showPickupResults || showDestinationResults) && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-black mb-4">
              Search results
            </h2>
            <div className="space-y-3">
              {searchResults.map((result, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (showPickupResults) {
                      setPickup(result.address);
                      setShowPickupResults(false);
                    } else {
                      setDestination(result.address);
                      setShowDestinationResults(false);
                    }
                  }}
                  className="w-full bg-gray-50 rounded-xl p-4 text-left hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center space-x-4 mb-9">
                    <div className="bg-gray-200 rounded-full w-10 h-10 flex items-center justify-center">
                      <MapPin className="h-5 w-5 text-gray-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-black">
                        {result.name}
                      </h3>
                      <p className="text-sm text-gray-600">{result.address}</p>
                      <p className="text-xs text-gray-500">{result.type}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Continue Button */}
        <div className="fixed bottom-6 left-4 right-4 max-w-7xl mx-auto">
          <Button
            onClick={handleContinue}
            disabled={!pickup || !destination}
            className="w-full bg-black text-white p-6 rounded-md font-semibold text-lg disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-gray-800 transition-colors"
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LocalSearchPanel;
