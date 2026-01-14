
import React from 'react';
import { motion } from 'framer-motion';

interface SuitabilityOption {
  value: string;
  label: string;
  score: number;
}

interface SuitabilityFactorProps {
  id: string;
  label: string;
  icon: React.ReactNode;
  options: SuitabilityOption[];
  selectedValue: string;
  onSelect: (factorId: string, value: string) => void;
}

const SuitabilityFactor: React.FC<SuitabilityFactorProps> = ({
  id,
  label,
  icon,
  options,
  selectedValue,
  onSelect,
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white p-4 rounded-lg shadow-sm border border-gray-100"
    >
      <div className="flex items-center mb-3">
        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
          {icon}
        </div>
        <h3 className="font-medium text-gray-800">{label}</h3>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => onSelect(id, option.value)}
            className={`p-2 text-sm rounded-md text-center transition-all ${
              selectedValue === option.value
                ? 'bg-energy-blue text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </motion.div>
  );
};

export default SuitabilityFactor;
