import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/context/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ScrollToTop from '@/components/ScrollToTop';
import { ArrowLeft, FileText } from 'lucide-react';

const NewsArticle14: React.FC = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();

  const title = language === 'ru'
    ? 'Протоколы голосования конкурсной комиссии'
    : 'Конкурстық комиссияның дауыс беру хаттамалары';

  const bodyText = language === 'ru'
    ? `10 марта 2026 года конкурсная комиссия провела собеседование с кандидатами на занятие вакантной должности руководителя ГККП «Спортивный медицинский центр города Астаны» и осуществила голосование.

Результаты голосования:

• Досмуратов Маханбет Манасович — 5 голосов «За», 0 голосов «Против»
• Абдыхадиров Данияр Нурланович — 4 голоса «За», 1 голос «Против»`
    : `2026 жылғы 10 наурызда конкурстық комиссия «Астана қаласының Спорттық медициналық орталығы» МККҚ басшысы бос лауазымына үміткерлермен әңгімелесу өткізіп, дауыс берді.

Дауыс беру нәтижелері:

• Досмуратов Маханбет Манасович — 5 «Қолдаған» дауыс, 0 «Қарсы» дауыс
• Абдыхадиров Данияр Нурланович — 4 «Қолдаған» дауыс, 1 «Қарсы» дауыс`;

  const pdfFiles = [
    {
      label: language === 'ru'
        ? 'Протокол голосования — Досмуратов М.М.'
        : 'Дауыс беру хаттамасы — Досмуратов М.М.',
      path: '/news/14/hattama_dosmuratov.pdf',
    },
    {
      label: language === 'ru'
        ? 'Протокол голосования — Абдыхадиров Д.Н.'
        : 'Дауыс беру хаттамасы — Абдыхадиров Д.Н.',
      path: '/news/14/hattama_abdykhadirov.pdf',
    },
  ];

  const docsTitle = language === 'ru' ? 'Документы' : 'Құжаттар';
  const backLabel = language === 'ru' ? 'Назад' : 'Артқа';
  const dateLabel = language === 'ru' ? 'Дата публикации: 11.03.2026' : 'Жариялау күні: 11.03.2026';

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

              <div className="prose prose-sm md:prose-lg max-w-none">
                <div className="whitespace-pre-line text-gray-700 leading-relaxed text-sm md:text-base mb-6 md:mb-8">
                  {bodyText}
                </div>
              </div>

              <div className="mt-6 md:mt-8 border-t border-gray-200 pt-6">
                <h2 className="text-lg md:text-xl font-serif font-bold text-gray-800 mb-4">
                  {docsTitle}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {pdfFiles.map((file) => (
                    <a
                      key={file.path}
                      href={file.path}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button
                        variant="outline"
                        className="w-full border-gov-blue text-gov-blue hover:bg-gov-blue hover:text-white transition-colors text-sm py-3 px-4 flex items-center gap-2 justify-start"
                      >
                        <FileText className="h-4 w-4 flex-shrink-0" />
                        <span className="text-left">{file.label}</span>
                      </Button>
                    </a>
                  ))}
                </div>
              </div>

              <div className="mt-6 md:mt-8 pt-4 md:pt-6 border-t border-gray-200">
                <p className="text-xs md:text-sm text-gray-500">{dateLabel}</p>
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

export default NewsArticle14;
