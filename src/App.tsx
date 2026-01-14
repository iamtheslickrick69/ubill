
import React, { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import SoftGradientBackground from "@/components/SoftGradientBackground";
import DockHeader from "@/components/DockHeader";
import HomePage from "./pages/HomePage";
import Dashboard from "./pages/Dashboard";
import BlogPage from "./pages/BlogPage";
import CaliforniaPage from "./pages/CaliforniaPage";
import SolarPage from "./pages/SolarPage";
import NotFound from "./pages/NotFound";
import ContactPage from "./pages/ContactPage";
import Index from "./pages/Index";
import DockDemo from "./pages/DockDemo";
import TopBanner from "@/components/TopBanner";
import LiveElementsOverlay from "@/components/LiveElementsOverlay";
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

// AnimatePresence wrapper component
const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <motion.div
      key={location.pathname}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen"
    >
        <Routes location={location}>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/bill-analysis" element={<Dashboard />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPage />} />
          <Route path="/california" element={<CaliforniaPage />} />
          <Route path="/solar" element={<SolarPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/dock-demo" element={<DockDemo />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
};

// Wrapper for routes that use context
const RoutesWithContext = () => {
  return <AnimatedRoutes />;
};

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
                  <RoutesWithContext />
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
