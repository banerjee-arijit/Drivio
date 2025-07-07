import React from "react";

const LocationSearchpanel = ({ setVehiclePanel }) => {
  const locations = [
    { title: "Home", address: "123 Main St, New York, NY" },
    { title: "Work", address: "456 Business Ave, New York, NY" },
    { title: "Gym", address: "789 Fitness Rd, Brooklyn, NY" },
    { title: "Airport", address: "JFK International Airport" },
    { title: "Mall", address: "Queens Center Mall" },
  ];

  const handleLocationClick = () => {
    setVehiclePanel(true);
  };

  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-3 text-gray-800">
        Recent Locations
      </h3>
      <ul className="divide-y divide-gray-200">
        {locations.map((loc, index) => (
          <li
            key={index}
            onClick={handleLocationClick}
            className="py-3 px-2 mt-2 flex flex-col cursor-pointer hover:bg-gray-100 rounded-md transition active:border active:border-black"
          >
            <span className="font-medium text-gray-800">{loc.title}</span>
            <span className="text-sm text-gray-500">{loc.address}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LocationSearchpanel;
