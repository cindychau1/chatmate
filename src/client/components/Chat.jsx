import React, { useState, useEffect } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';

const Chat = ({ socket, username, room }) => {
  const [currMessage, setCurrMessage] = useState('');
  const [messageList, setMessageList] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = async () => {
    if (currMessage !== '') {
      // get time data, added conversion from military time
      const date = new Date();
      const hour = date.getHours();
      const minute = date.getMinutes();
      let period = 'AM';
      let hour12 = hour;
      if (hour > 12) {
        hour12 = hour - 12;
        period = 'PM';
      }
      const messageData = {
        room: room,
        username: username,
        message: currMessage,
        time: `${hour12}:${minute < 10 ? '0' + minute : minute} ${period}`,
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
        <p>Live Chat </p>
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
                {/* display message info (username and time) */}
                <div className='message-info'>
                  <p id='username'>{messageContent.username}</p>
                  <p id='time'>{messageContent.time}</p>
                </div>
                {/* display messages */}
                <div className='message-content'>
                  <p>{messageContent.message}</p>
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
            // update state when user starts typing
            setIsTyping(true);
          }}
          // add enter functionality to send message in addition to button click
          onKeyDown={(event) => {
            event.key === 'Enter' && sendMessage();
          }}
          // update state when user stops typing
          onKeyUp={(event) => setIsTyping(false)}
        />
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
  );
};
export default Chat;
