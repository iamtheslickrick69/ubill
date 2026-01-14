
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { AnimatePresence } from 'framer-motion';
import { useHeaderScroll } from './mobile/useHeaderScroll';
import { useMobileNavItems } from './mobile/useMobileNavItems';
import MobileHeaderLogo from './mobile/MobileHeaderLogo';
import MobileMenuButton from './mobile/MobileMenuButton';
import MobileNavItems from './mobile/MobileNavItems';
import UploadBillButton from './mobile/UploadBillButton';
import AIBadge from './mobile/AIBadge';
import MiniLanguageToggle from './mobile/MiniLanguageToggle';
import TopBanner from './TopBanner';

const MobileHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { visible } = useHeaderScroll();
  const location = useLocation();
  const menuItems = useMobileNavItems();

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 bg-white/95 md:hidden ${
          visible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="flex items-center justify-between p-4">
          <MobileHeaderLogo />
          
          {/* Mini Language Toggle for Mobile - positioned right of the logo */}
          <div className="flex-1 flex justify-center">
            <MiniLanguageToggle />
          </div>
          
          <Collapsible open={isOpen} onOpenChange={setIsOpen}>
            <CollapsibleTrigger asChild>
              <MobileMenuButton isOpen={isOpen} setIsOpen={setIsOpen} />
            </CollapsibleTrigger>
            
            <CollapsibleContent className="absolute top-full left-0 right-0 bg-white/95 border-t border-gray-100">
              <nav className="flex flex-col w-full">
                <AnimatePresence>
                  <MobileNavItems 
                    items={menuItems} 
                    currentPath={location.pathname} 
                    isOpen={isOpen} 
                  />
                  
                  <UploadBillButton 
                    customIndex={menuItems.length} 
                    isOpen={isOpen} 
                  />
                  
                  <AIBadge 
                    customIndex={menuItems.length + 1} 
                    isOpen={isOpen} 
                  />
                </AnimatePresence>
              </nav>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </header>
      
      {/* Hide the TopBanner with language toggle since we've moved it to the header */}
      <div 
        className="md:hidden fixed top-[65px] left-0 right-0 z-40 transition-transform duration-300 hidden"
        style={{ 
          transform: visible ? 'translateY(0)' : 'translateY(-100%)'
        }}
      >
        <TopBanner />
      </div>
    </>
  );
};

export default MobileHeader;
