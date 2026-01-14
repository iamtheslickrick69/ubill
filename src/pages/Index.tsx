
import React from 'react';
import { Zap, BarChart2, PieChart, Activity } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-gray-700">Energy Usage</h3>
              <div className="p-2 bg-blue-50 rounded-full">
                <Zap className="h-5 w-5 text-energy-blue" />
              </div>
            </div>
            <p className="text-2xl font-bold">834 kWh</p>
            <p className="text-sm text-gray-500">+7.2% from last month</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-gray-700">Monthly Cost</h3>
              <div className="p-2 bg-green-50 rounded-full">
                <BarChart2 className="h-5 w-5 text-energy-green" />
              </div>
            </div>
            <p className="text-2xl font-bold">$147.28</p>
            <p className="text-sm text-gray-500">-2.3% from last month</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-gray-700">Energy Score</h3>
              <div className="p-2 bg-purple-50 rounded-full">
                <Activity className="h-5 w-5 text-energy-purple" />
              </div>
            </div>
            <p className="text-2xl font-bold">72/100</p>
            <p className="text-sm text-gray-500">Top 30% in your area</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="font-medium text-gray-700 mb-4">Usage Breakdown</h3>
            <div className="h-64 flex items-center justify-center">
              <p className="text-gray-400">Chart placeholder</p>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="font-medium text-gray-700 mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex items-start pb-4 border-b border-gray-100">
                  <div className="p-2 bg-blue-50 rounded-full mr-3">
                    <PieChart className="h-5 w-5 text-energy-blue" />
                  </div>
                  <div>
                    <p className="font-medium">Energy report generated</p>
                    <p className="text-sm text-gray-500">2 days ago</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
