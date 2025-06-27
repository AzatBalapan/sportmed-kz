import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/context/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ScrollToTop from '@/components/ScrollToTop';

const News: React.FC = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const [secondNewsText, setSecondNewsText] = useState<string>('');

  useEffect(() => {
    // Fetch the second news text based on language
    const fileName = language === 'ru' ? '2_rus.txt' : '2.txt';
    fetch(`/news/${fileName}`)
      .then(response => response.text())
      .then(text => {
        setSecondNewsText(text);
      })
      .catch(error => {
        console.error('Error fetching second news text:', error);
      });
  }, [language]);

  const handleLearnMore = () => {
    navigate('/news/presidential-reserve');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-grow">
        {/* Main News Section */}
        <section className="min-h-screen p-4 md:p-8 bg-white">
          <div className="container mx-auto max-w-4xl">
            <h1 className="text-xl md:text-2xl lg:text-3xl font-serif font-bold text-gov-blue mb-6 md:mb-8 lg:mb-12 text-center">
              {t('news.title')}
            </h1>

            {/* News Articles in Rows */}
            <div className="space-y-6 md:space-y-8">
              {/* First News Article */}
              <Card className="shadow-lg border-0 hover:shadow-xl transition-shadow overflow-hidden">
                {/* Banner Image */}
                <div className="w-full h-48 md:h-64 overflow-hidden">
                  <img 
                    src="/lovable-uploads/2bce0ced-5737-4203-bbe6-6b54ee8ddef2.png"
                    alt={language === 'ru' ? 'Президентский молодежный кадровый резерв' :
                         language === 'kz' ? 'Президенттік жастар кадр резерві' :
                         'Presidential Youth Personnel Reserve'}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                
                <CardContent className="p-4 md:p-6 lg:p-8">
                  <h2 className="text-lg md:text-xl lg:text-2xl font-serif font-bold text-gray-800 mb-3 md:mb-4">
                    {t('news.presidential.title')}
                  </h2>
                  
                  {/* Preview text */}
                  <div className="text-gray-700 leading-relaxed mb-4 md:mb-6 text-sm md:text-base">
                    <p>
                      {t('news.presidential.content').substring(0, 150)}...
                    </p>
                  </div>

                  {/* Read More Button */}
                  <Button 
                    onClick={handleLearnMore}
                    variant="outline"
                    className="border-gov-blue text-gov-blue hover:bg-gov-blue hover:text-white transition-colors text-sm md:text-base py-2 md:py-3"
                  >
                    {t('news.learnMore')}
                  </Button>
                </CardContent>
              </Card>

              {/* Second News Article */}
              <Card className="shadow-lg border-0 hover:shadow-xl transition-shadow overflow-hidden">
                {/* Banner Image */}
                <div className="w-full h-48 md:h-64 overflow-hidden">
                  <img 
                    src="/news/berik-asylov.jpeg"
                    alt={language === 'ru' ? 'Берик АСЫЛОВ' :
                         language === 'kz' ? 'Берік АСЫЛОВ' :
                         'Berik ASYLOV'}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                
                <CardContent className="p-4 md:p-6 lg:p-8">
                  <h2 className="text-lg md:text-xl lg:text-2xl font-serif font-bold text-gray-800 mb-3 md:mb-4">
                    {language === 'ru' ? 'Берик АСЫЛОВ: Правовая ответственность – опора справедливости' :
                     language === 'kz' ? 'Берік АСЫЛОВ: Құқықтық жауапкершілік – әділеттіліктің тірегі' :
                     'Berik ASYLOV: Legal responsibility is the foundation of justice'}
                  </h2>
                  
                  {/* Preview text */}
                  <div className="text-gray-700 leading-relaxed mb-4 md:mb-6 text-sm md:text-base">
                    <p>
                      {secondNewsText.substring(0, 150)}...
                    </p>
                  </div>

                  {/* Read More Button */}
                  <Button 
                    onClick={() => navigate('/news/berik-asylov')}
                    variant="outline"
                    className="border-gov-blue text-gov-blue hover:bg-gov-blue hover:text-white transition-colors text-sm md:text-base py-2 md:py-3"
                  >
                    {t('news.learnMore')}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default News;
