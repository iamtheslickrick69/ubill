
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, Menu, Zap, Info } from 'lucide-react';
import { useContext, useState } from 'react';
import { LanguageContext } from '@/App';
import { motion, AnimatePresence } from 'framer-motion';
import { NavItem } from './types';
import WalkthroughModal from '../homepage/WalkthroughModal';
import UploadBillButton from '@/components/UploadBillButton';

interface MobileSidebarProps {
  navItems: NavItem[];
}

const MobileSidebar: React.FC<MobileSidebarProps> = ({ navItems }) => {
  const location = useLocation();
  const { language } = useContext(LanguageContext);
  const [isOpen, setIsOpen] = useState(false);
  const [walkthrough, setWalkthrough] = useState(false);

  const sidebarVariants = {
    hidden: { x: "-100%" },
    visible: { 
      x: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300
      }
    },
    exit: {
      x: "-100%",
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (custom: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: custom * 0.1,
        duration: 0.5
      }
    })
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 flex items-center justify-between p-4 bg-white shadow-sm z-50 md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-full hover:bg-gray-100 transition-all"
          aria-label="Toggle menu"
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
        </button>
        
        <Link to="/" className="flex items-center space-x-2 group">
          <div className="bg-energy-blue w-9 h-9 rounded-full flex items-center justify-center group-hover:animate-pulse transition-all">
            <Zap size={20} className="text-white" />
          </div>
          <span className="text-base font-semibold text-text-color">ubill<span className="text-energy-blue">.io</span></span>
        </Link>
        
        <div className="w-10"></div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="fixed inset-0 bg-white z-40 md:hidden"
            style={{paddingTop: "60px"}}
            variants={sidebarVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="flex flex-col h-full">              
              <nav className="flex-1 py-6">
                <ul className="space-y-6 px-4">
                  {navItems.map((item, index) => (
                    <motion.li 
                      key={item.path}
                      custom={index}
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <Link
                        to={item.path}
                        className={`flex items-center text-lg ${
                          location.pathname === item.path
                            ? 'text-energy-blue font-medium'
                            : 'text-gray-700'
                        } hover:text-energy-blue transition-colors`}
                        onClick={() => setIsOpen(false)}
                      >
                        <div className={`flex-shrink-0 mr-4 p-2 rounded-lg ${
                          location.pathname === item.path
                            ? 'bg-blue-50'
                            : 'bg-gray-50'
                        }`}>
                          {item.icon}
                        </div>
                        <span>{item.title}</span>
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </nav>
              
              <motion.div 
                className="p-4 mt-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <button
                  onClick={() => {
                    setWalkthrough(true);
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center justify-center border-2 border-energy-green bg-transparent text-energy-green p-4 rounded-xl shadow-md hover:bg-green-50 transition-all mb-3"
                >
                  <Info className="mr-2 text-energy-green" />
                  <span className="text-energy-green font-medium">Learn More</span>
                </button>
                
                <UploadBillButton 
                  className="w-full" 
                >
                  <span className="text-text-color font-medium">Upload Bill</span>
                </UploadBillButton>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <WalkthroughModal open={walkthrough} onOpenChange={setWalkthrough} />
    </>
  );
};

export default MobileSidebar;
