import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/context/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ScrollToTop from '@/components/ScrollToTop';
import { ArrowLeft, X, ChevronLeft, ChevronRight } from 'lucide-react';

const NewsArticle16: React.FC = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const title = language === 'ru'
    ? '10 августа – День Абая'
    : '10 тамыз – Абай күні';

  const bodyText = language === 'ru'
    ? `10 августа – день рождения Абая Кунанбаева и День Абая.

Абай Кунанбаев – великий мыслитель, поэт, просветитель, поднявший духовный мир казахского народа на новую высоту, один из основоположников национальной литературы. Его произведения призывают народ к знаниям, труду, поиску, нравственности и самосовершенствованию.

В «Словах назидания» и стихах Абая заложены глубокие размышления о природе человека, знаниях и науке, труде, воспитании, чести и ответственности. Каждое слово великого поэта призывает человека держать ответ перед самим собой, отличать добро от зла и стремиться к совершенству.

Ценность наследия Абая в том, что оно не теряет своего значения с течением времени и созвучно современному обществу. Мысли, высказанные более века назад, актуальны и для человека сегодняшнего дня. Стремление к знаниям, честный труд, служение народу, сохранение человеческих качеств – ценности, не теряющие значения ни в одну эпоху.

Наследие Абая – это не просто память о прошлом, а духовный ориентир, указывающий путь сегодняшнему дню.

Прославлять наследие великого поэта – значит не просто знать его слова, а следовать заложенным в них добрым мыслям в повседневной жизни.

Слово Абая – духовное богатство нации.
Наследие Абая – завет для потомков.`
    : `10 тамыз – Абай Құнанбайұлының туған күні және Абай күні.

Абай Құнанбайұлы – қазақ халқының рухани әлемін биіктеткен ұлы ойшыл, ақын, ағартушы және ұлттық әдебиетіміздің негізін қалаушылардың бірі. Оның шығармалары халықты білімге, еңбекке, ізденіске, адамгершілікке және өзін-өзі жетілдіруге үндейді.

Абайдың қара сөздері мен өлеңдерінде адам болмысы, білім мен ғылым, еңбек, тәрбие, ар-ұят пен жауапкершілік туралы терең ойлар қамтылған. Ұлы ақынның әрбір сөзі адамды өзіне есеп беруге, жақсы мен жаманды ажыратуға және кемелдікке ұмтылуға шақырады.

Абай мұрасының құндылығы – оның уақыт өткен сайын маңызын жоғалтпай, бүгінгі қоғаммен үндесуінде. Ғасыр бұрын айтылған ойлары қазіргі адам үшін де өзекті. Білімге ұмтылу, адал еңбек ету, елге қызмет ету, адамдық қасиетті сақтау – қай кезеңде де маңызын жоғалтпайтын құндылықтар.

Абай мұрасы – өткеннің естелігі ғана емес, бүгінгі күнге бағыт беретін рухани бағдар.

Ұлы ақынның тағылымын дәріптеу – оның сөздерін білу ғана емес, сол сөздердегі ізгі ойларды күнделікті өмірде ұстану.

Абай сөзі – ұлттың рухани қазынасы.
Абай мұрасы – ұрпаққа аманат.`;

  const photos = [
    { src: '/news/16/abai.jpeg', alt: language === 'ru' ? 'День Абая' : 'Абай күні' },
    { src: '/news/16/abai2.jpeg', alt: language === 'ru' ? 'День Абая' : 'Абай күні' },
  ];

  const backLabel = language === 'ru' ? 'Назад' : 'Артқа';
  const dateLabel = language === 'ru' ? 'Дата публикации: 10.08.2026' : 'Жариялау күні: 10.08.2026';
  const photosLabel = language === 'ru' ? 'Фотогалерея' : 'Фотогалерея';

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const prevPhoto = () => setLightboxIndex(i => (i !== null ? (i - 1 + photos.length) % photos.length : 0));
  const nextPhoto = () => setLightboxIndex(i => (i !== null ? (i + 1) % photos.length : 0));

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-6 md:py-8">
        <div className="max-w-4xl mx-auto">
          <Button
            onClick={() => navigate('/news')}
            variant="outline"
            className="mb-4 md:mb-6 border-gov-blue text-gov-blue hover:bg-gov-blue hover:text-white text-sm md:text-base"
          >
            <ArrowLeft className="mr-2 h-3 w-3 md:h-4 md:w-4" />
            {backLabel}
          </Button>

          <Card className="shadow-lg">
            <CardContent className="p-4 md:p-8">
              <h1 className="text-xl md:text-3xl font-serif font-bold text-gov-blue mb-4 md:mb-6">
                {title}
              </h1>

              {/* Main photo */}
              <div
                className="mb-6 md:mb-8 rounded-lg overflow-hidden cursor-pointer"
                onClick={() => openLightbox(0)}
              >
                <img
                  src={photos[0].src}
                  alt={photos[0].alt}
                  className="w-full h-64 md:h-96 object-cover hover:opacity-95 transition-opacity"
                />
              </div>

              {/* Body text */}
              <div className="prose prose-sm md:prose-lg max-w-none">
                <div className="whitespace-pre-line text-gray-700 leading-relaxed text-sm md:text-base mb-6 md:mb-8">
                  {bodyText}
                </div>
              </div>

              {/* Photo gallery (additional photos) */}
              {photos.length > 1 && (
                <div className="mt-6 md:mt-8 border-t border-gray-200 pt-6">
                  <h2 className="text-lg md:text-xl font-serif font-bold text-gray-800 mb-4">
                    {photosLabel}
                  </h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {photos.slice(1).map((photo, idx) => (
                      <div
                        key={photo.src}
                        className="rounded-lg overflow-hidden cursor-pointer aspect-square"
                        onClick={() => openLightbox(idx + 1)}
                      >
                        <img
                          src={photo.src}
                          alt={photo.alt}
                          className="w-full h-full object-cover hover:opacity-90 transition-opacity"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-6 md:mt-8 pt-4 md:pt-6 border-t border-gray-200">
                <p className="text-xs md:text-sm text-gray-500">{dateLabel}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
      <ScrollToTop />

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
            onClick={closeLightbox}
          >
            <X className="h-8 w-8" />
          </button>

          <button
            className="absolute left-4 text-white hover:text-gray-300 transition-colors"
            onClick={(e) => { e.stopPropagation(); prevPhoto(); }}
          >
            <ChevronLeft className="h-10 w-10" />
          </button>

          <img
            src={photos[lightboxIndex].src}
            alt={photos[lightboxIndex].alt}
            className="max-h-[85vh] max-w-[85vw] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />

          <button
            className="absolute right-4 text-white hover:text-gray-300 transition-colors"
            onClick={(e) => { e.stopPropagation(); nextPhoto(); }}
          >
            <ChevronRight className="h-10 w-10" />
          </button>

          <div className="absolute bottom-4 text-white text-sm">
            {lightboxIndex + 1} / {photos.length}
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsArticle16;
