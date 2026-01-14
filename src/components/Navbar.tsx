
import React from 'react';
import DesktopNavbar from './navbar/DesktopNavbar';
import MobileHeader from './MobileHeader';

const Navbar = () => {
  return (
    <>
      {/* Mobile Header (Only visible on mobile) */}
      <MobileHeader />
      
      {/* Desktop Navbar (Hidden on mobile) */}
      <DesktopNavbar />
    </>
  );
};

export default Navbar;
