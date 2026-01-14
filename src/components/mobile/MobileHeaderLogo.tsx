
import React from 'react';
import { Link } from 'react-router-dom';
import { Zap } from 'lucide-react';

const MobileHeaderLogo = () => {
  return (
    <Link to="/" className="flex items-center justify-center space-x-2 group">
      <div className="bg-energy-blue w-11 h-11 rounded-full flex items-center justify-center group-hover:animate-pulse transition-all">
        <Zap size={24} className="text-white" />
      </div>
      <span className="text-base font-semibold text-text-color">ubill<span className="text-energy-blue">.io</span></span>
    </Link>
  );
};

export default MobileHeaderLogo;
