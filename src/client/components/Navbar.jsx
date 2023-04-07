import * as React from 'react';
import chatmate from '../../../assets/logo-no-background.png';

const Navbar = ({ username }) => {
  return (
    <nav className='navbar'>
      <img
        className='logo'
        src={chatmate}
        alt='chatmate-logo'
        width='110'
        height='60'
      />
      <p>{username}</p>
    </nav>
  );
};

export default Navbar;
