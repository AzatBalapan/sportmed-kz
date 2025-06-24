import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TeamList from '@/components/TeamList';
import TeamDetails from '@/components/TeamDetails';
import { useLanguage } from '@/context/LanguageContext';
import { Toaster } from '@/components/ui/toaster';

const Team: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const [selectedDoctor, setSelectedDoctor] = useState<string | null>(params.doctorId || null);

  // Handle doctor ID from URL parameters if coming from services page
  useEffect(() => {
    if (params.doctorId) {
      setSelectedDoctor(params.doctorId);
    } else {
      setSelectedDoctor(null);
    }
  }, [params.doctorId]);

  const handleSelectDoctor = (doctorId: string) => {
    navigate(`/team/${doctorId}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          {!selectedDoctor ? (
            <>
              <h1 className="text-4xl font-serif font-bold text-center mb-3">{t('team.title')}</h1>
              <TeamList onSelectDoctor={handleSelectDoctor} />
            </>
          ) : (
            <TeamDetails doctorId={selectedDoctor} onBack={() => navigate('/team')} />
          )}
        </div>
      </main>
      <Footer />
      <Toaster />
    </div>
  );
};

export default Team;
