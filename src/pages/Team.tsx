
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TeamList from '@/components/TeamList';
import TeamDetails from '@/components/TeamDetails';
import { useLanguage } from '@/context/LanguageContext';
import { Toaster } from '@/components/ui/toaster';

const Team: React.FC = () => {
  const { t } = useLanguage();
  const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Handle doctor ID from URL parameters if coming from services page
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const doctorId = searchParams.get('doctorId');
    
    if (doctorId) {
      setSelectedDoctor(doctorId);
      // Clear the URL parameter
      navigate('/team', { replace: true });
    }
  }, [location.search, navigate]);

  const handleSelectDoctor = (doctorId: string) => {
    setSelectedDoctor(doctorId);
    // Optionally, update URL to allow direct linking to doctor's profile
    // navigate(`/team?doctorId=${doctorId}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          {!selectedDoctor ? (
            <>
              <h1 className="text-4xl font-serif font-bold text-center mb-3">{t('team.title')}</h1>
              <p className="text-gray-600 text-center mb-12 max-w-3xl mx-auto">{t('team.subtitle')}</p>
              <TeamList onSelectDoctor={handleSelectDoctor} />
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
