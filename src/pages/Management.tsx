import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/context/LanguageContext';
import { pagesTranslations } from '@/lib/translations/pages';
import { abdykhadirov } from '@/data/doctors/abdykhadirov';
import { tazhiyeva } from '@/data/doctors/tazhiyeva';

const managementStaff = [abdykhadirov, tazhiyeva];

const biographyText = {
  ru: ``,
  kz: ``
};

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

          {/* Management staff in two columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {managementStaff.map((person) => (
              <div key={person.id} className="bg-white rounded-xl shadow-lg p-4 md:p-6 flex flex-col items-start">
                <div className="w-full flex justify-center mb-3 md:mb-4">
                  <img src={person.image} alt={person.name[language]} className="w-40 h-40 md:w-56 md:h-56 object-cover rounded-full" />
                </div>
                <h2 className="text-lg md:text-xl font-semibold text-gov-blue mb-1">{person.name[language]}</h2>
                <div className="text-gray-600 mb-2 text-sm md:text-base">{person.position[language]}</div>
                {person.education && (
                  <div className="text-xs md:text-sm text-gray-500 mb-2 whitespace-pre-line">{person.education[language]}</div>
                )}
                {'specialization' in person && person.specialization && (
                  <div className="text-xs md:text-sm text-gray-500 mb-2 whitespace-pre-line">{person.specialization[language]}</div>
                )}
                {'work' in person && person.work && (
                  <div className="text-xs md:text-sm text-gray-500 mb-2 whitespace-pre-line">{person.work[language]}</div>
                )}
                {person.certificates && (
                  <div className="text-xs md:text-sm text-gray-500 mb-2 whitespace-pre-line">{person.certificates[language]}</div>
                )}
                {person.phone && (
                  <div className="text-xs md:text-sm text-gray-500 mb-1">
                    <strong>Телефон / Телефон:</strong> {person.phone}
                  </div>
                )}
                {person.email && (
                  <div className="text-xs md:text-sm text-gray-500">
                    <strong>Email:</strong> {person.email}
                  </div>
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
