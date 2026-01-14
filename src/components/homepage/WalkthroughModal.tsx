
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { FileText, Bot, Lightbulb, ChevronRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface WalkthroughModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const steps = [
  {
    id: 1,
    title: "Upload Your Bill",
    description: "Start by uploading your utility bill—we'll handle the rest.",
    icon: <FileText className="w-12 h-12 text-blue-500" />
  },
  {
    id: 2,
    title: "AI-Powered Analysis",
    description: "Our energy AI decodes the fine print and finds hidden fees.",
    icon: <Bot className="w-12 h-12 text-indigo-500" />
  },
  {
    id: 3,
    title: "Personalized Savings",
    description: "We show you your smartest options—solar, batteries, and more.",
    icon: <Lightbulb className="w-12 h-12 text-amber-500" />
  }
];

const WalkthroughModal: React.FC<WalkthroughModalProps> = ({ open, onOpenChange }) => {
  const [currentStep, setCurrentStep] = useState(1);
  
  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    } else {
      onOpenChange(false);
      // Reset for next time
      setTimeout(() => setCurrentStep(1), 300);
    }
  };
  
  const handleClose = () => {
    onOpenChange(false);
    // Reset for next time
    setTimeout(() => setCurrentStep(1), 300);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-white p-0 overflow-hidden">
        <DialogHeader className="pt-6 px-6 relative">
          <DialogTitle className="text-2xl font-bold text-center">
            How ubill.io Works
          </DialogTitle>
          <DialogClose 
            className="absolute right-4 top-4 rounded-full p-2 hover:bg-gray-100 transition-colors"
            onClick={handleClose}
          >
            <X className="h-4 w-4" />
          </DialogClose>
          
          <div className="flex justify-center space-x-2 mt-4">
            {steps.map((step) => (
              <div 
                key={step.id}
                className={`h-2 w-8 rounded-full transition-colors duration-300 ${
                  step.id === currentStep 
                    ? 'bg-[#A1E09E]' 
                    : step.id < currentStep 
                      ? 'bg-gray-300' 
                      : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
        </DialogHeader>
        
        <div className="relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="px-6 py-8"
            >
              <div className="flex flex-col items-center text-center">
                <div className="bg-gray-100 rounded-full p-6 mb-4 animate-pulse">
                  {steps[currentStep - 1].icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{steps[currentStep - 1].title}</h3>
                <p className="text-gray-600 mb-8">{steps[currentStep - 1].description}</p>
                
                <Button 
                  onClick={handleNext}
                  className="bg-[#A1E09E] hover:bg-[#91D08E] text-white px-8 py-2 rounded-full flex items-center gap-2"
                >
                  {currentStep === steps.length ? 'Get Started' : 'Next'}
                  {currentStep !== steps.length && <ChevronRight className="w-4 h-4" />}
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WalkthroughModal;
