
import React from 'react';
import { Sun, Clock, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SavingsOpportunity {
  id: string;
  title: string;
  savings: number | string;
  description: string;
  cta: string;
  icon: string;
}

interface SavingsTabProps {
  data: {
    opportunities: SavingsOpportunity[];
    quickWins: string[];
  };
}

const SavingsTab: React.FC<SavingsTabProps> = ({ data }) => {
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'Sun':
        return <Sun className="h-5 w-5 text-primary" />;
      case 'Clock':
        return <Clock className="h-5 w-5 text-primary" />;
      case 'Zap':
        return <Zap className="h-5 w-5 text-primary" />;
      default:
        return <Sun className="h-5 w-5 text-primary" />;
    }
  };

  const getColorClass = (iconName: string) => {
    return 'bg-dark-card';
  };

  const getTextColorClass = (iconName: string) => {
    return 'text-primary';
  };

  const renderSavingsValue = (opportunity: SavingsOpportunity) => {
    // For the solar opportunity, we show the rate instead of a dollar amount
    if (opportunity.id === 'solar') {
      return <span className="text-primary text-lg font-medium">12¢/kWh</span>;
    }
    
    // For other opportunities, we show the dollar amount as before
    return <span className="text-primary text-lg font-medium">${opportunity.savings}/mo</span>;
  };

  return (
    <div className="bg-dark-card rounded-xl shadow-dark-card border border-dark-border p-6">
      <div className="flex items-start space-x-3 mb-4">
        <svg className="w-5 h-5 text-primary mt-1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
          <polyline points="16 7 22 7 22 13"></polyline>
        </svg>
        <div>
          <h3 className="font-medium text-foreground">Savings Opportunities</h3>
          <p className="text-sm text-muted-foreground">All recommendations to reduce your energy costs</p>
        </div>
      </div>
      
      <div className="space-y-6 mt-8">
        {data.opportunities.map((opportunity) => (
          <div key={opportunity.id} className="bg-muted rounded-lg p-4 border border-dark-border">
            <div className="flex">
              <div className="flex-shrink-0 mt-1">
                {getIconComponent(opportunity.icon)}
              </div>
              <div className="ml-3 flex-1">
                <div className="flex justify-between items-start">
                  <h4 className="text-lg font-medium text-foreground">
                    {opportunity.id === 'solar' ? 'Pay Less for Electricity' : opportunity.title}
                  </h4>
                  {renderSavingsValue(opportunity)}
                </div>
                <p className="text-muted-foreground mt-1">
                  {opportunity.id === 'solar' 
                    ? 'See why you should be paying around 12¢ per kilowatt hour instead of 37.5¢ with your current utility provider.'
                    : opportunity.description
                  }
                </p>
                <a href="#" className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 mt-2">
                  {opportunity.cta} →
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavingsTab;
