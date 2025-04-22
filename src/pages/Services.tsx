
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/context/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { BriefcaseMedical, Heart, List, Check } from 'lucide-react';

const serviceList = [
  {
    icon: <Check className="text-gov-blue w-7 h-7 mb-2"/>,
    title: {
      ru: "Комплексное медицинское обследование (Check-Up)",
      kz: "Кешенді медициналық тексеру (Check-Up)"
    },
    desc: {
      ru: "Современная диагностика для раннего выявления и профилактики заболеваний у спортсменов и любителей. Глубокий анализ и индивидуальные рекомендации для повышения качества вашей жизни.",
      kz: "Спортшылар мен әуесқойлар үшін ауруларды ерте анықтау және алдын алу үшін заманауи диагностика. Сапаны арттыру және салауатты өмір үшін терең талдау мен жеке ұсыныстар."
    }
  },
  {
    icon: <Heart className="text-gov-blue w-7 h-7 mb-2"/>,
    title: {
      ru: "Реабилитация после травм",
      kz: "Жарақаттан кейін оңалту"
    },
    desc: {
      ru: "Персональные программы восстановления под контролем профильных специалистов. Используем современные физиотерапевтические подходы и инновационное оборудование.",
      kz: "Сала мамандарының жеке бақылауындағы оңалту бағдарламалары. Қазіргі физиотерапиялық әдістер мен инновациялық жабдық қолданылады."
    }
  },
  {
    icon: <BriefcaseMedical className="text-gov-blue w-7 h-7 mb-2"/>,
    title: {
      ru: "Консультация специалистов",
      kz: "Мамандардың кеңесі"
    },
    desc: {
      ru: "Профессиональные советы и диагностика от опытных врачей: спортивный медик, физиотерапевт, травматолог, диетолог и другие.",
      kz: "Тәжірибелі дәрігерлердің кәсіби кеңестері мен диагностикасы: спорт дәрігері, физиотерапевт, травматолог, диетолог және басқалар."
    }
  },
  {
    icon: <List className="text-gov-blue w-7 h-7 mb-2"/>,
    title: {
      ru: "Лабораторная и инструментальная диагностика",
      kz: "Зертханалық және аспаптық диагностика"
    },
    desc: {
      ru: "Анализы крови, ЭКГ, УЗИ, функциональные тесты и современные методы исследования.",
      kz: "Қан талдауы, ЭКГ, УДЗ, функционалды тесттер және заманауи зерттеу тәсілдері."
    }
  },
];

const blocks = {
  ru: {
    subtitle: "Все услуги центра спортивной медицины СпортМед в Астане. Качество, профессионализм и индивидуальный подход для каждого.",
    extended: `
Мы предлагаем полный спектр медицинских услуг для профессиональных и любительских спортсменов: от базовой консультации, всесторонней диагностики, до восстановления после травм и индивидуальных программ сопровождения.

— Медицинское обследование (Check-Up)
— Реабилитация и физиотерапия
— Диагностика и лабораторные исследования (анализы, функциональные тесты, ЭКГ, УЗИ)
— Советы по питанию и режиму тренировок
— Ведение спортсмена на всех этапах подготовки

Наша команда включает опытных специалистов с большим стажем. Используем только современные, доказанные методы восстановления и подготовки.
    `,
    addressTitle: "Адрес:",
    address: "Kuishi Dina 36a, Астана"
  },
  kz: {
    subtitle: "Астанадағы СпортМед спорттық медицина орталығының барлық қызметтері. Әрбір науқасқа дара көзқарас және кәсіпқойлық.",
    extended: `
Біз кәсіби және әуесқой спортшыларға арналған барлық медициналық қызметті ұсынамыз: алғашқы кеңес, жан-жақты диагностика, оңалту және жеке оңалту бағдарламалары.

— Медициналық тексеру (Check-Up)
— Оңалту және физиотерапия
— Диагностика және зертханалық талдаулар (анализдер, функционалды тесттер, ЭКГ, УДЗ)
— Тамақтану мен жаттығу режимі бойынша кеңес
— Дайындық кезеңдерінде толық қолдау

Біздің командада мол тәжірибелі мамандар. Біз тек заманауи әрі ғылыми түрде дәлелденген оңалту мен дайындық әдістерін қолданамыз.
    `,
    addressTitle: "Мекенжай:",
    address: "Kuishi Dina 36a, Астана"
  }
};

const Services: React.FC = () => {
  const { t } = useLanguage();
  const lang = t("language") as "ru" | "kz";

  return (
    <>
      <Header />
      <section className="py-16 bg-gov-light-blue min-h-screen section-padding animate-fade-in">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-serif font-bold text-gov-dark-blue mb-8 text-center">{t('services.title')}</h1>
          <p className="mb-10 text-lg text-gray-700 text-center max-w-2xl mx-auto">{blocks[lang].subtitle}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {serviceList.map((service, idx) => (
              <Card key={idx} className="glass card-gradient animate-fade-in text-center h-full">
                <CardContent className="flex flex-col items-center p-6 h-full">
                  {service.icon}
                  <h3 className="text-lg font-bold mb-1">{service.title[lang]}</h3>
                  <p className="text-gray-600">{service.desc[lang]}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="max-w-3xl mx-auto mb-16 bg-white/80 p-8 rounded-lg shadow">
            <pre className="whitespace-pre-line text-gray-700 text-lg">{blocks[lang].extended}</pre>
          </div>
          
          <div className="bg-gov-blue p-8 rounded-lg mt-6 shadow-lg max-w-xl mx-auto text-center">
            {/* Address and contact block */}
            <div className="flex flex-col items-center">
              <div className="flex items-center text-white mb-2">
                <span className="mr-2">🏥</span>
                <span className="font-semibold">
                  {blocks[lang].addressTitle} {blocks[lang].address}
                </span>
              </div>
              <div className="flex items-center text-white">
                <span className="mr-2">📞</span>
                <span>{t('contact.phone.value')}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Services;
