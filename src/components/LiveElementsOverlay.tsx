
import React from 'react';
import { motion } from 'framer-motion';

const LiveElementsOverlay: React.FC = () => {
  return (
    <div className="live-elements-overlay fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Subtle floating elements - reduced quantity and opacity */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-[#FEC6A1]/10 w-3 h-3"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            x: [0, Math.random() * 10 - 5, 0],
            y: [0, Math.random() * 10 - 5, 0],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 4 + Math.random() * 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Extremely subtle horizontal lines */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`line-${i}`}
          className="absolute bg-[#F1F0FB]/20 h-px"
          style={{
            top: `${20 + (i * 25)}%`,
            left: '-5%',
            width: '20%',
          }}
          animate={{
            left: ['100%', '-5%'],
          }}
          transition={{
            duration: 15 + i * 2,
            repeat: Infinity,
            ease: "linear",
            delay: i * 3,
          }}
        />
      ))}
    </div>
  );
};

export default LiveElementsOverlay;
