
import React, { useContext } from 'react';
import MobileSidebar from './sidebar/MobileSidebar';
import DesktopSidebar from './sidebar/DesktopSidebar';
import { useNavItems } from './sidebar/useNavItems';
import { LanguageContext } from '@/App';

const SidebarNav = () => {
  const { language } = useContext(LanguageContext);
  const navItems = useNavItems(language);

  return (
    <>
      <MobileSidebar navItems={navItems} />
      <DesktopSidebar navItems={navItems} />
      <div className="h-16 md:h-0"></div>
    </>
  );
};

export default SidebarNav;
