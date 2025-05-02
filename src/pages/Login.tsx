import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LoginForm from '@/components/LoginForm';
import ScrollToTop from '@/components/ScrollToTop';
import SocialLinks from '@/components/SocialLinks';

const Login: React.FC = () => {
  return (
    <>
      <Header />
      <main>
        <LoginForm />
      </main>
      <Footer />
      <ScrollToTop />
      <SocialLinks />
    </>
  );
};

export default Login;
