import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/context/LanguageContext';
import { pagesTranslations } from '@/lib/translations/pages';
import { nurmatov } from '@/data/doctors/nurmatov';
import { tuyebayev } from '@/data/doctors/tuyebayev';
import { abdykhadirov } from '@/data/doctors/abdykhadirov';

const managementStaff = [nurmatov, tuyebayev, abdykhadirov];

const Management: React.FC = () => {
  const { language } = useLanguage();
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-gov-blue mb-8 text-center">
            {pagesTranslations['management.title'][language]}
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {managementStaff.map((person) => (
              <div key={person.id} className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center">
                <img src={person.image} alt={person.name[language]} className="w-32 h-32 object-cover rounded-full mb-4" />
                <h2 className="text-xl font-semibold text-gov-blue mb-1 text-center">{person.name[language]}</h2>
                <div className="text-gray-600 text-center mb-2">{person.position[language]}</div>
                {person.experience && (
                  <div className="text-sm text-gray-500 mb-1 text-center">{person.experience[language]}</div>
                )}
                {person.education && (
                  <div className="text-sm text-gray-500 mb-1 text-center whitespace-pre-line">{person.education[language]}</div>
                )}
                {person.specialization && (
                  <div className="text-sm text-gray-500 text-center whitespace-pre-line">{person.specialization[language]}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Management; 