
import React from 'react';
import { BrainCircuit } from 'lucide-react';
import { motion } from 'framer-motion';

interface AIBadgeProps {
  customIndex: number;
  isOpen: boolean;
}

const AIBadge = ({ customIndex, isOpen }: AIBadgeProps) => {
  const navItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.3
      }
    }),
    exit: { 
      opacity: 0,
      x: -20,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    isOpen && (
      <motion.div
        custom={customIndex}
        variants={navItemVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="pb-4 px-6 flex items-center text-sm text-muted-foreground"
      >
        <BrainCircuit size={14} className="mr-2 text-primary" />
        <span>AI-powered analysis</span>
      </motion.div>
    )
  );
};

export default AIBadge;
