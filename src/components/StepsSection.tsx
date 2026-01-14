
import React, { useState } from 'react';
import { Upload, BarChart2, LineChart, ArrowRight } from 'lucide-react';
import StepCard from './StepCard';
import { motion } from 'framer-motion';
import { LanguageContext } from '@/App';
import { translations } from '@/utils/translations';

const StepsSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const { language } = React.useContext(LanguageContext);

  const handleStepClick = (step: number) => {
    setActiveStep(step);
    if (!completedSteps.includes(step)) {
      // Simulate completing a step when clicked
      setCompletedSteps([...completedSteps, step]);
    }
  };

  const stepIcons = [
    <Upload className="w-4 h-4 text-white" strokeWidth={1.5} />,
    <BarChart2 className="w-4 h-4 text-white" strokeWidth={1.5} />,
    <LineChart className="w-4 h-4 text-white" strokeWidth={1.5} />
  ];

  // Progress calculation
  const progress = (completedSteps.length / 3) * 100;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section className="py-16 px-4 bg-gradient-dark">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <motion.h2
            className="text-2xl md:text-3xl font-bold text-white mb-4 md:mb-0"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {language === "EN" ? "How It Works" : "Cómo Funciona"}
          </motion.h2>
          
          <motion.div 
            className="flex items-center"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-48 h-3 bg-white/10 rounded-full overflow-hidden shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)] backdrop-blur-sm border border-white/10">
              <motion.div
                className="h-full bg-gradient-to-r from-white/80 to-white/60 shadow-[0_0_15px_rgba(255,255,255,0.5)]"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <span className="ml-3 text-sm font-medium text-white/80">
              {completedSteps.length}/3
            </span>
          </motion.div>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div variants={itemVariants}>
            <StepCard
              step={1}
              icon={stepIcons[0]}
              title={translations.homepage[language].steps.step1.title}
              subtext={translations.homepage[language].steps.step1.subtext}
              isActive={activeStep === 1}
              isCompleted={completedSteps.includes(1)}
              onClick={() => handleStepClick(1)}
            />
          </motion.div>
          
          <motion.div variants={itemVariants} className="relative">
            <div className="hidden md:block absolute top-1/2 -left-4 transform -translate-y-1/2 -translate-x-full">
              <ArrowRight className="w-6 h-6 text-white/40 drop-shadow-[0_0_6px_rgba(255,255,255,0.3)]" strokeWidth={1.5} />
            </div>
            <StepCard
              step={2}
              icon={stepIcons[1]}
              title={translations.homepage[language].steps.step2.title}
              subtext={translations.homepage[language].steps.step2.subtext}
              isActive={activeStep === 2}
              isCompleted={completedSteps.includes(2)}
              onClick={() => handleStepClick(2)}
            />
          </motion.div>
          
          <motion.div variants={itemVariants} className="relative">
            <div className="hidden md:block absolute top-1/2 -left-4 transform -translate-y-1/2 -translate-x-full">
              <ArrowRight className="w-6 h-6 text-white/40 drop-shadow-[0_0_6px_rgba(255,255,255,0.3)]" strokeWidth={1.5} />
            </div>
            <StepCard
              step={3}
              icon={stepIcons[2]}
              title={translations.homepage[language].steps.step3.title}
              subtext={translations.homepage[language].steps.step3.subtext}
              isActive={activeStep === 3}
              isCompleted={completedSteps.includes(3)}
              onClick={() => handleStepClick(3)}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default StepsSection;
