
import React from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { LanguageContext } from '@/App';
import { translations } from '@/utils/translations';

const FooterSection: React.FC = () => {
  const { language } = useContext(LanguageContext);

  return (
    <footer className="py-12 px-4 border-t border-dark-border relative z-10">
      <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-8 text-center">
        <Link 
          to="/bill-analysis" 
          className="text-muted-foreground hover:text-primary transition-colors text-sm font-medium"
        >
          {translations.navLinks[language].billAnalysis}
        </Link>
        <Link 
          to="/blog" 
          className="text-muted-foreground hover:text-primary transition-colors text-sm font-medium"
        >
          {translations.navLinks[language].blog}
        </Link>
        <Link 
          to="/california" 
          className="text-muted-foreground hover:text-primary transition-colors text-sm font-medium"
        >
          {translations.navLinks[language].california}
        </Link>
        <Link 
          to="/solar" 
          className="text-muted-foreground hover:text-primary transition-colors text-sm font-medium"
        >
          {translations.navLinks[language].solarRightForMe}
        </Link>
      </div>
    </footer>
  );
};

export default FooterSection;
