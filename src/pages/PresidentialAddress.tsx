import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/context/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import ScrollToTop from '@/components/ScrollToTop';

const PresidentialAddress: React.FC = () => {
  const { language } = useLanguage();
  const [addressText, setAddressText] = useState<string>('');
  const [addressTextKz, setAddressTextKz] = useState<string>('');

  useEffect(() => {
    // Fetch Russian text
    fetch('/lovable-uploads/poslanie.txt')
      .then(response => response.text())
      .then(text => {
        setAddressText(text);
      })
      .catch(error => {
        console.error('Error fetching presidential address in Russian:', error);
      });
    
    // For now, using the same text for Kazakh as a placeholder
    // In a real implementation, you would fetch a different file
    fetch('/lovable-uploads/poslaniye_kaz.txt')
      .then(response => response.text())
      .then(text => {
        setAddressTextKz(text);
      })
      .catch(error => {
        console.error('Error fetching presidential address in Kazakh:', error);
      });
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow py-8 md:py-12">
        <div className="container mx-auto px-4">
          {/* Hero section with centered image */}
          <div className="text-center mb-8 md:mb-12">
            <img
              src="/lovable-uploads/president.jpg"
              alt={language === 'ru' ? 'Президент Республики Казахстан' : 
                  language === 'kz' ? 'Қазақстан Республикасының Президенті' : 
                  'President of the Republic of Kazakhstan'}
              className="rounded-lg mx-auto shadow-xl max-w-full md:max-w-2xl h-auto mb-6 md:mb-8"
            />
            <h1 className="text-2xl md:text-4xl font-serif font-bold mb-3 md:mb-4 text-gray-800">
              {language === 'ru' ? 'Послание Президента Республики Казахстан' : 
               language === 'kz' ? 'Қазақстан Республикасы Президентінің жолдауы' : 
               'Address of the President of the Republic of Kazakhstan'}
            </h1>
            <p className="text-base md:text-xl text-gray-600 max-w-3xl mx-auto">
              {language === 'ru' ? 'Ежегодное обращение Президента к народу Казахстана' : 
               language === 'kz' ? 'Президенттің Қазақстан халқына жыл сайынғы үндеуі' : 
               'Annual address of the President to the people of Kazakhstan'}
            </p>
          </div>

          {/* Message content */}
          <Card className="mb-6 md:mb-8 shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-4 md:p-8">
              <div className="prose prose-sm md:prose-base max-w-none">
                {language === 'kz' ? (
                  <p className="whitespace-pre-wrap text-sm md:text-lg leading-relaxed">
                    {addressTextKz}
                  </p>
                ) : (
                  <p className="whitespace-pre-wrap text-sm md:text-lg leading-relaxed">
                    {addressText}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default PresidentialAddress;
