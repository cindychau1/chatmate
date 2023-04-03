import React, { useState } from 'react';
import { io } from 'socket.io-client';
import Chat from './Chat';
import '../styles/index.css';

const socket = io.connect('http://localhost:3000', {
  transports: ['websocket', 'polling', 'flashsocket'],
});

const JoinRoom = () => {
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');

  const joinRoom = () => {
    if (username !== '' && room !== '') {
      socket.emit('joinRoom', room);
    }
  };

  return (
    <div className='chat-container'>
      <h1>CHAT WITH YOUR MATES</h1>
      <input
        type='text'
        placeholder='Name...'
        onChange={(event) => {
          setUsername(event.target.value);
        }}
      />
      <input
        type='text'
        placeholder='Room ID...'
        onChange={(event) => {
          setRoom(event.target.value);
        }}
      />
      <button onClick={joinRoom}>Join A Room</button>
      <Chat socket={socket} username={username} room={room} />
    </div>
  );
};

export default JoinRoom;
