import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

const AntiCorruptionBanner: React.FC = () => {
  const { language } = useLanguage();
  
  const bannerImage = language === 'ru' 
    ? '/anticorruption-banner-ru.PNG' 
    : '/anticorruption-banner-kz.PNG';
  
  return (
    <div className="w-full py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        <img 
          src={bannerImage} 
          alt="Anti-corruption hotline banner" 
          className="w-full max-w-6xl mx-auto rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
};

export default AntiCorruptionBanner;
