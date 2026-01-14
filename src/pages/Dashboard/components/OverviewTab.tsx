
import React from 'react';
import { Info, TrendingUp, Sun } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface OverviewTabProps {
  data: {
    bill: {
      components: Array<{
        name: string;
        amount: number;
        color: string;
      }>;
      total: number;
    };
    savings: {
      opportunities: Array<{
        id: string;
        title: string;
        savings: number | string;
        description: string;
        cta: string;
        icon: string;
      }>;
      quickWins: string[];
    };
  };
  showTip?: boolean;
}

const OverviewTab: React.FC<OverviewTabProps> = ({ data, showTip = true }) => {
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'Sun':
        return <Sun className="h-5 w-5 text-primary" />;
      case 'Clock':
        return (
          <svg className="h-5 w-5 text-primary" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
        );
      default:
        return <Info className="h-5 w-5 text-primary" />;
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-dark-card rounded-xl shadow-dark-card border border-dark-border p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5 text-primary" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 3v18h18"></path>
              <path d="M18 9V4H8v10H3v6h18V9h-3z"></path>
            </svg>
            <h3 className="font-medium text-foreground">Bill Breakdown</h3>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="w-4 h-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">How your monthly bill is calculated</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <p className="text-sm text-muted-foreground mb-6">How your monthly bill is calculated</p>
        
        <div className="space-y-4">
          {data.bill.components.map((component, index) => (
            <div key={index} className="space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-sm text-foreground">{component.name}</span>
                <span className="text-sm font-medium text-foreground">${component.amount.toFixed(2)}</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full rounded-full transition-all duration-1000 ease-out"
                  style={{ 
                    width: `${(component.amount / data.bill.total) * 100}%`, 
                    backgroundColor: component.color,
                  }}
                ></div>
              </div>
            </div>
          ))}
          
          <div className="flex justify-between items-center pt-4 border-t border-dark-border mt-4 font-medium text-foreground">
            <span>Total Monthly Bill</span>
            <span>${data.bill.total.toFixed(2)}</span>
          </div>
        </div>
      </div>
      
      {showTip && (
        <div className="bg-dark-card border-l-4 border-primary p-4 rounded-md">
          <div className="flex">
            <div className="flex-shrink-0">
              <Info className="h-5 w-5 text-primary" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-muted-foreground">
                Energy Tip: Your usage is 12% higher than average in your area. Try adjusting your thermostat by 2-3 degrees to reduce costs.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="bg-dark-card rounded-xl shadow-dark-card border border-dark-border p-6">
        <div className="flex items-start space-x-3 mb-4">
          <TrendingUp className="w-5 h-5 text-primary mt-1" />
          <div>
            <h3 className="font-medium text-foreground">Recommended Actions</h3>
            <p className="text-sm text-muted-foreground">Next steps to optimize your energy usage and costs</p>
          </div>
        </div>
        
        <div className="space-y-4 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.savings.opportunities.slice(0, 2).map((opportunity) => (
              <div 
                key={opportunity.id} 
                className="bg-dark-card border border-dark-border rounded-lg p-4"
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    {getIconComponent(opportunity.icon)}
                  </div>
                  <div className="ml-3">
                    <div className="flex justify-between items-start">
                      <h4 className="text-sm font-medium text-foreground">{opportunity.title}</h4>
                      <span className="text-primary font-medium">
                        {typeof opportunity.savings === 'string' ? opportunity.savings : `$${opportunity.savings}/mo`}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {opportunity.description}
                    </p>
                    <a href="#" className="inline-flex items-center text-xs font-medium text-primary hover:text-primary/80 mt-2">
                      {opportunity.cta} →
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6">
            <h4 className="text-sm font-medium text-foreground mb-3">Quick Wins</h4>
            <ul className="space-y-2">
              {data.savings.quickWins.map((win, index) => (
                <li key={index} className="flex items-start">
                  <svg className="h-5 w-5 text-primary mr-2 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                  <span className="text-sm text-muted-foreground">{win}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewTab;
