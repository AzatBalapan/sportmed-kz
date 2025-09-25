import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/context/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ScrollToTop from '@/components/ScrollToTop';
import { ArrowLeft } from 'lucide-react';

type Article = {
  title: string;
  content: string;
  images: string[];
};

const NewsArticle10: React.FC = () => {
  const { language } = useLanguage();           // 'ru' или 'kaz'
  const navigate = useNavigate();
  const [article, setArticle] = useState<Article>({ title: '', content: '', images: [] });

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const lang = language === 'ru' ? 'rus' : 'kaz';
        const res = await fetch(/news/10/10_${lang}.txt);
        const text = await res.text();
        const lines = text.split('\n');

        const title = (lines[0] || '').trim();
        const content = lines.slice(1).join('\n').trim();
        const count = 2;
        const images = Array.from({ length: count }, (_, i) => /news/10/photoes/${i + 1}.jpeg);

        setArticle({ title, content, images });
      } catch (e) {
        console.error('Failed to fetch article 10:', e);
      }
    };

    fetchArticle();
  }, [language]);

  const handleGoBack = () => navigate('/news');

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-6 md:py-8">
        <div className="max-w-4xl mx-auto">
          <Button onClick={handleGoBack} variant="outline" className="mb-4 md:mb-6 border-gov-blue text-gov-blue hover:bg-gov-blue hover:text-white">
            <ArrowLeft className="mr-2 h-3 w-3 md:h-4 md:w-4" />
            {('news.back' as any)}
          </Button>

          <Card className="shadow-lg">
            <CardContent className="p-4 md:p-8">
              <h1 className="text-xl md:text-3xl font-serif font-bold text-gov-blue mb-4 md:mb-6">
                {article.title}
              </h1>

              <div className="prose prose-sm md:prose-lg max-w-none whitespace-pre-line text-gray-700 leading-relaxed">
                {article.content}
              </div>

              <div className="mt-6 md:mt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {article.images.map((src, index) => (
                    <img
                      key={index}
                      src={src}
                      alt={${article.title} - Photo ${index + 1}}
                      className="w-full h-auto object-cover rounded-lg"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  ))}
                </div>
              </div>

              <p className="mt-6 md:mt-8 pt-4 md:pt-6 border-t border-gray-200 text-xs md:text-sm text-gray-500">
                {('news.publishDate' as any)}
              </p>
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
