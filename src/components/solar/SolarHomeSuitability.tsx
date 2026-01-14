
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Home, Sun, Trees, CheckCircle } from 'lucide-react';
import SuitabilityFactor from './SuitabilityFactor';
import SuitabilityScore from './SuitabilityScore';
import SuitabilityInfoBanner from './SuitabilityInfoBanner';

interface SolarHomeSuitabilityProps {
  onComplete: () => void;
}

interface SuitabilityFactor {
  id: string;
  label: string;
  icon: React.ReactNode;
  options: { value: string; label: string; score: number }[];
  selectedValue: string;
}

const SolarHomeSuitability: React.FC<SolarHomeSuitabilityProps> = ({ onComplete }) => {
  const [factors, setFactors] = useState<SuitabilityFactor[]>([
    {
      id: 'roof-direction',
      label: 'Roof Direction',
      icon: <Home className="h-5 w-5" />,
      options: [
        { value: 'south', label: 'South-facing', score: 100 },
        { value: 'east-west', label: 'East/West-facing', score: 80 },
        { value: 'north', label: 'North-facing', score: 40 },
        { value: 'unknown', label: 'I don\'t know', score: 60 }
      ],
      selectedValue: ''
    },
    {
      id: 'shade',
      label: 'Shade Coverage',
      icon: <Trees className="h-5 w-5" />,
      options: [
        { value: 'none', label: 'No shade', score: 100 },
        { value: 'partial', label: 'Partial shade', score: 70 },
        { value: 'heavy', label: 'Heavy shade', score: 30 },
        { value: 'unknown', label: 'I don\'t know', score: 60 }
      ],
      selectedValue: ''
    },
    {
      id: 'sunlight',
      label: 'Daily Sunlight',
      icon: <Sun className="h-5 w-5" />,
      options: [
        { value: 'full', label: '6+ hours', score: 100 },
        { value: 'moderate', label: '4-6 hours', score: 80 },
        { value: 'low', label: 'Less than 4 hours', score: 40 },
        { value: 'unknown', label: 'I don\'t know', score: 60 }
      ],
      selectedValue: ''
    },
    {
      id: 'roof-condition',
      label: 'Roof Condition',
      icon: <Home className="h-5 w-5" />,
      options: [
        { value: 'new', label: 'New (0-5 years)', score: 100 },
        { value: 'good', label: 'Good (5-15 years)', score: 80 },
        { value: 'old', label: 'Needs replacement', score: 30 },
        { value: 'unknown', label: 'I don\'t know', score: 60 }
      ],
      selectedValue: ''
    }
  ]);
  
  const [suitabilityScore, setSuitabilityScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [allFactorsSelected, setAllFactorsSelected] = useState(false);

  useEffect(() => {
    const allSelected = factors.every(factor => factor.selectedValue !== '');
    setAllFactorsSelected(allSelected);

    if (allSelected) {
      calculateSuitabilityScore();
    }
  }, [factors]);

  const calculateSuitabilityScore = () => {
    let totalScore = 0;
    factors.forEach(factor => {
      const selected = factor.options.find(opt => opt.value === factor.selectedValue);
      if (selected) {
        totalScore += selected.score;
      }
    });
    setSuitabilityScore(Math.round(totalScore / factors.length));
  };

  const handleOptionSelect = (factorId: string, value: string) => {
    setFactors(prev => prev.map(factor => 
      factor.id === factorId 
        ? { ...factor, selectedValue: value } 
        : factor
    ));
  };

  const handleComplete = () => {
    setIsCompleted(true);
    onComplete();
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-foreground">Is Your Home Suitable?</h2>
        <p className="text-muted-foreground mt-2">Let's check if your home is a good candidate for solar power.</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {factors.map((factor) => (
          <SuitabilityFactor
            key={factor.id}
            id={factor.id}
            label={factor.label}
            icon={factor.icon}
            options={factor.options}
            selectedValue={factor.selectedValue}
            onSelect={handleOptionSelect}
          />
        ))}
      </div>

      {allFactorsSelected && <SuitabilityScore score={suitabilityScore} />}

      {allFactorsSelected && <SuitabilityInfoBanner />}

      <div className="flex justify-center mt-6">
        <Button 
          onClick={handleComplete}
          disabled={!allFactorsSelected || isCompleted}
          className={`px-8 ${isCompleted ? 'bg-green-500 hover:bg-green-500' : 'bg-energy-blue'}`}
        >
          {isCompleted ? (
            <span className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              Completed!
            </span>
          ) : 'Save My Suitability Results'}
        </Button>
      </div>
    </div>
  );
};

export default SolarHomeSuitability;
