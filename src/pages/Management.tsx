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
      <main className="flex-grow bg-gray-50 py-8 md:py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl md:text-3xl font-bold text-gov-blue mb-6 md:mb-8 text-center">
            {pagesTranslations['management.title'][language]}
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {managementStaff.map((person) => (
              <div key={person.id} className="bg-white rounded-xl shadow-lg p-4 md:p-6 flex flex-col items-center">
                <img src={person.image} alt={person.name[language]} className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-full mb-3 md:mb-4" />
                <h2 className="text-lg md:text-xl font-semibold text-gov-blue mb-1 text-center">{person.name[language]}</h2>
                <div className="text-gray-600 text-center mb-2 text-sm md:text-base">{person.position[language]}</div>
                {person.experience && (
                  <div className="text-xs md:text-sm text-gray-500 mb-1 text-center">{person.experience[language]}</div>
                )}
                {/* Show full info for all management staff */}
                {person.id === 'nurmatov' ? (
                  <>
                    {person.education && (
                      <div className="text-xs md:text-sm text-gray-500 mb-2 text-center whitespace-pre-line">
                        {person.education[language].split('\n').slice(0,10).join('\n')}
                      </div>
                    )}
                    {'specialization' in person && person.specialization && (
                      <div className="text-xs md:text-sm text-gray-500 text-center mb-2 whitespace-pre-line">{person.specialization[language]}</div>
                    )}
                    {'work' in person && person.work && (
                      <div className="text-xs md:text-sm text-gray-500 text-center mb-2 whitespace-pre-line">
                        {person.work[language].split('\n').slice(0,10).join('\n')}
                      </div>
                    )}
                    {person.certificates && (
                      <div className="text-xs md:text-sm text-gray-500 text-center mb-2 whitespace-pre-line">
                        {person.certificates[language].split('\n').slice(0,10).join('\n')}
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    {person.education && (
                      <div className="text-xs md:text-sm text-gray-500 mb-2 text-center whitespace-pre-line">{person.education[language]}</div>
                    )}
                    {'specialization' in person && person.specialization && (
                      <div className="text-xs md:text-sm text-gray-500 text-center mb-2 whitespace-pre-line">{person.specialization[language]}</div>
                    )}
                    {'work' in person && person.work && (
                      <div className="text-xs md:text-sm text-gray-500 text-center mb-2 whitespace-pre-line">{person.work[language]}</div>
                    )}
                    {person.certificates && (
                      <div className="text-xs md:text-sm text-gray-500 text-center mb-2 whitespace-pre-line">{person.certificates[language]}</div>
                    )}
                  </>
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