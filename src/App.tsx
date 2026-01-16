
import React, { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SoftGradientBackground from "@/components/SoftGradientBackground";
import DockHeader from "@/components/DockHeader";
import SingleScrollPage from "./pages/SingleScrollPage";
import { GamificationProvider } from "@/context/GamificationContext";
import { AILoadingProvider } from "@/context/AILoadingContext";

// Create a context for language
export const LanguageContext = React.createContext<{
  language: string;
  setLanguage: (lang: string) => void;
}>({
  language: "EN",
  setLanguage: () => {}
});

const queryClient = new QueryClient();

const App = () => {
  const [language, setLanguage] = useState("EN");

  // Load language preference from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Save language preference to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  return (
    <QueryClientProvider client={queryClient}>
      <GamificationProvider>
        <AILoadingProvider>
          <LanguageContext.Provider value={{ language, setLanguage }}>
            <TooltipProvider>
              <BrowserRouter>
                <SoftGradientBackground>
                  <DockHeader />
                  <Routes>
                    <Route path="*" element={<SingleScrollPage />} />
                  </Routes>
                </SoftGradientBackground>
                <Toaster />
                <Sonner />
              </BrowserRouter>
            </TooltipProvider>
          </LanguageContext.Provider>
        </AILoadingProvider>
      </GamificationProvider>
    </QueryClientProvider>
  );
};

export default App;
