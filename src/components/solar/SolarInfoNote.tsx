
import React from 'react';
import { Info, Home, Music } from 'lucide-react';

interface SolarInfoNoteProps {
  children: React.ReactNode;
  variant?: 'yellow' | 'blue' | 'home' | 'music';
}

const SolarInfoNote: React.FC<SolarInfoNoteProps> = ({ children, variant = 'yellow' }) => {
  let colorClasses, iconColor, Icon;
  
  switch (variant) {
    case 'blue':
      colorClasses = 'bg-blue-50 text-energy-blue border-blue-200';
      iconColor = 'text-energy-blue';
      Icon = Info;
      break;
    case 'home':
      colorClasses = 'bg-purple-50 text-purple-700 border-purple-200';
      iconColor = 'text-purple-600';
      Icon = Home;
      break;
    case 'music':
      colorClasses = 'bg-green-50 text-energy-green border-green-200';
      iconColor = 'text-energy-green';
      Icon = Music;
      break;
    default: // yellow
      colorClasses = 'bg-yellow-50 text-energy-yellow border-yellow-200';
      iconColor = 'text-energy-yellow';
      Icon = Info;
  }
  
  return (
    <div className={`rounded-lg p-4 flex items-start border ${colorClasses}`}>
      <Icon className={`w-5 h-5 ${iconColor} mt-0.5 mr-3 flex-shrink-0`} />
      <div className="text-sm">{children}</div>
    </div>
  );
};

export default SolarInfoNote;
