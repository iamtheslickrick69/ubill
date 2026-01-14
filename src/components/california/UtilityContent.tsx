
import React from 'react';
import { Phone, Mail } from 'lucide-react';
import UploadBillButton from '@/components/UploadBillButton';

interface UtilityContentProps {
  title: string;
  description: string;
  ratePlanTitle: string;
  ratePlanDescription: string;
  phoneNumber: string;
  email: string;
  logoPath: string;
  logoAlt: string;
}

const UtilityContent: React.FC<UtilityContentProps> = ({
  title,
  description,
  ratePlanTitle,
  ratePlanDescription,
  phoneNumber,
  email,
  logoPath,
  logoAlt
}) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between">
        <div className="md:w-2/3 md:pr-8">
          <h3 className="text-xl font-bold text-foreground mb-4">Overview</h3>
          <p className="text-muted-foreground mb-6">{description}</p>
          
          <h3 className="text-xl font-bold text-foreground mb-4">Rate Plans</h3>
          <div>
            <h4 className="font-medium text-foreground mb-2">{ratePlanTitle}</h4>
            <p className="text-muted-foreground mb-4">{ratePlanDescription}</p>
          </div>

          <div className="mt-6">
            <h4 className="font-medium text-foreground mb-2">Contact Information</h4>
            <div className="flex items-center mb-2">
              <Phone className="w-4 h-4 text-primary mr-2" />
              <span className="text-muted-foreground">{phoneNumber}</span>
            </div>
            <div className="flex items-center">
              <Mail className="w-4 h-4 text-primary mr-2" />
              <span className="text-muted-foreground">{email}</span>
            </div>
          </div>
        </div>
        
        <div className="md:w-1/3 mt-6 md:mt-0 flex justify-center">
          <img 
            src={logoPath} 
            alt={logoAlt} 
            className="max-w-[150px] object-contain"
          />
        </div>
      </div>
      
      <div>
        <UploadBillButton 
          variant="default"
          className="bg-calm-blue text-white hover:bg-[#3A7A99] mt-6"
        >
          Analyze My {title} Bill
        </UploadBillButton>
      </div>
    </div>
  );
};

export default UtilityContent;
