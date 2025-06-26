import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/context/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';

const Structure: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-6 md:py-8">
        <div className="max-w-6xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-6 md:mb-8">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gov-blue mb-3 md:mb-4">
              {t('nav.structure')}
            </h1>
            <div className="w-20 md:w-24 h-1 bg-gov-blue mx-auto"></div>
          </div>

          {/* Structure Content */}
          <Card className="shadow-lg">
            <CardContent className="p-4 md:p-6">
              <div className="flex flex-col items-center">
                <div className="w-full max-w-4xl">
                  <img 
                    src="/structure/оргструктура.svg"
                    alt="Организационная структура"
                    className="w-full h-auto rounded-lg shadow-md border-0"
                    style={{ maxHeight: '70vh' }}
                  />
                </div>
                
                <div className="mt-4 md:mt-6 text-center text-gray-600">
                  <p className="text-xs md:text-sm">
                    {t('nav.structure')} - Организационная структура ГККП "Спортивный медицинский центр"
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Structure; 