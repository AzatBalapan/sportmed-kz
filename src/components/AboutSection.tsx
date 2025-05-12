
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Link } from 'react-router-dom';

export const AboutSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <img
              src="/lovable-uploads/banner_test.jpg?auto=format&fit=crop&q=80&w=2070"
              alt="Sport Medical Center"
              className="rounded-lg shadow-lg w-full h-auto object-cover"
              style={{ maxHeight: '500px' }}
            />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6">
              {t('about.title')}
            </h2>
            <p className="text-gray-700 mb-6 text-lg leading-relaxed">
              {t('about.description')}
            </p>
            <ul className="space-y-4">
              {[
                { icon: '🏆', title: t('promo.professional') },
                { icon: '🔬', title: t('promo.modern') },
                { icon: '🧠', title: t('promo.individual') },
              ].map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-2xl mr-4">{item.icon}</span>
                  <div>
                    <h3 className="font-medium text-lg text-gray-900">{item.title}</h3>
                  </div>
                </li>
              ))}
            </ul>
            <Link
              to="/about"
              className="inline-block mt-8 text-gov-blue font-semibold underline hover:text-gov-dark-blue"
            >
              {t('about.more')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
