import React, { useState } from "react";
import LocationSearchPanel from "./LocationSearchPanel";
import Selectdrive from "./Selectdrive";
import SearchingDrive from "./SearchingDrive";

const UserDashboard = () => {
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [vehiclePanelVisible, setVehiclePanelVisible] = useState(false);
  const [selectedRide, setSelectedRide] = useState(null);
  const [showSearchingDrive, setShowSearchingDrive] = useState(false);

  const handleFocus = () => {
    setIsInputFocused(true);
    setIsExpanded(true);
  };

  const handleBlur = () => {
    setTimeout(() => setIsInputFocused(false), 200);
  };

  const toggleBox = () => {
    setIsExpanded((prev) => !prev);
  };

  const closeVehiclePanel = () => {
    setVehiclePanelVisible(false);
  };

  const handleSelectRide = (ride) => {
    setSelectedRide(ride);
    setShowSearchingDrive(true);
  };

  const handleCloseSearchingDrive = () => {
    setShowSearchingDrive(false);
  };

  return (
    <div className="h-screen w-full relative font-sans overflow-hidden bg-black">
      {/* Header */}
      <div className="absolute top-0 left-0 w-full p-4 flex items-center justify-between z-30 bg-black bg-opacity-95">
        <h1 className="text-2xl font-bold text-white tracking-wide">Drivio</h1>
        <div className="flex items-center gap-4">
          <button className="text-white text-sm border border-white px-4 py-1 rounded-full hover:bg-white hover:text-black transition font-semibold">
            Help
          </button>
          <div className="w-9 h-9 rounded-full bg-gray-700 flex items-center justify-center text-white font-bold text-lg border-2 border-white">
            D
          </div>
        </div>
      </div>

      <div className="h-full w-full absolute top-0 left-0 z-0">
        <img
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt="map"
          className="h-full w-full object-cover"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-60" />
      </div>

      <div
        className={`absolute ${
          isExpanded
            ? "top-0 h-full pt-20 rounded-none"
            : "bottom-0 rounded-t-3xl"
        } left-0 w-full bg-white transition-all duration-300 ease-in-out p-6 z-40`}
      >
        {isExpanded && (
          <div className="absolute top-4 right-4 z-50">
            <button
              onClick={toggleBox}
              className="bg-black text-white p-2 rounded-full text-lg font-semibold hover:bg-gray-900 transition flex items-center justify-center shadow-md"
              aria-label="Collapse"
            >
              <span style={{ fontSize: "1rem", lineHeight: 1 }}>▼</span>
            </button>
          </div>
        )}

        <h2 className="text-xl font-bold mb-6 text-black">Request a Ride</h2>

        <form>
          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Pickup location"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-black shadow-sm"
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            <input
              type="text"
              placeholder="Destination"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-black shadow-sm"
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </div>

          <button
            type="submit"
            className="w-full mt-6 bg-black text-white py-3 rounded-lg font-bold hover:bg-gray-900 shadow-md"
          >
            Request Ride
          </button>
        </form>

        {isExpanded && (
          <div className="mt-5">
            <LocationSearchPanel setVehiclePanel={setVehiclePanelVisible} />
          </div>
        )}
      </div>

      {vehiclePanelVisible && (
        <>
          <div
            className="fixed inset-0 z-40 backdrop-blur-sm bg-black/30 transition-opacity duration-300 touch-none"
            onClick={closeVehiclePanel}
            style={{ overscrollBehavior: "contain" }}
          ></div>

          <div className="fixed bottom-0 left-0 w-full h-[70vh] sm:h-[60vh] bg-white z-50 rounded-t-2xl shadow-2xl animate-slideUp px-2 sm:px-0 max-w-md mx-auto right-0">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-base sm:text-lg font-semibold">
                Select Your Ride
              </h3>
              <button
                onClick={closeVehiclePanel}
                className="text-xl sm:text-2xl text-red-500 font-bold hover:text-black px-2 py-1 rounded-full focus:outline-none"
                aria-label="Close vehicle panel"
              >
                ✕
              </button>
            </div>
            <Selectdrive onSelectRide={handleSelectRide} />
          </div>
          <style>{`
            body { overscroll-behavior: contain; }
            @keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
            .animate-slideUp { animation: slideUp 0.3s cubic-bezier(0.4,0,0.2,1); }
          `}</style>
        </>
      )}

      {showSearchingDrive && selectedRide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 w-screen h-screen">
          <div className="bg-white rounded-none sm:rounded-2xl shadow-2xl p-0 sm:p-6 w-full h-full sm:w-full sm:h-auto max-w-none sm:max-w-md mx-auto relative animate-slideUp flex flex-col">
            <div className="flex-1 flex items-center justify-center">
              <SearchingDrive
                ride={selectedRide}
                onClose={handleCloseSearchingDrive}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
