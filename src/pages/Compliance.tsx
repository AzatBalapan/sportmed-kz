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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import FaqDisplay from '@/components/FaqDisplay';
import { parseFaqFromText, FaqItem } from '@/utils/faqParser';

interface Document {
  id: number;
  title: string;
  fileName: string;
  path: string;
  textFilePath?: string;
  type?: 'text' | 'faq';
}

const Compliance: React.FC = () => {
  const { t, language } = useLanguage();
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [documentContent, setDocumentContent] = useState<string>('');
  const [faqItems, setFaqItems] = useState<FaqItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (selectedDocument && selectedDocument.textFilePath) {
      setIsLoading(true);
      // Fetch the text content from the file
      fetch(selectedDocument.textFilePath)
        .then(response => response.text())
        .then(text => {
          setDocumentContent(text);
          
          // If the document is a FAQ, parse the FAQ items
          if (selectedDocument.type === 'faq') {
            setFaqItems(parseFaqFromText(text));
          }
          
          setIsLoading(false);
        })
        .catch(error => {
          console.error('Error loading document:', error);
          setDocumentContent('Error loading document content');
          setIsLoading(false);
        });
    }
  }, [selectedDocument]);

  const documents: Document[] = [
    {
      id: 1,
      title: 'Антикоррупционная политика',
      fileName: 'Внутренняя Полтика по против корр ГККП СЦ рус.docx',
      path: '/lovable-uploads/Внутренняя Полтика по против корр ГККП СЦ рус.docx',
      textFilePath: '/lovable-uploads/anticor_txt/internal_communal.txt',
      type: 'text'
    },
    {
      id: 2,
      title: 'Кодекс этики',
      fileName: 'Корп кодекс рус.docx',
      path: '/lovable-uploads/Корп кодекс рус.docx',
      textFilePath: '/lovable-uploads/anticor_txt/codex.txt',
      type: 'text'
    },
    {
      id: 3,
      title: 'Политика по урегулированию конфликта интересов',
      fileName: 'Внутренняя Политика выявления и урегулирования конфликтов ГККП СМЦ рус.docx',
      path: '/lovable-uploads/Внутренняя Политика выявления и урегулирования конфликтов ГККП СМЦ рус.docx',
      textFilePath: '/lovable-uploads/anticor_txt/internal_politics.txt',
      type: 'text'
    },
    {
      id: 4,
      title: 'Антикоррупционный стандарт',
      fileName: 'Антикоррупционный стандарт рус.docx',
      path: '/lovable-uploads/Антикоррупционный стандарт рус.docx',
      textFilePath: '/lovable-uploads/anticor_txt/anticor_politics.txt',
      type: 'text'
    },
    {
      id: 5,
      title: 'Инструкция по противодействию коррупции',
      fileName: 'Инструкция по противодействию коррупции для работников ГККП СМЦ рус.docx',
      path: '/lovable-uploads/Инструкция по противодействию коррупции для работников ГККП СМЦ рус.docx',
      textFilePath: '/lovable-uploads/anticor_txt/workers.txt',
      type: 'text'
    },
    {
      id: 6,
      title: 'Положение о порядке информирования работников',
      fileName: 'Положение о порядке информирования работника о наруш рус.docx',
      path: '/lovable-uploads/Положение о порядке информирования работника о наруш рус.docx',
      textFilePath: '/lovable-uploads/anticor_txt/info.txt',
      type: 'text'
    },
    {
      id: 7,
      title: 'Часто задаваемые вопросы',
      fileName: 'часто задаваемые вопросы (Автосохраненный).docx',
      path: '/lovable-uploads/часто задаваемые вопросы (Автосохраненный).docx',
      textFilePath: '/lovable-uploads/anticor_txt/questions.txt',
      type: 'faq'
    },
  ];

  const formatText = (text: string) => {
    // Split the text into paragraphs
    const paragraphs = text.split('\n').filter(p => p.trim() !== '');

    return paragraphs.map((paragraph, index) => {
      // Check if the paragraph is a heading (starts with number or has certain patterns)
      if (/^\s*\d+\./.test(paragraph) || paragraph.trim().startsWith('I.') || paragraph.trim().startsWith('II.') || paragraph.trim().startsWith('III.') || paragraph.trim().startsWith('IV.') || paragraph.trim().startsWith('V.') || paragraph.trim().startsWith('VI.')) {
        return <h2 key={index} className="text-xl font-semibold mt-6 mb-4">{paragraph.trim()}</h2>;
      } 
      // Check if the paragraph is a subheading or bullet point
      else if (/^\s*•/.test(paragraph) || /^\s*-/.test(paragraph)) {
        return <li key={index} className="ml-6 mb-2">{paragraph.replace(/^\s*[•-]\s*/, '').trim()}</li>;
      }
      // Otherwise treat as regular paragraph
      else {
        return <p key={index} className="mb-4 text-gray-800 leading-relaxed">{paragraph.trim()}</p>;
      }
    });
  };

  // Filter FAQ items by current language
  const filteredFaqItems = faqItems.filter(item => 
    language === 'ru' ? item.language === 'ru' : item.language === 'kz'
  );

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
                  {selectedDocument?.type === 'faq' ? (
                    <div className="space-y-4">
                      {filteredFaqItems.length > 0 ? (
                        <FaqDisplay faqItems={filteredFaqItems.map(item => ({
                          id: item.id,
                          question: item.question,
                          answer: item.answer
                        }))} />
                      ) : (
                        <p>No FAQ items available in the current language.</p>
                      )}
                    </div>
                  ) : (
                    formatText(documentContent)
                  )}
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
