
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import ServiceCards from '@/components/california/ServiceCards';
import UtilityTabs from '@/components/california/UtilityTabs';
import InfoBanner from '@/components/InfoBanner';

const CaliforniaPage = () => {
  const [activeTab, setActiveTab] = useState('PG&E');
  const { toast } = useToast();

  const handleUpload = () => {
    toast({
      title: "Upload your bill",
      description: "Select your energy bill to analyze and save.",
      duration: 3000,
    });
  };

  const missionStatement = "We believe every homeowner deserves to understand their energy bill and make confident choices — without confusion, pressure, or gimmicks.";

  return (
    <div className="pt-20 pb-16 px-4 bg-gradient-dark min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">California Energy Providers</h1>
          <InfoBanner text={missionStatement} className="max-w-3xl mx-auto" />
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Information about California's three major utility companies and how to optimize your energy costs.
          </p>
        </div>
        
        <ServiceCards />
        <UtilityTabs 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          handleUpload={handleUpload} 
        />
        
        <div className="text-center text-muted-foreground text-sm">
          © 2023 ubill.io. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default CaliforniaPage;
