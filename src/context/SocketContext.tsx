import Cookies from "js-cookie";
import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

// Context
const SocketContext = createContext(null);

// Custom hook
export const useSocket = () => useContext(SocketContext);

// Provider
export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const token = Cookies.get("core");

    if (!token) {
      console.warn("❌ No token found in cookies. Socket not initialized.");
      return;
    }

    // Prevent multiple connections
    if (socket) return;

    const socketIo = io("https://mtsbackend20-production.up.railway.app/", {
      auth: { token },
      transports: ["websocket"],
    });

    socketIo.on("connect", () => {
      console.log("✅ Socket connected:", socketIo.id);
      setConnected(true);
    });

    socketIo.on("disconnect", () => {
      console.log("❌ Socket disconnected");
      setConnected(false);
    });

    setSocket(socketIo);

    return () => {
      socketIo.disconnect();
      setSocket(null);
      setConnected(false);
    };
  }, [Cookies.get("core")]); // depend on token changes

  // Optional: Show loader until socket ready
  if (!socket || !connected) {
    return <div className="p-4 text-center">🔄 Connecting to server...</div>;
  }

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
