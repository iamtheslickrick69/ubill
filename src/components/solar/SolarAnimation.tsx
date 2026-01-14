
import React from 'react';
import { motion } from 'framer-motion';
import { Sun, ArrowDown, Home, Zap } from 'lucide-react';

const SolarAnimation: React.FC = () => {
  return (
    <div className="flex justify-center mb-8">
      <div className="relative w-64 h-64">
        <motion.div 
          className="absolute inset-0"
          animate={{ 
            boxShadow: ['0 0 0px rgba(255, 204, 0, 0)', '0 0 40px rgba(255, 204, 0, 0.5)', '0 0 0px rgba(255, 204, 0, 0)']
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            repeatType: "loop"
          }}
        >
          <Sun className="w-32 h-32 text-yellow-500 mx-auto" />
        </motion.div>
        
        <motion.div
          animate={{ y: [0, 50, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute top-36 left-1/2 -translate-x-1/2"
        >
          <ArrowDown className="w-8 h-8 text-yellow-500" />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-0 left-1/2 -translate-x-1/2"
        >
          <Home className="w-16 h-16 text-energy-blue" />
        </motion.div>
        
        <motion.div
          animate={{ 
            opacity: [0, 1, 0],
            scale: [0.8, 1.2, 0.8]
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            repeatType: "loop",
            delay: 1.5
          }}
          className="absolute bottom-4 right-12"
        >
          <Zap className="w-6 h-6 text-yellow-400" />
        </motion.div>
      </div>
    </div>
  );
};

export default SolarAnimation;
