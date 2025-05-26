
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/context/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import ScrollToTop from '@/components/ScrollToTop';
import SocialLinks from '@/components/SocialLinks';

const News: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-grow">
        {/* Banner Section */}
        <section className="relative h-96 bg-cover bg-center bg-no-repeat" 
                 style={{ backgroundImage: 'url(/lovable-uploads/2bce0ced-5737-4203-bbe6-6b54ee8ddef2.png)' }}>
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          <div className="relative z-10 container mx-auto px-4 h-full flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4">
                {t('news.title')}
              </h1>
              <p className="text-xl md:text-2xl opacity-90">
                {t('news.subtitle')}
              </p>
            </div>
          </div>
        </section>

        {/* News Content */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Card className="shadow-lg">
                <CardContent className="p-8">
                  <h2 className="text-2xl md:text-3xl font-serif font-bold text-gov-blue mb-6">
                    {t('news.presidential.title')}
                  </h2>
                  
                  <div className="prose prose-lg max-w-none">
                    <div className="whitespace-pre-line text-gray-700 leading-relaxed">
                      {t('news.presidential.content')}
                    </div>
                  </div>
                  
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <p className="text-sm text-gray-500">
                      Дата публикации: 25 мая 2025 г.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <ScrollToTop />
      <SocialLinks />
    </div>
  );
};

export default News;
