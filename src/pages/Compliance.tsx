import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';
import ScrollToTop from '@/components/ScrollToTop';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose, DialogDescription } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import FaqDisplay from '@/components/FaqDisplay';
import { parseFaqFromText, FaqItem } from '@/utils/faqParser';

interface Document {
  id: number;
  title: {
    ru: string;
    kz: string;
  };
  fileName: string;
  path: string;
  textFilePath?: {
    ru: string;
    kz: string;
  };
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
      // Get the appropriate file path based on the selected language
      const filePath = language === 'kz' 
        ? selectedDocument.textFilePath.kz 
        : selectedDocument.textFilePath.ru;
      
      // Fetch the text content from the file
      fetch(filePath)
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
  }, [selectedDocument, language]);

  const documents: Document[] = [
    {
      id: 1,
      title: {
        ru: 'Антикоррупционная политика',
        kz: 'Сыбайлас жемқорлыққа қарсы саясат'
      },
      fileName: 'Внутренняя Полтика по против корр ГККП СЦ рус.docx',
      path: '/lovable-uploads/Внутренняя Полтика по против корр ГККП СЦ рус.docx',
      textFilePath: {
        ru: '/lovable-uploads/anticor_txt/internal_communal.txt',
        kz: '/lovable-uploads/anticor_txt/internal_communal_kaz.txt'
      },
      type: 'text'
    },
    {
      id: 2,
      title: {
        ru: 'Кодекс этики',
        kz: 'Этика кодексі'
      },
      fileName: 'Корп кодекс рус.docx',
      path: '/lovable-uploads/Корп кодекс рус.docx',
      textFilePath: {
        ru: '/lovable-uploads/anticor_txt/codex.txt',
        kz: '/lovable-uploads/anticor_txt/codex_kaz.txt'
      },
      type: 'text'
    },
    {
      id: 3,
      title: {
        ru: 'Политика по урегулированию конфликта интересов',
        kz: 'Мүдделер қақтығысын реттеу саясаты'
      },
      fileName: 'Внутренняя Политика выявления и урегулирования конфликтов ГККП СМЦ рус.docx',
      path: '/lovable-uploads/Внутренняя Политика выявления и урегулирования конфликтов ГККП СМЦ рус.docx',
      textFilePath: {
        ru: '/lovable-uploads/anticor_txt/internal_politics.txt',
        kz: '/lovable-uploads/anticor_txt/internal_politics_kaz.txt'
      },
      type: 'text'
    },
    {
      id: 4,
      title: {
        ru: 'Антикоррупционный стандарт',
        kz: 'Сыбайлас жемқорлыққа қарсы стандарт'
      },
      fileName: 'Антикоррупционный стандарт рус.docx',
      path: '/lovable-uploads/Антикоррупционный стандарт рус.docx',
      textFilePath: {
        ru: '/lovable-uploads/anticor_txt/anticor_politics.txt',
        kz: '/lovable-uploads/anticor_txt/anticor_politics_kaz.txt'
      },
      type: 'text'
    },
    {
      id: 5,
      title: {
        ru: 'Инструкция по противодействию коррупции',
        kz: 'Сыбайлас жемқорлыққа қарсы іс-қимыл жөніндегі нұсқаулық'
      },
      fileName: 'Инструкция по противодействию коррупции для работников ГККП СМЦ рус.docx',
      path: '/lovable-uploads/Инструкция по противодействию коррупции для работников ГККП СМЦ рус.docx',
      textFilePath: {
        ru: '/lovable-uploads/anticor_txt/workers.txt',
        kz: '/lovable-uploads/anticor_txt/workers_kaz.txt'
      },
      type: 'text'
    },
    {
      id: 6,
      title: {
        ru: 'Положение о порядке информирования работников',
        kz: 'Жұмыскерлерді хабардар ету тәртібі туралы ереже'
      },
      fileName: 'Положение о порядке информирования работника о наруш рус.docx',
      path: '/lovable-uploads/Положение о порядке информирования работника о наруш рус.docx',
      textFilePath: {
        ru: '/lovable-uploads/anticor_txt/info.txt',
        kz: '/lovable-uploads/anticor_txt/info_kaz.txt'
      },
      type: 'text'
    }
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {documents.map((doc) => (
            <Card key={doc.id} className="transition-all hover:shadow-lg flex flex-col">
              <CardHeader>
                <CardTitle className="text-xl">
                  {language === 'kz' ? doc.title.kz : doc.title.ru}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                {/* Description content removed */}
              </CardContent>
              <CardFooter className="mt-auto">
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

        {/* Compliance Officer Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6 text-center">
            {language === 'ru' ? 'Комплаенс-офицер' : 'Комплаенс-офицер'}
          </h2>
          <div className="max-w-2xl mx-auto">
            <Card className="overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/3">
                  <img 
                    src="/lovable-uploads/993e1c45-5ec2-4cd7-8e96-00efe19315bd.png" 
                    alt="Тажиева Айжан Альпикызы" 
                    className="w-full h-64 md:h-full object-cover"
                  />
                </div>
                <div className="md:w-2/3 p-6">
                  <h3 className="text-xl font-semibold mb-4">
                    {language === 'ru' ? 'Тажиева Айжан Альпикызы' : 'Тажиева Айжан Альпикызы'}
                  </h3>
                  
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="font-medium">
                        {language === 'ru' ? 'Период занимаемой должности:' : 'Лауазым ұстау кезеңі:'}
                      </span>
                      <br />
                      <span className="text-gray-600">
                        {language === 'ru' ? 'с января 2025 года' : '2025 жылдың қаңтарынан бастап'}
                      </span>
                    </div>
                    
                    <div>
                      <span className="font-medium">
                        {language === 'ru' ? 'Образование:' : 'Білімі:'}
                      </span>
                      <br />
                      <span className="text-gray-600">
                        {language === 'ru' 
                          ? 'Казахский гуманитарно-юридический университет' 
                          : 'Қазақ гуманитарлық-заң университеті'
                        }
                      </span>
                    </div>
                    
                    <div>
                      <span className="font-medium">
                        {language === 'ru' ? 'Профессиональный опыт:' : 'Кәсіби тәжірибе:'}
                      </span>
                      <br />
                      <span className="text-gray-600">
                        {language === 'ru' ? '20 лет' : '20 жыл'}
                      </span>
                    </div>
                    
                    <div>
                      <span className="font-medium">
                        {language === 'ru' ? 'Контактные данные:' : 'Байланыс деректері:'}
                      </span>
                      <br />
                      <span className="text-gray-600">
                        +7 778 778 88 93
                        <br />
                        smo.compliance@mail.ru
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Document viewer dialog */}
        <Dialog open={!!selectedDocument} onOpenChange={(open) => {
          if (!open) setSelectedDocument(null);
        }}>
          <DialogContent className="max-w-4xl h-[80vh]">
            <DialogHeader>
              <DialogTitle>
                {selectedDocument && (language === 'kz' ? 
                  selectedDocument.title.kz : 
                  selectedDocument.title.ru)}
              </DialogTitle>
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
                  {formatText(documentContent)}
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
};

export default Compliance;
