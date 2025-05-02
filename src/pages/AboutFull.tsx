import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/context/LanguageContext';
import ScrollToTop from '@/components/ScrollToTop';
import SocialLinks from '@/components/SocialLinks';

const AboutFull: React.FC = () => {
  const { t } = useLanguage();

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <section className="mb-8">
          <h1 className="text-3xl font-bold mb-4">{t('about.title')}</h1>
          <p className="text-gray-700">{t('about.description')}</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">{t('about.mission.title')}</h2>
          <p className="text-gray-700">{t('about.mission.description')}</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">{t('about.values.title')}</h2>
          <ul className="list-disc list-inside text-gray-700">
            <li>{t('about.values.value1')}</li>
            <li>{t('about.values.value2')}</li>
            <li>{t('about.values.value3')}</li>
          </ul>
        </section>
      </main>
      <Footer />
      <ScrollToTop />
      <SocialLinks />
    </>
  );
};

export default AboutFull;
