
import React from 'react';
import { Info, Sparkles, Lightbulb } from 'lucide-react';
import { motion } from 'framer-motion';

interface InfoBannerProps {
  text: string;
  className?: string;
  icon?: React.ReactNode;
  variant?: 'info' | 'success' | 'ai' | 'tip';
}

const InfoBanner: React.FC<InfoBannerProps> = ({
  text,
  className = '',
  icon,
  variant = 'info'
}) => {
  const getIcon = () => {
    if (icon) return icon;
    switch (variant) {
      case 'ai':
        return <Sparkles className="w-5 h-5" strokeWidth={1.5} />;
      case 'tip':
        return <Lightbulb className="w-5 h-5" strokeWidth={1.5} />;
      default:
        return <Info className="w-5 h-5" strokeWidth={1.5} />;
    }
  };

  const getStyles = () => {
    return 'bg-black/40 backdrop-blur-sm border-white/10';
  };

  const getIconColor = () => {
    return 'text-white';
  };

  return (
    <motion.div
      className={`p-5 rounded-[1.25rem] border ${getStyles()} ${className}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.01 }}
    >
      <div className="flex items-start gap-4">
        <div className={`flex-shrink-0 ${getIconColor()}`}>
          {getIcon()}
        </div>
        <p className="text-base text-white/70 leading-relaxed">{text}</p>
      </div>
    </motion.div>
  );
};

export default InfoBanner;
