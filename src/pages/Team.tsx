import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TeamList from '@/components/TeamList';
import TeamDetails from '@/components/TeamDetails';
import { useLanguage } from '@/context/LanguageContext';
import { Toaster } from '@/components/ui/toaster';
import ScrollToTop from '@/components/ScrollToTop';
import SocialLinks from '@/components/SocialLinks';

const Team: React.FC = () => {
  const { t } = useLanguage();
  const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null);

  return (
    <>
      <Header />
      <main>
        <div className="container mx-auto px-4 py-12">
          {!selectedDoctor ? (
            <>
              <h1 className="text-4xl font-serif font-bold text-center mb-3">{t('team.title')}</h1>
              <p className="text-gray-600 text-center mb-12 max-w-3xl mx-auto">{t('team.subtitle')}</p>
              <TeamList onSelectDoctor={setSelectedDoctor} />
            </>
          ) : (
            <TeamDetails doctorId={selectedDoctor} onBack={() => setSelectedDoctor(null)} />
          )}
        </div>
      </main>
      <Footer />
      <ScrollToTop />
      <SocialLinks />
      <Toaster />
    </>
  );
};

export default Team;
