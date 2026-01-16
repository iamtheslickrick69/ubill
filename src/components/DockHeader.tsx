import React, { useContext, useState, useEffect } from 'react';
import { Zap } from 'lucide-react';
import { LanguageContext } from '@/App';
import { useNavItems } from './sidebar/useNavItems';

const DockHeader = () => {
  const { language } = useContext(LanguageContext);
  const navItems = useNavItems(language);
  const [activeSection, setActiveSection] = useState('home');

  // Scroll to section handler
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 20;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setActiveSection(sectionId);
    }
  };

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'dashboard', 'blog', 'california', 'solar', 'contact'];
      const scrollPosition = window.scrollY + 150;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Map paths to section IDs
  const pathToSection: Record<string, string> = {
    '/': 'home',
    '/dashboard': 'dashboard',
    '/bill-analysis': 'dashboard',
    '/blog': 'blog',
    '/california': 'california',
    '/solar': 'solar',
    '/contact': 'contact'
  };

  return (
    <header className="absolute top-0 left-0 right-0 z-50 pt-6">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-center">
          {/* Centered grouped navigation with logo */}
          <nav className="flex items-center bg-gray-100/90 rounded-2xl px-3 py-2.5 shadow-sm backdrop-blur-sm">
            {/* Logo */}
            <button
              onClick={() => scrollToSection('home')}
              className="flex items-center gap-2 group px-3 py-2.5"
              aria-label="ubill.io Home"
            >
              <div className="w-9 h-9 bg-black rounded-xl flex items-center justify-center transition-transform group-hover:scale-105">
                <Zap className="w-5 h-5 text-white" strokeWidth={2} fill="white" />
              </div>
              <span className="text-xl font-semibold text-black tracking-tight">ubill.</span>
            </button>

            {/* Navigation items - Desktop */}
            <div className="hidden md:flex items-center">
              {navItems.map((item) => {
                const sectionId = pathToSection[item.path] || 'home';
                return (
                  <button
                    key={item.path}
                    onClick={() => scrollToSection(sectionId)}
                    className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                      activeSection === sectionId
                        ? 'bg-black text-white shadow-md'
                        : 'text-gray-700 hover:text-black hover:bg-gray-200/60'
                    }`}
                  >
                    {item.title}
                  </button>
                );
              })}
            </div>

            {/* Navigation items - Mobile (fewer items) */}
            <div className="md:hidden flex items-center">
              {navItems.slice(0, 3).map((item) => {
                const sectionId = pathToSection[item.path] || 'home';
                return (
                  <button
                    key={item.path}
                    onClick={() => scrollToSection(sectionId)}
                    className={`px-4 py-2 rounded-xl text-xs font-medium transition-all duration-300 ${
                      activeSection === sectionId
                        ? 'bg-black text-white shadow-md'
                        : 'text-gray-700 hover:text-black'
                    }`}
                  >
                    {item.title}
                  </button>
                );
              })}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default DockHeader;
