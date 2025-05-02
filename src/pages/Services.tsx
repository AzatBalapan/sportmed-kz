import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import SocialLinks from '@/components/SocialLinks';

const Services: React.FC = () => {

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div>Services Page</div>
      </main>
      <Footer />
      <ScrollToTop />
      <SocialLinks />
    </>
  );
};

export default Services;
