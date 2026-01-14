
import React from 'react';
import { TrendingUp, Home, AlertTriangle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Alert, AlertDescription } from "@/components/ui/alert";
import EnergyBarChart from '@/components/EnergyBarChart';

interface UsageTabProps {
  data: {
    monthly: Array<{ name: string; value: number; unit: string }>;
    current: number;
    comparison: {
      efficient: number;
      average: number;
      inefficient: number;
    }
  };
}

const UsageTab: React.FC<UsageTabProps> = ({ data }) => {
  return (
    <div className="space-y-8">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-start space-x-3 mb-4">
          <TrendingUp className="w-5 h-5 text-blue-600 mt-1" />
          <div>
            <h3 className="font-medium text-gray-900">Usage Trends</h3>
            <p className="text-sm text-gray-500">Your energy consumption over time</p>
          </div>
        </div>
        
        <div className="mt-6">
          <EnergyBarChart data={data.monthly} height={400} />
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-start space-x-3 mb-4">
          <Home className="w-5 h-5 text-blue-600 mt-1" />
          <div>
            <h3 className="font-medium text-gray-900">How You Compare</h3>
            <p className="text-sm text-gray-500">Your usage compared to similar homes in your area</p>
          </div>
        </div>
        
        <div className="mt-6 space-y-6">
          <div className="flex items-center">
            <div className="w-32 text-right pr-4">
              <div className="text-sm font-medium text-gray-900">Efficient Homes</div>
            </div>
            <div className="flex-1">
              <div className="h-6 bg-gray-100 rounded-full overflow-hidden relative">
                <div 
                  className="h-full bg-green-500 rounded-full absolute left-0 top-0"
                  style={{ width: `${(data.comparison.efficient / data.comparison.inefficient) * 100}%` }}
                ></div>
                <div className="absolute left-2 top-0 h-full flex items-center">
                  <span className="text-xs font-medium text-white">{data.comparison.efficient} kWh</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="w-32 text-right pr-4">
              <div className="text-sm font-medium text-gray-900">Average Homes</div>
            </div>
            <div className="flex-1">
              <div className="h-6 bg-gray-100 rounded-full overflow-hidden relative">
                <div 
                  className="h-full bg-blue-500 rounded-full absolute left-0 top-0"
                  style={{ width: `${(data.comparison.average / data.comparison.inefficient) * 100}%` }}
                ></div>
                <div className="absolute left-2 top-0 h-full flex items-center">
                  <span className="text-xs font-medium text-white">{data.comparison.average} kWh</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="w-32 text-right pr-4">
              <div className="flex justify-end items-center">
                <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-0.5 rounded-full mr-2">You</span>
                <div className="text-sm font-medium text-gray-900">Your Home</div>
              </div>
            </div>
            <div className="flex-1">
              <div className="h-6 bg-gray-100 rounded-full overflow-hidden relative">
                <div 
                  className="h-full bg-yellow-500 rounded-full absolute left-0 top-0"
                  style={{ width: `${(data.current / data.comparison.inefficient) * 100}%` }}
                ></div>
                <div className="absolute left-2 top-0 h-full flex items-center">
                  <span className="text-xs font-medium text-white">{data.current} kWh</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="w-32 text-right pr-4">
              <div className="text-sm font-medium text-gray-900">Inefficient Homes</div>
            </div>
            <div className="flex-1">
              <div className="h-6 bg-gray-100 rounded-full overflow-hidden relative">
                <div 
                  className="h-full bg-red-500 rounded-full absolute left-0 top-0"
                  style={{ width: '100%' }}
                ></div>
                <div className="absolute left-2 top-0 h-full flex items-center">
                  <span className="text-xs font-medium text-white">{data.comparison.inefficient} kWh</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-md mt-8">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertTriangle className="h-5 w-5 text-yellow-400" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">Your Usage is Above Average</h3>
              <div className="mt-1 text-sm text-yellow-700">
                <p>Your home is using {Math.round(((data.current - data.comparison.average) / data.comparison.average) * 100)}% more energy than similar homes in your area. Check out our recommendations to reduce your usage and save money.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsageTab;
