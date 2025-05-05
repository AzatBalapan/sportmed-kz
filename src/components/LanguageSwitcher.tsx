
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';

export const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex space-x-2">
      <Button 
        variant={language === 'ru' ? 'default' : 'outline'} 
        size="sm"
        onClick={() => setLanguage('ru')}
        className="font-medium"
      >
        РУС
      </Button>
      <Button 
        variant={language === 'kz' ? 'default' : 'outline'} 
        size="sm"
        onClick={() => setLanguage('kz')}
        className="font-medium"
      >
        ҚАЗ
      </Button>
    </div>
  );
};

export default LanguageSwitcher;
