import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export const HeroSection: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleServices = () => {
    navigate('/services');
  };

  const handleContact = () => {
    // Scroll to contacts section within the same page
    const contactSection = document.getElementById('contacts');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative bg-gov-light-blue overflow-hidden">
      {/* Background video */}
      <video
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-20"
        src={`${import.meta.env.BASE_URL}compressed.mp4`}
        autoPlay
        loop
        muted
        playsInline
      />
      {/* Overlay for subtle effect (optional) */}
      {/* <div className="absolute inset-0 bg-black opacity-10 z-0" /> */}
      <div className="container mx-auto px-4 py-12 sm:py-16 md:py-20 lg:py-28 relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-serif font-bold text-gov-dark-blue mb-4 sm:mb-6 leading-tight">
            {t('hero.title')}
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-700 mb-6 sm:mb-8">
            {t('hero.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Button 
              size="lg" 
              className="bg-gov-blue hover:bg-gov-dark-blue w-full sm:w-auto" 
              onClick={handleServices}
            >
              {t('hero.button')}
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-gov-blue text-gov-blue hover:bg-gov-light-blue w-full sm:w-auto"
              onClick={handleContact}
            >
              {t('nav.contacts')}
            </Button>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-8 sm:h-16 bg-gradient-to-t from-white to-transparent" />
    </div>
  );
};

export default HeroSection;
