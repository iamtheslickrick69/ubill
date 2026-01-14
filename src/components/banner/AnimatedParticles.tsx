
import React from 'react';
import { motion } from 'framer-motion';

type ParticleColor = 'blue' | 'green';

type ParticlesProps = {
  count: number;
  color: ParticleColor;
  areaPercentage?: {
    start: number;
    end: number;
  };
};

const AnimatedParticles: React.FC<ParticlesProps> = ({ 
  count, 
  color, 
  areaPercentage = { start: 0, end: 100 } 
}) => {
  // Define color based on the particle type
  const particleColor = 
    color === 'green' 
      ? 'rgba(161, 224, 158, 0.8)' 
      : 'rgba(59, 130, 246, 0.8)';

  return (
    <>
      {[...Array(count)].map((_, i) => (
        <motion.div
          key={`${color}-${i}`}
          className="absolute w-[2px] h-[2px] rounded-full"
          style={{
            left: `${areaPercentage.start + Math.random() * (areaPercentage.end - areaPercentage.start)}%`,
            top: `${Math.random() * 100}%`,
            backgroundColor: particleColor,
          }}
          animate={{
            y: [0, -10, 0],
            opacity: [0, 0.8, 0],
            scale: [0, 1, 0]
          }}
          transition={{
            repeat: Infinity,
            duration: 4 + Math.random() * 3,
            delay: Math.random() * 2
          }}
        />
      ))}
    </>
  );
};

export default AnimatedParticles;
