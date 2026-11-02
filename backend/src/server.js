import 'dotenv/config';
import http from 'http';
import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import { requestLogger } from './middleware/requestLogger.js';
import { errorHandler } from './middleware/errorHandler.js';
import apiRoutes from './routes/index.js';
import { initSocket } from './socket.js';

const app = express();
const PORT = process.env.PORT || 5000;
const allowedOrigins = (process.env.CORS_ORIGINS || 'http://localhost:5173,http://127.0.0.1:5173,https://niharadaura.com,https://www.niharadaura.com')
  .split(',')
  .map((origin) => origin.trim());

// Create HTTP server for Express + Socket.io
const server = http.createServer(app);

// Global Middleware
app.use(cors({ origin: allowedOrigins }));
app.use(express.json());
app.use('/images', express.static('public/images'));
app.use(requestLogger);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    brand: 'Nihara D Aura',
    realtime: 'Socket.io Active',
    architecture: 'Enterprise MVC (Models, Views/API, Controllers, Services)',
    timestamp: new Date().toISOString()
  });
});

// Mount MVC API routes
app.use('/api', apiRoutes);

// Centralized error handling
app.use(errorHandler);

const startServer = async () => {
  if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) {
    throw new Error('JWT_SECRET must be configured with at least 32 characters');
  }
  await connectDB();
  initSocket(server);
  server.listen(PORT, () => {
    console.log(`[Server] Nihara D Aura Realtime MVC Server (Socket.io) running on port ${PORT}`);
  });
};

startServer().catch((err) => {
  console.error(`[Server] Startup failed: ${err.message}`);
  process.exitCode = 1;
});
