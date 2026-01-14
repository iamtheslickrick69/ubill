
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import SolarStepper from '@/components/solar/SolarStepper';
import SolarHowItWorks from '@/components/solar/SolarHowItWorks';
import SolarHomeSuitability from '@/components/solar/SolarHomeSuitability';
import SolarEconomics from '@/components/solar/SolarEconomics';
import SolarBatteryStorage from '@/components/solar/SolarBatteryStorage';
import SolarDecision from '@/components/solar/SolarDecision';
import SolarCompletionBadge from '@/components/solar/SolarCompletionBadge';
import InfoBanner from '@/components/InfoBanner';
import { Info } from 'lucide-react';

const SolarPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [showCompletionBadge, setShowCompletionBadge] = useState(false);
  const { toast } = useToast();
  const stepContentRef = useRef<HTMLDivElement>(null);
  
  // Calculate progress percentage
  const totalSteps = 5;
  const progress = Math.round((completedSteps.length / totalSteps) * 100);

  const handleStepComplete = (step: number) => {
    if (!completedSteps.includes(step)) {
      const newCompletedSteps = [...completedSteps, step];
      setCompletedSteps(newCompletedSteps);
      
      // If all steps are completed, show the completion badge
      if (newCompletedSteps.length === totalSteps) {
        toast({
          title: "Congratulations!",
          description: "You've earned the Solar Expert Badge!",
          duration: 3000,
        });
        setShowCompletionBadge(true);
      } else {
        // Automatically advance to the next step if not the last one
        if (step < totalSteps) {
          setCurrentStep(step + 1);
          
          // Scroll to the step container with a smooth animation
          setTimeout(() => {
            if (stepContentRef.current) {
              stepContentRef.current.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
              });
            }
          }, 300);
        }
      }
    }
  };

  const handleStepChange = (step: number) => {
    setCurrentStep(step);
    
    // Scroll to the step container
    setTimeout(() => {
      if (stepContentRef.current) {
        stepContentRef.current.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    }, 100);
  };

  // Array of step components to render
  const stepComponents = [
    <SolarHowItWorks key="step1" onComplete={() => handleStepComplete(1)} />,
    <SolarHomeSuitability key="step2" onComplete={() => handleStepComplete(2)} />,
    <SolarEconomics key="step3" onComplete={() => handleStepComplete(3)} />,
    <SolarBatteryStorage key="step4" onComplete={() => handleStepComplete(4)} />,
    <SolarDecision key="step5" onComplete={() => handleStepComplete(5)} progress={progress} />
  ];

  return (
    <div className="pt-20 pb-16 px-4 md:px-8 bg-gradient-dark min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Solar Made Simple
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Learn about solar energy for California homes. Let's break down the myths and help you decide if solar is right for you — no pressure.
          </p>
        </div>
        
        <InfoBanner 
          text="We believe every homeowner deserves to understand their energy bill and make confident choices — without confusion, pressure, or gimmicks."
          icon={<Info className="h-5 w-5" />}
        />
        
        <div className="w-full max-w-3xl mx-auto mb-8 mt-8">
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-muted-foreground">Your Progress</span>
              <span className="text-sm font-medium text-primary">{progress}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
              <motion.div
                className="h-full bg-primary"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </div>
          </div>

          <Card className="p-6 shadow-dark-card border border-dark-border bg-dark-card mb-8">
            <SolarStepper 
              currentStep={currentStep} 
              completedSteps={completedSteps}
              onStepChange={handleStepChange}
            />
          </Card>

          <div ref={stepContentRef}>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="p-6 shadow-dark-card border border-dark-border bg-dark-card">
                  {stepComponents[currentStep - 1]}
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <SolarCompletionBadge show={showCompletionBadge} />
      </div>
    </div>
  );
};

export default SolarPage;
