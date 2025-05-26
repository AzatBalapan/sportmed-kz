
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/context/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ScrollToTop from '@/components/ScrollToTop';
import SocialLinks from '@/components/SocialLinks';
import { ArrowLeft } from 'lucide-react';

const NewsArticle: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

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
            {t('news.back')}
          </Button>

          <Card className="shadow-lg">
            <CardContent className="p-8">
              <div className="mb-6">
                <img 
                  src="/lovable-uploads/2bce0ced-5737-4203-bbe6-6b54ee8ddef2.png" 
                  alt="Presidential Youth Reserve"
                  className="w-full h-64 object-cover rounded-lg mb-6"
                />
              </div>

              <h1 className="text-3xl font-serif font-bold text-gov-blue mb-6">
                {t('news.presidential.title')}
              </h1>
              
              <div className="prose prose-lg max-w-none">
                <div className="whitespace-pre-line text-gray-700 leading-relaxed">
                  {t('news.presidential.content')}
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-500">
                  {t('news.publishDate')}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
      <ScrollToTop />
      <SocialLinks />
    </div>
  );
};

export default NewsArticle;
