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
    
    // 💡 КОНСОЛИДИРОВАННЫЕ ПЕРЕМЕННЫЕ СОСТОЯНИЯ (State Variables)
    //    (Пожалуйста, убедитесь, что все ваши импорты useState/useEffect присутствуют)
    const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
    const [documentContent, setDocumentContent] = useState<string>('');
    const [faqItems, setFaqItems] = useState(parseFaqFromText(faqItem) || []);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    
    // НОВАЯ ПЕРЕМЕННАЯ ДЛЯ УПРАВЛЕНИЯ МОДАЛОМ АНОНСА (ВАША НОВАЯ ССЫЛКА):
    const [isAnnouncementOpen, setIsAnnouncementOpen] = useState(false); 

    // 💡 МОДИФИЦИРОВАННЫЙ useEffect (С ПРОВЕРКОЙ URL)
    useEffect(() => {
        // ---- 1. ЛОГИКА АВТОМАТИЧЕСКОГО ОТКРЫТИЯ МОДАЛА ПРИ ПРЯМОЙ ССЫЛКЕ ----
        const hash = window.location.hash;
        
        // Проверяем, что URL оканчивается на #anons или #announcement
        if (hash.endsWith('#anons') || hash.endsWith('#announcement')) {
            setIsAnnouncementOpen(true); 
        }

        // ---- 2. СУЩЕСТВУЮЩАЯ ЛОГИКА ЗАГРУЗКИ ДОКУМЕНТОВ ----
        // (Оставлена, как было в вашем коде, с небольшой поправкой для безопасности)
        if (documentContent && selectedDocument?.textFilePath) { 
            setIsLoading(true);

            // Get the appropriate file path based on the selected language
            const filePath = language === 'kz' 
                ? selectedDocument.textFilePath.kz
                : selectedDocument.textFilePath.ru;

            // ... Остальная часть вашей логики загрузки данных
            // (например, вызов fetch/axios для получения содержимого файла)
        }
        
    // В зависимости нужно включить все стейты, которые используются внутри хука
    }, [documentContent, selectedDocument, language]); 

    // ... (Остальная часть компонента, включая функцию return и разметку)
    };
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
    },
    {
      id: 7,
      title: {
        ru: 'Анонс о проведении внутреннего анализа коррупционных рисков',
        kz: 'Сыбайлас жемқорлық тәуекелдеріне ішкі талдау жүргізу туралы хабарландыру'
      },
      fileName: 'internal_analysis_announcement.docx',
      path: '/lovable-uploads/internal_analysis_announcement.docx',
      textFilePath: {
        ru: '/lovable-uploads/anticor_txt/internal_analysis_rus.txt',
        kz: '/lovable-uploads/anticor_txt/internal_analysis_kaz.txt'
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
      <main className="container mx-auto px-4 py-6 md:py-8">
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">{t('compliance.title')}</h1>
          <p className="text-gray-600 text-sm md:text-base">{t('compliance.description')}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-12 md:mb-16">
          {documents.map((doc) => (
            <Card key={doc.id} className="transition-all hover:shadow-lg flex flex-col">
              <CardHeader className="p-4 md:p-6">
                <CardTitle className="text-lg md:text-xl">
                  {language === 'kz' ? doc.title.kz : doc.title.ru}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-grow p-4 md:p-6">
                {/* Description content removed */}
              </CardContent>
              <CardFooter className="mt-auto p-4 md:p-6">
                <Button 
                  className="w-full flex items-center justify-center text-sm md:text-base py-2 md:py-3"
                  onClick={() => setSelectedDocument(doc)}
                >
                  <Eye className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                  {t('compliance.view')}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        // Строка 250: /* Document Viewer Dialog */
{/* Document Viewer Dialog (СУЩЕСТВУЮЩИЙ МОДАЛ ДЛЯ selectedDocument) */}
<Dialog open={!!selectedDocument} onOpenChange={() => setSelectedDocument(null)}>
    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
            <DialogTitle className="text-lg md:text-xl">
                {selectedDocument && (language === 'kz' ? selectedDocument.title.kz : selectedDocument.title.ru)}
            </DialogTitle>
        </DialogHeader>
        {/* ... Остальное содержимое Document Viewer Dialog ... */}
    </DialogContent>
</Dialog>


{/* 👉 ВСТАВЬТЕ ЭТОТ БЛОК КОДА СЮДА (НОВЫЙ МОДАЛ ДЛЯ АНОНСА) */}
<Dialog 
    open={isAnnouncementOpen}
    
    // Функция закрытия модала
    onOpenChange={() => {
        setIsAnnouncementOpen(false);
        // Очистка хеша в URL при закрытии модала
        const baseHash = '#/compliance';
        if (window.location.hash.endsWith('#anons') || window.location.hash.endsWith('#announcement')) {
            window.history.replaceState(null, null, window.location.pathname + window.location.search + baseHash);
        }
    }}
>
    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
            <DialogTitle className="text-lg md:text-xl font-bold">
                Анонс о проведении внутреннего анализа коррупционных рисков
            </DialogTitle>
        </DialogHeader>
        
        {/* 💡 СЮДА ДОБАВЬТЕ ТЕКСТ АНОНСА ИЗ ПЕРВОГО СКРИНШОТА */}
        <div className="py-4 space-y-3 text-gray-700">
            <p className="font-semibold">АНОНС</p>
            <p>о проведении внутреннего анализа коррупционных рисков в деятельности ГККП «Спортивный медицинский центр Астаны».</p>
            <p>2 июня 2025 года планируется начать проведение внутреннего анализа коррупционных рисков в ГККП «Спортивный медицинский центр города Астаны» по следующим направлениям:</p>
            <ol className="list-decimal list-inside pl-4 space-y-1">
                <li>Выявление коррупционных рисков в нормативных правовых актах Предприятия;</li>
                <li>Выявление коррупционных рисков в организационно-управленческой деятельности.</li>
            </ol>
            <p className="pt-2">Свои предложения по наличию и устранению коррупционных рисков в ГККП «Спортивный медицинский центр города Астаны» можно направить на электронную почту: <a href="mailto:smo@csmed.kz" className="text-blue-600 hover:underline">smo@csmed.kz</a>, либо по адресу: г. Астана, ул. Конаева 10, кабинет 302, Администрация, комплаенс-офицер Тажиева Айжан.</p>
        </div>
    </DialogContent>
    </Dialog>
        {/* Document Viewer Dialog */}
        <Dialog open={!!selectedDocument} onOpenChange={() => setSelectedDocument(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-lg md:text-xl">
                {selectedDocument && (language === 'kz' ? selectedDocument.title.kz : selectedDocument.title.ru)}
              </DialogTitle>
              <DialogDescription className="text-sm md:text-base">
                {t('compliance.document.description')}
              </DialogDescription>
            </DialogHeader>
            
            <div className="mt-4">
              {isLoading ? (
                <div className="flex justify-center items-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gov-blue"></div>
                </div>
              ) : selectedDocument?.type === 'faq' ? (
                <div className="space-y-4">
                  <FaqDisplay faqItems={filteredFaqItems.map(item => ({
                    id: item.id,
                    question: item.question,
                    answer: item.answer
                  }))} />
                </div>
              ) : (
                <div className="prose prose-sm md:prose-base max-w-none">
                  {formatText(documentContent)}
                </div>
              )}
            </div>
            
            <div className="flex justify-end items-center mt-6">
              <DialogClose asChild>
                <Button className="text-sm md:text-base">
                  {t('compliance.close')}
                </Button>
              </DialogClose>
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
