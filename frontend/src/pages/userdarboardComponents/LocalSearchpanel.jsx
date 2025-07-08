import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, Search, Clock, Star, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useTripStore } from "@/store/tripStore";

const LocalSearchPanel = () => {
  const navigate = useNavigate();
  const pickup = useTripStore((state) => state.pickup);
  const destination = useTripStore((state) => state.destination);
  const setPickup = useTripStore((state) => state.setPickup);
  const setDestination = useTripStore((state) => state.setDestination);
  const [showPickupResults, setShowPickupResults] = useState(false);
  const [showDestinationResults, setShowDestinationResults] = useState(false);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const [suggestionError, setSuggestionError] = useState("");
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [loadingPickupSuggestions, setLoadingPickupSuggestions] =
    useState(false);
  const [pickupSuggestionError, setPickupSuggestionError] = useState("");

  const handleContinue = () => {
    if (pickup && destination) {
      navigate("/select-drive");
    }
  };

  const handleDestinationChange = async (e) => {
    const value = e.target.value;
    setDestination(value);
    setShowDestinationResults(true);
    setSuggestionError("");
    if (value.length >= 3) {
      setLoadingSuggestions(true);
      try {
        const response = await axios.get(
          "http://localhost:3000/api/maps/get-suggestions",
          {
            params: { input: value },
            withCredentials: true,
          }
        );
        console.log("Suggestions response:", response.data);
        setDestinationSuggestions(response.data.suggestions || []);
      } catch (err) {
        setSuggestionError("Failed to fetch suggestions");
        setDestinationSuggestions([]);
      } finally {
        setLoadingSuggestions(false);
      }
    } else {
      setDestinationSuggestions([]);
    }
  };

  const handlePickupChange = async (e) => {
    const value = e.target.value;
    setPickup(value);
    setShowPickupResults(true);
    setPickupSuggestionError("");
    if (value.length >= 3) {
      setLoadingPickupSuggestions(true);
      try {
        const response = await axios.get(
          "http://localhost:3000/api/maps/get-suggestions",
          {
            params: { input: value },
            withCredentials: true,
          }
        );
        setPickupSuggestions(response.data.suggestions || []);
      } catch (err) {
        setPickupSuggestionError("Failed to fetch suggestions");
        setPickupSuggestions([]);
      } finally {
        setLoadingPickupSuggestions(false);
      }
    } else {
      setPickupSuggestions([]);
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
                    onChange={handlePickupChange}
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
                    onChange={handleDestinationChange}
                    onFocus={() => setShowDestinationResults(true)}
                    className="w-full bg-[#eeee] rounded-xl p-4 border-none focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search Results */}
        {showPickupResults && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-black mb-4">
              Pickup suggestions
            </h2>
            {loadingPickupSuggestions && (
              <div className="text-gray-500 mb-2">Loading suggestions...</div>
            )}
            {pickupSuggestionError && (
              <div className="text-red-500 mb-2">{pickupSuggestionError}</div>
            )}
            <div className="space-y-3">
              {pickupSuggestions.length === 0 &&
                !loadingPickupSuggestions &&
                !pickupSuggestionError && (
                  <div className="text-gray-400">No suggestions found.</div>
                )}
              {pickupSuggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setPickup(
                      typeof suggestion === "string"
                        ? suggestion
                        : suggestion.formatted ||
                            suggestion.address ||
                            suggestion.name ||
                            ""
                    );
                    setShowPickupResults(false);
                  }}
                  className="w-full bg-gray-50 rounded-xl p-4 text-left hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center space-x-4 mb-9">
                    <div className="bg-gray-200 rounded-full w-10 h-10 flex items-center justify-center">
                      <MapPin className="h-5 w-5 text-gray-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-black">
                        {typeof suggestion === "string"
                          ? suggestion
                          : suggestion.name ||
                            suggestion.formatted ||
                            suggestion.address}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {typeof suggestion === "string"
                          ? suggestion
                          : suggestion.address || suggestion.formatted}
                      </p>
                      {typeof suggestion !== "string" && suggestion.type && (
                        <p className="text-xs text-gray-500">
                          {suggestion.type}
                        </p>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
        {showDestinationResults && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-black mb-4">
              Search results
            </h2>
            {loadingSuggestions && (
              <div className="text-gray-500 mb-2">Loading suggestions...</div>
            )}
            {suggestionError && (
              <div className="text-red-500 mb-2">{suggestionError}</div>
            )}
            <div className="space-y-3">
              {destinationSuggestions.length === 0 &&
                !loadingSuggestions &&
                !suggestionError && (
                  <div className="text-gray-400">No suggestions found.</div>
                )}
              {destinationSuggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDestination(
                      typeof suggestion === "string"
                        ? suggestion
                        : suggestion.formatted ||
                            suggestion.address ||
                            suggestion.name ||
                            ""
                    );
                    setShowDestinationResults(false);
                  }}
                  className="w-full bg-gray-50 rounded-xl p-4 text-left hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center space-x-4 mb-9">
                    <div className="bg-gray-200 rounded-full w-10 h-10 flex items-center justify-center">
                      <MapPin className="h-5 w-5 text-gray-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-black">
                        {typeof suggestion === "string"
                          ? suggestion
                          : suggestion.name ||
                            suggestion.formatted ||
                            suggestion.address}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {typeof suggestion === "string"
                          ? suggestion
                          : suggestion.address || suggestion.formatted}
                      </p>
                      {typeof suggestion !== "string" && suggestion.type && (
                        <p className="text-xs text-gray-500">
                          {suggestion.type}
                        </p>
                      )}
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
            Find Trip
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LocalSearchPanel;
