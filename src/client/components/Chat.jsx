import * as React from 'react';
import { useState } from 'react';
import { io } from 'socket.io-client';
import '../styles/index.css';

const socket = io.connect('http://localhost:3000', {
  transports: ['websocket', 'polling', 'flashsocket'],
});

const Chat = () => {
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');

  const joinRoom = () => {
    if (username !== '' && room !== '') {
      socket.emit('join_room', room);
    }
  };

  return (
    <div className='chat-container'>
      <h1> JOIN A CHAT</h1>
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
    </div>
  );
};

export default Chat;
