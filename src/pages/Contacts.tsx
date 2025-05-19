
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactSection from '@/components/ContactSection';
import { Toaster } from '@/components/ui/toaster';
import ScrollToTop from '@/components/ScrollToTop';
import SocialLinks from '@/components/SocialLinks';
import { useLanguage } from '@/context/LanguageContext';

const Contacts: React.FC = () => {
  const { t, language } = useLanguage();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-serif font-bold text-center mb-3">{t('contact.title')}</h1>
          <p className="text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            {language === 'ru' 
              ? 'Свяжитесь с нами для получения дополнительной информации или записи на прием' 
              : 'Қосымша ақпарат алу немесе жазылу үшін бізбен хабарласыңыз'}
          </p>
          <ContactSection />
        </div>
      </main>
      <Footer />
      <ScrollToTop />
      <SocialLinks />
      <Toaster />
    </div>
  );
};

export default Contacts;
