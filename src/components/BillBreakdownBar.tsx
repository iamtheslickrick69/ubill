
import React, { useEffect, useState } from 'react';

interface BillComponent {
  name: string;
  amount: number;
  color: string;
}

interface BillBreakdownBarProps {
  components: BillComponent[];
  title: string;
  description: string;
}

const BillBreakdownBar: React.FC<BillBreakdownBarProps> = ({ 
  components,
  title,
  description
}) => {
  const [animatedComponents, setAnimatedComponents] = useState<BillComponent[]>(
    components.map(comp => ({ ...comp, amount: 0 }))
  );
  
  const total = components.reduce((sum, component) => sum + component.amount, 0);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedComponents(components);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [components]);
  
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <div>
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600">
              <path d="M3 3v18h18"></path>
              <path d="M18 9V4H8v10H3v6h18V9h-3z"></path>
            </svg>
            <h3 className="text-sm font-medium text-gray-700">{title}</h3>
          </div>
          <p className="text-xs text-gray-500">{description}</p>
        </div>
      </div>
      
      <div className="space-y-3">
        {animatedComponents.map((component, index) => {
          const percentage = (component.amount / total) * 100;
          
          return (
            <div key={index} className="space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-700">{component.name}</span>
                <span className="text-sm font-medium">${component.amount.toFixed(2)}</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full rounded-full transition-all duration-1000 ease-out"
                  style={{ 
                    width: `${percentage}%`, 
                    backgroundColor: component.color,
                  }}
                ></div>
              </div>
            </div>
          );
        })}
        
        <div className="flex justify-between items-center pt-3 font-medium">
          <span>Total Monthly Bill</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default BillBreakdownBar;
