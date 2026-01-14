
import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Zap, Home } from 'lucide-react';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const SolarProcessSteps: React.FC = () => {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-3 gap-6"
    >
      <motion.div variants={item} className="bg-blue-50 p-6 rounded-xl shadow-sm">
        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
          <Sun className="w-6 h-6 text-energy-blue" />
        </div>
        <h3 className="text-lg font-semibold mb-2">Capture</h3>
        <p className="text-gray-600">Solar panels capture energy from sunlight using photovoltaic cells made of silicon.</p>
      </motion.div>
      
      <motion.div variants={item} className="bg-blue-50 p-6 rounded-xl shadow-sm">
        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
          <Zap className="w-6 h-6 text-energy-blue" />
        </div>
        <h3 className="text-lg font-semibold mb-2">Convert</h3>
        <p className="text-gray-600">Sunlight is converted to DC electricity, then an inverter changes it to AC for home use.</p>
      </motion.div>
      
      <motion.div variants={item} className="bg-blue-50 p-6 rounded-xl shadow-sm">
        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
          <Home className="w-6 h-6 text-energy-blue" />
        </div>
        <h3 className="text-lg font-semibold mb-2">Power</h3>
        <p className="text-gray-600">This electricity powers your home, with excess going back to the grid for credits.</p>
      </motion.div>
    </motion.div>
  );
};

export default SolarProcessSteps;
