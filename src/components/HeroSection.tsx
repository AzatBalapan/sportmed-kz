
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';

export const HeroSection: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <div className="relative bg-gov-light-blue overflow-hidden">
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center opacity-10"
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1576678927484-cc907957088c?auto=format&fit=crop&q=80&w=1974')`,
          filter: 'grayscale(30%)'
        }}
      />
      
      <div className="container mx-auto px-4 py-20 md:py-28 relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-gov-dark-blue mb-6">
            {t('hero.title')}
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-8">
            {t('hero.subtitle')}
          </p>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" className="bg-gov-blue hover:bg-gov-dark-blue">
              {t('hero.button')}
            </Button>
            <Button size="lg" variant="outline" className="border-gov-blue text-gov-blue hover:bg-gov-light-blue">
              {t('nav.contacts')}
            </Button>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-white to-transparent" />
    </div>
  );
};

export default HeroSection;
