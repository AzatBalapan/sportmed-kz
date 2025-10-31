import React from 'react';
import { Instagram, MessageCircle } from 'lucide-react';

// This component is no longer floating. Use only if you want to show social links inline.
const SocialLinks: React.FC = () => {
  return (
    <div className="flex flex-row gap-2">
      <a 
        href="https://wa.me/+77066063636" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg transition-all duration-300"
      >
        <MessageCircle size={20} />
      </a>
      <a 
        href="https://www.instagram.com/sportmedortalyq/" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 hover:from-purple-600 hover:via-pink-600 hover:to-orange-600 text-white p-3 rounded-full shadow-lg transition-all duration-300"
      >
        <Instagram size={20} />
      </a>
     <a
        href="www.tiktok.com/@sportmedortalyq.astana"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-black hover:bg-gray-800 text-white p-3 rounded-full shadow-lg transition-all duration-300 mt-2"
        aria-label="TikTok"
     >
        <TikTok size={20} />
    </div>
  );
};

export default SocialLinks;
