
import { useContext } from 'react';
import { LanguageContext } from '@/App';
import { translations } from '@/utils/translations';
import type { MobileNavItem } from './types';

export const useMobileNavItems = (): MobileNavItem[] => {
  const { language } = useContext(LanguageContext);
  
  return [
    {
      path: '/bill-analysis',
      label: translations.navLinks[language].billAnalysis,
    },
    {
      path: '/blog',
      label: translations.navLinks[language].blog,
    },
    {
      path: '/california',
      label: translations.navLinks[language].california,
    },
    {
      path: '/solar',
      label: translations.navLinks[language].solarRightForMe,
    },
  ];
};
