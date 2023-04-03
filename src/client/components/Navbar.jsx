import * as React from 'react';
import chatmate from '../../../assets/logo-no-background.png';
import { motion } from 'framer-motion';

const Navbar = () => {
  return (
    <nav className='navbar'>
      <motion.div animate={{ translateY: 20 }} transition={{ duration: 2 }}>
        <img src={chatmate} alt='chatmate-logo' width='150' height='75' />
      </motion.div>
    </nav>
  );
};

export default Navbar;
