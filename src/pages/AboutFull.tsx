
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

const AboutFull: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="py-16 bg-white min-h-screen">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-serif font-bold mb-10">{t('about.full.title')}</h1>
        <div className="mb-8">
          <h2 className="text-2xl font-serif font-bold mb-4">{t('about.full.history')}</h2>
          <p className="text-gray-700 text-lg">{t('about.full.history.text')}</p>
        </div>
        <div>
          <h2 className="text-2xl font-serif font-bold mb-4">{t('about.full.team')}</h2>
          <p className="text-gray-700 text-lg">{t('about.full.team.text')}</p>
        </div>
      </div>
    </section>
  );
};

export default AboutFull;
