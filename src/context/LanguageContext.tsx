
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

type Language = 'ru' | 'kz' | 'en';

// Define a type for our nested translations structure
type TranslationsObject = {
  [key: string]: TranslationsObject | string;
}

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
  translations: Record<string, Record<string, TranslationsObject | string>>;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children, translations }) => {
  const [language, setLanguage] = useState<Language>('ru');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Try to get language from localStorage
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'ru' || savedLanguage === 'kz' || savedLanguage === 'en')) {
      setLanguage(savedLanguage);
    } else {
      // Default to Russian
      setLanguage('ru');
      localStorage.setItem('language', 'ru');
    }
    // Set mounted to true after initial language is set
    setMounted(true);
  }, []);

  const changeLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  // Helper function to get a nested translation using a dot notation key
  const getNestedTranslation = (obj: any, path: string): string => {
    const keys = path.split('.');
    let current = obj;

    for (const key of keys) {
      if (current && typeof current === 'object' && key in current) {
        current = current[key];
      } else {
        console.warn(`Translation key "${path}" not found.`);
        return path;
      }
    }

    // Make sure we return a string
    return typeof current === 'string' ? current : path;
  };

  // Translation function that supports dot notation
  const t = (key: string): string => {
    if (!translations[key]) {
      try {
        // Handle nested keys with dot notation
        return getNestedTranslation(translations, key);
      } catch (error) {
        console.warn(`Translation key "${key}" not found.`);
        return key;
      }
    }
    
    // Ensure we return a string here
    const translation = translations[key][language];
    return typeof translation === 'string' ? translation : key;
  };

  // Prevent rendering until after client-side hydration
  if (!mounted) {
    return null;
  }

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
