
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/context/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Compliance: React.FC = () => {
  const { t } = useLanguage();

  // List of available documents
  const documents = [
    {
      title: {
        ru: 'Антикоррупционный стандарт',
        kz: 'Сыбайлас жемқорлыққа қарсы стандарт'
      },
      filename: 'Антикоррупционный стандарт  рус.docx'
    },
    {
      title: {
        ru: 'Внутренняя Политика выявления и урегулирования конфликтов',
        kz: 'Жанжалдарды анықтау және реттеу жөніндегі ішкі саясат'
      },
      filename: 'Внутренняя Политика выявления и урегулирования конфликтов ГККП СМЦ рус.docx'
    },
    {
      title: {
        ru: 'Внутренняя Политика по противодействию коррупции',
        kz: 'Сыбайлас жемқорлыққа қарсы күрес жөніндегі ішкі саясат'
      },
      filename: 'Внутренняя Полтика по против корр ГККП СЦ рус.docx'
    },
    {
      title: {
        ru: 'Инструкция по противодействию коррупции для работников',
        kz: 'Қызметкерлерге арналған сыбайлас жемқорлыққа қарсы күрес жөніндегі нұсқаулық'
      },
      filename: 'Инструкция по противодействию коррупции для работников ГККП СМЦ рус.docx'
    },
    {
      title: {
        ru: 'Корпоративный кодекс',
        kz: 'Корпоративтік кодекс'
      },
      filename: 'Корп кодекс  рус.docx'
    },
    {
      title: {
        ru: 'Положение о порядке информирования работника о нарушениях',
        kz: 'Қызметкерді бұзушылықтар туралы хабардар ету тәртібі туралы ереже'
      },
      filename: 'Положение о порядке информирования работника о наруш рус.docx'
    },
    {
      title: {
        ru: 'Часто задаваемые вопросы',
        kz: 'Жиі қойылатын сұрақтар'
      },
      filename: 'часто задаваемые вопросы (Автосохраненный).docx'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-serif font-bold text-center mb-12">
            {t('language') === 'ru' ? 'Комплаенс служба' : 'Комплаенс қызметі'}
          </h1>
          
          <Card className="mb-8">
            <CardContent className="pt-6">
              <p className="mb-4 text-gray-700">
                {t('language') === 'ru' 
                  ? 'В данном разделе Вы можете ознакомиться и скачать документы, регламентирующие деятельность комплаенс службы нашего центра.' 
                  : 'Бұл бөлімде сіз біздің орталықтың комплаенс қызметінің қызметін реттейтін құжаттармен танысып, оларды жүктей аласыз.'}
              </p>
              <p className="text-gray-700">
                {t('language') === 'ru' 
                  ? 'Для скачивания документа нажмите на соответствующую кнопку.' 
                  : 'Құжатты жүктеу үшін тиісті түймені басыңыз.'}
              </p>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {documents.map((doc, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-start space-x-4">
                    <FileText className="h-8 w-8 text-gov-blue flex-shrink-0" />
                    <div className="flex-grow">
                      <h3 className="font-medium mb-2">
                        {doc.title[t('language') === 'ru' ? 'ru' : 'kz']}
                      </h3>
                      <Button 
                        variant="outline" 
                        className="w-full mt-2"
                        asChild
                      >
                        <a 
                          href={`/lovable-uploads/${doc.filename}`} 
                          download 
                          className="flex items-center justify-center"
                        >
                          {t('language') === 'ru' ? 'Скачать' : 'Жүктеу'}
                        </a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Compliance;
