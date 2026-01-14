
import React from 'react';
import { Button } from "@/components/ui/button";
import { Zap, ArrowRight } from 'lucide-react';
import UploadBillButton from '@/components/UploadBillButton';

const ServiceCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
      <div className="bg-dark-card rounded-xl shadow-dark-card border border-dark-border p-6 hover:shadow-dark-card-hover transition-all">
        <div className="flex items-center mb-4">
          <Zap className="w-5 h-5 text-primary mr-2" />
          <h2 className="text-xl font-bold text-foreground">I Have Solar</h2>
        </div>
        <p className="text-muted-foreground text-sm mb-4">Resources for existing solar customers</p>
        <p className="text-muted-foreground mb-6">
          Already have solar panels? Learn about NEM 3.0, optimizing your system, and solving common issues.
        </p>
        <Button variant="outline" className="flex items-center">
          <span>Learn more</span>
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
      
      <div className="bg-dark-card rounded-xl shadow-dark-card border border-dark-border p-6 hover:shadow-dark-card-hover transition-all">
        <div className="flex items-center mb-4">
          <div className="w-5 h-5 text-primary mr-2 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 9V5c0-1.1.9-2 2-2h4"></path>
              <path d="M2 13v4c0 1.1.9 2 2 2h4"></path>
              <path d="M22 9V5c0-1.1-.9-2-2-2h-4"></path>
              <path d="M22 13v4c0-1.1-.9 2-2 2h-4"></path>
              <rect x="7" y="14" width="10" height="7" rx="1"></rect>
              <rect x="7" y="3" width="10" height="7" rx="1"></rect>
            </svg>
          </div>
          <h2 className="text-xl font-bold text-foreground">Analyze My Bill</h2>
        </div>
        <p className="text-muted-foreground text-sm mb-4">Upload your bill for instant savings</p>
        <p className="text-muted-foreground mb-6">
          Upload your California utility bill and discover potential savings with our AI-powered analysis.
        </p>
        <UploadBillButton variant="default" className="flex items-center">
          <span>Upload bill</span>
          <ArrowRight className="w-4 h-4 ml-2" />
        </UploadBillButton>
      </div>
      
      <div className="bg-dark-card rounded-xl shadow-dark-card border border-dark-border p-6 hover:shadow-dark-card-hover transition-all">
        <div className="flex items-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary mr-2">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M12 16v-4"></path>
            <path d="M12 8h.01"></path>
          </svg>
          <h2 className="text-xl font-bold text-foreground">Why Pay More?</h2>
        </div>
        <p className="text-muted-foreground text-sm mb-4">Pay just 12¢/kWh for electricity</p>
        <p className="text-muted-foreground mb-6">
          Learn why you should be paying around 12¢ per kilowatt hour instead of 30-40¢ with your utility provider.
        </p>
        <Button variant="outline" className="flex items-center">
          <span>Find out more</span>
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default ServiceCards;
