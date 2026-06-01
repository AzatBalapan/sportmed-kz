import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/context/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ScrollToTop from '@/components/ScrollToTop';
import { ArrowLeft, X, ChevronLeft, ChevronRight } from 'lucide-react';

const NewsArticle15: React.FC = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const title = language === 'ru'
    ? 'Спортивный медицинский центр переехал на новый адрес'
    : 'Спорттық медициналық орталық жаңа мекенжайға көшті';

  const bodyText = language === 'ru'
    ? `Уважаемые спортсмены, тренеры, родители и посетители!

Сообщаем, что Спортивный медицинский центр города Астаны переехал на новый адрес.

Теперь центр осуществляет приём по адресу:

📍 проспект Улы Дала, 35А

Все медицинские осмотры, консультации специалистов и другие услуги оказываются по новому адресу.

Просим учитывать данную информацию при планировании посещения центра.

Будем рады видеть вас по новому адресу!`
    : `Құрметті спортшылар, жаттықтырушылар, ата-аналар және келушілер!

Астана қаласының Спорттық медициналық орталығының жаңа мекенжайға көшкенін хабарлаймыз.

Енді орталық келесі мекенжай бойынша қызмет көрсетеді:

📍 Ұлы Дала даңғылы, 35А

Медициналық тексерулер, мамандардың консультациялары және орталықтың барлық қызметтері жаңа мекенжайда жүзеге асырылады.

Орталыққа келуді жоспарлау кезінде осы ақпаратты ескерулеріңізді сұраймыз.

Жаңа мекенжай бойынша сіздерді күтеміз!`;

  // Main photo + 6 additional photos
  // Replace these paths with your actual image paths in /news/15/
  const photos = [
    { src: '/news/15/photo_main.jpg', alt: language === 'ru' ? 'Новое здание центра' : 'Орталықтың жаңа ғимараты' },
    { src: '/news/15/photo_2.jpg', alt: language === 'ru' ? 'Фото 2' : 'Сурет 2' },
    { src: '/news/15/photo_3.jpg', alt: language === 'ru' ? 'Фото 3' : 'Сурет 3' },
    { src: '/news/15/photo_4.jpg', alt: language === 'ru' ? 'Фото 4' : 'Сурет 4' },
    { src: '/news/15/photo_5.jpg', alt: language === 'ru' ? 'Фото 5' : 'Сурет 5' },
    { src: '/news/15/photo_6.jpg', alt: language === 'ru' ? 'Фото 6' : 'Сурет 6' },
    { src: '/news/15/photo_7.jpg', alt: language === 'ru' ? 'Фото 7' : 'Сурет 7' },
  ];

  const backLabel = language === 'ru' ? 'Назад' : 'Артқа';
  const dateLabel = language === 'ru' ? 'Дата публикации: 01.06.2026' : 'Жариялау күні: 01.06.2026';
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

              {/* Photo gallery (additional 6 photos) */}
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

export default NewsArticle15;
