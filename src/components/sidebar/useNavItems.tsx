
import React from 'react';
import { 
  LayoutDashboard, 
  BarChart2, 
  FileText, 
  MapPin, 
  Zap, 
  MessageSquare
} from 'lucide-react';
import { translations } from '@/utils/translations';
import { NavItem } from './types';

// Remove the direct useContext call that was causing problems
export const useNavItems = (language: string = "EN"): NavItem[] => {
  const navItems: NavItem[] = [
    {
      title: 'Home',
      path: '/',
      icon: <LayoutDashboard className="h-6 w-6" />
    },
    {
      title: translations.navLinks[language].billAnalysis,
      path: '/bill-analysis',
      icon: <BarChart2 className="h-6 w-6" />
    },
    {
      title: translations.navLinks[language].blog,
      path: '/blog',
      icon: <FileText className="h-6 w-6" />
    },
    {
      title: translations.navLinks[language].california,
      path: '/california',
      icon: <MapPin className="h-6 w-6" />
    },
    {
      title: translations.navLinks[language].solarRightForMe,
      path: '/solar',
      icon: <Zap className="h-6 w-6" />
    },
    {
      title: 'Contact',
      path: '/contact',
      icon: <MessageSquare className="h-6 w-6" />
    }
  ];

  return navItems;
};
