import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/context/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ScrollToTop from '@/components/ScrollToTop';
import { ArrowLeft } from 'lucide-react';

const BerikAsylov: React.FC = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [articleText, setArticleText] = useState<string>('');

  useEffect(() => {
    // Fetch the article text based on language
    const fileName = language === 'ru' ? '2_rus.txt' : '2.txt';
    fetch(`/news/${fileName}`)
      .then(response => response.text())
      .then(text => {
        setArticleText(text);
      })
      .catch(error => {
        console.error('Error fetching article text:', error);
      });
  }, [language]);

  const handleGoBack = () => {
    navigate('/news');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Button 
            onClick={handleGoBack}
            variant="outline"
            className="mb-6 border-gov-blue text-gov-blue hover:bg-gov-blue hover:text-white"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {language === 'ru' ? 'Назад' :
             language === 'kz' ? 'Артқа' :
             'Back'}
          </Button>

          <Card className="shadow-lg">
            <CardContent className="p-8">
              <div className="mb-6">
                <img 
                  src="/news/berik-asylov.jpeg" 
                  alt={language === 'ru' ? 'Берик АСЫЛОВ' :
                       language === 'kz' ? 'Берік АСЫЛОВ' :
                       'Berik ASYLOV'}
                  className="w-full h-64 object-cover object-top rounded-lg mb-6"
                />
              </div>

              <h1 className="text-3xl font-serif font-bold text-gov-blue mb-6">
                {language === 'ru' ? 'Берик АСЫЛОВ: Правовая ответственность – опора справедливости' :
                 language === 'kz' ? 'Берік АСЫЛОВ: Құқықтық жауапкершілік – әділеттіліктің тірегі' :
                 'Berik ASYLOV: Legal responsibility is the foundation of justice'}
              </h1>
              
              <div className="prose prose-lg max-w-none">
                <div className="whitespace-pre-line text-gray-700 leading-relaxed">
                  {articleText}
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-500">
                  {language === 'ru' ? 'Дата публикации: 14 июня 2025 г.' :
                   language === 'kz' ? 'Жариялау күні: 14 маусым 2025 ж.' :
                   'Publication date: June 14, 2025'}
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

export default BerikAsylov; 