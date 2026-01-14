
import React from 'react';
import LanguageToggle from './LanguageToggle';
import { useIsMobile } from '@/hooks/use-mobile';

const TopBanner: React.FC = () => {
  const isMobile = useIsMobile();
  
  // Don't render the banner at all on mobile screens since we've moved the language toggle to the header
  if (isMobile) return null;
  
  return (
    <div 
      className="w-full py-2.5 text-center flex items-center justify-end px-4 font-medium relative overflow-hidden transition-all duration-300 ease-out"
      style={{
        background: "linear-gradient(90deg, rgba(240, 249, 255, 0.95), rgba(230, 245, 255, 0.95))",
        backdropFilter: "blur(8px)",
      }}
    >
      {/* Language Toggle */}
      <LanguageToggle />
    </div>
  );
};

export default TopBanner;
