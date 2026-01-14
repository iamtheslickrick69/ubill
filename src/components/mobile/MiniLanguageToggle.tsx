
import React, { useContext } from 'react';
import { LanguageContext } from '@/App';
import { useToast } from "@/hooks/use-toast";
import { translations } from '@/utils/translations';
import { Globe } from 'lucide-react';
import { Toggle } from '@/components/ui/toggle';

const MiniLanguageToggle = () => {
  const { language, setLanguage } = useContext(LanguageContext);
  const { toast } = useToast();

  const handleLanguageToggle = () => {
    const newLang = language === "EN" ? "ES" : "EN";
    setLanguage(newLang);
    toast({
      title: translations.notifications[newLang].languageSwitched,
      description: translations.notifications[newLang].languageSwitchedDesc,
      duration: 3000,
    });
  };

  return (
    <Toggle 
      pressed={language === "ES"} 
      onPressedChange={handleLanguageToggle}
      className="h-8 w-8 p-0 rounded-full border border-gray-200 bg-white/95 text-gray-700 hover:bg-gray-100 shadow-sm"
      aria-label={language === "EN" ? "Switch to Spanish" : "Switch to English"}
    >
      <Globe size={16} className="text-primary" />
      <span className="sr-only">{language === "EN" ? "ES" : "EN"}</span>
    </Toggle>
  );
};

export default MiniLanguageToggle;
