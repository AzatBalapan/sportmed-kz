import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/context/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Check } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from '@/components/ui/dropdown-menu';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent
} from '@/components/ui/accordion';

// Services data structure with both languages
const serviceData = {
  ru: {
    title: "Наши услуги",
    subtitle: "Медицинские услуги спортивного медицинского центра в Астане",
    sections: [
      {
        title: "Отделение спортивной медицины и медико-биологического обеспечения",
        services: [
          {
            title: "Углубленный медицинский осмотр",
            description: `Углубленный медицинский осмотр в соответствии с Приказом Министра культуры и спорта Республики Казахстан от 24 декабря 2020 года № 356 «Об утверждении правил медицинского обследования спортсменов для участия в спортивных соревнованиях»
Программа углубленного медицинского осмотра зависит от контингента лиц, занимающихся физической культурой и спортом, этапа спортивной подготовки, спортивной специализации.
Углублённое медицинское обследование спортсменов проводится с целью получения наиболее полной и всесторонней информации о физическом развитии, состоянии здоровья, а также функциональных возможностях спортсмена.
Такие обследования позволяют:
• Оценить текущее состояние здоровья и физическое развитие;
• Определить уровень физической работоспособности и адаптационные резервы организма;
• Отследить динамику изменений под влиянием тренировок и соревнований;
• Выявить факторы риска и признаки переутомления;
• Сформировать индивидуальные рекомендации по планированию тренировочного процесса, восстановлению и профилактике травм.
По итогам обследования специалисты Спортивного медицинского центра выдают официальное заключение о состоянии здоровья справку №027/у для допуска к тренировочному процессу и соревнованиям.`
          },
          {
            title: "Консультации спортсменов по заболеванию врачом спортивной медицины"
          },
          {
            title: "Медицинское обеспечение спортивных мероприятий, соревнований"
          },
          {
            title: "Антропометрия для оценки физического развития"
          },
          {
            title: "Анализ композиции состава тела на InBody570"
          },
          {
            title: "Функциональные пробы для определения общей физической работоспособности",
            description: `• Проба Мартине,
• Проба Руфье
• Гарвардский степ-тест,
• 3-х минутный бег на месте с высоким подниманием бедра,
• 3-х минутный бой с тенью`
          }
        ]
      },
      {
        title: "Отделении функциональной диагностики",
        services: [
          {
            title: "Услуги кабинета ультразвуковой диагностики:",
            description: `• УЗИ щитовидной железы
• УЗИ молочной железы
• УЗИ сердца (эхокардиография)
• УЗИ органов брюшной полости и забрюшинного пространства (печень, желчный пузырь, поджелудочная железа, селезёнка, почки)
• УЗИ забрюшинного пространства (почки, надпочечники)
• УЗИ мочевого пузыря с определением остаточной мочи
• УЗИ органов малого таза (трансабдоминально, трансвагинально)
• УЗИ мягких тканей`
          },
          {
            title: "Функциональная диагностика",
            description: `• Спирография
• ЭКГ в покое
• ЭКГ после физических нагрузок
• Суточное холтеровское мониторирование ЭКГ (ХМ ЭКГ)`
          }
        ]
      },
      {
        title: "Отделение физиотерапии, лечебной физкультуры и массажа",
        services: [
          {
            title: "Перечень услуг реабилитолога",
            description: `• Прием, консультация
• Мануально-мышечное тестирование
• Мануальная терапия (траст, Mulligan, PNF, FDM, суставные мобилизации, мягкие мануальные техники)
• Метод «Сухие иглы»
• Лечебная физкультура (кинезитерапия)
• Физиотерапия (УВТ, SIS, TR-therapy)
• Массаж (Перкуссионный массаж, вакуумный, спортивный, IASTM)
• Диагностика и лечение заболевании ОДА (суставы, позвоночник, мягкие ткани)
• Реабилитация спортивных травм
• Реабилитация после операции
• PRP`
          }
        ]
      },
      {
        title: "Отделение специалистов по профилю",
        services: [
          {
            title: "Консультация невропатолог",
            description: "Паравертебральная блокада"
          },
          {
            title: "Консультация хирурга – травматолога",
            description: `Новокаиновая блокада местная инфильтрационна. Наложение гипса при всех видах перелома. Ослабление гипсовой повязки с перевязкой. Замена гипсовой повязки. Снятие гипсовой повязки. Пункция/инъекция околосуставной сумки (1 сустав), блокада лекарствами. Закрытое вправление неосложненных вывихов конечностей. Закрытая репозиция неосложненных переломов конечностей. Пункция сустава, гематроз`
          },
          {
            title: "Консультация офтальмолога",
            description: "Определение остроты зрения через таблицу Сивцева, Головина"
          },
          {
            title: "Консультация кардиолога"
          },
          {
            title: "Консультация гинеколога"
          },
          {
            title: "Консультация эндокринолога"
          },
          {
            title: "Консультация стоматолога"
          },
          {
            title: "Консультация отоларинголога"
          }
        ]
      }
    ],
    contactBlock: {
      addressTitle: "Адрес:",
      address: "Куйши Дина 36А, Астана",
      phone: "+7 (706) 606-3636"
    }
  },
  kz: {
    title: "Біздің қызметтеріміз",
    subtitle: "Астана қаласындағы Спорттық медицина орталығы ұсынатын медициналық қызметтер",
    sections: [
      {
        title: "Спорттық медицина және медициналық-биологиялық қамтамасыз ету бөлімі",
        services: [
          {
            title: "Тереңдетілген медициналық тексеру",
            description: `Қазақстан Республикасы Мәдениет және спорт министрінің 2020 жылғы 24 желтоқсандағы №356 бұйрығына сәйкес, спорттық жарыстарға қатысу үшін спортшыларға тереңдетілген медициналық тексеру жүргізіледі.
  
  Бұл тексеру бағдарламасы адамның спортпен айналысу деңгейіне, спорттық дайындық кезеңіне және спорт түріне қарай бейімделеді. Тексеру спортшының дене дамуы, денсаулығы және функционалдық мүмкіндіктері туралы толық әрі жан-жақты ақпарат алуға мүмкіндік береді.
  
  Тереңдетілген тексерудің мақсаты:
  • Ағымдағы денсаулық жағдайы мен физикалық дамуын бағалау;
  • Жұмыс қабілеттілігі мен ағзаның бейімделу қорын анықтау;
  • Жаттығулар мен жарыстардың әсерінен болатын өзгерістерді бақылау;
  • Шаршау белгілері мен қауіп факторларын анықтау;
  • Жеке қалпына келтіру, жарақаттардың алдын алу және жаттығу процесін жоспарлау бойынша ұсынымдар беру.
  
  Тексеру нәтижесі бойынша Спорттық медицина орталығының мамандары жаттығулар мен жарыстарға қатысу үшін №027/у нысанындағы денсаулық туралы ресми қорытынды ұсынады.`
          },
          {
            title: "Ауру жағдайында спорттық медицина дәрігерінің кеңесі"
          },
          {
            title: "Спорттық іс-шаралар мен жарыстарды медициналық қамтамасыз ету"
          },
          {
            title: "Физикалық дамуды бағалау үшін антропометриялық өлшеулер"
          },
          {
            title: "InBody570 құрылғысында дене құрамын талдау"
          },
          {
            title: "Жалпы физикалық жұмыс қабілетін бағалауға арналған функционалдық сынақтар",
            description: `• Мартине сынамасы  
  • Руфье сынамасы  
  • Гарвард степ-тесті  
  • Орыннан 3 минут бойы санды жоғары көтеріп жүгіру  
  • 3 минуттық көлеңкемен бокс`
          }
        ]
      },
      {
        title: "Функционалдық диагностика бөлімі",
        services: [
          {
            title: "Ультрадыбыстық диагностика қызметтері",
            description: `• Қалқанша безінің УДЗ  
  • Сүт безінің УДЗ  
  • Жүректің УДЗ (эхокардиография)  
  • Құрсақ қуысы және ретроперитонеалды кеңістік мүшелерінің УДЗ  
  • Қуықтың қалдық зәрмен УДЗ  
  • Кіші жамбас мүшелерінің УДЗ (трансабдоминальды, трансвагинальды)  
  • Жұмсақ тіндердің УДЗ`
          },
          {
            title: "Функционалдық диагностика",
            description: `• Спирография  
  • ЭКГ (тыныштық күйінде)  
  • Жүктемеден кейінгі ЭКГ  
  • ЭКГ-нің тәуліктік Холтерлік мониторингі (ХМ ЭКГ)`
          }
        ]
      },
      {
        title: "Физиотерапия, емдік дене шынықтыру және массаж бөлімі",
        services: [
          {
            title: "Реабилитолог қызметтері",
            description: `• Қабылдау және кеңес беру  
  • Мануальды-бұлшықет тестілеуі  
  • Мануалды терапия (трасты, Mulligan, PNF, FDM, буын мобилизациясы, жұмсақ техника)  
  • Құрғақ инелер әдісі  
  • Емдік дене шынықтыру (кинезитерапия)  
  • Физиотерапия (УВТ, SIS, TR-терапия)  
  • Массаж (перкуссиялық, вакуумдық, спорттық, IASTM)  
  • Тірек-қимыл аппараты ауруларын диагностикалау және емдеу  
  • Спорттық жарақаттарды оңалту  
  • Операциядан кейінгі оңалту  
  • PRP-терапия`
          }
        ]
      },
      {
        title: "Бейіндік мамандар бөлімі",
        services: [
          {
            title: "Невропатолог кеңесі",
            description: "Паравертебральды блокада"
          },
          {
            title: "Хирург-травматолог кеңесі",
            description: `• Новокаинмен жергілікті инфильтрациялық блокада  
  • Барлық сынық түрлеріне гипс салу  
  • Гипсті босаңсыту немесе ауыстыру  
  • Буын маңындағы қапшыққа инъекция жасау  
  • Аяқ-қолдардың жеңіл шығуларын жабық түзету  
  • Жеңіл сынықтарды жабық репозициялау  
  • Буынды тесу, гематроздарды емдеу`
          },
          {
            title: "Офтальмолог кеңесі",
            description: "Сивцев және Головин кестелері арқылы көру өткірлігін анықтау"
          },
          {
            title: "Кардиолог кеңесі"
          },
          {
            title: "Гинеколог кеңесі"
          },
          {
            title: "Эндокринолог кеңесі"
          },
          {
            title: "Стоматолог кеңесі"
          },
          {
            title: "Отоларинголог кеңесі"
          }
        ]
      }
    ],
    contactBlock: {
      addressTitle: "Мекенжайы:",
      address: "Астана қаласы, Күйші Дина көшесі, 36А",
      phone: "+7 (706) 606-3636"
    }
  }
  
};

const Services: React.FC = () => {
  const { language } = useLanguage();
  const lang = language as "ru" | "kz";
  const data = serviceData[lang];

  return (
    <>
      <Header />
      <section className="py-8 md:py-16 bg-gov-light-blue min-h-screen section-padding animate-fade-in">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl md:text-4xl font-serif font-bold text-gov-dark-blue mb-4 md:mb-8 text-center">
            {data.title}
          </h1>
          <p className="mb-6 md:mb-10 text-base md:text-lg text-gray-700 text-center max-w-2xl mx-auto">{data.subtitle}</p>
          
          {/* Department Sections */}
          {data.sections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="mb-8 md:mb-16">
              <h2 className="text-xl md:text-2xl font-serif font-bold text-gov-blue mb-4 md:mb-6 border-b-2 border-gov-blue pb-2">
                {section.title}
              </h2>
              <div className="space-y-4 md:space-y-8">
                {section.services.map((service, serviceIndex) => {
                  // Detect if the description contains multiple options (lines starting with •, -, or similar)
                  const hasOptions = service.description && /(^|\n)[•\-]/.test(service.description);
                  let options = [];
                  if (hasOptions) {
                    options = service.description
                      .split(/\n|\r/)
                      .filter(line => line.trim().match(/^[•\-]/))
                      .map(line => line.replace(/^[^\wа-яА-ЯёЁіІңҢғҒүҮұҰқҚөӨһҺәӘыіІ0-9]+/, '').replace(/\.{2,}/g, '.'));
                  }
                  return (
                    <Card key={serviceIndex} className="bg-white/90 shadow hover:shadow-md transition-shadow">
                      <CardContent className="p-4 md:p-6">
                        <div className="flex items-start">
                          <Check className="text-gov-blue flex-shrink-0 mt-1 mr-2 md:mr-3 w-4 h-4 md:w-5 md:h-5" />
                          <div>
                            <h3 className="text-base md:text-lg font-medium text-gov-dark-blue">{service.title}</h3>
                            {service.description && (
                              hasOptions ? (
                                <ul className="list-disc pl-6 md:pl-8 text-sm md:text-base text-gray-600 space-y-1 md:space-y-2 mt-2">
                                  {options.map((option, idx) => (
                                    <li key={idx}>{option}</li>
                                  ))}
                                </ul>
                              ) : (
                                <div className="mt-2 text-sm md:text-base text-gray-600 whitespace-pre-line">
                                  {service.description.replace(/\.{2,}/g, '.')}
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          ))}
          
          {/* Contact Information */}
          <div className="bg-gov-blue p-6 md:p-8 rounded-lg mt-8 md:mt-12 shadow-lg max-w-xl mx-auto text-center">
            <div className="flex flex-col items-center">
              <div className="flex items-center text-white mb-2 text-sm md:text-base">
                <span className="mr-2">🏥</span>
                <span className="font-semibold">
                  {data.contactBlock.addressTitle} {data.contactBlock.address}
                </span>
              </div>
              <div className="flex items-center text-white text-sm md:text-base">
                <span className="mr-2">📞</span>
                <span>{data.contactBlock.phone}</span>
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
