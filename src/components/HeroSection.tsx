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

  React.useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'video';
    link.href = `${import.meta.env.BASE_URL}for_banner/right_vid.mp4`;
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  // Helper to render the title with selective bolding
  const renderHeroTitle = () => {
    const lang = (navigator.language || 'ru').slice(0, 2);
    const title = t('hero.title');
    if (title.includes('ГККП')) {
      // Russian
      return (
        <>
          <span className="font-normal">ГККП</span>{' '}
          <span className="font-bold">"СПОРТИВНЫЙ МЕДИЦИНСКИЙ ЦЕНТР ГОРОДА АСТАНЫ"</span>{' '}
          <span className="font-normal">АКИМАТА ГОРОДА АСТАНЫ</span>
        </>
      );
    } else if (title.includes('МКҚК')) {
      // Kazakh
      return (
        <>
          <span className="font-normal">АСТАНА ҚАЛАСЫ ӘКІМДІГІНІҢ</span>{' '}
          <span className="font-bold">"АСТАНА ҚАЛАСЫНЫҢ СПОРТТЫҚ МЕДИЦИНА ОРТАЛЫҒЫ"</span>{' '}
          <span className="font-normal">МКҚК</span>
        </>
      );
    } else if (title.includes('GKSP')) {
      // English
      return (
        <>
          <span className="font-normal">GKSP</span>{' '}
          <span className="font-bold">"SPORTS MEDICAL CENTER OF ASTANA CITY"</span>{' '}
          <span className="font-normal">AKIMAT OF ASTANA CITY</span>
        </>
      );
    }
    // fallback
    return title;
  };

  return (
    <div className="relative bg-gov-light-blue overflow-hidden">
      {/* Desktop: Original layout */}
      <div className="hidden md:block relative h-[320px] lg:h-[360px] xl:h-[400px]">
        {/* Full-width background video */}
        <video
          className="absolute inset-0 w-full h-full object-cover z-0"
          src="/for_banner/combined_back.mp4"
          autoPlay
          loop
          muted
          playsInline
          poster="/home page static/static_home_image.jpeg"
        />
        {/* Overlay content */}
        <div className="absolute inset-0 z-10 flex items-center h-full">
          <div className="container mx-auto px-4">
            <div className="flex flex-col justify-center h-full w-full md:w-2/5 text-left">
              <h1 className="font-sans tracking-wide text-xl lg:text-2xl xl:text-3xl font-bold text-gov-dark-blue mb-2 sm:mb-3 leading-tight text-left drop-shadow-lg">
                {renderHeroTitle()}
              </h1>
              <p className="font-sans tracking-wide text-base lg:text-lg xl:text-xl font-bold text-gov-dark-blue mt-4 mb-2 sm:mb-3 text-left drop-shadow-lg">
                {t('hero.subtitle')}
              </p>
              <div className="flex flex-row items-center gap-6 mt-6">
                <Button 
                  size="lg" 
                  className="bg-gov-blue hover:bg-gov-dark-blue px-6 text-base shadow-lg" 
                  onClick={handleServices}
                >
                  {t('hero.button')}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-gov-blue text-gov-blue hover:bg-gov-light-blue px-6 text-base shadow-lg bg-white/90"
                  onClick={handleContact}
                >
                  {t('nav.contacts')}
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-white to-transparent pointer-events-none" />
      </div>

      {/* Mobile: Separated layout */}
      <div className="md:hidden">
        {/* Banner video cropped from left side */}
        <div className="relative h-[200px] overflow-hidden">
          <video
            className="absolute inset-0 w-full h-full object-cover object-left z-0"
            src="/for_banner/right_vid.mp4"
            autoPlay
            loop
            muted
            playsInline
            poster="/home page static/static_home_image.jpeg"
          />
          <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-white to-transparent pointer-events-none" />
        </div>
        
        {/* Text content below banner */}
        <div className="bg-white px-4 py-6">
          <div className="container mx-auto">
            <h1 className="font-sans tracking-wide text-base font-bold text-gov-dark-blue mb-3 leading-tight text-left">
              {renderHeroTitle()}
            </h1>
            <p className="font-sans tracking-wide text-sm font-bold text-gov-dark-blue mb-4 text-left">
              {t('hero.subtitle')}
            </p>
            <div className="flex flex-row items-center justify-center gap-4">
              <Button 
                size="lg" 
                className="bg-gov-blue hover:bg-gov-dark-blue w-full max-w-[160px] text-sm" 
                onClick={handleServices}
              >
                {t('hero.button')}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-gov-blue text-gov-blue hover:bg-gov-light-blue w-full max-w-[160px] text-sm"
                onClick={handleContact}
              >
                {t('nav.contacts')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
