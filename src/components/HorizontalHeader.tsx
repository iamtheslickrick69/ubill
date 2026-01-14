import React, { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Zap, Menu, X } from 'lucide-react';
import { LanguageContext } from '@/App';
import { useNavItems } from './sidebar/useNavItems';
import { Button } from './ui/button';
import { motion, AnimatePresence } from 'framer-motion';

const HorizontalHeader = () => {
  const location = useLocation();
  const { language } = useContext(LanguageContext);
  const navItems = useNavItems(language);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-dark-border bg-dark-bg/80 backdrop-blur-lg">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center justify-between gap-6">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 group flex-shrink-0">
              <div className="bg-primary w-9 h-9 rounded-lg flex items-center justify-center group-hover:bg-primary/90 transition-all">
                <Zap size={18} className="text-primary-foreground" />
              </div>
              <span className="text-lg font-semibold text-foreground hidden md:block">
                ubill<span className="text-primary">.io</span>
              </span>
            </Link>

            {/* Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-1 flex-1 justify-center">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    location.pathname === item.path
                      ? 'text-primary'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {item.title}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <div className="hidden md:block">
                <Button size="sm" className="font-medium">
                  {language === "EN" ? "Dashboard" : "Panel"}
                </Button>
              </div>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-muted transition-all text-foreground"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-20 left-4 right-4 z-40 bg-dark-card border border-dark-border rounded-xl overflow-hidden lg:hidden shadow-dark-card"
          >
            <nav className="flex flex-col p-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    location.pathname === item.path
                      ? 'bg-primary/10 text-primary font-medium'
                      : 'text-foreground/70 hover:bg-muted'
                  }`}
                >
                  {item.icon}
                  <span className="font-medium">{item.title}</span>
                </Link>
              ))}
              <div className="border-t border-border mt-4 pt-4">
                <Button className="w-full">
                  <span className="font-medium">
                    {language === "EN" ? "Dashboard" : "Panel"}
                  </span>
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer for fixed header */}
      <div className="h-20 md:h-24"></div>
    </>
  );
};

export default HorizontalHeader;
