import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center bg-gray-100">
        <div className="text-center p-4 md:p-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-3 md:mb-4">404</h1>
          <p className="text-lg md:text-xl text-gray-600 mb-4 text-sm md:text-base">Oops! Page not found</p>
          <a href="/" className="text-blue-500 hover:text-blue-700 underline text-sm md:text-base">
            Return to Home
          </a>
        </div>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default NotFound;
