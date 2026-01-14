
import React from 'react';
import EnergyJolts from './EnergyJolts';
import EnergyOrbs from './EnergyOrbs';

interface AnimatedEnergyBackgroundProps {
  children: React.ReactNode;
}

const AnimatedEnergyBackground: React.FC<AnimatedEnergyBackgroundProps> = ({ children }) => {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Layer 1: Animated Orbs Background */}
      <EnergyOrbs className="-z-30 pointer-events-none" />
      
      {/* Layer 2: Energy Jolts Animation */}
      <EnergyJolts className="-z-20 pointer-events-none" />
      
      {/* Main Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default AnimatedEnergyBackground;
