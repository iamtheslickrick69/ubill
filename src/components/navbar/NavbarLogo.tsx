
import React from 'react';
import { Link } from 'react-router-dom';
import { Zap } from 'lucide-react';

const NavbarLogo = () => {
  return (
    <Link to="/" className="flex items-center justify-center space-x-2.5 group">
      <div className="bg-gradient-apple w-10 h-10 rounded-xl flex items-center justify-center shadow-apple group-hover:shadow-glow-blue transition-all duration-300">
        <Zap size={20} className="text-white" />
      </div>
      <span className="text-lg font-semibold text-foreground tracking-tight">
        ubill<span className="text-primary">.io</span>
      </span>
    </Link>
  );
};

export default NavbarLogo;
