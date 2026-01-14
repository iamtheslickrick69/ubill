
import React from 'react';
import { motion } from 'framer-motion';
import { useContext } from 'react';
import { LanguageContext } from '@/App';
import { translations } from '@/utils/translations';
import { Sparkles } from 'lucide-react';

const ValuePropositionSection: React.FC = () => {
  const { language } = useContext(LanguageContext);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.2
      }
    }
  };

  return (
    <section className="py-16 px-4 relative z-10 overflow-hidden">
      <motion.div 
        className="max-w-5xl mx-auto text-center glass-card p-10 rounded-2xl shadow-lg bg-white/70 border border-blue-50 relative"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        {/* Decorative elements */}
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-50 rounded-full opacity-50 blur-3xl"></div>
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-purple-50 rounded-full opacity-50 blur-3xl"></div>
        
        <div className="flex justify-center mb-6">
          <div className="bg-blue-50 p-3 rounded-full">
            <Sparkles className="h-8 w-8 text-energy-blue" />
          </div>
        </div>
        
        <motion.h2 
          className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 relative"
          variants={textVariants}
        >
          {translations.homepage[language].valueProposition}
        </motion.h2>
        
        <motion.p 
          className="text-xl text-gray-700 max-w-3xl mx-auto relative"
          variants={textVariants}
        >
          {translations.homepage[language].valueDescription}
        </motion.p>
      </motion.div>
    </section>
  );
};

export default ValuePropositionSection;
