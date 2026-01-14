
import React, { useState } from 'react';
import SolarAnimation from './SolarAnimation';
import SolarProcessSteps from './SolarProcessSteps';
import SolarInfoNote from './SolarInfoNote';
import CompletionButton from './CompletionButton';

interface SolarHowItWorksProps {
  onComplete: () => void;
}

const SolarHowItWorks: React.FC<SolarHowItWorksProps> = ({ onComplete }) => {
  const [isCompleted, setIsCompleted] = useState(false);

  const handleComplete = () => {
    setIsCompleted(true);
    onComplete();
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-foreground">How Solar Works</h2>
        <p className="text-muted-foreground mt-2">Solar panels turn sunlight into electricity. Let's break it down.</p>
      </div>

      <SolarAnimation />
      <SolarProcessSteps />

      <SolarInfoNote variant="yellow">
        In California, solar panels can generate power year-round thanks to abundant sunshine. Most homeowners see their systems produce the most electricity from March through October.
      </SolarInfoNote>

      <CompletionButton 
        onClick={handleComplete}
        isCompleted={isCompleted}
        text="I Understand How Solar Works"
      />
    </div>
  );
};

export default SolarHowItWorks;
