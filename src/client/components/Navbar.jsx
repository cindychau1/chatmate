import * as React from 'react';
import chatmate from '../../../assets/logo-no-background.png';

const Navbar = () => {
  return (
    <nav className='navbar'>
      <img src={chatmate} alt='chatmate-logo' width='110' height='60' />
    </nav>
  );
};

export default Navbar;
