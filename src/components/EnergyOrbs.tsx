
import React, { useEffect, useRef } from 'react';

interface EnergyOrbsProps {
  className?: string;
}

const EnergyOrbs: React.FC<EnergyOrbsProps> = ({ className }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    // Configuration
    const minSize = 100; // Increased min size
    const maxSize = 400; // Increased max size
    const orbCount = window.innerWidth < 768 ? 6 : 10; // Fewer but larger orbs
    const minDuration = 15;
    const maxDuration = 40;
    const minDelay = 0;
    const maxDelay = 15;
    
    // Clear existing orbs
    container.innerHTML = '';
    
    // Create orbs
    for (let i = 0; i < orbCount; i++) {
      createOrb(container);
    }
    
    // Set interval to continuously create new orbs
    const interval = setInterval(() => {
      if (container.childElementCount < orbCount) {
        createOrb(container);
      }
    }, 5000);
    
    function createOrb(container: HTMLDivElement) {
      const orb = document.createElement('div');
      orb.className = 'energy-orb';
      
      // Random properties
      const size = minSize + Math.random() * (maxSize - minSize);
      const xPos = Math.random() * 100;
      const yPos = Math.random() * 100;
      const duration = minDuration + Math.random() * (maxDuration - minDuration);
      const delay = minDelay + Math.random() * (maxDelay - minDelay);
      const opacity = 0.2 + Math.random() * 0.4; // Increased opacity for visibility
      
      // Apply styles
      orb.style.width = `${size}px`;
      orb.style.height = `${size}px`;
      orb.style.left = `${xPos}%`;
      orb.style.top = `${yPos}%`;
      orb.style.opacity = '0';
      
      // Apply animation
      orb.style.animation = `appear ${duration}s ease-in-out ${delay}s 1`;
      
      // Custom keyframes for this specific orb
      const keyframes = `
        @keyframes appear {
          0% {
            opacity: 0;
            transform: scale(0.3);
          }
          20% {
            opacity: ${opacity};
          }
          80% {
            opacity: ${opacity};
            transform: scale(1);
          }
          100% {
            opacity: 0;
            transform: scale(0.7);
          }
        }
      `;
      
      // Add keyframes to head
      const style = document.createElement('style');
      style.innerHTML = keyframes;
      document.head.appendChild(style);
      
      // Add to container
      container.appendChild(orb);
      
      // Remove orb after animation completes
      setTimeout(() => {
        orb.remove();
        style.remove();
      }, (duration + delay) * 1000);
    }
    
    return () => {
      clearInterval(interval);
    };
  }, []);
  
  return (
    <div 
      ref={containerRef} 
      className={`fixed top-0 left-0 w-full h-full overflow-hidden ${className}`} 
    />
  );
};

export default EnergyOrbs;
