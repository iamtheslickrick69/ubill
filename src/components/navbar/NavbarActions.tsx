
import React, { useContext } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from "@/hooks/use-toast";
import LanguageToggle from '../LanguageToggle';
import { translations } from '@/utils/translations';
import { LanguageContext } from '@/App';
import { Upload } from 'lucide-react';

const NavbarActions = () => {
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
    <div className="flex items-center space-x-4">
      <LanguageToggle />
      
      <Button 
        className="upload-btn bg-[#FFF8E7] text-text-color hover:bg-[#FFF0D0] flex items-center space-x-2 px-4 py-2"
        onClick={handleUpload}
      >
        <Upload size={18} className="text-text-color mr-1" />
        <span className="text-text-color">{translations.buttons[language].uploadBill}</span>
      </Button>
    </div>
  );
};

export default NavbarActions;
