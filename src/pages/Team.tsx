
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TeamList from '@/components/TeamList';
import TeamDetails from '@/components/TeamDetails';
import { useLanguage } from '@/context/LanguageContext';
import { Toaster } from '@/components/ui/toaster';
import { useLocation } from 'react-router-dom';

const Team: React.FC = () => {
  const { t } = useLanguage();
  const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null);
  const location = useLocation();
  
  // Check if we have a selectedDoctorId in the location state (coming from Services page)
  useEffect(() => {
    const state = location.state as { selectedDoctorId?: string } | undefined;
    if (state && state.selectedDoctorId) {
      setSelectedDoctor(state.selectedDoctorId);
    }
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
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
      <Toaster />
    </div>
  );
};

export default Team;
