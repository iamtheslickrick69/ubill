
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Award, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SolarCompletionBadgeProps {
  show: boolean;
}

const SolarCompletionBadge: React.FC<SolarCompletionBadgeProps> = ({ show }) => {
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    if (show) {
      setVisible(true);
      
      // Trigger confetti when badge is shown
      const duration = 3 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

      function randomInRange(min: number, max: number) {
        return Math.random() * (max - min) + min;
      }

      const interval: NodeJS.Timeout = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        
        // Since they fire randomly, make them colorful
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
          colors: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'],
        });
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
          colors: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'],
        });
      }, 250);
      
      return () => clearInterval(interval);
    }
  }, [show]);

  const handleClose = () => {
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed bottom-8 right-8 z-50"
          initial={{ opacity: 0, scale: 0.5, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 50 }}
          transition={{ type: "spring", damping: 15 }}
        >
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md border border-gray-200">
            <button
              onClick={handleClose}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>
            
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-4">
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    animate={{ 
                      scale: [1, 1.2, 1],
                      rotate: [0, 10, -10, 0]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  >
                    <Award className="h-20 w-20 text-yellow-500" />
                  </motion.div>
                </div>
                <svg width="100" height="100" viewBox="0 0 100 100">
                  <motion.circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="3"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                  />
                </svg>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-2">Solar Expert Badge Earned!</h3>
              <p className="text-gray-600 mb-4">
                Congratulations! You've completed all steps of the solar assessment and earned the Solar Expert Badge.
              </p>
              
              <Button 
                onClick={handleClose}
                className="bg-energy-blue hover:bg-blue-600"
              >
                Continue Exploring
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SolarCompletionBadge;
