
import React, { useContext } from 'react';
import { LanguageContext } from '@/App';
import { useToast } from "@/hooks/use-toast";
import { translations } from '@/utils/translations';
import { Switch } from '@/components/ui/switch';

const LanguageToggle = () => {
  const { language, setLanguage } = useContext(LanguageContext);
  const { toast } = useToast();

  const handleLanguageToggle = (checked: boolean) => {
    const newLang = checked ? "ES" : "EN";
    setLanguage(newLang);
    toast({
      title: translations.notifications[newLang].languageSwitched,
      description: translations.notifications[newLang].languageSwitchedDesc,
      duration: 3000,
    });
  };

  return (
    <div className="flex items-center gap-2">
      <span className={`text-xs font-medium ${language === "EN" ? "text-energy-blue" : "text-gray-500"}`}>EN</span>
      <Switch 
        checked={language === "ES"} 
        onCheckedChange={handleLanguageToggle}
        className="data-[state=checked]:bg-energy-blue"
      />
      <span className={`text-xs font-medium ${language === "ES" ? "text-energy-blue" : "text-gray-500"}`}>ES</span>
    </div>
  );
};

export default LanguageToggle;
