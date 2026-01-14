
import React from 'react';
import { Loader } from 'lucide-react';

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center w-full h-screen bg-white">
      <div className="flex flex-col items-center gap-4">
        <Loader className="w-12 h-12 text-energy-blue animate-spin" />
        <p className="text-lg font-medium text-gray-600">Loading your dashboard...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
