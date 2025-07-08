import { create } from "zustand";
import { io } from "socket.io-client";

const SOCKET_URL = "http://localhost:3000";
let socket = null;

export const useSocketStore = create((set, get) => {
  if (!socket) {
    socket = io(SOCKET_URL, {
      withCredentials: true,
    });

    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected");
    });
  }

  return {
    socket,
    sendMessage: (eventName, data) => {
      if (socket) {
        socket.emit(eventName, data);
      }
      // console.log("[Socket] Sent message:", eventName, data);
    },
    onMessage: (eventName, callback) => {
      if (socket) {
        socket.on(eventName, callback);
      }
    },
  };
});
