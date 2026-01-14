
import React, { useEffect, useRef } from 'react';

interface AnimatedBlueBackgroundProps {
  children: React.ReactNode;
}

const AnimatedBlueBackground: React.FC<AnimatedBlueBackgroundProps> = ({ children }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Resize canvas to match window dimensions
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resize();
    window.addEventListener('resize', resize);
    
    // Element properties
    interface BlueElement {
      x: number;
      y: number;
      size: number;
      speed: number;
      opacity: number;
      type: 'circle' | 'rectangle' | 'line';
    }
    
    // Create blue elements
    const elements: BlueElement[] = [];
    const elementCount = window.innerWidth < 768 ? 15 : 25;
    
    for (let i = 0; i < elementCount; i++) {
      elements.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 30 + 5,
        speed: Math.random() * 0.5 + 0.1,
        opacity: Math.random() * 0.15 + 0.05,
        type: ['circle', 'rectangle', 'line'][Math.floor(Math.random() * 3)] as 'circle' | 'rectangle' | 'line'
      });
    }
    
    // Animation function
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      elements.forEach(element => {
        // Move element
        element.x += element.speed;
        
        // Reset if off screen
        if (element.x > canvas.width + element.size) {
          element.x = -element.size;
          element.y = Math.random() * canvas.height;
        }
        
        // Draw element based on type
        ctx.fillStyle = `rgba(66, 133, 244, ${element.opacity})`;
        ctx.strokeStyle = `rgba(66, 133, 244, ${element.opacity})`;
        ctx.lineWidth = element.size / 10;
        
        switch(element.type) {
          case 'circle':
            ctx.beginPath();
            ctx.arc(element.x, element.y, element.size, 0, Math.PI * 2);
            ctx.fill();
            break;
          case 'rectangle':
            ctx.fillRect(element.x, element.y, element.size, element.size);
            break;
          case 'line':
            ctx.beginPath();
            ctx.moveTo(element.x, element.y);
            ctx.lineTo(element.x + element.size * 2, element.y);
            ctx.stroke();
            break;
        }
      });
      
      requestAnimationFrame(animate);
    }
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);
  
  return (
    <div className="relative min-h-screen overflow-hidden">
      <canvas 
        ref={canvasRef} 
        className="fixed top-0 left-0 w-full h-full -z-20" 
      />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default AnimatedBlueBackground;
