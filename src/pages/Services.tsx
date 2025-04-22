
import React from 'react';
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
      ru: "Современная диагностика для раннего выявления и профилактики заболеваний у спортсменов.",
      kz: "Спортшылар үшін ауруларды ерте анықтау және алдын алу үшін заманауи диагностика."
    }
  },
  {
    icon: <Heart className="text-gov-blue w-7 h-7 mb-2"/>,
    title: {
      ru: "Реабилитация после травм",
      kz: "Жарақаттан кейін оңалту"
    },
    desc: {
      ru: "Персональные программы восстановления под контролем профильных специалистов.",
      kz: "Сала мамандарының бақылауымен жекелей оңалту бағдарламалары."
    }
  },
  {
    icon: <BriefcaseMedical className="text-gov-blue w-7 h-7 mb-2"/>,
    title: {
      ru: "Консультация специалистов",
      kz: "Мамандардың кеңесі"
    },
    desc: {
      ru: "Спортивный врач, физиотерапевт, диетолог, травматолог и другие.",
      kz: "Спорт дәрігері, физиотерапевт, диетолог, травматолог және басқалары."
    }
  },
  {
    icon: <List className="text-gov-blue w-7 h-7 mb-2"/>,
    title: {
      ru: "Лабораторная и инструментальная диагностика",
      kz: "Зертханалық және аспаптық диагностика"
    },
    desc: {
      ru: "Анализы, ЭКГ, УЗИ, функциональные тесты и другие исследования.",
      kz: "Анализдер, ЭКГ, УДЗ, функционалды тесттер және басқа да зерттеулер."
    }
  },
];

const Services: React.FC = () => {
  const { t } = useLanguage();
  const lang = t("language") as "ru" | "kz";

  return (
    <section className="py-16 bg-white min-h-screen section-padding animate-fade-in">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-serif font-bold text-gov-dark-blue mb-8 text-center">{t('services.title')}</h1>
        <p className="mb-12 text-lg text-gray-700 text-center">{t('services.subtitle')}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {serviceList.map((service, idx) => (
            <Card key={idx} className="glass card-gradient animate-fade-in text-center">
              <CardContent className="flex flex-col items-center p-6">
                {service.icon}
                <h3 className="text-lg font-bold mb-1">{service.title[lang]}</h3>
                <p className="text-gray-600">{service.desc[lang]}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-gov-blue p-8 rounded-lg mt-6 shadow-lg max-w-xl mx-auto text-center">
          {/* Address and contact block */}
          <div className="flex flex-col items-center">
            <div className="flex items-center text-white mb-2">
              <span className="mr-2">🏥</span>
              <span className="font-semibold">
                {lang === 'ru' ? "Адрес:" : "Мекенжай:"} Kuishi Dina 36a, Astana
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
  );
};

export default Services;
