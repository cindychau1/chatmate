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

// listen for a "connection" event
io.on('connection', (socket) => {
  console.log('User connected: ', socket.id);

  socket.on('joinRoom', (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on('sendMessage', (data) => {
    socket.to(data.room).emit('receiveMessage', data);
  });
  socket.on('disconnect', () => {
    console.log('User disconnected: ', socket.id);
  });
});

server.listen(PORT, () => console.log('listening on port: ', PORT));
