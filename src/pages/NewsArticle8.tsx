import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/context/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ScrollToTop from '@/components/ScrollToTop';
import { ArrowLeft } from 'lucide-react';

const NewsArticle8: React.FC = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [articleText, setArticleText] = useState<string>('');

  useEffect(() => {
    // Fetch the article text based on language
    const fileName = language === 'ru' ? '8/8_rus.txt' : '8/8_kaz.txt';
    fetch(`/news/${fileName}`)
      .then(response => response.text())
      .then(text => {
        setArticleText(text);
      })
      .catch(error => {
        console.error('Error fetching news article 8 text:', error);
      });
  }, [language]);

  const handleGoBack = () => {
    navigate('/news');
  };

  // List of all images for the collage
  const photoList = [1, 2, 3].map(num => `/news/8/photoes/${num}.jpeg`);

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
                  src="/news/8/photoes/1.jpeg" 
                  alt={language === 'ru' ? 'РЕАЛИЗАЦИЯ ГОСПОЛИТИКИ В СПОРТЕ' :
                       language === 'kz' ? 'СПОРТ САЛАСЫНДАҒЫ МЕМЛЕКЕТТІК САЯСАТТЫ ІСКЕ АСЫРУ' :
                       'State Policy in Sports'}
                  className="w-full h-48 md:h-64 object-cover object-center rounded-lg mb-4 md:mb-6"
                />
              </div>

              <h1 className="text-xl md:text-3xl font-serif font-bold text-gov-blue mb-4 md:mb-6">
                {language === 'ru' ? 'РЕАЛИЗАЦИЯ ГОСПОЛИТИКИ В СПОРТЕ - КАЗАХСТАН УКРЕПЛЯЕТ ПОЗИЦИИ В МЕЖДУНАРОДНОМ СПОРТИВНОМ СООБЩЕСТВЕ' :
                 language === 'kz' ? 'СПОРТ САЛАСЫНДАҒЫ МЕМЛЕКЕТТІК САЯСАТТЫ ІСКЕ АСЫРУ – ҚАЗАҚСТАН ХАЛЫҚАРАЛЫҚ СПОРТ ҚАУЫМДАСТЫҒЫНДАҒЫ ҰСТАНЫМЫН НЫҒАЙТУДА' :
                 'Kazakhstan Strengthens Its Position in the International Sports Community'}
              </h1>
              
              <div className="prose prose-sm md:prose-lg max-w-none">
                <div className="whitespace-pre-line text-gray-700 leading-relaxed text-sm md:text-base mb-6 md:mb-8">
                  {articleText}
                </div>
              </div>

              {/* Photo Collage */}
              <div className="mt-6 md:mt-8">
                <h2 className="text-lg md:text-xl font-serif font-bold text-gray-800 mb-4 md:mb-6">
                  {language === 'ru' ? 'Фотографии' :
                   language === 'kz' ? 'Фотосуреттер' :
                   'Photos'}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                  {photoList.map((src, idx) => (
                    <div key={src} className="aspect-square overflow-hidden rounded-lg">
                      <img 
                        src={src}
                        alt={language === 'ru' ? `Фото ${idx+1}` :
                             language === 'kz' ? `Фото ${idx+1}` :
                             `Photo ${idx+1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-6 md:mt-8 pt-4 md:pt-6 border-t border-gray-200">
                <p className="text-xs md:text-sm text-gray-500">
                  {language === 'ru' ? 'Дата публикации: 2025 г.' :
                   language === 'kz' ? 'Жариялау күні: 2025 ж.' :
                   'Publication date: 2025'}
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

export default NewsArticle8; 