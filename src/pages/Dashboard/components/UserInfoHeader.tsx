
import React from 'react';

interface UserInfoHeaderProps {
  name: string;
  customerSince: string;
  utilityProvider: string;
  utilityName: string;
  billingMonth: string;
}

const UserInfoHeader: React.FC<UserInfoHeaderProps> = ({
  name,
  customerSince,
  utilityProvider,
  utilityName,
  billingMonth
}) => {
  return (
    <div className="bg-dark-card rounded-xl shadow-dark-card border border-dark-border p-6 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="flex items-center space-x-4">
          <div className="bg-primary/10 rounded-full p-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </div>
          <div>
            <p className="text-foreground">{name}</p>
            <p className="text-sm text-muted-foreground">Customer since {customerSince}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="bg-primary/10 rounded-full p-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
            </svg>
          </div>
          <div>
            <p className="text-foreground">Utility Provider</p>
            <p className="text-sm text-muted-foreground">{utilityProvider}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="bg-primary/10 rounded-full p-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
          </div>
          <div>
            <p className="text-foreground">Billing Month</p>
            <p className="text-sm text-muted-foreground">{billingMonth}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfoHeader;
