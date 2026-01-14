
import React from 'react';
import { Trophy } from 'lucide-react';
import { motion } from 'framer-motion';

const TrophyBadge = () => {
  return (
    <motion.div 
      className="flex items-center justify-center gap-2 relative rounded-full px-3 py-1.5 bg-white/30 shadow-sm border border-white/40"
      style={{
        background: "linear-gradient(90deg, rgba(236, 253, 246, 0.95), rgba(226, 249, 240, 0.95))"
      }}
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="inline-flex items-center justify-center relative"
        animate={{ 
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          repeat: Infinity,
          duration: 2,
          ease: "easeInOut",
        }}
      >
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{
            boxShadow: [
              '0 0 2px 1px rgba(0, 200, 150, 0.3)',
              '0 0 8px 4px rgba(0, 200, 150, 0.6)',
              '0 0 2px 1px rgba(0, 200, 150, 0.3)'
            ]
          }}
          transition={{
            repeat: Infinity,
            duration: 3,
            ease: "easeInOut"
          }}
        />
        <Trophy className="h-5 w-5 text-energy-green" />
      </motion.div>
      
      <motion.span 
        className="relative z-10 text-base tracking-wide text-energy-green font-semibold"
      >
        <motion.span
          className="absolute -inset-1 rounded-md opacity-15 filter blur-sm"
          animate={{
            background: [
              'linear-gradient(90deg, rgba(0, 200, 150, 0.2), rgba(255, 255, 255, 0.4), rgba(0, 200, 150, 0.2))'
            ],
            backgroundPosition: ['200% 0%', '-200% 0%']
          }}
          transition={{
            repeat: Infinity,
            duration: 5,
            ease: "linear"
          }}
        />
        #1 Homeowner Energy Platform
      </motion.span>
    </motion.div>
  );
};

export default TrophyBadge;
