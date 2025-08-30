import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from 'react';
import '@/lib/i18n';
import { LanguageSelector } from '@/components/LanguageSelector';
import { LoginPage } from '@/components/LoginPage';
import { Dashboard } from '@/components/Dashboard';
import { SoilHealthPage } from '@/components/SoilHealthPage';
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const SmartAgricultureApp = () => {
  const [currentStep, setCurrentStep] = useState<'language' | 'login' | 'dashboard' | 'soil'>('language');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('');
  const [authToken, setAuthToken] = useState<string>('');

  useEffect(() => {
    // Check if user has previously selected language and logged in
    const savedLanguage = localStorage.getItem('smartAgriLanguage');
    const savedToken = localStorage.getItem('smartAgriToken');
    
    if (savedLanguage && savedToken) {
      setSelectedLanguage(savedLanguage);
      setAuthToken(savedToken);
      setCurrentStep('dashboard');
    }
  }, []);

  const handleLanguageSelect = (language: string) => {
    setSelectedLanguage(language);
    localStorage.setItem('smartAgriLanguage', language);
    setCurrentStep('login');
  };

  const handleLogin = (token: string) => {
    setAuthToken(token);
    localStorage.setItem('smartAgriToken', token);
    setCurrentStep('dashboard');
  };

  const handleNavigate = (page: string) => {
    if (page === 'my_soil') {
      setCurrentStep('soil');
    }
    // Add other page navigation as needed
  };

  const handleBack = () => {
    setCurrentStep('dashboard');
  };

  if (currentStep === 'language') {
    return <LanguageSelector onLanguageSelect={handleLanguageSelect} />;
  }

  if (currentStep === 'login') {
    return <LoginPage onLogin={handleLogin} />;
  }

  if (currentStep === 'soil') {
    return <SoilHealthPage onBack={handleBack} />;
  }

  if (currentStep === 'dashboard') {
    return <Dashboard onNavigate={handleNavigate} />;
  }

  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SmartAgricultureApp />} />
          <Route path="/blank" element={<Index />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
