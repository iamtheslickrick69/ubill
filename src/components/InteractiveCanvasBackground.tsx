
import React, { useEffect, useRef } from 'react';

interface InteractiveCanvasBackgroundProps {
  children?: React.ReactNode;
  gridColor?: string;
  dotsColor?: string;
  spheresColor?: string;
  theme?: 'light' | 'dark';
}

const InteractiveCanvasBackground: React.FC<InteractiveCanvasBackgroundProps> = ({
  children,
  gridColor = 'rgba(192, 192, 192, 0.1)',
  dotsColor = 'rgba(56, 189, 248, 1)',
  spheresColor = 'rgba(255, 165, 0, 1)',
  theme = 'light'
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const resizeTimerRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Grid settings
    const gridSpacing = 40;
    const gridLineWidth = 0.5;

    // Dots settings
    let dots: Dot[] = [];
    
    // Spheres settings
    let spheres: Sphere[] = [];

    // Setup function
    const setup = () => {
      // Set canvas dimensions
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // Create floating dots (1 per 40px of width)
      const dotsCount = Math.floor(window.innerWidth / 40);
      dots = [];
      
      for (let i = 0; i < dotsCount; i++) {
        dots.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 2 + 1,
          speed: Math.random() * 0.5 + 0.2,
          amplitude: 0.3,
          opacity: 0.5 * (Math.random() * 0.2 + 0.6),
          offsetY: Math.random() * 100,
          offsetX: Math.random() * 100
        });
      }
      
      // Create pulsing spheres (1 per 250px of width)
      const spheresCount = Math.floor(window.innerWidth / 250);
      spheres = [];
      
      for (let i = 0; i < spheresCount; i++) {
        spheres.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: 30 + Math.random() * 20,
          maxRadius: 80 + Math.random() * 20,
          growth: Math.random() * 0.3 + 0.2,
          opacity: 0,
          maxOpacity: 0.15,
          growing: true
        });
      }
    };

    // Draw grid
    const drawGrid = () => {
      ctx.strokeStyle = gridColor;
      ctx.lineWidth = gridLineWidth;
      
      // Horizontal lines
      for (let y = 0; y < canvas.height; y += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
      
      // Vertical lines
      for (let x = 0; x < canvas.width; x += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
    };
    
    // Update and draw dots
    const updateDots = () => {
      dots.forEach(dot => {
        // Gentle sine wave movement
        dot.offsetY += dot.speed;
        dot.offsetX += dot.speed * 0.7;
        
        const sineY = Math.sin(dot.offsetY / 30) * dot.amplitude;
        const sineX = Math.sin(dot.offsetX / 40) * dot.amplitude;
        
        // Draw the dot
        ctx.beginPath();
        ctx.arc(
          dot.x + sineX,
          dot.y + sineY,
          dot.radius,
          0,
          Math.PI * 2
        );
        ctx.fillStyle = dotsColor.replace('1)', `${dot.opacity})`);
        ctx.fill();
      });
    };
    
    // Update and draw spheres
    const updateSpheres = () => {
      spheres.forEach(sphere => {
        if (sphere.growing) {
          sphere.radius += sphere.growth;
          sphere.opacity = Math.min(sphere.opacity + 0.005, sphere.maxOpacity);
          
          if (sphere.radius >= sphere.maxRadius) {
            sphere.growing = false;
          }
        } else {
          sphere.radius -= sphere.growth;
          sphere.opacity = Math.max(sphere.opacity - 0.005, 0);
          
          if (sphere.radius <= 30) {
            sphere.growing = true;
            // Occasionally move the sphere to a new position when it resets
            if (Math.random() > 0.7) {
              sphere.x = Math.random() * canvas.width;
              sphere.y = Math.random() * canvas.height;
            }
          }
        }
        
        // Create a radial gradient for the sphere
        const gradient = ctx.createRadialGradient(
          sphere.x,
          sphere.y,
          0,
          sphere.x,
          sphere.y,
          sphere.radius
        );
        
        gradient.addColorStop(0, spheresColor.replace('1)', `${sphere.opacity})`));
        gradient.addColorStop(1, 'rgba(255, 165, 0, 0)');
        
        ctx.beginPath();
        ctx.arc(sphere.x, sphere.y, sphere.radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      });
    };
    
    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      drawGrid();
      updateDots();
      updateSpheres();
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    // Handle window resize
    const handleResize = () => {
      if (resizeTimerRef.current) {
        clearTimeout(resizeTimerRef.current);
      }
      
      resizeTimerRef.current = setTimeout(() => {
        setup();
      }, 100);
    };
    
    // Initialize
    setup();
    animate();
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (resizeTimerRef.current) {
        clearTimeout(resizeTimerRef.current);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [gridColor, dotsColor, spheresColor, theme]);
  
  return (
    <div className="relative min-h-screen overflow-hidden">
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none"
        style={{ background: theme === 'light' ? '#ffffff' : '#000000' }}
      />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

// Type definitions
interface Dot {
  x: number;
  y: number;
  radius: number;
  speed: number;
  amplitude: number;
  opacity: number;
  offsetY: number;
  offsetX: number;
}

interface Sphere {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  growth: number;
  opacity: number;
  maxOpacity: number;
  growing: boolean;
}

export default InteractiveCanvasBackground;
