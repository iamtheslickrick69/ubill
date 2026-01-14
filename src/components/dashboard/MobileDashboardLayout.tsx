
import React from 'react';
import { cn } from '@/lib/utils';
import { ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import UploadBillButton from '@/components/UploadBillButton';

interface MobileDashboardLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const MobileDashboardLayout = ({ 
  children, 
  className 
}: MobileDashboardLayoutProps) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={cn('relative pb-20', className)}>
      {children}
      
      {/* Floating action buttons for mobile */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-3 md:hidden">
        <Button
          onClick={scrollToTop}
          size="icon"
          className="rounded-full h-12 w-12 bg-white text-energy-blue border border-gray-200 shadow-lg hover:bg-gray-50"
          aria-label="Scroll to top"
        >
          <ArrowUp size={20} />
        </Button>
        
        <UploadBillButton
          variant="default"
          className="rounded-full h-14 w-14 bg-energy-blue text-white shadow-lg hover:bg-blue-600 p-0"
        />
      </div>
    </div>
  );
};

export default MobileDashboardLayout;
