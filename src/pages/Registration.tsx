import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RegistrationForm from '@/components/RegistrationForm';
import { Toaster } from '@/components/ui/toaster';
import ScrollToTop from '@/components/ScrollToTop';
import SocialLinks from '@/components/SocialLinks';

const Registration: React.FC = () => {
  return (
    <>
      <Header />
      <main>
        <div className="container mx-auto px-4">
          <RegistrationForm />
        </div>
      </main>
      <Footer />
      <ScrollToTop />
      <SocialLinks />
      <Toaster />
    </>
  );
};

export default Registration;
