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
  // News state as an array
  const [newsList, setNewsList] = useState<any[]>([]);

  useEffect(() => {
    // Helper to fetch text
    const fetchText = (path: string) => fetch(path).then(r => r.text());

    // News data config (newest first)
    const newsConfig = [
      {
        id: 'new-article-10',
        image: language === 'ru' ? '/news/10/photoes/1.jpeg' : '/news/10/photoes/1.jpeg',
        alt: '', // Will be populated from textPath
        title: '', // Will be populated from textPath
        textPath: language === 'ru' ? '/news/10/10_rus.txt' : '/news/10/10_kaz.txt',
        onClick: () => navigate('/news/new-article-10'),
      },
      {
        id: 'new-article-9',
        image: language === 'ru' ? '/news/9/rus/photos/1.jpg' : '/news/9/kaz/photos/1.jpg',
        alt: '', // Will be populated from textPath
        title: '', // Will be populated from textPath
        textPath: `/news/9/${language === 'ru' ? 'rus' : 'kaz'}/9_${language === 'ru' ? 'rus' : 'kaz'}.txt`,
        onClick: () => navigate('/news/new-article-9'),
      },
      {
        id: 'youth-prize-daryn-7',
        image: '/news/7/photoes/1.jpeg',
        alt: language === 'ru' ? 'Государственная молодежная премия «Дарын»' : language === 'kz' ? '«Дарын» мемлекеттік жастар сыйлығы' : 'Daryn Youth State Prize',
        title: language === 'ru' ? 'СТАРТОВАЛ КОНКУРС НА ГОСУДАРСТВЕННУЮ МОЛОДЕЖНУЮ ПРЕМИЮ «ДАРЫН»' : language === 'kz' ? '«ДАРЫН» МЕМЛЕКЕТТІК ЖАСТАР СЫЙЛЫҒЫНА БАЙҚАУ ЖАРИЯЛАНДЫ' : 'Daryn Youth State Prize Competition Announced',
        textPath: `/news/7/${language === 'ru' ? '7_rus.txt' : '7_kaz.txt'}`,
        onClick: () => navigate('/news/youth-prize-daryn-7'),
      },
      {
        id: 'fencing-championship',
        image: '/news/3/photoes/1.jpeg',
        alt: language === 'ru' ? 'Чемпионат Казахстана по фехтованию' : language === 'kz' ? 'Қазақстан чемпионаты семсерлесу' : 'Kazakhstan Fencing Championship',
        title: language === 'ru' ? 'В Астане проходит чемпионат Казахстана по фехтованию' : language === 'kz' ? 'Астанада семсерлесуден Қазақстан чемпионаты өтіп жатыр' : 'Kazakhstan Fencing Championship taking place in Astana',
        textPath: `/news/${language === 'ru' ? '3/3_rus.txt' : '3/3_kaz.txt'}`,
        onClick: () => navigate('/news/fencing-championship'),
      },
      {
        id: 'sports-school-opening',
        image: '/news/4/photoes/1.jpg',
        alt: language === 'ru' ? 'Открытие детско-юношеской спортивной школы' : language === 'kz' ? 'Балалар мен жасөспірімдер спорт мектебінің ашылуы' : 'Youth Sports School Opening',
        title: language === 'ru' ? 'Генеральный Прокурор открыл здание детско-юношеской спортивной школы в селе Зеренда Акмолинской области' : language === 'kz' ? 'Бас Прокурор Ақмола облысы Зеренді ауылында балалар мен жасөспірімдер спорт мектебінің ғимаратын ашты' : 'General Prosecutor opened Youth Sports School building in Zeren village of Akmola region',
        textPath: `/news/${language === 'ru' ? '4/4_rus.txt' : '4/4_kaz.txt'}`,
        onClick: () => navigate('/news/sports-school-opening'),
      },
      {
        id: 'world-boxing-cup',
        image: '/news/5/photoes/1.jpeg',
        alt: language === 'ru' ? 'World Boxing Cup: Astana 2025' : language === 'kz' ? 'World Boxing Cup: Astana 2025' : 'World Boxing Cup: Astana 2025',
        title: language === 'ru' ? 'World Boxing Cup: Astana 2025 — Кубок мира по боксу в столице Казахстана' : language === 'kz' ? 'World Boxing Cup: Astana 2025 — Қазақстан астанасында бокстан Әлем кубогы' : 'World Boxing Cup: Astana 2025 — Boxing World Cup in Kazakhstan\'s capital',
        textPath: `/news/${language === 'ru' ? '5/5_rus.txt' : '5/5_kaz.txt'}`,
        onClick: () => navigate('/news/world-boxing-cup'),
      },
      {
        id: 'world-boxing-cup-6',
        image: '/news/6/photos/1.jpeg',
        alt: language === 'ru' ? 'World Boxing Cup – Astana 2025' : 'World Boxing Cup – Astana 2025',
        title: language === 'ru' ? 'World Boxing Cup – Astana 2025: уверенная победа Казахстана и вклад спортивной медицины' : 'World Boxing Cup – Astana 2025: Қазақстанның сенімді жеңісі және спорттық медицинаның үлесі',
        textPath: `/news/6/${language === 'ru' ? '6_rus.txt' : '6_kaz.txt'}`,
        onClick: () => navigate('/news/world-boxing-cup-6'),
      },
      {
        id: 'presidential',
        image: '/lovable-uploads/2bce0ced-5737-4203-bbe6-6b54ee8ddef2.png',
        alt: language === 'ru' ? 'Президентский молодежный кадровый резерв' : language === 'kz' ? 'Президенттік жастар кадр резерві' : 'Presidential Youth Personnel Reserve',
        title: t('news.presidential.title'),
        preview: t('news.presidential.content'),
        onClick: () => navigate('/news/presidential-reserve'),
        isStatic: true,
      },
      {
        id: 'berik-asylov',
        image: '/news/berik-asylov.jpeg',
        alt: language === 'ru' ? 'Берик АСЫЛОВ' : language === 'kz' ? 'Берік АСЫЛОВ' : 'Berik ASYLOV',
        title: language === 'ru' ? 'Берик АСЫЛОВ: Правовая ответственность – опора справедливости' : language === 'kz' ? 'Берік АСЫЛОВ: Құқықтық жауапкершілік – әділеттіліктің тірегі' : 'Berik ASYLOV: Legal responsibility is the foundation of justice',
        textPath: `/news/${language === 'ru' ? '2_rus.txt' : '2.txt'}`,
        onClick: () => navigate('/news/berik-asylov'),
      },
      
    ];

    // Fetch all dynamic news texts
    Promise.all(
      newsConfig.map(async (item) => {
        let currentTitle = item.title; // Start with the title defined in newsConfig
        let currentPreview = item.preview;
        let currentAlt = item.alt;
        
        if (item.textPath) {
          try {
            const text = await fetchText(item.textPath);
            const lines = text.split('\n');
            // If title is NOT explicitly defined in newsConfig, use the first line of the text file
            if (!currentTitle) {
              currentTitle = lines[0];
            }
            // If alt is NOT explicitly defined, use the currentTitle
            if (!currentAlt) {
              currentAlt = currentTitle;
            }
            currentPreview = lines.slice(1).join('\n'); // Rest of the text is preview
          } catch {
            currentPreview = ''; // Fallback for preview if fetching fails
          }
        }
        
        return { ...item, title: currentTitle, preview: currentPreview, alt: currentAlt };
      })
    ).then(setNewsList);
  }, [language, navigate, t]);

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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 items-stretch">
              {newsList.map((item) => (
                <Card key={item.id} className="shadow-lg border-0 hover:shadow-xl transition-shadow overflow-hidden flex flex-col h-full">
                  <div className="w-full h-32 sm:h-40 md:h-48 lg:h-56 overflow-hidden flex-shrink-0">
                    <img 
                      src={item.image}
                      alt={item.alt}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                  <CardContent className="p-3 sm:p-4 md:p-6 flex flex-col flex-grow">
                    <h2 className="text-sm sm:text-base md:text-lg lg:text-xl font-serif font-bold text-gray-800 mb-2 sm:mb-3 md:mb-4 leading-tight">
                      {item.title}
                    </h2>
                    <div className="text-gray-700 leading-relaxed mb-3 sm:mb-4 md:mb-6 text-xs sm:text-sm md:text-base flex-grow">
                      <PreviewWithLinks text={item.preview?.substring(0, 100) + '...'} />
                    </div>
                    <Button 
                      onClick={item.onClick}
                      variant="outline"
                      className="w-full border-gov-blue text-gov-blue hover:bg-gov-blue hover:text-white transition-colors text-xs sm:text-sm md:text-base py-2 md:py-3 px-4 md:px-6 mt-auto"
                    >
                      {t('news.learnMore')}
                    </Button>
                  </CardContent>
                </Card>
              ))}
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

function PreviewWithLinks({ text }: { text: string }) {
  if (!text) return null;
  // Regex to match URLs
  const urlRegex = /(https?:\/\/[\w\-._~:/?#[\]@!$&'()*+,;=%]+|www\.[\w\-._~:/?#[\]@!$&'()*+,;=%]+)/gi;
  const parts = text.split(urlRegex);
  return (
    <span className="line-clamp-3 sm:line-clamp-4">
      {parts.map((part, i) => {
        if (urlRegex.test(part)) {
          const href = part.startsWith('http') ? part : `https://${part}`;
          return <a key={i} href={href} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline break-all">{part}</a>;
        }
        return <React.Fragment key={i}>{part}</React.Fragment>;
      })}
    </span>
  );
}
