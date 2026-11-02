import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';

let io = null;

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: (process.env.CORS_ORIGINS || 'http://localhost:5173,http://127.0.0.1:5173,https://niharadaura.com,https://www.niharadaura.com').split(',').map((value) => value.trim()),
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
    }
  });

  io.use((socket, next) => {
    const token = socket.handshake.auth?.token;
    if (!token) return next();
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      socket.data.userRole = decoded.role;
      socket.data.userId = decoded.id;
      socket.data.userEmail = typeof decoded.email === 'string' ? decoded.email.trim().toLowerCase() : '';
      return next();
    } catch (error) {
      return next(new Error('Invalid authentication token'));
    }
  });

  io.on('connection', (socket) => {
    console.log(`[Socket.io] Client connected: ${socket.id}`);
    const adminEmail = (process.env.ADMIN_EMAIL || '').trim().toLowerCase();
    if (socket.data.userRole === 'admin' && socket.data.userEmail === adminEmail && adminEmail) socket.join('admin');
    else if (socket.data.userId) socket.join(`user:${socket.data.userId}`);

    // Handle client ping/pong
    socket.on('ping_server', () => {
      socket.emit('pong_client', { timestamp: new Date().toISOString() });
    });

    socket.on('disconnect', () => {
      console.log(`[Socket.io] Client disconnected: ${socket.id}`);
    });
  });

  return io;
};

export const getIO = () => {
  if (!io) {
    console.warn('[Socket.io] Warning: Socket.io server has not been initialized yet.');
  }
  return io;
};

// Real-time helper functions for controllers/services
export const emitRealtimeEvent = (eventName, data, roomId = null) => {
  if (!io) return;
  if (roomId) {
    io.to(roomId).emit(eventName, data);
  } else {
    io.emit(eventName, data);
  }
};

export const emitAdminEvent = (eventName, data) => {
  if (io) io.to('admin').emit('admin:data:changed', { type: eventName, data });
};
