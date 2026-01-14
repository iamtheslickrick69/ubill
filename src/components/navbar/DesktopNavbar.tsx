
import React from 'react';
import NavbarLogo from './NavbarLogo';
import NavLinks from './NavLinks';
import NavbarActions from './NavbarActions';
import { useNavbarScroll } from './useNavbarScroll';

const DesktopNavbar = () => {
  const { isScrolled } = useNavbarScroll();

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 py-3 px-4 md:px-8 transition-all duration-300 hidden md:block ${
      isScrolled ? 'glass shadow-apple' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <NavbarLogo />
        <NavLinks />
        <NavbarActions />
      </div>
    </nav>
  );
};

export default DesktopNavbar;
