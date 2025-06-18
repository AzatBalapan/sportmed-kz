import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ChangePasswordForm from '@/components/ChangePasswordForm';
import { Toaster } from '@/components/ui/toaster';
import ScrollToTop from '@/components/ScrollToTop';
import SocialLinks from '@/components/SocialLinks';

const ChangePassword: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <ChangePasswordForm />
        </div>
      </main>
      <Footer />
      <ScrollToTop />
      <SocialLinks />
      <Toaster />
    </div>
  );
};

export default ChangePassword; 