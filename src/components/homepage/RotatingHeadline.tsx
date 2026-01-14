
import React, { useState, useEffect } from 'react';
import { Trophy, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';

const questions = [
  "Why is my energy bill going up so much lately?",
  "Why do I still pay for electricity if I have solar panels?",
  "Are solar panels actually worth the investment?",
  "How do I know if I'm overpaying on my energy usage?",
  "What's the smartest way to lower my energy costs?"
];

const RotatingHeadline: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuestionIndex((prevIndex) => (prevIndex + 1) % questions.length);
    }, 6000);
    
    return () => clearInterval(interval);
  }, []);
  
  const variants = {
    enter: {
      y: 20,
      opacity: 0
    },
    center: {
      y: 0,
      opacity: 1
    },
    exit: {
      y: -20,
      opacity: 0
    }
  };

  return (
    <div className="text-center py-4 max-w-4xl mx-auto px-4">
      {/* Badges stacked on mobile, side by side on desktop */}
      <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} items-center justify-center gap-4 mb-6`}>
        <motion.div
          className="inline-flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full border border-blue-100"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Zap className="w-5 h-5 text-energy-blue" />
          <span className="text-sm font-medium text-text-color">AI-Powered Energy Analysis</span>
        </motion.div>
        
        <motion.div
          className="inline-flex items-center gap-2 bg-orange-50 px-4 py-2 rounded-full border border-orange-100"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Trophy className="w-5 h-5 text-energy-yellow" />
          <span className="text-sm font-medium text-text-color">#1 Energy Platform for Homeowners</span>
        </motion.div>
      </div>
      
      <div className="h-36 md:h-32 flex items-center justify-center mb-4">
        <AnimatePresence mode="wait">
          <motion.h1
            key={currentQuestionIndex}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#4A90E2] via-[#5AA0E2] to-[#3A80D2] leading-tight"
            initial="enter"
            animate="center"
            exit="exit"
            variants={variants}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 25,
              duration: 0.5
            }}
          >
            {questions[currentQuestionIndex]}
          </motion.h1>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default RotatingHeadline;
