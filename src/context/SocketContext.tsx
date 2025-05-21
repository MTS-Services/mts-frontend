import { createContext, useContext, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext(null);

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const socketRef = useRef(null); // ✅ Always single instance
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Prevent reinitializing
    if (socketRef.current) return;

    const socket = io("https://mtsbackend20-production.up.railway.app/", {
      transports: ["websocket"],
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("✅ Socket connected:", socket.id);
      setIsReady(true);
    });

    socket.on("disconnect", () => {
      console.log("❌ Socket disconnected");
      setIsReady(false);
    });

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, []);

  const socket = socketRef.current;

  // if (!socket || !isReady) {
  //   return (
  //     <div className="p-6 text-center text-sm text-gray-500">
  //       🔄 Connecting to socket...
  //     </div>
  //   );
  // }

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
