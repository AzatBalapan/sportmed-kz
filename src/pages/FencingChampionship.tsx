import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/context/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ScrollToTop from '@/components/ScrollToTop';
import { ArrowLeft } from 'lucide-react';

const FencingChampionship: React.FC = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [articleText, setArticleText] = useState<string>('');

  useEffect(() => {
    // Fetch the article text based on language
    const fileName = language === 'ru' ? '3/3_rus.txt' : '3/3_kaz.txt';
    fetch(`/news/${fileName}`)
      .then(response => response.text())
      .then(text => {
        setArticleText(text);
      })
      .catch(error => {
        console.error('Error fetching fencing championship text:', error);
      });
  }, [language]);

  const handleGoBack = () => {
    navigate('/news');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-6 md:py-8">
        <div className="max-w-4xl mx-auto">
          <Button 
            onClick={handleGoBack}
            variant="outline"
            className="mb-4 md:mb-6 border-gov-blue text-gov-blue hover:bg-gov-blue hover:text-white text-sm md:text-base"
          >
            <ArrowLeft className="mr-2 h-3 w-3 md:h-4 md:w-4" />
            {language === 'ru' ? 'Назад' :
             language === 'kz' ? 'Артқа' :
             'Back'}
          </Button>

          <Card className="shadow-lg">
            <CardContent className="p-4 md:p-8">
              <div className="mb-4 md:mb-6">
                <img 
                  src="/news/3/photoes/1.jpeg" 
                  alt={language === 'ru' ? 'Чемпионат Казахстана по фехтованию' :
                       language === 'kz' ? 'Қазақстан чемпионаты семсерлесу' :
                       'Kazakhstan Fencing Championship'}
                  className="w-full h-48 md:h-64 object-cover object-center rounded-lg mb-4 md:mb-6"
                />
              </div>

              <h1 className="text-xl md:text-3xl font-serif font-bold text-gov-blue mb-4 md:mb-6">
                {language === 'ru' ? 'В Астане проходит чемпионат Казахстана по фехтованию' :
                 language === 'kz' ? 'Астанада семсерлесуден Қазақстан чемпионаты өтіп жатыр' :
                 'Kazakhstan Fencing Championship taking place in Astana'}
              </h1>
              
              <div className="prose prose-sm md:prose-lg max-w-none">
                <div className="whitespace-pre-line text-gray-700 leading-relaxed text-sm md:text-base mb-6 md:mb-8">
                  {articleText}
                </div>
              </div>

              {/* Photo Collage */}
              <div className="mt-6 md:mt-8">
                <h2 className="text-lg md:text-xl font-serif font-bold text-gray-800 mb-4 md:mb-6">
                  {language === 'ru' ? 'Фотографии с чемпионата' :
                   language === 'kz' ? 'Чемпионаттан фотосуреттер' :
                   'Championship Photos'}
                </h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                  <div className="aspect-square overflow-hidden rounded-lg">
                    <img 
                      src="/news/3/photoes/1.jpeg"
                      alt={language === 'ru' ? 'Фото 1 - Чемпионат по фехтованию' :
                           language === 'kz' ? 'Фото 1 - Семсерлесу чемпионаты' :
                           'Photo 1 - Fencing Championship'}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="aspect-square overflow-hidden rounded-lg">
                    <img 
                      src="/news/3/photoes/2.jpeg"
                      alt={language === 'ru' ? 'Фото 2 - Чемпионат по фехтованию' :
                           language === 'kz' ? 'Фото 2 - Семсерлесу чемпионаты' :
                           'Photo 2 - Fencing Championship'}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="aspect-square overflow-hidden rounded-lg">
                    <img 
                      src="/news/3/photoes/3.jpeg"
                      alt={language === 'ru' ? 'Фото 3 - Чемпионат по фехтованию' :
                           language === 'kz' ? 'Фото 3 - Семсерлесу чемпионаты' :
                           'Photo 3 - Fencing Championship'}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="aspect-square overflow-hidden rounded-lg">
                    <img 
                      src="/news/3/photoes/4.jpeg"
                      alt={language === 'ru' ? 'Фото 4 - Чемпионат по фехтованию' :
                           language === 'kz' ? 'Фото 4 - Семсерлесу чемпионаты' :
                           'Photo 4 - Fencing Championship'}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </div>
              </div>
              
              <div className="mt-6 md:mt-8 pt-4 md:pt-6 border-t border-gray-200">
                <p className="text-xs md:text-sm text-gray-500">
                  {language === 'ru' ? 'Дата публикации: 26 июня 2025 г.' :
                   language === 'kz' ? 'Жариялау күні: 26 маусым 2025 ж.' :
                   'Publication date: June 26, 2025'}
                </p>
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

export default FencingChampionship; 