
import React, { useState, useCallback } from 'react';

interface RippleProps {
  children: React.ReactNode;
  color?: string;
}

const EnergyRipple: React.FC<RippleProps> = ({ 
  children, 
  color = 'rgba(66, 133, 244, 0.5)' 
}) => {
  const [ripples, setRipples] = useState<{id: number; x: number; y: number; size: number}[]>([]);
  
  const addRipple = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const size = Math.max(rect.width, rect.height) * 0.5;
    const id = Date.now();
    
    setRipples(prev => [...prev, { id, x, y, size }]);
    
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== id));
    }, 1000);
  }, []);
  
  return (
    <div className="relative overflow-hidden" onClick={addRipple}>
      {ripples.map(ripple => (
        <span
          key={ripple.id}
          className="absolute rounded-full animate-energy-ripple pointer-events-none"
          style={{
            left: ripple.x - ripple.size / 2,
            top: ripple.y - ripple.size / 2,
            width: ripple.size,
            height: ripple.size,
            backgroundColor: color,
          }}
        />
      ))}
      {children}
    </div>
  );
};

export default EnergyRipple;
