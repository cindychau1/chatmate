import React, { useState } from 'react';
import Chat from './Chat';
import Navbar from './Navbar';

import { io } from 'socket.io-client';

// invokes the io.connect(), passing in the URL of server
const socket = io.connect('http://localhost:3000', {
  transports: ['websocket'],
});

const ChatRoom = () => {
  const [username, setUsername] = useState('');
  const [showChat, setShowChat] = useState(false);
  const [room, setRoom] = useState('');

  const joinRoom = () => {
    if (username !== '' && room !== '') {
      // emit a "joinRoom" event to the server, passing the "room" variable as an arg
      socket.emit('joinRoom', room);
      setShowChat(true);
    }
  };

  return (
    <div className='app'>
      <Navbar username={username} />
      {/* if showchat is false, show the starter page*/}
      {!showChat ? (
        <div className='chat-room'>
          <h1>Let's chat!</h1>
          <input
            type='text'
            placeholder='Name...'
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <div className='chat-room-selection'>
            <button onClick={() => setRoom('🦊')}>
              <p>🦊</p>
            </button>
            <button onClick={() => setRoom('🐷')}>
              <p>🐷</p>
            </button>
            <button onClick={() => setRoom('🐳')}>
              <p>🐳</p>
            </button>
          </div>
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
