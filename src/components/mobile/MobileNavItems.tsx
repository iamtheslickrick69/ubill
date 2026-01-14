
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MobileNavItem } from './types';

interface MobileNavItemsProps {
  items: MobileNavItem[];
  currentPath: string;
  isOpen: boolean;
}

const MobileNavItems = ({ items, currentPath, isOpen }: MobileNavItemsProps) => {
  // Animation variants
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
    <>
      {isOpen && (
        <>
          {items.map((item, i) => (
            <motion.div
              key={item.path}
              custom={i}
              variants={navItemVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <Link 
                to={item.path} 
                className={`px-6 py-3 flex items-center space-x-3 ${
                  currentPath === item.path 
                    ? 'text-energy-blue font-medium bg-blue-50' 
                    : 'text-gray-700 hover:bg-gray-50 hover:text-energy-blue'
                } transition-colors text-base`}
              >
                {currentPath === item.path && (
                  <div className="w-1 h-6 bg-energy-blue rounded-full"></div>
                )}
                <span>{item.label}</span>
              </Link>
            </motion.div>
          ))}
        </>
      )}
    </>
  );
};

export default MobileNavItems;
