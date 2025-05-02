
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

type Language = 'ru' | 'kz';

// Define a recursive type for nested translations without circular reference
type TranslationValue = string | { [key: string]: TranslationValue };
type TranslationsType = Record<string, Record<string, TranslationValue>>;

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
  translations: TranslationsType;
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

  // Translation function - updated to handle nested keys
  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language];
    
    for (const k of keys) {
      if (value === undefined) return key;
      value = value[k];
    }
    
    if (typeof value === 'string') {
      return value;
    }
    
    console.warn(`Translation key "${key}" not found or not a string.`);
    return key;
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
