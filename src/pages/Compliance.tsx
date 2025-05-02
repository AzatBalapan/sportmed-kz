
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

const Compliance: React.FC = () => {
  const { t } = useLanguage();

  const documents = [
    {
      id: 1,
      title: 'Антикоррупционная политика',
      fileName: 'anti-corruption-policy.docx',
      path: '/lovable-uploads/anti-corruption-policy.docx',
    },
    {
      id: 2,
      title: 'Кодекс этики',
      fileName: 'ethics-code.docx',
      path: '/lovable-uploads/ethics-code.docx',
    },
    {
      id: 3,
      title: 'Политика по урегулированию конфликта интересов',
      fileName: 'conflict-of-interest-policy.docx',
      path: '/lovable-uploads/conflict-of-interest-policy.docx',
    },
    {
      id: 4,
      title: 'Политика по противодействию мошенничеству',
      fileName: 'fraud-prevention-policy.docx',
      path: '/lovable-uploads/fraud-prevention-policy.docx',
    },
    {
      id: 5,
      title: 'Политика обработки персональных данных',
      fileName: 'personal-data-processing-policy.docx',
      path: '/lovable-uploads/personal-data-processing-policy.docx',
    },
    {
      id: 6,
      title: 'Политика конфиденциальности',
      fileName: 'privacy-policy.docx',
      path: '/lovable-uploads/privacy-policy.docx',
    },
    {
      id: 7,
      title: 'Положение о дисциплинарной ответственности',
      fileName: 'disciplinary-responsibility-regulations.docx',
      path: '/lovable-uploads/disciplinary-responsibility-regulations.docx',
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
    </>
  );
};

export default Compliance;
