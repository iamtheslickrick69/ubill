
import React from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

interface CompletionButtonProps {
  onClick: () => void;
  isCompleted: boolean;
  text: string;
}

const CompletionButton: React.FC<CompletionButtonProps> = ({ onClick, isCompleted, text }) => {
  return (
    <div className="flex justify-center mt-6">
      <Button 
        onClick={onClick}
        disabled={isCompleted}
        className={`px-8 ${isCompleted ? 'bg-green-500 hover:bg-green-500' : 'bg-energy-blue'}`}
      >
        {isCompleted ? (
          <span className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            Completed!
          </span>
        ) : text}
      </Button>
    </div>
  );
};

export default CompletionButton;
