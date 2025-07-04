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
  const [thirdNewsText, setThirdNewsText] = useState<string>('');
  const [fourthNewsText, setFourthNewsText] = useState<string>('');
  const [fifthNewsText, setFifthNewsText] = useState<string>("");

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

    // Fetch the third news text based on language
    const thirdFileName = language === 'ru' ? '3/3_rus.txt' : '3/3_kaz.txt';
    fetch(`/news/${thirdFileName}`)
      .then(response => response.text())
      .then(text => {
        setThirdNewsText(text);
      })
      .catch(error => {
        console.error('Error fetching third news text:', error);
      });

    // Fetch the fourth news text based on language
    const fourthFileName = language === 'ru' ? '4/4_rus.txt' : '4/4_kaz.txt';
    fetch(`/news/${fourthFileName}`)
      .then(response => response.text())
      .then(text => {
        setFourthNewsText(text);
      })
      .catch(error => {
        console.error('Error fetching fourth news text:', error);
      });

    // Fetch the fifth news text based on language
    const fifthFileName = language === 'ru' ? '5/5_rus.txt' : '5/5_kaz.txt';
    fetch(`/news/${fifthFileName}`)
      .then(response => response.text())
      .then(text => {
        setFifthNewsText(text);
      })
      .catch(error => {
        console.error('Error fetching fifth news text:', error);
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
        <section className="min-h-screen p-3 sm:p-4 md:p-6 lg:p-8 bg-white">
          <div className="container mx-auto w-full">
            <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-serif font-bold text-gov-blue mb-4 sm:mb-6 md:mb-8 lg:mb-12 text-center px-2">
              {t('news.title')}
            </h1>

            {/* News Articles in Three Columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
              {/* First News Article */}
              <Card className="shadow-lg border-0 hover:shadow-xl transition-shadow overflow-hidden flex flex-col h-full">
                {/* Banner Image */}
                <div className="w-full h-32 sm:h-40 md:h-48 lg:h-56 overflow-hidden flex-shrink-0">
                  <img 
                    src="/lovable-uploads/2bce0ced-5737-4203-bbe6-6b54ee8ddef2.png"
                    alt={language === 'ru' ? 'Президентский молодежный кадровый резерв' :
                         language === 'kz' ? 'Президенттік жастар кадр резерві' :
                         'Presidential Youth Personnel Reserve'}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                
                <CardContent className="p-3 sm:p-4 md:p-6 flex flex-col flex-grow">
                  <h2 className="text-sm sm:text-base md:text-lg lg:text-xl font-serif font-bold text-gray-800 mb-2 sm:mb-3 md:mb-4 leading-tight">
                    {t('news.presidential.title')}
                  </h2>
                  
                  {/* Preview text */}
                  <div className="text-gray-700 leading-relaxed mb-3 sm:mb-4 md:mb-6 text-xs sm:text-sm md:text-base flex-grow">
                    <p className="line-clamp-3 sm:line-clamp-4">
                      {t('news.presidential.content').substring(0, 100)}...
                    </p>
                  </div>

                  {/* Read More Button */}
                  <Button 
                    onClick={handleLearnMore}
                    variant="outline"
                    className="w-full border-gov-blue text-gov-blue hover:bg-gov-blue hover:text-white transition-colors text-xs sm:text-sm md:text-base py-2 md:py-3 px-4 md:px-6 mt-auto"
                  >
                    {t('news.learnMore')}
                  </Button>
                </CardContent>
              </Card>

              {/* Second News Article */}
              <Card className="shadow-lg border-0 hover:shadow-xl transition-shadow overflow-hidden flex flex-col h-full">
                {/* Banner Image */}
                <div className="w-full h-32 sm:h-40 md:h-48 lg:h-56 overflow-hidden flex-shrink-0">
                  <img 
                    src="/news/berik-asylov.jpeg"
                    alt={language === 'ru' ? 'Берик АСЫЛОВ' :
                         language === 'kz' ? 'Берік АСЫЛОВ' :
                         'Berik ASYLOV'}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                
                <CardContent className="p-3 sm:p-4 md:p-6 flex flex-col flex-grow">
                  <h2 className="text-sm sm:text-base md:text-lg lg:text-xl font-serif font-bold text-gray-800 mb-2 sm:mb-3 md:mb-4 leading-tight">
                    {language === 'ru' ? 'Берик АСЫЛОВ: Правовая ответственность – опора справедливости' :
                     language === 'kz' ? 'Берік АСЫЛОВ: Құқықтық жауапкершілік – әділеттіліктің тірегі' :
                     'Berik ASYLOV: Legal responsibility is the foundation of justice'}
                  </h2>
                  
                  {/* Preview text */}
                  <div className="text-gray-700 leading-relaxed mb-3 sm:mb-4 md:mb-6 text-xs sm:text-sm md:text-base flex-grow">
                    <p className="line-clamp-3 sm:line-clamp-4">
                      {secondNewsText.substring(0, 100)}...
                    </p>
                  </div>

                  {/* Read More Button */}
                  <Button 
                    onClick={() => navigate('/news/berik-asylov')}
                    variant="outline"
                    className="w-full border-gov-blue text-gov-blue hover:bg-gov-blue hover:text-white transition-colors text-xs sm:text-sm md:text-base py-2 md:py-3 px-4 md:px-6 mt-auto"
                  >
                    {t('news.learnMore')}
                  </Button>
                </CardContent>
              </Card>

              {/* Third News Article - Fencing Championship */}
              <Card className="shadow-lg border-0 hover:shadow-xl transition-shadow overflow-hidden flex flex-col h-full">
                {/* Banner Image */}
                <div className="w-full h-32 sm:h-40 md:h-48 lg:h-56 overflow-hidden flex-shrink-0">
                  <img 
                    src="/news/3/photoes/1.jpeg"
                    alt={language === 'ru' ? 'Чемпионат Казахстана по фехтованию' :
                         language === 'kz' ? 'Қазақстан чемпионаты семсерлесу' :
                         'Kazakhstan Fencing Championship'}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                
                <CardContent className="p-3 sm:p-4 md:p-6 flex flex-col flex-grow">
                  <h2 className="text-sm sm:text-base md:text-lg lg:text-xl font-serif font-bold text-gray-800 mb-2 sm:mb-3 md:mb-4 leading-tight">
                    {language === 'ru' ? 'В Астане проходит чемпионат Казахстана по фехтованию' :
                     language === 'kz' ? 'Астанада семсерлесуден Қазақстан чемпионаты өтіп жатыр' :
                     'Kazakhstan Fencing Championship taking place in Astana'}
                  </h2>
                  
                  {/* Preview text */}
                  <div className="text-gray-700 leading-relaxed mb-3 sm:mb-4 md:mb-6 text-xs sm:text-sm md:text-base flex-grow">
                    <p className="line-clamp-3 sm:line-clamp-4">
                      {thirdNewsText.substring(0, 100)}...
                    </p>
                  </div>

                  {/* Read More Button */}
                  <Button 
                    onClick={() => navigate('/news/fencing-championship')}
                    variant="outline"
                    className="w-full border-gov-blue text-gov-blue hover:bg-gov-blue hover:text-white transition-colors text-xs sm:text-sm md:text-base py-2 md:py-3 px-4 md:px-6 mt-auto"
                  >
                    {t('news.learnMore')}
                  </Button>
                </CardContent>
              </Card>

              {/* Fourth News Article - Sports School Opening */}
              <Card className="shadow-lg border-0 hover:shadow-xl transition-shadow overflow-hidden flex flex-col h-full">
                {/* Banner Image */}
                <div className="w-full h-32 sm:h-40 md:h-48 lg:h-56 overflow-hidden flex-shrink-0">
                  <img 
                    src="/news/4/photoes/1.jpg"
                    alt={language === 'ru' ? 'Открытие детско-юношеской спортивной школы' :
                         language === 'kz' ? 'Балалар мен жасөспірімдер спорт мектебінің ашылуы' :
                         'Youth Sports School Opening'}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                
                <CardContent className="p-3 sm:p-4 md:p-6 flex flex-col flex-grow">
                  <h2 className="text-sm sm:text-base md:text-lg lg:text-xl font-serif font-bold text-gray-800 mb-2 sm:mb-3 md:mb-4 leading-tight">
                    {language === 'ru' ? 'Генеральный Прокурор открыл здание детско-юношеской спортивной школы в селе Зеренда Акмолинской области' :
                     language === 'kz' ? 'Бас Прокурор Ақмола облысы Зеренді ауылында балалар мен жасөспірімдер спорт мектебінің ғимаратын ашты' :
                     'General Prosecutor opened Youth Sports School building in Zeren village of Akmola region'}
                  </h2>
                  
                  {/* Preview text */}
                  <div className="text-gray-700 leading-relaxed mb-3 sm:mb-4 md:mb-6 text-xs sm:text-sm md:text-base flex-grow">
                    <p className="line-clamp-3 sm:line-clamp-4">
                      {fourthNewsText.substring(0, 100)}...
                    </p>
                  </div>

                  {/* Read More Button */}
                  <Button 
                    onClick={() => navigate('/news/sports-school-opening')}
                    variant="outline"
                    className="w-full border-gov-blue text-gov-blue hover:bg-gov-blue hover:text-white transition-colors text-xs sm:text-sm md:text-base py-2 md:py-3 px-4 md:px-6 mt-auto"
                  >
                    {t('news.learnMore')}
                  </Button>
                </CardContent>
              </Card>

              {/* Fifth News Article - World Boxing Cup */}
              <Card className="shadow-lg border-0 hover:shadow-xl transition-shadow overflow-hidden flex flex-col h-full">
                {/* Banner Image */}
                <div className="w-full h-32 sm:h-40 md:h-48 lg:h-56 overflow-hidden flex-shrink-0">
                  <img 
                    src="/news/5/photoes/1.jpeg"
                    alt={language === 'ru' ? 'World Boxing Cup: Astana 2025' :
                         language === 'kz' ? 'World Boxing Cup: Astana 2025' :
                         'World Boxing Cup: Astana 2025'}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <CardContent className="p-3 sm:p-4 md:p-6 flex flex-col flex-grow">
                  <h2 className="text-sm sm:text-base md:text-lg lg:text-xl font-serif font-bold text-gray-800 mb-2 sm:mb-3 md:mb-4 leading-tight">
                    {language === 'ru' ? 'World Boxing Cup: Astana 2025 — Кубок мира по боксу в столице Казахстана' :
                     language === 'kz' ? 'World Boxing Cup: Astana 2025 — Қазақстан астанасында бокстан Әлем кубогы' :
                     'World Boxing Cup: Astana 2025 — Boxing World Cup in Kazakhstan\'s capital'}
                  </h2>
                  {/* Preview text */}
                  <div className="text-gray-700 leading-relaxed mb-3 sm:mb-4 md:mb-6 text-xs sm:text-sm md:text-base flex-grow">
                    <p className="line-clamp-3 sm:line-clamp-4">
                      {fifthNewsText.substring(0, 100)}...
                    </p>
                  </div>
                  {/* Read More Button */}
                  <Button 
                    onClick={() => navigate('/news/world-boxing-cup')}
                    variant="outline"
                    className="w-full border-gov-blue text-gov-blue hover:bg-gov-blue hover:text-white transition-colors text-xs sm:text-sm md:text-base py-2 md:py-3 px-4 md:px-6 mt-auto"
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
