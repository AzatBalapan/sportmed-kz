
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import PromoBanner from '@/components/PromoBanner';
import ContactSection from '@/components/ContactSection';
import { Toaster } from '@/components/ui/toaster';
import ScrollToTop from '@/components/ScrollToTop';
import SocialLinks from '@/components/SocialLinks';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <AboutSection />
        <PromoBanner />
        <ContactSection />
      </main>
      <Footer />
      <ScrollToTop />
      <SocialLinks />
      <Toaster />
    </div>
  );
};

export default Index;
