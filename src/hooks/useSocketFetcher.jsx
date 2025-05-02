import { useEffect, useState } from "react";

/**
 * Reusable socket data fetcher hook.
 */
export const useSocketFetcher = (
  socket,
  emitEvent,
  emitPayload,
  listenEvent,
) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!socket || !emitEvent || !listenEvent) return;

    socket.emit(emitEvent, emitPayload);

    const handler = (response) => {
      setData(response);
    };

    socket.on(listenEvent, handler);

    return () => {
      socket.off(listenEvent, handler);
    };
  }, [socket, emitEvent, emitPayload, listenEvent]);

  return data;
};
