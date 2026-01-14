
import React from 'react';
import { motion } from 'framer-motion';

const BannerBackgroundEffects = () => {
  return (
    <>
      {/* Enhanced animated background effect with multiple layers */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 animate-shine"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImEiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgcGF0dGVyblRyYW5zZm9ybT0icm90YXRlKDQ1KSI+PHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0iI2ZmZiIgb3BhY2l0eT0iMC4wNSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNhKSIvPjwvc3ZnPg==')] opacity-20"></div>
      
      {/* Enhanced pulsing effect on the edges */}
      <motion.div
        className="absolute inset-x-0 h-0.5 bottom-0 bg-gradient-to-r from-transparent via-blue-300 to-transparent"
        animate={{
          opacity: [0.3, 0.7, 0.3],
          boxShadow: [
            '0 0 2px rgba(255, 255, 255, 0.2)',
            '0 0 8px rgba(255, 255, 255, 0.6)',
            '0 0 2px rgba(255, 255, 255, 0.2)'
          ]
        }}
        transition={{
          repeat: Infinity,
          duration: 3,
          ease: "easeInOut"
        }}
      />
    </>
  );
};

export default BannerBackgroundEffects;
