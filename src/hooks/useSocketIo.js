import React, { createContext, useContext, useEffect, useState, useMemo } from "react";
import io from 'socket.io-client';

export const SocketIoContext = createContext();

export const SocketIoProvider = ({ url, children }) => {
  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const socket = io(url);
    socket.on('connect', () => {
      console.log('connect');
      setSocket(socket);
      setConnected(true);
    });
    socket.on('disconnect', () => {
      console.log('disconnect');
      setConnected(false);
    });
    return () => socket.close();
  }, [url]);

  const contextValue = useMemo(() => ({
    io,
    socket,
    connected,
  }), [socket, connected]);

  return (
    <SocketIoContext.Provider value={contextValue}>
      {children}
    </SocketIoContext.Provider>
  );
};

export const useSocket = (event, cb) => {
  const { socket, connected, io } = useContext(SocketIoContext);

  useEffect(() => {
    if (!event) {
      return;
    }
    socket.on(event, cb);
    return () => socket.off(event, cb);
  }, [socket, event, cb]);

  return [socket, connected, io];
};

export const useSocketValue = (event) => {
  const [value, setValue] = useState(null);
  const handleValueChange = setValue;

  const { socket } = useContext(SocketIoContext);

  useEffect(() => {
    if (socket) {
      socket.on(event, handleValueChange);
      return () => socket.off(event, handleValueChange);
    }
  }, [socket, event]);

  return value;
};
