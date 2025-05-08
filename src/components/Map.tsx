
import React from 'react';

const Map: React.FC = () => {
  // Using exact coordinates provided by the user
  const latitude = 51.155721;
  const longitude = 71.489857;
  
  return (
    <div className="w-full h-64 bg-gray-100 rounded-lg overflow-hidden relative">
      <iframe
        title="Спортивный медицинский центр города Астаны"
        className="w-full h-full border-0"
        src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2502.7447786261893!2d${longitude}!3d${latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x424585a605525605%3A0x4dff4a6f5af2b9b6!2z0JrSr9C50YjRiyDQlNC40L3QsCAxNi8zNiwg0JDRgdGC0LDQvdCwLCDQmtCw0LfQsNGF0YHRgtCw0L0!5e0!3m2!1sru!2s!4v1651326524569!5m2!1sru!2s`}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
      <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-80 p-2 text-sm">
        <strong>ГККП "Спортивный медицинский центр города Астаны"</strong><br/>
        ул. Куйши Дина, 36А, Астана
      </div>
    </div>
  );
};

export default Map;
