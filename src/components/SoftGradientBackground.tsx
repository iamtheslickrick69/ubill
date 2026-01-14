
import React from 'react';
import { motion } from 'framer-motion';

interface SoftGradientBackgroundProps {
  children: React.ReactNode;
}

const SoftGradientBackground: React.FC<SoftGradientBackgroundProps> = ({ children }) => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-hero">

      {/* Apple-style subtle gradient background */}
      <div className="fixed inset-0 -z-20 overflow-hidden">
        {/* Primary blue gradient - top right */}
        <motion.div
          className="absolute -top-[20%] -right-[10%] w-[60%] h-[60%] rounded-full bg-gradient-radial from-primary/8 via-primary/4 to-transparent opacity-80 blur-3xl"
          animate={{
            scale: [1, 1.02, 1],
            opacity: [0.8, 0.6, 0.8],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Purple accent - bottom left */}
        <motion.div
          className="absolute -bottom-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-gradient-radial from-game-purple/6 via-game-purple/3 to-transparent opacity-60 blur-3xl"
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.6, 0.4, 0.6],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 5
          }}
        />

        {/* Gold accent - center top (gamification feel) */}
        <motion.div
          className="absolute top-[20%] left-[40%] w-[30%] h-[30%] rounded-full bg-gradient-radial from-game-gold/5 via-game-gold/2 to-transparent opacity-50 blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 10
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default SoftGradientBackground;
