import * as React from 'react';
import ChatRoom from './components/ChatRoom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './styles/App.css';

const App = () => {
  return (
    <div>
      <Navbar />
      <div className='app'>
        <ChatRoom />
      </div>
      <Footer />
    </div>
  );
};
export default App;
