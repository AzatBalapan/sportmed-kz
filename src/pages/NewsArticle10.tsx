import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/context/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ScrollToTop from '@/components/ScrollToTop';
import { ArrowLeft } from 'lucide-react';

const NewsArticle9: React.FC = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const [article, setArticle] = useState({ title: '', content: '', images: [] as string[] });

  useEffect(() => {
    const fetchArticle = async () => {
      const lang = language === 'ru' ? 'rus' : 'kaz';
      try {
        const response = await fetch(`/news/9/${lang}/9_${lang}.txt`);
        const text = await response.text();
        const lines = text.split('\n');
        const title = lines[0];
        const content = lines.slice(1).join('\n');
        
        // Generate array of image paths (1.jpg through 9.jpg)
        const images = Array.from({ length: 2 }, (_, i) => `/news/10/photoes/${i + 1}.jpeg`);
        
        setArticle({
          title: title,
          content: content,
          images: images
        });
      } catch (error) {
        console.error("Failed to fetch article:", error);
      }
    };
    fetchArticle();
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
            {t('news.back')}
          </Button>

          <Card className="shadow-lg">
            <CardContent className="p-4 md:p-8">
              <h1 className="text-xl md:text-3xl font-serif font-bold text-gov-blue mb-4 md:mb-6">
                {article.title}
              </h1>
              
              <div className="prose prose-sm md:prose-lg max-w-none">
                <div className="whitespace-pre-line text-gray-700 leading-relaxed text-sm md:text-base">
                  {article.content}
                </div>
              </div>

              <div className="my-6 md:my-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {article.images.map((imageSrc, index) => (
                    <img 
                      key={index}
                      src={imageSrc}
                      alt={`${article.title} - Photo ${index + 1}`}
                      className="w-full h-auto object-cover rounded-lg"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  ))}
                </div>
              </div>
              
              <div className="mt-6 md:mt-8 pt-4 md:pt-6 border-t border-gray-200">
                <p className="text-xs md:text-sm text-gray-500">
                  {t('news.publishDate')}
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

export default NewsArticle10;
