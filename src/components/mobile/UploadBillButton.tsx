
import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { Upload } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { LanguageContext } from '@/App';
import { translations } from '@/utils/translations';

interface UploadBillButtonProps {
  customIndex: number;
  isOpen: boolean;
}

const UploadBillButton: React.FC<UploadBillButtonProps> = ({ customIndex, isOpen }) => {
  const { toast } = useToast();
  const { language } = useContext(LanguageContext);

  const handleUpload = () => {
    toast({
      title: translations.notifications[language].uploadInitiated,
      description: translations.notifications[language].uploadInitiatedDesc,
      duration: 3000,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : 20 }}
      transition={{ duration: 0.2, delay: customIndex * 0.05 }}
      className="w-full"
    >
      <button 
        onClick={handleUpload}
        className="flex items-center w-full p-5 bg-[#FEF7CD] hover:bg-[#FEF0A0] transition-colors"
      >
        <Upload className="h-5 w-5 mr-3 text-gray-800" />
        <span className="font-medium text-gray-800">
          {translations.buttons[language].uploadBill}
        </span>
      </button>
    </motion.div>
  );
};

export default UploadBillButton;
