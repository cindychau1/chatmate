import React, { useState, useEffect } from 'react';

const Chat = ({ socket, username, room }) => {
  const [currMessage, setCurrMessage] = useState('');

  const sendMessage = async () => {
    if (currMessage !== '') {
      const messageData = {
        room: room,
        username: username,
        message: currMessage,
        time:
          new Date(Date.now()).getHours() +
          ':' +
          new Date(Date.now()).getMinutes(),
      };
      await socket.emit('sendMessage', messageData);
    }
  };
  useEffect(() => {
    socket.on('receiveMessage', (data) => {
      console.log(data);
    });
  }, [socket]);
  return (
    <div className='chat-window'>
      <div className='chat-header'>
        <h2>Live Chat</h2>
      </div>
      <div className='chat-body'></div>
      <div className='chat-footer'>
        <input
          type='text'
          placeholder='Hey...'
          onChange={(event) => {
            setCurrMessage(event.target.value);
          }}
        />
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
  );
};
export default Chat;
