import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RegistrationForm from '@/components/RegistrationForm';
import { Toaster } from '@/components/ui/toaster';
import ScrollToTop from '@/components/ScrollToTop';
import SocialLinks from '@/components/SocialLinks';

const Registration: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-8 md:py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <RegistrationForm />
        </div>
      </main>
      <Footer />
      <ScrollToTop />
      <SocialLinks />
      <Toaster />
    </div>
  );
};

export default Registration;
