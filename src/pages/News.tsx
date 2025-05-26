
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/context/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ScrollToTop from '@/components/ScrollToTop';
import SocialLinks from '@/components/SocialLinks';

const News: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleLearnMore = () => {
    navigate('/news/presidential-reserve');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-grow">
        {/* Main News Section */}
        <section className="h-screen flex">
          {/* Full Size Banner - Left Side */}
          <div className="w-1/2 h-full">
            <div 
              className="w-full h-full bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: 'url(/lovable-uploads/2bce0ced-5737-4203-bbe6-6b54ee8ddef2.png)' }}
            />
          </div>

          {/* News Content - Right Side */}
          <div className="w-1/2 h-full flex items-center justify-center p-8 bg-white">
            <div className="max-w-lg">
              <Card className="shadow-lg border-0">
                <CardContent className="p-8">
                  <h1 className="text-3xl font-serif font-bold text-gov-blue mb-6">
                    {t('news.title')}
                  </h1>
                  
                  <h2 className="text-xl font-serif font-bold text-gray-800 mb-4">
                    {t('news.presidential.title')}
                  </h2>
                  
                  {/* Preview text */}
                  <div className="text-gray-700 leading-relaxed mb-6">
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
