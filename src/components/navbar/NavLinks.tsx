
import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LanguageContext } from '@/App';
import { translations } from '@/utils/translations';

const NavLinks = () => {
  const location = useLocation();
  const { language } = useContext(LanguageContext);

  return (
    <nav className="hidden md:flex items-center space-x-8">
      <Link
        to="/bill-analysis"
        className={`text-sm font-medium hover:text-calm-blue transition-colors ${
          location.pathname === '/bill-analysis' ? 'text-calm-blue' : 'text-gray-600'
        }`}
      >
        {translations.navLinks[language].billAnalysis}
      </Link>
      
      <Link
        to="/blog"
        className={`text-sm font-medium hover:text-calm-blue transition-colors ${
          location.pathname === '/blog' ? 'text-calm-blue' : 'text-gray-600'
        }`}
      >
        {translations.navLinks[language].blog}
      </Link>
      
      <Link
        to="/california"
        className={`text-sm font-medium hover:text-calm-blue transition-colors ${
          location.pathname === '/california' ? 'text-calm-blue' : 'text-gray-600'
        }`}
      >
        {translations.navLinks[language].california}
      </Link>
      
      <Link
        to="/solar"
        className={`text-sm font-medium hover:text-calm-blue transition-colors ${
          location.pathname === '/solar' ? 'text-calm-blue' : 'text-gray-600'
        }`}
      >
        {translations.navLinks[language].solarRightForMe}
      </Link>
    </nav>
  );
};

export default NavLinks;
