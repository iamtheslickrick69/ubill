
import React from 'react';
import { Info, Zap, Sun, Home } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface MetricCardsProps {
  data: Array<{
    id: string;
    label: string;
    value: string;
    guessedValue?: string;
    comparison?: string;
    detail?: string;
  }>;
}

const MetricCards: React.FC<MetricCardsProps> = ({ data }) => {
  const getIconForMetric = (id: string) => {
    switch (id) {
      case 'rate':
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-primary">
            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      case 'usage':
        return <Zap className="w-5 h-5 text-primary" />;
      case 'solar':
        return <Sun className="w-5 h-5 text-primary" />;
      case 'music':
        return <Home className="w-5 h-5 text-primary" />;
      default:
        return <Info className="w-5 h-5 text-primary" />;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {data.map((metric) => (
        <div key={metric.id} className="bg-dark-card rounded-xl shadow-dark-card border border-dark-border p-6 hover:shadow-dark-card-hover transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <div>
                {getIconForMetric(metric.id)}
              </div>
              <h3 className="font-medium text-foreground">{metric.label}</h3>
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="w-4 h-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs">
                    {metric.id === 'rate' && 'This is your actual rate per kilowatt hour'}
                    {metric.id === 'usage' && 'Your monthly energy consumption'}
                    {metric.id === 'solar' && 'Estimated monthly savings with solar'}
                    {metric.id === 'music' && 'Empowering homeowners with energy knowledge'}
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <p className="text-sm text-muted-foreground">
            {metric.id === 'rate' && 'Your actual rate per kWh'}
            {metric.id === 'usage' && 'Average consumption'}
            {metric.id === 'solar' && 'Estimated savings with solar'}
            {metric.id === 'music' && 'Empowering Homeowners'}
          </p>
          <div className="mt-3">
            <p className="text-3xl font-bold text-foreground">{metric.value}</p>
            <p className="text-sm text-muted-foreground">
              {metric.guessedValue && `You guessed: ${metric.guessedValue}`}
              {metric.comparison && metric.comparison}
              {metric.detail && metric.detail}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MetricCards;
