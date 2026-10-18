import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import matchRoutes from './routes/matchRoutes.js';

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
const server = http.createServer(app);

const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';
const PORT = process.env.PORT || 5000;

// Configure CORS for Express
app.use(
  cors({
    origin: CLIENT_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);

app.use(express.json());

// Initialize Socket.io attached to the HTTP server
const io = new Server(server, {
  cors: {
    origin: CLIENT_URL,
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

// Socket.io connection events
io.on('connection', (socket) => {
  console.log(`[Socket.io] Client connected successfully: ${socket.id}`);

  // Optional match room subscriptions
  socket.on('join_match', (matchId) => {
    socket.join(matchId);
    console.log(`[Socket.io] Client ${socket.id} joined match room: ${matchId}`);
  });

  socket.on('leave_match', (matchId) => {
    socket.leave(matchId);
    console.log(`[Socket.io] Client ${socket.id} left match room: ${matchId}`);
  });

  socket.on('disconnect', () => {
    console.log(`[Socket.io] Client disconnected: ${socket.id}`);
  });
});

// Attach io instance to express app for access in routes/controllers if needed
app.set('io', io);

// Base route / health check
app.get('/', (req, res) => {
  res.json({
    status: 'success',
    message: 'Cricket Scoreboard API is running',
    timestamp: new Date().toISOString(),
  });
});

// Match API routes
app.use('/api/matches', matchRoutes);

// Start HTTP server
server.listen(PORT, () => {
  console.log(`[Server] Cricket Scoreboard Backend running on http://localhost:${PORT}`);
  console.log(`[Server] CORS configured for client origin: ${CLIENT_URL}`);
});

export { app, server, io };
