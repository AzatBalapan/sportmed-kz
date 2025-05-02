
import React from 'react';
import { Instagram, WhatsApp } from 'lucide-react';

const SocialLinks: React.FC = () => {
  return (
    <div className="fixed left-6 bottom-20 md:bottom-6 z-50 flex flex-col space-y-3">
      <a 
        href="https://www.instagram.com/sportmedortalyq/?igsh=dG9odzZyNHM2ams1&utm_source=qr"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-pink-600 hover:bg-pink-700 text-white p-2 rounded-full shadow-lg transition-all"
        aria-label="Instagram"
      >
        <Instagram className="h-5 w-5" />
      </a>
      <a 
        href="https://wa.me/+77xxxxxxxxx" // Replace with your actual WhatsApp number
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-full shadow-lg transition-all"
        aria-label="WhatsApp"
      >
        <WhatsApp className="h-5 w-5" />
      </a>
    </div>
  );
};

export default SocialLinks;
