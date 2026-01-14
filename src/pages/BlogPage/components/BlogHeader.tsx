
import React from 'react';
import { motion } from 'framer-motion';
import InfoBanner from '@/components/InfoBanner';

const BlogHeader = () => {
  const missionStatement = "We believe every homeowner deserves to understand their energy bill and make confident choices — without confusion, pressure, or gimmicks.";

  return (
    <div className="text-center max-w-4xl mx-auto mb-12">
      <motion.h1 
        className="text-4xl md:text-5xl font-bold text-foreground mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        The Real Truth About Your Energy Bill
      </motion.h1>
      
      <InfoBanner text={missionStatement} className="mx-auto mb-6" />
      
      <motion.p 
        className="text-lg text-muted-foreground mt-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        Honest insights to help California homeowners understand energy bills, utility plans, 
        solar rules, and real cost-saving strategies.
      </motion.p>
    </div>
  );
};

export default BlogHeader;
