import React, { useState } from 'react';
import { io } from 'socket.io-client';
import Chat from './Chat';
import '../styles/ChatRoom.module.css';

const socket = io.connect('http://localhost:3000', {
  transports: ['websocket', 'polling', 'flashsocket'],
});

const ChatRoom = () => {
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== '' && room !== '') {
      socket.emit('joinRoom', room);
      setShowChat(true);
    }
  };

  return (
    <div className='app'>
      {/* if showchat is false, show the starter page*/}
      {!showChat ? (
        <div className='chat-room'>
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
        </div>
      ) : (
        // otherwise show the actual chat messages
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  );
};

export default ChatRoom;
