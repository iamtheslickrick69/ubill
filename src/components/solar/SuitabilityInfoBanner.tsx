
import React from 'react';
import { Info } from 'lucide-react';

const SuitabilityInfoBanner: React.FC = () => {
  return (
    <div className="bg-blue-50 rounded-lg p-4 flex items-start">
      <Info className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
      <p className="text-sm text-blue-700">
        This is a preliminary assessment based on your input. A professional solar consultant can perform a detailed analysis using satellite imagery and shade analysis tools to give you a more accurate assessment.
      </p>
    </div>
  );
};

export default SuitabilityInfoBanner;
