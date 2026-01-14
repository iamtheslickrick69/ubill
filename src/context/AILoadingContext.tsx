import React, { createContext, useContext, useState } from 'react';

interface AILoadingContextType {
  isAILoading: boolean;
  setIsAILoading: (loading: boolean) => void;
}

const AILoadingContext = createContext<AILoadingContextType | undefined>(undefined);

export const AILoadingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAILoading, setIsAILoading] = useState(false);

  return (
    <AILoadingContext.Provider value={{ isAILoading, setIsAILoading }}>
      {children}
    </AILoadingContext.Provider>
  );
};

export const useAILoading = () => {
  const context = useContext(AILoadingContext);
  if (context === undefined) {
    throw new Error('useAILoading must be used within an AILoadingProvider');
  }
  return context;
};
