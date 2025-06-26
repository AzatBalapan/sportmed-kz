import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactSection from '@/components/ContactSection';
import { Toaster } from '@/components/ui/toaster';
import ScrollToTop from '@/components/ScrollToTop';
import { useLanguage } from '@/context/LanguageContext';

const Contacts: React.FC = () => {
  const { t, language } = useLanguage();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <ContactSection />
        </div>
      </main>
      <Footer />
      <ScrollToTop />
      <Toaster />
    </div>
  );
};

export default Contacts;
