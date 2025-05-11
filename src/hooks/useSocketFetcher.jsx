import { useEffect, useState } from "react";

export const useSocketFetcher = (
  socket,
  emitEvent,
  emitPayload,
  listenEventKey,
) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!socket || !emitEvent || !listenEventKey) return;

    const eventName =
      typeof listenEventKey === "function" ? listenEventKey() : listenEventKey;

    socket.emit(emitEvent, emitPayload);

    const handler = (response) => {
      setData(response || []);
    };

    socket.on(eventName, handler);

    return () => {
      socket.off(eventName, handler);
    };
  }, [socket, emitEvent, emitPayload, listenEventKey]);

  return data;
};
