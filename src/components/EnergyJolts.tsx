
import React, { useEffect, useRef } from 'react';

interface EnergyJoltsProps {
  className?: string;
}

const EnergyJolts: React.FC<EnergyJoltsProps> = ({ className }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let animationFrameId: number;
    
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resize();
    window.addEventListener('resize', resize);
    
    // Energy jolt class
    class EnergyJolt {
      x: number;
      y: number;
      length: number;
      segments: number;
      width: number;
      opacity: number;
      points: { x: number; y: number }[];
      decay: number;
      angle: number;
      speed: number;
      hue: number;
      
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.length = 150 + Math.random() * 200; // Longer energy jolts
        this.segments = 6 + Math.floor(Math.random() * 6); // More segments
        this.width = 2 + Math.random() * 4; // Wider lines
        this.opacity = 0;
        this.points = [];
        this.decay = 0.01 + Math.random() * 0.02;
        this.angle = Math.random() * Math.PI * 2;
        this.speed = 1.5 + Math.random() * 2.5; // Faster movement
        
        // Blue, green, yellow color palette
        const colorType = Math.floor(Math.random() * 3);
        if (colorType === 0) {
          this.hue = 210 + Math.random() * 20; // Blue range (210-230)
        } else if (colorType === 1) {
          this.hue = 140 + Math.random() * 25; // Green range (140-165)
        } else {
          this.hue = 45 + Math.random() * 15; // Yellow range (45-60)
        }
        
        this.generatePoints();
      }
      
      generatePoints() {
        this.points = [{ x: this.x, y: this.y }];
        let currentX = this.x;
        let currentY = this.y;
        let currentAngle = this.angle;
        
        for (let i = 0; i < this.segments; i++) {
          // More pronounced zigzag direction change
          currentAngle += (Math.random() - 0.5) * 2.0;
          
          // Calculate segment length
          const segmentLength = this.length / this.segments;
          
          // New point
          currentX += Math.cos(currentAngle) * segmentLength;
          currentY += Math.sin(currentAngle) * segmentLength;
          
          this.points.push({ x: currentX, y: currentY });
        }
      }
      
      update() {
        // Fade in and out
        if (this.points[0].x < 0 || this.points[0].x > canvas.width || 
            this.points[0].y < 0 || this.points[0].y > canvas.height) {
          this.opacity -= this.decay;
        } else if (this.opacity < 0.9) { // Higher max opacity
          this.opacity += 0.06; // Faster fade in
        }
        
        // Move
        for (const point of this.points) {
          point.x += Math.cos(this.angle) * this.speed;
          point.y += Math.sin(this.angle) * this.speed;
        }
        
        return this.opacity > 0;
      }
      
      draw(ctx: CanvasRenderingContext2D) {
        if (this.opacity <= 0) return;
        
        ctx.strokeStyle = `hsla(${this.hue}, 100%, 70%, ${this.opacity})`; // Brighter
        ctx.lineWidth = this.width;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        
        // Draw main line
        ctx.beginPath();
        ctx.moveTo(this.points[0].x, this.points[0].y);
        for (let i = 1; i < this.points.length; i++) {
          ctx.lineTo(this.points[i].x, this.points[i].y);
        }
        ctx.stroke();
        
        // Enhanced glow effect
        ctx.shadowBlur = 20; // Increased blur
        ctx.shadowColor = `hsla(${this.hue}, 100%, 80%, ${this.opacity * 0.7})`; // Brighter glow
        ctx.stroke();
        ctx.shadowBlur = 0;
      }
    }
    
    // Manage multiple energy jolts - increased frequency and count
    const jolts: EnergyJolt[] = [];
    let lastJoltTime = 0;
    
    const animate = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Add new jolt more frequently
      if (time - lastJoltTime > 800 + Math.random() * 2000) { // More frequent jolts
        jolts.push(new EnergyJolt());
        lastJoltTime = time;
      }
      
      // Update and draw existing jolts
      for (let i = jolts.length - 1; i >= 0; i--) {
        const jolt = jolts[i];
        const isAlive = jolt.update();
        jolt.draw(ctx);
        
        if (!isAlive) {
          jolts.splice(i, 1);
        }
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animationFrameId = requestAnimationFrame(animate);
    
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef} 
      className={`fixed top-0 left-0 w-full h-full ${className}`} 
    />
  );
};

export default EnergyJolts;
