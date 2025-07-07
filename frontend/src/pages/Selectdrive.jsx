import React from "react";
import { User } from "lucide-react";

const Selectdrive = ({ onSelectRide }) => {
  const rideOptions = [
    {
      id: 1,
      name: "UberGo",
      img: "https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png",
      seats: 4,
      time: "2 mins away",
      desc: "Affordable, compact ride",
      price: "₹120.30",
    },
    {
      id: 2,
      name: "UberXL",
      img: "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1596627972/assets/e7/e861a8-30ec-4d57-8045-7186f6c5ec35/original/comfort.png",
      seats: 6,
      time: "3 mins away",
      desc: "Spacious ride for more people",
      price: "₹280.50",
    },
    {
      id: 3,
      name: "Uber Auto",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiYZNGPspo5yDiYR9DP05wsjLh1skE79Jfng&s",
      seats: 4,
      time: "6 mins away",
      desc: "luxiary ride",
      price: "₹80.00",
    },
    {
      id: 4,
      name: "Uber Moto",
      img: "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png",
      seats: 1,
      time: "2 mins away",
      desc: "fast ride",
      price: "₹40.00",
    },
  ];

  return (
    <div className="mt-2 sm:mt-4 bg-gray-50 rounded-lg shadow p-2 sm:p-4">
      <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-4 text-black">
        Select Your Ride
      </h3>
      <div className="flex flex-col gap-3 sm:gap-4">
        {rideOptions.map((ride) => (
          <div
            key={ride.id}
            onClick={() => onSelectRide && onSelectRide(ride)}
            className="flex flex-col sm:flex-row items-center justify-between bg-white p-3 sm:p-4 rounded-lg shadow hover:shadow-md transition cursor-pointer gap-2 sm:gap-4 active:scale-[0.98]"
          >
            <div className="flex flex-row sm:flex-col items-center gap-3 sm:gap-4 w-full sm:w-auto">
              <img
                src={ride.img}
                alt={ride.name}
                className="w-20 h-12 sm:w-24 sm:h-16 object-contain flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <h4 className="text-sm sm:text-md font-semibold text-gray-800 flex items-center gap-1 truncate">
                  {ride.name}
                  <span className="flex items-center gap-1 text-xs sm:text-sm text-gray-600 ml-2">
                    <User className="w-4 h-4" />
                    {ride.seats}
                  </span>
                </h4>
                <p className="text-xs sm:text-sm text-gray-500 truncate">
                  {ride.time}
                </p>
                <p className="text-xs text-gray-400 truncate">{ride.desc}</p>
              </div>
            </div>
            <div className="text-right w-full sm:w-auto mt-2 sm:mt-0">
              <span className="text-base sm:text-lg font-bold text-black">
                {ride.price}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Selectdrive;
