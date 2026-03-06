import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/context/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ScrollToTop from '@/components/ScrollToTop';
import { ArrowLeft, FileText } from 'lucide-react';

const NewsArticle13: React.FC = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/news');
  };

  const title = language === 'ru'
    ? 'Протокол №1 заседания конкурсной комиссии и график собеседования'
    : 'Конкурстық комиссия отырысының №1 хаттамасы және әңгімелесу кестесі';

  const bodyText = language === 'ru'
    ? `04 марта 2026 года состоялось заседание конкурсной комиссии по отбору кандидатов на занятие вакантной должности руководителя ГККП «Спортивный медицинский центр города Астаны».

По итогам рассмотрения документов к собеседованию допущены:
• Абдыхадиров Данияр Нурланович — заместитель руководителя ГККП «Спортивный медицинский центр города Астаны»;
• Досмуратов Маханбет Манасович — заведующий отделением специализированных врачей ГККП «Спортивный медицинский центр города Астаны».

Собеседование состоится 10 марта 2026 года в 10:00 в онлайн-формате (платформа Zoom).`
    : `2026 жылғы 04 наурызда «Астана қаласының Спорттық медициналық орталығы» МККҚ басшысы бос лауазымына үміткерлерді іріктеу жөніндегі конкурстық комиссияның отырысы өтті.

Құжаттарды қарау қорытындысы бойынша әңгімелесуге жіберілді:
• Абдыхадиров Данияр Нурланович — «Астана қаласының Спорттық медициналық орталығы» МККҚ басшысының орынбасары;
• Досмуратов Маханбет Манасович — «Астана қаласының Спорттық медициналық орталығы» МККҚ мамандандырылған дәрігерлер бөлімшесінің меңгерушісі.

Әңгімелесу 2026 жылғы 10 наурызда сағат 10:00-де онлайн форматта (Zoom платформасы) өтеді.`;

  const base = 'https://csmed.kz';
  const pdfFiles = language === 'ru'
    ? [
        { label: 'Протокол №1', path: `${base}/news/13/%D0%9F%D1%80%D0%BE%D1%82%D0%BE%D0%BA%D0%BE%D0%BB.pdf` },
        { label: 'График собеседования', path: `${base}/news/13/%D0%A1%D1%83%D1%85%D0%B1%D0%B0%D1%82_%D1%80%D1%83%D1%81%D1%81.pdf` },
      ]
    : [
        { label: 'Хаттама №1', path: `${base}/news/13/%D0%A5%D0%B0%D1%82%D1%82%D0%B0%D0%BC%D0%B0.pdf` },
        { label: 'Әңгімелесу кестесі', path: `${base}/news/13/%D0%A1%D1%83%D1%85%D0%B1%D0%B0%D1%82_%D0%BA%D0%B0%D0%B7.pdf` },
      ];

  const docsTitle = language === 'ru' ? 'Документы' : 'Құжаттар';
  const backLabel = language === 'ru' ? 'Назад' : 'Артқа';
  const dateLabel = language === 'ru' ? 'Дата публикации: 04.03.2026' : 'Жариялау күні: 04.03.2026';

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

              {/* PDF Documents */}
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

export default NewsArticle13;
