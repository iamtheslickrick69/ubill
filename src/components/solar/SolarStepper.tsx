
import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Home, DollarSign, Battery, CheckCircle } from 'lucide-react';

interface SolarStepperProps {
  currentStep: number;
  completedSteps: number[];
  onStepChange: (step: number) => void;
}

interface Step {
  id: number;
  label: string;
  icon: React.ReactNode;
}

const SolarStepper: React.FC<SolarStepperProps> = ({ 
  currentStep, 
  completedSteps, 
  onStepChange 
}) => {
  const steps: Step[] = [
    { id: 1, label: 'How Solar Works', icon: <Sun className="h-5 w-5" /> },
    { id: 2, label: 'Is Your Home Suitable?', icon: <Home className="h-5 w-5" /> },
    { id: 3, label: 'Economics of Solar', icon: <DollarSign className="h-5 w-5" /> },
    { id: 4, label: 'Battery Storage', icon: <Battery className="h-5 w-5" /> },
    { id: 5, label: 'Making Your Decision', icon: <CheckCircle className="h-5 w-5" /> },
  ];

  return (
    <div className="w-full">
      <div className="hidden md:flex justify-between">
        {steps.map((step) => {
          const isCompleted = completedSteps.includes(step.id);
          const isActive = currentStep === step.id;
          const isClickable = isCompleted || step.id === 1 || completedSteps.includes(step.id - 1);
          
          return (
            <motion.div
              key={step.id}
              className={`flex flex-col items-center cursor-pointer ${
                isClickable ? '' : 'opacity-50 cursor-not-allowed'
              }`}
              whileHover={isClickable ? { scale: 1.05 } : {}}
              onClick={() => isClickable && onStepChange(step.id)}
              transition={{ duration: 0.2 }}
            >
              <div className={`
                w-12 h-12 rounded-full flex items-center justify-center mb-2
                ${isCompleted
                  ? 'bg-secondary/20 text-secondary'
                  : isActive
                    ? 'bg-primary text-white'
                    : 'bg-muted text-muted-foreground'}
              `}>
                {isCompleted ? <CheckCircle className="h-6 w-6" /> : step.icon}
              </div>
              <span className={`text-sm font-medium text-center ${
                isActive ? 'text-primary' : 'text-muted-foreground'
              }`}>
                {step.label}
              </span>
            </motion.div>
          );
        })}
      </div>
      
      {/* Mobile stepper */}
      <div className="md:hidden space-y-3">
        {steps.map((step) => {
          const isCompleted = completedSteps.includes(step.id);
          const isActive = currentStep === step.id;
          const isClickable = isCompleted || step.id === 1 || completedSteps.includes(step.id - 1);
          
          return (
            <motion.div
              key={step.id}
              className={`flex items-center p-3 rounded-lg ${
                isActive ? 'bg-primary/10' : ''
              } ${isClickable ? '' : 'opacity-50'}`}
              whileTap={isClickable ? { scale: 0.98 } : {}}
              onClick={() => isClickable && onStepChange(step.id)}
            >
              <div className={`
                w-10 h-10 rounded-full flex items-center justify-center mr-3
                ${isCompleted
                  ? 'bg-secondary/20 text-secondary'
                  : isActive
                    ? 'bg-primary text-white'
                    : 'bg-muted text-muted-foreground'}
              `}>
                {isCompleted ? <CheckCircle className="h-5 w-5" /> : step.icon}
              </div>
              <span className={`font-medium ${
                isActive ? 'text-primary' : 'text-muted-foreground'
              }`}>
                {step.label}
              </span>
              {isActive && (
                <div className="ml-auto w-2 h-2 rounded-full bg-primary"></div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default SolarStepper;
