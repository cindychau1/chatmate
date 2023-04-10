import express from 'express';
import http from 'http';
import cors from 'cors';
import { Server } from 'socket.io';
const app = express();
const PORT = 3000;

app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

// listen for a "connection" event that is emitted when a new client connects to the server
// a new socket object is created for that client
io.on('connection', (socket) => {
  // when a client emits a "joinRoom" event, server uses 'socket.join()' method to add the client to the specified room
  socket.on('joinRoom', (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });
  // when a client emits a "sendMessage" event, server uses "socket.to()" method to broadcase message to all clients in the specified room except sender
  socket.on('sendMessage', (data) => {
    socket.to(data.room).emit('receiveMessage', data);
  });
});

server.listen(PORT, () => console.log('listening on port: ', PORT));
