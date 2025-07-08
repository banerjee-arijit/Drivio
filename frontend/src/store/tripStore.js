import { create } from "zustand";

export const useTripStore = create((set) => ({
  pickup: "",
  destination: "",
  setPickup: (pickup) => set({ pickup }),
  setDestination: (destination) => set({ destination }),
  selectedVehicle: null,
  setSelectedVehicle: (selectedVehicle) => set({ selectedVehicle }),
  rideDetails: null,
  setRideDetails: (rideDetails) => set({ rideDetails }),
}));
