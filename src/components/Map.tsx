import React from 'react';

const Map: React.FC = () => {
  return (
    <div className="w-full h-48 sm:h-56 md:h-64 bg-gray-100 rounded-lg overflow-hidden relative">
      <iframe
        title="Спортивный медицинский центр города Астаны"
        className="w-full h-full border-0"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d419.1764167016876!2d71.40260366954683!3d51.099996443475916!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x424585b43d732aad%3A0x988e101d3ec03ff7!2z0L_RgC3Rgi4g0KPQu9GFINC00LDQu9CwIDM1LCDQkNGB0YLQsNC90LAgMDEwMDAw!5e0!3m2!1sru!2skz!4v1780307535781!5m2!1sru!2skz"
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
      <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-80 p-1 sm:p-2 text-xs sm:text-sm">
        <strong>ГККП "Спортивный медицинский центр города Астаны"</strong><br/>
        просп. Улы Дала, 35А, Астана
      </div>
    </div>
  );
};

export default Map;
