
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import { translations } from "@/utils/translations";

const NotFound = () => {
  // Get the language from localStorage or default to "EN"
  const language = localStorage.getItem("language") || "EN";
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-dark p-4">
      <div className="text-center max-w-md">
        <div className="inline-block p-6 bg-dark-card rounded-full mb-8 shadow-dark-card border border-dark-border">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
            <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
            <path d="M12 9v4"></path>
            <path d="M12 17h.01"></path>
          </svg>
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-4">{translations.notFound[language].title}</h1>
        <p className="text-xl text-muted-foreground mb-8">
          {translations.notFound[language].description}
        </p>
        <Link to="/">
          <Button className="flex items-center gap-2">
            <Home className="w-4 h-4" />
            <span>{translations.notFound[language].returnHome}</span>
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
