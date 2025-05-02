
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

type Language = 'ru' | 'kz';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
  translations: Record<string, Record<string, string>>;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children, translations }) => {
  const [language, setLanguage] = useState<Language>('ru');

  useEffect(() => {
    // Try to get language from localStorage
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'ru' || savedLanguage === 'kz')) {
      setLanguage(savedLanguage);
    } else {
      // Default to Russian
      setLanguage('ru');
      localStorage.setItem('language', 'ru');
    }
  }, []);

  const changeLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  // Translation function
  const t = (key: string): string => {
    if (!translations[key]) {
      console.warn(`Translation key "${key}" not found.`);
      return key;
    }
    return translations[key][language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
