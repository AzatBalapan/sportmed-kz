import React, { useState, useEffect } from 'react';
import { Instagram, MessageCircle, ArrowUp } from 'lucide-react';
import AccessibilityWidget from './AccessibilityWidget';

const FloatingActions: React.FC = () => {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setShowScroll(window.pageYOffset > 300);
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Accessibility Widget in the top left */}
      <div className="fixed left-4 top-4 flex flex-col items-start gap-2 z-[9999]">
        <AccessibilityWidget />
      </div>
      {/* Other actions on the right */}
      <div className="fixed right-4 bottom-4 flex flex-col items-end gap-2 z-50">
        {/* Instagram */}
        <a
          href="https://www.instagram.com/sportmedortalyq/"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 hover:from-purple-600 hover:via-pink-600 hover:to-orange-600 text-white p-3 rounded-full shadow-lg transition-all duration-300"
          aria-label="Instagram"
        >
          <Instagram size={20} />
        </a>
        {/* WhatsApp */}
        <a
          href="https://wa.me/+77066063636"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg transition-all duration-300"
          aria-label="WhatsApp"
        >
          <MessageCircle size={20} />
        </a>
        {/* Scroll to Top */}
        {showScroll && (
          <button
            onClick={scrollToTop}
            className="bg-gov-blue hover:bg-gov-dark-blue text-white p-3 rounded-full shadow-lg transition-all duration-300"
            aria-label="Scroll to top"
          >
            <ArrowUp size={20} />
          </button>
        )}
      </div>
    </>
  );
};

export default FloatingActions; 