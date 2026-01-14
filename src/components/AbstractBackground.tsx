
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface AbstractBackgroundProps {
  className?: string;
}

const AbstractBackground: React.FC<AbstractBackgroundProps> = ({ className }) => {
  // Define shapes with different animation properties
  const shapes = [
    { 
      className: "w-64 h-32 bg-gray-100/30 rounded-full",
      initialX: -5,
      initialY: 10,
      duration: 20 
    },
    { 
      className: "w-72 h-72 bg-blue-50/20 rounded-full", 
      initialX: 70,
      initialY: 20,
      duration: 24
    },
    { 
      className: "w-48 h-48 bg-gray-50/30 rounded-full", 
      initialX: 30,
      initialY: 60,
      duration: 18
    },
    { 
      className: "w-80 h-40 bg-blue-100/10 rounded-3xl", 
      initialX: 60,
      initialY: 70, 
      duration: 22
    },
    { 
      className: "w-64 h-64 bg-gray-100/20 rounded-full", 
      initialX: 10, 
      initialY: 80,
      duration: 26
    },
    { 
      className: "w-56 h-32 bg-blue-50/20 rounded-3xl", 
      initialX: 80,
      initialY: 40,
      duration: 28 
    }
  ];

  return (
    <div className={`fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10 ${className}`}>
      {shapes.map((shape, index) => (
        <motion.div
          key={index}
          className={`absolute blur-2xl ${shape.className}`}
          initial={{ 
            x: `${shape.initialX}vw`, 
            y: `${shape.initialY}vh` 
          }}
          animate={{
            x: [
              `${shape.initialX}vw`, 
              `${shape.initialX + 5}vw`, 
              `${shape.initialX - 3}vw`, 
              `${shape.initialX}vw`
            ],
            y: [
              `${shape.initialY}vh`, 
              `${shape.initialY - 5}vh`, 
              `${shape.initialY + 3}vh`, 
              `${shape.initialY}vh`
            ]
          }}
          transition={{
            duration: shape.duration,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

export default AbstractBackground;
