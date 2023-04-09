import React, { useState, useEffect } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import SendIcon from '@mui/icons-material/Send';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const Chat = ({ socket, username, room }) => {
  const [currMessage, setCurrMessage] = useState('');
  const [messageList, setMessageList] = useState([]);
  const [isTyping, setIsTyping] = useState({ status: false, user: '' });

  const handleLeaveChat = () => {
    // redirect the user to the main page
    window.location.href = '/';
  };

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
      // "socket" obj emits a "sendMessage" event to server, passing the "messageData" obj as an arg
      await socket.emit('sendMessage', messageData);
      // add new message to end of list of messages
      setMessageList((list) => [...list, messageData]);
      setCurrMessage('');
    }
  };
  useEffect(() => {
    // "socket" obj listens for the "receiveMessage" event from the server
    socket.on('receiveMessage', (data) => {
      // add new message to end of list of messages
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);
  return (
    <div className='chat-window'>
      <div className='chat-header'>
        <p>
          Live Chat <span className='room-emoji'>{room}</span>{' '}
        </p>
        <button onClick={handleLeaveChat} className='exit-btn'>
          <ExitToAppIcon />
        </button>
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
          <div className='typing-indicator'>
            {isTyping.status && (
              <p className='isTyping'>{isTyping.user} is typing...</p>
            )}
          </div>
        </ScrollToBottom>
      </div>
      <div className='chat-footer'>
        <input
          type='text'
          value={currMessage}
          onChange={(event) => {
            setCurrMessage(event.target.value);
            // update state when user starts typing
            setIsTyping({ status: true, user: username });
          }}
          // add enter functionality to send message in addition to button click
          onKeyDown={(event) => {
            event.key === 'Enter' && sendMessage();
          }}
          // update state when user stops typing
          onBlur={() => setIsTyping({ status: false, user: '' })}
        />
        <button onClick={sendMessage}>
          <SendIcon />
        </button>
      </div>
    </div>
  );
};
export default Chat;
