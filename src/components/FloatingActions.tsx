import React, { useState, useEffect } from 'react';
import { Instagram, MessageCircle, ArrowUp } from 'lucide-react';
import AccessibilityWidget from './AccessibilityWidget';

// TikTok SVG Icon Component
const TikTokIcon = ({ size = 20 }: { size?: number }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

const FloatingActions: React.FC = () => {
  const [showScroll, setShowScroll] = useState(false);
  const isMd = window.innerWidth >= 768;

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
      {/* Accessibility button: only show on md+ */}
      {isMd && (
        <div className="fixed top-2 left-4 z-[60] hidden md:block">
          <AccessibilityWidget />
        </div>
      )}
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
        {/* TikTok */}
        <a
          href="https://www.tiktok.com/@sportmedastana"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-black hover:bg-gray-800 text-white p-3 rounded-full shadow-lg transition-all duration-300"
          aria-label="TikTok"
        >
          <TikTokIcon size={20} />
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
