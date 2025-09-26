import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Toaster } from '@/components/ui/toaster';
import ScrollToTop from '@/components/ScrollToTop';
import { Table, TableBody, TableRow, TableCell } from "@/components/ui/table";
import { ExternalLink } from "lucide-react";

const LegalActs: React.FC = () => {
  const { language } = useLanguage();

  const legalActs = [
    {
      id: 1,
      titleRu: "О физической культуре и спорте",
      titleKz: "Дене шынықтыру және спорт туралы",
      urlRus: "https://adilet.zan.kz/rus/docs/Z1400000228",
      urlKaz: "https://adilet.zan.kz/kaz/docs/Z1400000228"
    },
    {
      id: 2,
      titleRu: "О ЗДОРОВЬЕ НАРОДА И СИСТЕМЕ ЗДРАВООХРАНЕНИЯ",
      titleKz: "ХАЛЫҚ ДЕНСАУЛЫҒЫ ЖӘНЕ ДЕНСАУЛЫҚ САҚТАУ ЖҮЙЕСІ ТУРАЛЫ",
      urlRus: "https://adilet.zan.kz/rus/docs/K2000000360",
      urlKaz: "https://adilet.zan.kz/kaz/docs/K2000000360"
    },
    {
      id: 3,
      titleRu: "О государственных закупках",
      titleKz: "Мемлекеттік сатып алулар туралы",
      urlRus: "https://adilet.zan.kz/rus/docs/Z2400000106",
      urlKaz: "https://adilet.zan.kz/kaz/docs/Z2400000106"
    },
    {
      id: 4,
      titleRu: "О системе оплаты труда гражданских служащих, работников организаций, содержащихся за счет средств государственного бюджета, работников казенных предприятий",
      titleKz: "Азаматтық қызметшілердің, мемлекеттік бюджет қаражаты есебінен ұсталатын ұйымдар қызметкерлерінің, қазыналық кәсіпорындар қызметкерлерінің еңбегіне ақы төлеу жүйесі туралы",
      urlRus: "https://adilet.zan.kz/rus/docs/P1500001193",
      urlKaz: "https://adilet.zan.kz/kaz/docs/P1500001193"
    },
    {
      id: 5,
      titleRu: "Об утверждении правил медицинского обследования спортсменов для участия в спортивных соревнованиях",
      titleKz: "Спорттық жарыстарға қатысу үшін спортшыларды медициналық тексеру қағидаларын бекіту туралы",
      urlRus: "https://adilet.zan.kz/rus/docs/V2000021902",
      urlKaz: "https://adilet.zan.kz/kaz/docs/V2000021902"
    },
    {
      id: 6,
      titleRu: "Об утверждении структуры организации спортивной медицины и положения об их деятельности",
      titleKz: "Спорттық медицина ұйымдарының құрылымын және олардың қызметі туралы ережені бекіту туралы",
      urlRus: "https://adilet.zan.kz/rus/docs/V1400010020",
      urlKaz: "https://adilet.zan.kz/kaz/docs/V1400010020"
    },
    {
      id: 7,
      titleRu: "Об утверждении правил медицинского обеспечения и оказания медицинской помощи спортсменам и тренерам при проведении спортивных мероприятий, в период восстановительных мероприятий после интенсивных физических нагрузок, заболеваний и травм у спортсменов",
      titleKz: "Спорт іс-шараларын өткізу кезінде, спортшылардың қарқынды дене жүктемелерінен, ауруларынан және жарақаттарынан кейінгі қалпына келтіру іс-шаралары кезеңінде спортшылар мен жаттықтырушыларды медициналық қамтамасыз ету және оларға медициналық көмеk көрсету қағидаларын бекіту туралы",
      urlRus: "https://adilet.zan.kz/rus/docs/V2000021943",
      urlKaz: "https://adilet.zan.kz/kaz/docs/V2000021943"
    },
    {
      id: 8,
      titleRu: "Об утверждении Правил формирования составов сборных и штатных сборных команд Республики Казахстан по видам спорта (национальных сборных команд по видам спорта)",
      titleKz: "Қазақстан Республикасының спорт түрлері бойынша құрама және штаттық құрама командаларының (спорт түрлері бойынша ұлттық құрама командалардың) құрамдарын қалыптастыру қағидаларын бекіту туралы",
      urlRus: "https://adilet.zan.kz/rus/docs/V1400009682",
      urlKaz: "https://adilet.zan.kz/kaz/docs/V1400009682"
    },
    {
      id: 9,
      titleRu: "О государственном имуществе",
      titleKz: "Мемлекеттік мүлік туралы",
      urlRus: "https://adilet.zan.kz/rus/docs/Z1100000413",
      urlKaz: "https://adilet.zan.kz/kaz/docs/Z1100000413"
    },
    {
      id: 10,
      titleRu: "Об утверждении спортивной этики Республики Казахстан",
      titleKz: "Қазақстан Республикасының спорттық әдебін бекіту туралы",
      urlRus: "https://adilet.zan.kz/rus/docs/V2000020083",
      urlKaz: "https://adilet.zan.kz/kaz/docs/V2000020083"
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
        <div className="container mx-auto px-4 py-8 md:py-12">
          <h1 className="text-2xl md:text-4xl font-serif font-bold text-center mb-6 md:mb-8">
            {language === 'ru' ? 'Нормативные правовые акты' : 'Нормативтік құқықтық құжаттар'}
          </h1>

          <div className="bg-white rounded-lg shadow p-4 md:p-6">
            <Table>
              <TableBody>
                {legalActs.map((act) => (
                  <TableRow key={act.id} className="hover:bg-gray-100">
                    <TableCell className="py-3 md:py-4">
                      <a 
                        href={getUrl(act)} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center text-blue-600 hover:text-blue-800 hover:underline transition-colors text-sm md:text-base"
                      >
                        <span className="flex-1">{getTitle(act)}</span>
                        <ExternalLink className="ml-2 h-3 w-3 md:h-4 md:w-4 flex-shrink-0" />
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
      <Toaster />
    </div>
  );
};

export default LegalActs;
