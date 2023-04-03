import * as React from 'react';
import Chat from './components/Chat';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './styles/App.css';

const App = () => {
  return (
    <>
      <Navbar />
      <Chat />
      <Footer />
    </>
  );
};
export default App;
