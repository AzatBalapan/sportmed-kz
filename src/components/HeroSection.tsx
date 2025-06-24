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
      <div className="w-full mx-0 px-0 py-0">
        <div className="flex flex-col md:flex-row h-[260px] md:h-[320px] lg:h-[360px] xl:h-[400px] w-full">
          {/* Left: Static image with text overlay */}
          <div className="relative flex-1 md:basis-1/2 md:max-w-[50%] flex items-center justify-center bg-white min-h-[120px]">
            <img
              src="/for_banner/left_pic.jpeg"
              alt="Banner left"
              className="absolute inset-0 w-full h-full object-cover object-center z-0"
              draggable={false}
            />
            <div className="relative z-10 flex flex-col justify-center items-center h-full w-full px-2 sm:px-4 md:px-6 lg:px-8 xl:px-10">
              <h1 className="font-sans tracking-wide text-sm sm:text-lg md:text-2xl lg:text-3xl xl:text-4xl font-bold text-gov-dark-blue mb-2 sm:mb-3 leading-tight text-center">
                {renderHeroTitle()}
              </h1>
              <p className="font-sans tracking-wide text-xs sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold text-gov-dark-blue mt-4 mb-2 sm:mb-3 text-center">
                {t('hero.subtitle')}
              </p>
              {/* Responsive: static on mobile, absolute at bottom on md+ */}
              <div className="static md:absolute md:left-0 md:right-0 md:bottom-4 flex flex-row items-center justify-center gap-4 md:gap-6 px-4 z-20 w-full mt-4 md:mt-0">
                <Button 
                  size="lg" 
                  className="bg-gov-blue hover:bg-gov-dark-blue w-full max-w-[180px]" 
                  onClick={handleServices}
                >
                  {t('hero.button')}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-gov-blue text-gov-blue hover:bg-gov-light-blue w-full max-w-[180px]"
                  onClick={handleContact}
                >
                  {t('nav.contacts')}
                </Button>
              </div>
            </div>
          </div>
          {/* Right: Video */}
          <div className="relative flex-1 md:basis-1/2 md:max-w-[50%] min-h-[120px]">
            <video
              className="absolute inset-0 w-full h-full object-cover rounded-none md:rounded-r-xl z-0"
              src="/for_banner/right_vid.mp4"
              autoPlay
              loop
              muted
              playsInline
              poster="/lovable-uploads/banner_test.jpg"
            />
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-8 sm:h-16 bg-gradient-to-t from-white to-transparent pointer-events-none" />
    </div>
  );
};

export default HeroSection;
