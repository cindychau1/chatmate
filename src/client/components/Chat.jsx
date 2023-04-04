import React, { useState, useEffect } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';

const Chat = ({ socket, username, room }) => {
  const [currMessage, setCurrMessage] = useState('');
  const [messageList, setMessageList] = useState([]);

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
      // add new message to end of list of messages
      setMessageList((list) => [...list, messageData]);
      setCurrMessage('');
    }
  };
  useEffect(() => {
    socket.on('receiveMessage', (data) => {
      // add new message to end of list of messages
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);
  return (
    <div className='chat-window'>
      <div className='chat-header'>
        <p>Live Chat</p>
      </div>
      <div className='chat-body'>
        {/* add scroll functionality to scroll to latest message */}
        <ScrollToBottom className='message-container'>
          {messageList.map((messageContent) => {
            return (
              <div
                className='message'
                id={username === messageContent.username ? 'you' : 'other'}
              >
                <div className='message-content'>
                  <p>{messageContent.message}</p>
                </div>
                <div className='message-info'>
                  <p id='time'>{messageContent.time}</p>
                  <p id='username'>{messageContent.username}</p>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>
      <div className='chat-footer'>
        <input
          type='text'
          value={currMessage}
          onChange={(event) => {
            setCurrMessage(event.target.value);
          }}
          // add enter functionality to send message in addition to button click
          onKeyDown={(event) => {
            event.key === 'Enter' && sendMessage();
          }}
        />
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
  );
};
export default Chat;
