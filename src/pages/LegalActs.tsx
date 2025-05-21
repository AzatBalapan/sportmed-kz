
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Toaster } from '@/components/ui/toaster';
import ScrollToTop from '@/components/ScrollToTop';
import SocialLinks from '@/components/SocialLinks';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Table, TableBody, TableRow, TableCell } from "@/components/ui/table";
import { ExternalLink } from "lucide-react";

const LegalActs: React.FC = () => {
  const { language } = useLanguage();

  const legalActs = [
    {
      id: 1,
      titleRu: "Об обязательном социальном медицинском страховании",
      titleKz: "Міндетті әлеуметтік медициналық сақтандыру туралы",
      urlRus: "https://adilet.zan.kz/rus/docs/Z1400000228",
      urlKaz: "https://adilet.zan.kz/kaz/docs/Z1400000228"
    },
    {
      id: 2,
      titleRu: "Кодекс РК «О здоровье народа и системе здравоохранения»",
      titleKz: "Қазақстан Республикасының «Халық денсаулығы және денсаулық сақтау жүйесі туралы» кодексі",
      urlRus: "https://adilet.zan.kz/rus/docs/K2000000360",
      urlKaz: "https://adilet.zan.kz/kaz/docs/K2000000360"
    },
    {
      id: 3,
      titleRu: "Закон РК «О доступе к информации»",
      titleKz: "Ақпаратқа қол жеткізу туралы Қазақстан Республикасының Заңы",
      urlRus: "https://adilet.zan.kz/rus/docs/Z2400000106",
      urlKaz: "https://adilet.zan.kz/kaz/docs/Z2400000106"
    },
    {
      id: 4,
      titleRu: "О социально-медицинском обеспечении ветеранов, лиц, приравненных по льготам и гарантиям к ветеранам, и членов семей погибших военнослужащих",
      titleKz: "Ардагерлерді, ардагерлерге теңестірілген адамдарды және қаза тапқан әскери қызметшілердің отбасы мүшелерін әлеуметтік-медициналық қамтамасыз ету туралы",
      urlRus: "https://adilet.zan.kz/rus/docs/P1500001193",
      urlKaz: "https://adilet.zan.kz/kaz/docs/P1500001193"
    },
    {
      id: 5,
      titleRu: "Об утверждении правил оказания первичной медико-санитарной помощи",
      titleKz: "Алғашқы медициналық-санитариялық көмек көрсету қағидаларын бекіту туралы",
      urlRus: "https://adilet.zan.kz/rus/docs/V2000021902",
      urlKaz: "https://adilet.zan.kz/kaz/docs/V2000021902"
    },
    {
      id: 6,
      titleRu: "Об утверждении Правил выплаты пособий на оздоровление государственным служащим, в том числе сотрудникам правоохранительных органов, государственным служащим, содержащимся за счет государственного бюджета, военнослужащим, судьям, а также работникам казенных предприятий",
      titleKz: "Мемлекеттік қызметшілерге, оның ішінде құқық қорғау органдарының қызметкерлеріне, мемлекеттік бюджет есебінен ұсталатын мемлекеттік қызметшілерге, әскери қызметшілерге, судьяларға, сондай-ақ қазыналық кәсіпорындардың қызметкерлеріне сауықтыру жәрдемақысын төлеу қағидаларын бекіту туралы",
      urlRus: "https://adilet.zan.kz/rus/docs/V1400010020",
      urlKaz: "https://adilet.zan.kz/kaz/docs/V1400010020"
    },
    {
      id: 7,
      titleRu: "Об утверждении Правил прикрепления к организациям здравоохранения, оказывающим первичную медико-санитарную помощь",
      titleKz: "Алғашқы медициналық-санитариялық көмек көрсететін денсаулық сақтау ұйымдарына бекіту қағидаларын бекіту туралы",
      urlRus: "https://adilet.zan.kz/rus/docs/V2000021943",
      urlKaz: "https://adilet.zan.kz/kaz/docs/V2000021943"
    },
    {
      id: 8,
      titleRu: "Об утверждении квалификационных характеристик должностей работников здравоохранения",
      titleKz: "Денсаулық сақтау қызметкерлері лауазымдарының біліктілік сипаттамаларын бекіту туралы",
      urlRus: "https://adilet.zan.kz/rus/docs/V1400009682",
      urlKaz: "https://adilet.zan.kz/kaz/docs/V1400009682"
    },
    {
      id: 9,
      titleRu: "О пенсионном обеспечении в Республике Казахстан",
      titleKz: "«Қазақстан Республикасында зейнетақымен қамсыздандыру туралы»",
      urlRus: "https://adilet.zan.kz/rus/docs/Z1100000413",
      urlKaz: "https://adilet.zan.kz/kaz/docs/Z1100000413"
    }
  ];

  const getTitle = (act: any) => {
    return language === 'kz' ? act.titleKz : act.titleRu;
  };

  const getUrl = (act: any) => {
    return language === 'kz' ? act.urlKaz : act.urlRus;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-serif font-bold text-center mb-8">
            {language === 'ru' ? 'Нормативные правовые акты' : 'Нормативтік құқықтық құжаттар'}
          </h1>

          <div className="bg-white rounded-lg shadow p-6">
            <Table>
              <TableBody>
                {legalActs.map((act) => (
                  <TableRow key={act.id} className="hover:bg-gray-100">
                    <TableCell className="py-4">
                      <a 
                        href={getUrl(act)} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                      >
                        {getTitle(act)}
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </main>
      <Footer />
      <ScrollToTop />
      <SocialLinks />
      <Toaster />
    </div>
  );
};

export default LegalActs;
