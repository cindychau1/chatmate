const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const PORT = 3000;

app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

// listen for a "connection" event
io.on('connection', (socket) => {
  console.log('User connected: ', socket.id);
  socket.on('join_room', (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });
  socket.on('disconnect', () => {
    console.log('User disconnected: ', socket.id);
  });
});

server.listen(PORT, () => console.log('listening on port: ', PORT));
