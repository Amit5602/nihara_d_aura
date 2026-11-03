import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useToast } from './ToastContext';
import { useAuth } from './AuthContext';
import { SOCKET_URL } from '../config/api.js';

const SocketContext = createContext();

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};

export function SocketProvider({ children }) {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const { showToast } = useToast();
  const { token, isAdmin } = useAuth();

  useEffect(() => {
    // Initialize Socket.io client
    const socketInstance = io(SOCKET_URL, {
      reconnectionAttempts: 5,
      reconnectionDelay: 2000,
      auth: token ? { token } : {}
    });

    socketInstance.on('connect', () => {
      console.log('[Socket.io Client] Connected to real-time server:', socketInstance.id);
      setIsConnected(true);
    });

    socketInstance.on('disconnect', () => {
      console.log('[Socket.io Client] Disconnected from server');
      setIsConnected(false);
    });
    socketInstance.on('connect_error', (error) => {
      console.error('[Socket.io Client] Connection failed:', error.message);
      setIsConnected(false);
    });

    // Real-time Event Listeners
    socketInstance.on('order:created', (data) => {
      showToast(`⚡ Realtime: New Order #${data.orderId || data.id} placed!`, 'success');
    });

    socketInstance.on('booking:created', (data) => {
      showToast(`⚡ Realtime: Appointment #${data.bookingId || data.id} confirmed!`, 'info');
    });

    socketInstance.on('booking:cancelled', (data) => {
      showToast(`⚡ Realtime: Appointment #${data.bookingId || data.id} cancelled.`, 'warning');
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, [SOCKET_URL, token, isAdmin, showToast]);

  const joinRoom = React.useCallback((roomId) => {
    if (socket && isConnected) {
      socket.emit('join_room', roomId);
    }
  }, [socket, isConnected]);

  const emitEvent = React.useCallback((eventName, payload) => {
    if (socket && isConnected) {
      socket.emit(eventName, payload);
    }
  }, [socket, isConnected]);

  const value = React.useMemo(() => ({
    socket,
    isConnected,
    joinRoom,
    emitEvent
  }), [socket, isConnected, joinRoom, emitEvent]);

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  );
}
