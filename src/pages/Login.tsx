import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LoginForm from '@/components/LoginForm';
import { Toaster } from '@/components/ui/toaster';
import ScrollToTop from '@/components/ScrollToTop';

const Login: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <LoginForm />
        </div>
      </main>
      <Footer />
      <ScrollToTop />
      <Toaster />
    </div>
  );
};

export default Login;
