import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Zap } from 'lucide-react';
import { LanguageContext } from '@/App';
import { useNavItems } from './sidebar/useNavItems';

const DockHeader = () => {
  const location = useLocation();
  const { language } = useContext(LanguageContext);
  const navItems = useNavItems(language);

  return (
    <>
      <header className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4">
        <div className="flex items-center gap-3 rounded-[28px] bg-neutral-900/80 px-4 py-2.5 shadow-2xl ring-1 ring-white/10 backdrop-blur-lg sm:gap-4 sm:rounded-[48px] sm:px-6 sm:py-3">
          {/* Logo */}
          <Link
            to="/"
            className="hover-halo group relative grid h-12 w-12 place-items-center rounded-xl ring-1 ring-blue-500/30 bg-gradient-to-b from-blue-600/20 to-blue-900/30 backdrop-blur-xl shadow-[0_0_25px_rgba(59,130,246,0.4)] transition-all duration-300 hover:-translate-y-1 hover:scale-[1.05] hover:shadow-[0_0_35px_rgba(59,130,246,0.6)] sm:h-14 sm:w-14 flex-shrink-0"
            aria-label="Home"
          >
            <Zap className="h-5 w-5 text-blue-400 transition-all duration-300 group-hover:scale-110 drop-shadow-[0_0_12px_rgba(96,165,250,0.8)] group-hover:drop-shadow-[0_0_20px_rgba(96,165,250,1)]" strokeWidth={1.5} fill="currentColor" fillOpacity="0.3" />
            <span className="tooltip pointer-events-none absolute -bottom-6 translate-y-1/2 text-[9px] tracking-wide text-blue-300/90 sm:text-[10px] whitespace-nowrap drop-shadow-[0_0_8px_rgba(96,165,250,0.6)]">
              ubill.io
            </span>
          </Link>

          {/* Separator */}
          <span className="hidden sm:block h-6 w-px bg-white/10" aria-hidden="true" />

          {/* Navigation Icons */}
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`hover-halo group relative hidden sm:grid h-12 w-12 place-items-center rounded-xl ring-1 backdrop-blur-xl shadow-lg transition-all duration-300 hover:-translate-y-1 hover:scale-[1.05] sm:h-14 sm:w-14 ${
                location.pathname === item.path
                  ? 'from-white/10 to-white/5 ring-white/20 bg-gradient-to-b'
                  : 'from-neutral-800/60 to-neutral-900/70 ring-white/10 bg-gradient-to-b'
              }`}
              aria-label={item.title}
            >
              <div className={`h-5 w-5 transition-all duration-300 group-hover:scale-110 ${
                location.pathname === item.path
                  ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]'
                  : 'text-white/80 group-hover:text-white group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]'
              }`}>
                {React.cloneElement(item.icon as React.ReactElement, {
                  className: "h-5 w-5",
                  strokeWidth: 1.5
                })}
              </div>
              <span className="tooltip pointer-events-none absolute -bottom-6 translate-y-1/2 text-[9px] tracking-wide text-white/70 sm:text-[10px] whitespace-nowrap">
                {item.title}
              </span>
            </Link>
          ))}

          {/* Mobile Menu Button - Shows on small screens */}
          <div className="sm:hidden flex gap-2">
            {navItems.slice(0, 3).map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`hover-halo group relative grid h-12 w-12 place-items-center rounded-xl ring-1 backdrop-blur-xl shadow-lg transition-all duration-300 hover:-translate-y-1 hover:scale-[1.05] ${
                  location.pathname === item.path
                    ? 'from-white/10 to-white/5 ring-white/20 bg-gradient-to-b'
                    : 'from-neutral-800/60 to-neutral-900/70 ring-white/10 bg-gradient-to-b'
                }`}
                aria-label={item.title}
              >
                <div className={`h-5 w-5 transition-all duration-300 group-hover:scale-110 ${
                  location.pathname === item.path
                    ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]'
                    : 'text-white/80 group-hover:text-white group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]'
                }`}>
                  {React.cloneElement(item.icon as React.ReactElement, {
                    className: "h-5 w-5",
                    strokeWidth: 1.5
                  })}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </header>

      {/* Spacer for fixed header */}
      <div className="h-24 sm:h-28"></div>

      {/* Styles */}
      <style>{`
        .hover-halo{position:relative}
        .hover-halo::after{content:"";position:absolute;inset:-2px;border-radius:inherit;opacity:0;transition:opacity .3s, transform .3s;box-shadow:0 0 20px rgba(255,255,255,.25),0 0 40px rgba(255,255,255,.15),0 12px 30px -10px rgba(0,0,0,.7)}
        .hover-halo:hover::after{opacity:1;}

        /* Electric blue glow for logo */
        .hover-halo:first-of-type::after{box-shadow:0 0 25px rgba(59,130,246,.4),0 0 45px rgba(59,130,246,.25),0 12px 35px -10px rgba(0,0,0,.7)}
        .hover-halo:first-of-type:hover::after{opacity:1;box-shadow:0 0 35px rgba(59,130,246,.6),0 0 55px rgba(59,130,246,.35),0 12px 35px -10px rgba(0,0,0,.7)}

        .tooltip{opacity:0;transform:translateY(6px);transition:opacity .3s, transform .3s;text-shadow:0 0 10px rgba(255,255,255,.5)}
        .group:hover .tooltip{opacity:1;transform:translateY(0)}
      `}</style>
    </>
  );
};

export default DockHeader;
