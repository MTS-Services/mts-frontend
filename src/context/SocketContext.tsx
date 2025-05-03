import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext(null);

// Custom hook to easily use socket
export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socketIo = io("http://192.168.10.47:3000", {
      transports: ["websocket"],
    });

    setSocket(socketIo);

    socketIo.on("connect", () => {
      console.log("✅ Socket connected:", socketIo.id);
    });

    socketIo.on("disconnect", () => {
      console.log("❌ Socket disconnected");
    });

    return () => {
      socketIo.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
