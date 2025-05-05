
import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/context/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import ScrollToTop from '@/components/ScrollToTop';
import SocialLinks from '@/components/SocialLinks';

const PresidentialAddress: React.FC = () => {
  const { language } = useLanguage();
  const [addressText, setAddressText] = useState<string>('');

  useEffect(() => {
    fetch('/lovable-uploads/poslanie.txt')
      .then(response => response.text())
      .then(text => {
        setAddressText(text);
      })
      .catch(error => {
        console.error('Error fetching presidential address:', error);
      });
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4">
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="md:w-1/3">
                  <img
                    src="/lovable-uploads/president.jpg"
                    alt="President of Kazakhstan"
                    className="rounded-lg w-full"
                  />
                </div>
                <div className="md:w-2/3">
                  <h1 className="text-3xl font-serif font-bold mb-4">
                    {language === 'ru' ? 'Послание Президента Республики Казахстан' : 
                     language === 'kz' ? 'Қазақстан Республикасы Президентінің жолдауы' : 
                     'Address of the President of the Republic of Kazakhstan'}
                  </h1>
                  <p className="text-gray-700">
                    {language === 'ru' ? 'Ежегодное обращение Президента к народу Казахстана' : 
                     language === 'kz' ? 'Президенттің Қазақстан халқына жыл сайынғы үндеуі' : 
                     'Annual address of the President to the people of Kazakhstan'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="prose max-w-none">
            <p style={{ whiteSpace: 'pre-wrap' }}>
              {addressText}
            </p>
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-serif font-bold mb-6">
              {language === 'ru' ? 'Видео обращение' : 
               language === 'kz' ? 'Бейне үндеу' : 
               'Video address'}
            </h2>
            <div className="aspect-w-16 aspect-h-9">
              <div className="w-full h-0 pt-[56.25%] bg-gray-200 relative flex items-center justify-center rounded-lg">
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-gray-500">
                    {language === 'ru' ? 'Видео обращение Президента' : 
                     language === 'kz' ? 'Президенттің бейне үндеуі' : 
                     'Video address of the President'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <ScrollToTop />
      <SocialLinks />
    </div>
  );
};

export default PresidentialAddress;
