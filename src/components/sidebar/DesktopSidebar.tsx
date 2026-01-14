
import React, { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Zap, Info, Star } from 'lucide-react';
import { LanguageContext } from '@/App';
import { NavItem } from './types';
import WalkthroughModal from '../homepage/WalkthroughModal';
import UploadBillButton from '@/components/UploadBillButton';
import { useGamification } from '@/context/GamificationContext';

interface DesktopSidebarProps {
  navItems: NavItem[];
}

const DesktopSidebar: React.FC<DesktopSidebarProps> = ({ navItems }) => {
  const location = useLocation();
  const { language } = useContext(LanguageContext);
  const [walkthrough, setWalkthrough] = useState(false);
  const { xp, level, xpProgress, xpToNextLevel } = useGamification();
  const xpInCurrentLevel = xp % xpToNextLevel;

  return (
    <>
      <div className="fixed top-0 left-0 h-full glass shadow-apple-md z-40 transition-all duration-300 transform
        hidden md:block md:w-[72px] md:hover:w-64 group rounded-r-2xl">

        {/* Logo */}
        <Link to="/" className="flex items-center p-4 border-b border-border/30">
          <div className="bg-gradient-apple w-10 h-10 rounded-xl flex items-center justify-center shadow-apple group-hover:shadow-glow-blue transition-all">
            <Zap size={20} className="text-white" />
          </div>
          <span className="ml-3 font-semibold text-foreground overflow-hidden opacity-0 md:group-hover:opacity-100 md:transition-opacity md:duration-300 whitespace-nowrap">
            ubill<span className="text-primary">.io</span>
          </span>
        </Link>

        {/* Level Badge */}
        <div className="px-4 py-3 border-b border-border/30 overflow-hidden">
          <div className="flex items-center gap-2 opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
            <Star className="w-4 h-4 text-game-gold fill-game-gold flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <div className="text-xs font-medium text-foreground">Level {level}</div>
                <div className="text-[10px] text-muted-foreground">{xpInCurrentLevel}/{xpToNextLevel} XP</div>
              </div>
              <div className="w-full bg-secondary rounded-full h-1.5 mt-1">
                <div
                  className="bg-gradient-gold h-1.5 rounded-full transition-all duration-500"
                  style={{ width: `${xpProgress}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Nav Items */}
        <nav className="mt-4">
          <ul className="space-y-1 px-2">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`sidebar-link flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${
                    location.pathname === item.path
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                  }`}
                >
                  <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
                    {item.icon}
                  </div>
                  <span className="sidebar-text opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap text-sm font-medium">
                    {item.title}
                  </span>

                  {location.pathname === item.path && (
                    <div className="absolute left-0 w-1 h-6 bg-primary rounded-r-full"></div>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Bottom Actions */}
        <div className="absolute bottom-6 left-0 right-0 px-3 space-y-2">
          <button
            onClick={() => setWalkthrough(true)}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-muted-foreground hover:bg-secondary hover:text-foreground transition-all"
          >
            <Info size={20} className="flex-shrink-0" />
            <span className="opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 text-sm font-medium whitespace-nowrap">
              How it works
            </span>
          </button>

          <div className="opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
            <UploadBillButton
              className="w-full justify-center"
              size="default"
            >
              <span className="whitespace-nowrap">
                {language === "EN" ? "Upload Bill" : "Subir factura"}
              </span>
            </UploadBillButton>
          </div>
        </div>
      </div>

      <WalkthroughModal open={walkthrough} onOpenChange={setWalkthrough} />
    </>
  );
};

export default DesktopSidebar;
