
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { DollarSign, TrendingUp, BarChart2, Info, Calculator } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface SolarEconomicsProps {
  onComplete: () => void;
}

const SolarEconomics: React.FC<SolarEconomicsProps> = ({ onComplete }) => {
  const [monthlyBill, setMonthlyBill] = useState(250);
  const [location, setLocation] = useState('central');
  const [ownership, setOwnership] = useState('buy');
  const [isCompleted, setIsCompleted] = useState(false);
  
  // Calculated values
  const [monthlySavings, setMonthlySavings] = useState(0);
  const [annualSavings, setAnnualSavings] = useState(0);
  const [twentyYearSavings, setTwentyYearSavings] = useState(0);
  const [paybackPeriod, setPaybackPeriod] = useState(0);
  
  // Update calculations when inputs change
  useEffect(() => {
    // Apply location modifier (Southern CA has more sun)
    const locationMultiplier = 
      location === 'southern' ? 1.1 : 
      location === 'central' ? 1.0 : 
      0.9; // northern
    
    // Apply ownership modifier (buying typically has better long-term economics)
    const ownershipMultiplier = 
      ownership === 'buy' ? 1.0 : 
      ownership === 'lease' ? 0.8 : 
      0.85; // ppa
    
    // Calculate monthly savings (typically 65% of bill but adjusted by location and ownership)
    const calculatedMonthlySavings = monthlyBill * 0.65 * locationMultiplier * ownershipMultiplier;
    setMonthlySavings(Math.round(calculatedMonthlySavings));
    
    // Calculate annual and 20-year savings
    setAnnualSavings(Math.round(calculatedMonthlySavings * 12));
    setTwentyYearSavings(Math.round(calculatedMonthlySavings * 12 * 20));
    
    // Estimate payback period (years)
    // Assume average system cost is $15,000 after incentives, adjusted by location
    const systemCost = 15000 * (ownership === 'buy' ? 1 : 0);
    const payback = systemCost / (calculatedMonthlySavings * 12);
    setPaybackPeriod(parseFloat(payback.toFixed(1)));
    
  }, [monthlyBill, location, ownership]);

  const handleComplete = () => {
    setIsCompleted(true);
    onComplete();
  };

  // Yearly savings data for the chart (simplified)
  const yearLabels = Array.from({ length: 5 }, (_, i) => 2023 + i);
  const yearlyData = yearLabels.map((_, index) => {
    // Assume 3% annual increase in utility rates = more savings each year
    return Math.round(annualSavings * Math.pow(1.03, index));
  });
  
  // Maximum value for scaling the chart
  const maxValue = Math.max(...yearlyData);

  return (
    <div className="space-y-8">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Economics of Solar</h2>
        <p className="text-gray-600 mt-2">Let's calculate your potential solar savings based on your inputs.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
            <h3 className="flex items-center text-lg font-semibold mb-4">
              <Calculator className="mr-2 h-5 w-5 text-energy-blue" />
              Input Your Data
            </h3>
            
            <div className="space-y-5">
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Average Monthly Electric Bill
                </label>
                <input
                  type="range"
                  min="50"
                  max="600"
                  step="10"
                  value={monthlyBill}
                  onChange={(e) => setMonthlyBill(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer"
                />
                <div className="flex justify-between mt-1">
                  <span className="text-sm text-gray-500">$50</span>
                  <span className="text-lg font-bold text-energy-blue">${monthlyBill}</span>
                  <span className="text-sm text-gray-500">$600</span>
                </div>
              </div>
              
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Your Location in California
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setLocation('northern')}
                    className={`p-2 rounded-md text-center transition-all ${
                      location === 'northern'
                        ? 'bg-energy-blue text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Northern
                  </button>
                  <button
                    onClick={() => setLocation('central')}
                    className={`p-2 rounded-md text-center transition-all ${
                      location === 'central'
                        ? 'bg-energy-blue text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Central
                  </button>
                  <button
                    onClick={() => setLocation('southern')}
                    className={`p-2 rounded-md text-center transition-all ${
                      location === 'southern'
                        ? 'bg-energy-blue text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Southern
                  </button>
                </div>
              </div>
              
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Ownership Preference
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setOwnership('buy')}
                    className={`p-2 rounded-md text-center transition-all ${
                      ownership === 'buy'
                        ? 'bg-energy-blue text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Buy
                  </button>
                  <button
                    onClick={() => setOwnership('lease')}
                    className={`p-2 rounded-md text-center transition-all ${
                      ownership === 'lease'
                        ? 'bg-energy-blue text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Lease
                  </button>
                  <button
                    onClick={() => setOwnership('ppa')}
                    className={`p-2 rounded-md text-center transition-all ${
                      ownership === 'ppa'
                        ? 'bg-energy-blue text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    PPA
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-2">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-5 rounded-lg shadow-sm border border-gray-100 h-full"
          >
            <h3 className="flex items-center text-lg font-semibold mb-6">
              <TrendingUp className="mr-2 h-5 w-5 text-green-600" />
              Your Estimated Solar Savings
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Monthly Savings</p>
                <p className="text-2xl font-bold text-green-600">${monthlySavings}</p>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Annual Savings</p>
                <p className="text-2xl font-bold text-blue-600">${annualSavings}</p>
              </div>
              
              <div className="bg-purple-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">20-Year Savings</p>
                <p className="text-2xl font-bold text-purple-600">${twentyYearSavings}</p>
              </div>
            </div>

            <div className="mb-8">
              <h4 className="text-md font-medium mb-3">5-Year Savings Projection</h4>
              <div className="h-48 flex items-end space-x-4">
                {yearlyData.map((value, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div className="w-full">
                      <motion.div 
                        initial={{ height: 0 }}
                        animate={{ height: `${(value / maxValue) * 100}%` }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="bg-energy-blue rounded-t-md"
                        style={{ minHeight: '1rem' }}
                      >
                        <div className="text-xs text-white text-center py-1">
                          ${value}
                        </div>
                      </motion.div>
                    </div>
                    <div className="text-xs mt-2">{yearLabels[index]}</div>
                  </div>
                ))}
              </div>
            </div>

            {ownership === 'buy' && (
              <div className="mb-6">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Estimated Payback Period</span>
                  <span className="text-sm font-medium">{paybackPeriod} years</span>
                </div>
                <Progress value={(paybackPeriod / 10) * 100} className="h-2" />
                <p className="text-xs text-gray-500 mt-1">
                  The payback period is how long it takes for energy savings to equal your initial investment.
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
      
      <div className="bg-yellow-50 rounded-lg p-4 flex items-start">
        <Info className="w-5 h-5 text-yellow-600 mt-0.5 mr-3 flex-shrink-0" />
        <p className="text-sm text-yellow-700">
          These calculations are estimates based on your inputs and average solar performance in California. 
          Actual savings may vary based on factors like panel efficiency, installation quality, and future utility rates.
        </p>
      </div>

      <div className="flex justify-center mt-6">
        <Button 
          onClick={handleComplete}
          disabled={isCompleted}
          className={`px-8 ${isCompleted ? 'bg-green-500' : 'bg-energy-blue'}`}
        >
          {isCompleted ? 'Completed!' : 'Save My Economic Analysis'}
        </Button>
      </div>
    </div>
  );
};

export default SolarEconomics;
