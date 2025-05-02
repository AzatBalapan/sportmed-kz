
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import ScrollToTop from '@/components/ScrollToTop';
import SocialLinks from '@/components/SocialLinks';

const Compliance: React.FC = () => {
  const { t } = useLanguage();

  const documents = [
    {
      id: 1,
      title: 'Антикоррупционная политика',
      fileName: 'Внутренняя Полтика по против корр ГККП СЦ рус.docx',
      path: '/lovable-uploads/Внутренняя Полтика по против корр ГККП СЦ рус.docx',
    },
    {
      id: 2,
      title: 'Кодекс этики',
      fileName: 'Корп кодекс  рус.docx',
      path: '/lovable-uploads/Корп кодекс  рус.docx',
    },
    {
      id: 3,
      title: 'Политика по урегулированию конфликта интересов',
      fileName: 'Внутренняя Политика выявления и урегулирования конфликтов ГККП СМЦ рус.docx',
      path: '/lovable-uploads/Внутренняя Политика выявления и урегулирования конфликтов ГККП СМЦ рус.docx',
    },
    {
      id: 4,
      title: 'Антикоррупционный стандарт',
      fileName: 'Антикоррупционный стандарт  рус.docx',
      path: '/lovable-uploads/Антикоррупционный стандарт  рус.docx',
    },
    {
      id: 5,
      title: 'Инструкция по противодействию коррупции',
      fileName: 'Инструкция по противодействию коррупции для работников ГККП СМЦ рус.docx',
      path: '/lovable-uploads/Инструкция по противодействию коррупции для работников ГККП СМЦ рус.docx',
    },
    {
      id: 6,
      title: 'Положение о порядке информирования работников',
      fileName: 'Положение о порядке информирования работника о наруш рус.docx',
      path: '/lovable-uploads/Положение о порядке информирования работника о наруш рус.docx',
    },
    {
      id: 7,
      title: 'Часто задаваемые вопросы',
      fileName: 'часто задаваемые вопросы (Автосохраненный).docx',
      path: '/lovable-uploads/часто задаваемые вопросы (Автосохраненный).docx',
    },
  ];

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{t('compliance.title')}</h1>
          <p className="text-gray-600">{t('compliance.description')}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {documents.map((doc) => (
            <Card key={doc.id} className="transition-all hover:shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl">{doc.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  {t('compliance.document')} ({doc.fileName})
                </CardDescription>
              </CardContent>
              <CardFooter>
                <a
                  href={doc.path}
                  download={doc.fileName}
                  className="w-full"
                >
                  <Button className="w-full">
                    <Download className="mr-2 h-4 w-4" /> 
                    {t('compliance.download')}
                  </Button>
                </a>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
      <Footer />
      <ScrollToTop />
      <SocialLinks />
    </>
  );
};

export default Compliance;
