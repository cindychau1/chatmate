import * as React from 'react';
import JoinRoom from './components/JoinRoom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './styles/App.css';

const App = () => {
  return (
    <div>
      <Navbar />
      <div className='app'>
        <JoinRoom />
      </div>
      <Footer />
    </div>
  );
};
export default App;
