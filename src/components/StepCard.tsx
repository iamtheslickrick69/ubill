
import React from 'react';
import { Check, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { GlowingEffect } from '@/components/ui/glowing-effect';

interface StepCardProps {
  step: number;
  icon: React.ReactNode;
  title: string;
  subtext: string;
  isActive: boolean;
  isCompleted: boolean;
  onClick: () => void;
}

const StepCard: React.FC<StepCardProps> = ({
  step,
  icon,
  title,
  subtext,
  isActive,
  isCompleted,
  onClick
}) => {
  return (
    <motion.div
      className="relative rounded-[1.25rem] p-2 h-full md:rounded-[1.5rem] md:p-3"
      onClick={onClick}
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <GlowingEffect
        spread={40}
        glow={true}
        disabled={false}
        proximity={64}
        inactiveZone={0.01}
        borderWidth={isActive ? 3 : 2}
        variant="electric-blue"
      />
      <div
        className={`relative rounded-xl p-6 transition-all duration-300 h-full cursor-pointer backdrop-blur-sm
          ${isActive
            ? 'bg-black/40 shadow-[0_0_30px_rgba(96,165,250,0.2)] border border-blue-400/30'
            : 'bg-black/40 shadow-sm border border-white/5 hover:border-white/10'
          }`}
      >
        {/* Step Number or Completion Check - Top Right */}
        <div className="absolute top-6 right-6">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm backdrop-blur-sm transition-all duration-300
              ${isCompleted
                ? 'bg-white/20 text-white border-2 border-white/30 shadow-[0_0_15px_rgba(255,255,255,0.4)]'
                : isActive
                  ? 'bg-blue-500/10 text-white border-2 border-blue-400/50'
                  : 'bg-black/40 text-white/60 border-2 border-blue-400/30'
              }`}
          >
            {isCompleted ? <Check className="w-5 h-5" strokeWidth={2} /> : step}
          </div>
        </div>

        {/* Icon - Top Left, Small Container */}
        <div className="w-10 h-10 rounded-lg bg-black/60 border border-white/10 flex items-center justify-center mb-6 transition-all duration-300">
          {icon}
        </div>

        {/* Content */}
        <h3 className={`text-xl md:text-2xl font-semibold mb-3 transition-all duration-300 leading-tight tracking-tight ${isActive ? 'text-white' : 'text-white/90'}`}>
          {title}
        </h3>

        <p className="text-sm md:text-base text-white/50 leading-relaxed pr-8">{subtext}</p>

        {/* Arrow - Right Side */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2">
          <ArrowRight className={`w-5 h-5 transition-all duration-300 ${isActive ? 'text-white' : 'text-white/30'}`} strokeWidth={2} />
        </div>

        {/* Glowing Effect for Active Step */}
        {isActive && (
          <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
            <div className="absolute inset-0 bg-blue-500/5 animate-pulse rounded-xl"></div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default StepCard;
