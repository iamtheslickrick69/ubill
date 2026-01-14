
import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { translations } from '@/utils/translations';

interface UploadBillButtonProps {
  language: string;
}

const UploadBillButton = ({ language }: UploadBillButtonProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleButtonClick = () => {
    // Trigger the file input click
    fileInputRef.current?.click();
  };
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    
    if (file) {
      // Show toast notification that upload started
      toast({
        title: translations.notifications[language].uploadInitiated,
        description: translations.notifications[language].uploadInitiatedDesc,
        duration: 3000,
      });
      
      // Simulate processing (in a real app, you would upload the file to a server here)
      setTimeout(() => {
        // Show success message
        toast({
          title: "Upload Complete",
          description: "Your bill has been successfully uploaded and is being analyzed.",
          duration: 3000,
        });
        
        // Navigate to bill analysis page
        navigate('/bill-analysis');
      }, 1500);
    }
  };

  return (
    <motion.div 
      className="fixed bottom-6 right-6 z-20"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1 }}
    >
      {/* Hidden file input */}
      <input 
        type="file" 
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".pdf,.jpg,.jpeg,.png"
        style={{ display: 'none' }}
      />
      
      <Button 
        onClick={handleButtonClick}
        className="bg-[#FEF7CD] hover:bg-[#FEF0A0] text-gray-800 rounded-full p-4 shadow-lg hover:shadow-xl transition-all"
        size="lg"
      >
        <Upload className="mr-2 h-5 w-5" />
        Upload Your Bill
      </Button>
    </motion.div>
  );
};

export default UploadBillButton;
