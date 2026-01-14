
import React from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface MobileMenuButtonProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const MobileMenuButton = ({ isOpen, setIsOpen }: MobileMenuButtonProps) => {
  return (
    <button 
      className="p-2 rounded-full hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-energy-blue relative"
      aria-label="Toggle navigation menu"
      onClick={() => setIsOpen(!isOpen)}
    >
      <AnimatePresence mode="wait">
        {isOpen ? (
          <motion.div
            key="close"
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <X size={24} />
          </motion.div>
        ) : (
          <motion.div
            key="menu"
            initial={{ rotate: 90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: -90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Menu size={24} />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* AI Indicator */}
      <div className="absolute -top-1 -right-1 w-3 h-3 bg-energy-blue rounded-full">
        <div className="absolute inset-0 bg-energy-blue rounded-full animate-ping opacity-75"></div>
      </div>
    </button>
  );
};

export default MobileMenuButton;
