
import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';
import ScrollToTop from '@/components/ScrollToTop';
import SocialLinks from '@/components/SocialLinks';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose, DialogDescription } from '@/components/ui/dialog';

interface Document {
  id: number;
  title: string;
  fileName: string; // Add this property to the type
  path: string;
}

const Compliance: React.FC = () => {
  const { t, language } = useLanguage();
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [documentContent, setDocumentContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (selectedDocument) {
      setIsLoading(true);
      // This would ideally fetch the actual text content of the documents
      // For now, we'll simulate content based on the document title
      setTimeout(() => {
        setDocumentContent(`# ${selectedDocument.title}\n\nЭто содержание документа "${selectedDocument.title}". В реальном приложении здесь будет отображаться фактический текст документа, извлеченный из файла.\n\nДокумент содержит важную информацию о комплаенс политиках и процедурах организации, обеспечивающих соответствие деятельности компании требованиям законодательства и внутренним стандартам.\n\n## Основные принципы\n\n- Прозрачность и открытость\n- Соблюдение этических норм\n- Ответственность перед заинтересованными сторонами\n- Непрерывное совершенствование процессов\n\n## Ключевые положения\n\nДокумент регламентирует порядок выявления, предотвращения и урегулирования комплаенс-рисков, устанавливает ответственность за несоблюдение требований и определяет меры по контролю за их исполнением.\n\n## Заключение\n\nСоблюдение положений настоящего документа является обязательным для всех сотрудников организации и способствует формированию культуры добросовестного ведения деятельности.`);
        setIsLoading(false);
      }, 500);
    }
  }, [selectedDocument]);

  const documents: Document[] = [
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
              <CardFooter className="flex justify-center">
                <Button 
                  className="w-full flex items-center justify-center"
                  onClick={() => setSelectedDocument(doc)}
                >
                  <Eye className="mr-2 h-4 w-4" /> 
                  {language === 'ru' ? 'Читать' : (language === 'kz' ? 'Оқу' : 'Read')}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Document viewer dialog */}
        <Dialog open={!!selectedDocument} onOpenChange={(open) => {
          if (!open) setSelectedDocument(null);
        }}>
          <DialogContent className="max-w-4xl h-[80vh]">
            <DialogHeader>
              <DialogTitle>{selectedDocument?.title}</DialogTitle>
              <DialogDescription>
                {selectedDocument?.fileName}
              </DialogDescription>
              <DialogClose className="absolute right-4 top-4">
                <span className="sr-only">Close</span>
              </DialogClose>
            </DialogHeader>
            <div className="flex-1 overflow-auto h-full p-6 mt-4">
              {isLoading ? (
                <div className="flex justify-center items-center h-full">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
                </div>
              ) : (
                <div className="prose max-w-none">
                  {documentContent.split('\n').map((paragraph, index) => {
                    if (paragraph.startsWith('# ')) {
                      return <h1 key={index} className="text-2xl font-bold mb-6">{paragraph.substring(2)}</h1>;
                    } else if (paragraph.startsWith('## ')) {
                      return <h2 key={index} className="text-xl font-semibold mt-6 mb-4">{paragraph.substring(3)}</h2>;
                    } else if (paragraph.startsWith('- ')) {
                      return <li key={index} className="ml-6 mb-2">{paragraph.substring(2)}</li>;
                    } else if (paragraph === '') {
                      return <br key={index} />;
                    } else {
                      return <p key={index} className="mb-4 text-gray-800 leading-relaxed">{paragraph}</p>;
                    }
                  })}
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </main>
      <Footer />
      <ScrollToTop />
      <SocialLinks />
    </>
  );
};

export default Compliance;
