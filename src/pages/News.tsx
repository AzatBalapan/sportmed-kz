import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/context/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ScrollToTop from '@/components/ScrollToTop';
import SocialLinks from '@/components/SocialLinks';

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
        <section className="min-h-screen flex flex-col md:flex-row">
          {/* Full Size Banner - Left Side */}
          <div className="w-full md:w-1/2 h-64 md:h-screen sticky top-0 flex-shrink-0">
            <img 
              src="/lovable-uploads/2bce0ced-5737-4203-bbe6-6b54ee8ddef2.png"
              alt="News Banner"
              className="w-full h-full object-cover"
            />
          </div>

          {/* News Content - Right Side */}
          <div className="w-full md:w-1/2 h-full flex flex-col p-4 md:p-8 bg-white overflow-y-auto">
            <h1 className="text-2xl md:text-3xl font-serif font-bold text-gov-blue mb-6 md:mb-8">
              {t('news.title')}
            </h1>

            {/* First News Article */}
            <Card className="shadow-lg border-0 mb-6 md:mb-8">
              <CardContent className="p-4 md:p-8">
                <h2 className="text-lg md:text-xl font-serif font-bold text-gray-800 mb-3 md:mb-4">
                  {t('news.presidential.title')}
                </h2>
                
                {/* Preview text */}
                <div className="text-gray-700 leading-relaxed mb-4 md:mb-6">
                  <p className="line-clamp-3">
                    {t('news.presidential.content').substring(0, 200)}...
                  </p>
                </div>

                {/* Learn More Button */}
                <Button 
                  onClick={handleLearnMore}
                  variant="outline"
                  className="w-full border-gov-blue text-gov-blue hover:bg-gov-blue hover:text-white transition-colors"
                >
                  {t('news.learnMore')}
                </Button>
              </CardContent>
            </Card>

            {/* Second News Article */}
            <Card className="shadow-lg border-0">
              <CardContent className="p-4 md:p-8">
                <h2 className="text-lg md:text-xl font-serif font-bold text-gray-800 mb-3 md:mb-4">
                  {language === 'ru' ? 'Берик АСЫЛОВ: Правовая ответственность – опора справедливости' :
                   language === 'kz' ? 'Берік АСЫЛОВ: Құқықтық жауапкершілік – әділеттіліктің тірегі' :
                   'Berik ASYLOV: Legal responsibility is the foundation of justice'}
                </h2>
                
                {/* Preview text */}
                <div className="text-gray-700 leading-relaxed mb-4 md:mb-6">
                  <p className="line-clamp-3">
                    {secondNewsText.substring(0, 200)}...
                  </p>
                </div>

                {/* Learn More Button */}
                <Button 
                  onClick={() => navigate('/news/berik-asylov')}
                  variant="outline"
                  className="w-full border-gov-blue text-gov-blue hover:bg-gov-blue hover:text-white transition-colors"
                >
                  {t('news.learnMore')}
                </Button>
              </CardContent>
            </Card>
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
