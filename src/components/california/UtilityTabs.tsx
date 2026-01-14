
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UtilityContent from './UtilityContent';

interface UtilityTabsProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
  handleUpload: () => void;
}

const UtilityTabs: React.FC<UtilityTabsProps> = ({ activeTab, setActiveTab, handleUpload }) => {
  const utilityData = {
    'PG&E': {
      title: 'PG&E',
      description: 'PG&E is one of the largest combined natural gas and electric energy companies in the United States, providing service to approximately 16 million people throughout a 70,000-square-mile service area in northern and central California.',
      ratePlanTitle: 'Time-of-Use (TOU) Plans',
      ratePlanDescription: 'Most residential customers are on TOU plans where electricity costs more during high-demand hours (typically 4-9 PM) and less during off-peak hours.',
      phoneNumber: '1-800-743-5000',
      email: 'customerservice@pge.com',
      logoPath: 'public/lovable-uploads/0dcdbbb4-3907-4182-845b-8e880f2fcfdf.png',
      logoAlt: 'PG&E Logo'
    },
    'SCE': {
      title: 'SCE',
      description: 'Southern California Edison (SCE) delivers power to more than 15 million people across 50,000 square miles of Central, Coastal, and Southern California.',
      ratePlanTitle: 'Time-of-Use (TOU) Plans',
      ratePlanDescription: 'SCE offers several TOU rate plans with different peak hours and pricing structures to fit various customer needs and usage patterns.',
      phoneNumber: '1-800-655-4555',
      email: 'contactus@sce.com',
      logoPath: 'public/lovable-uploads/d435884f-bd94-4108-87ca-7f894d7dc533.png',
      logoAlt: 'SCE Logo'
    },
    'SDG&E': {
      title: 'SDG&E',
      description: 'San Diego Gas & Electric (SDG&E) provides energy service to 3.6 million people through 1.4 million electric meters and 873,000 natural gas meters in San Diego and southern Orange counties.',
      ratePlanTitle: 'Time-of-Use (TOU) Plans',
      ratePlanDescription: 'SDG&E\'s TOU plans have different pricing during peak, off-peak, and super off-peak hours, with the highest rates typically between 4 PM and 9 PM.',
      phoneNumber: '1-800-411-7343',
      email: 'customerservice@sdge.com',
      logoPath: 'public/lovable-uploads/83ec999a-837a-4746-8ca6-a21f818a68e7.png',
      logoAlt: 'SDG&E Logo'
    }
  };

  return (
    <div className="bg-dark-card rounded-xl shadow-dark-card border border-dark-border p-6 mb-12">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 w-full max-w-md mb-8">
          <TabsTrigger 
            value="PG&E" 
            className="data-[state=active]:bg-primary data-[state=active]:text-black"
          >
            PG&E
          </TabsTrigger>
          <TabsTrigger 
            value="SCE" 
            className="data-[state=active]:bg-primary data-[state=active]:text-black"
          >
            SCE
          </TabsTrigger>
          <TabsTrigger 
            value="SDG&E" 
            className="data-[state=active]:bg-primary data-[state=active]:text-black"
          >
            SDG&E
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="PG&E">
          <UtilityContent 
            {...utilityData['PG&E']}
          />
        </TabsContent>
        
        <TabsContent value="SCE">
          <UtilityContent 
            {...utilityData['SCE']}
          />
        </TabsContent>
        
        <TabsContent value="SDG&E">
          <UtilityContent 
            {...utilityData['SDG&E']}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UtilityTabs;
