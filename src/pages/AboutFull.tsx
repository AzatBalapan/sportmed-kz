
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/context/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Award, Book } from 'lucide-react';

const team = [
  {
    icon: <Users className="text-gov-accent w-8 h-8 mb-2"/>,
    name: {
      ru: "Др. Айтжанова Айдана",
      kz: "Др. Айтжанова Айдана"
    },
    position: {
      ru: "Главный врач",
      kz: "Бас дәрігер"
    },
    desc: {
      ru: "Более 20 лет опыта в спортивной медицине и реабилитации. Руководитель центра.",
      kz: "20 жылдан астам спорттық медицина және оңалту тәжірибесі бар. Орталық басшысы."
    }
  },
  {
    icon: <Award className="text-gov-accent w-8 h-8 mb-2"/>,
    name: {
      ru: "Кулсеитова Назира",
      kz: "Күлсейітова Назира"
    },
    position: {
      ru: "Врач-реабилитолог",
      kz: "Реабилитолог дәрігер"
    },
    desc: {
      ru: "Специалист по восстановлению спортсменов после травм и операций.",
      kz: "Жарақат пен операциядан кейін спортшыларды оңалту саласының маманы."
    }
  },
  {
    icon: <Book className="text-gov-accent w-8 h-8 mb-2"/>,
    name: {
      ru: "Сулейменов Арман",
      kz: "Сүлейменов Арман"
    },
    position: {
      ru: "Спортивный физиотерапевт",
      kz: "Спорт физиотерапевті"
    },
    desc: {
      ru: "Разрабатывает индивидуальные реабилитационные программы для спортсменов.",
      kz: "Спортшыларға арналған жеке оңалту бағдарламаларын жасайды."
    }
  },
];

const aboutContent = {
  ru: {
    historyTitle: 'История центра',
    history: `
Государственный центр спортивной медицины был основан в 2005 году в Астане как первый специализированный центр для профессиональных и любительских спортсменов. 
Наша миссия – создавать условия для эффективной реабилитации и возвращения к высоким результатам после травм и перегрузок.

За годы работы специалисты центра помогли более 5000 спортсменам достичь новых высот. Мы внедряем инновационные методы диагностики и реабилитации, постоянно повышая квалификацию нашей команды. 

Главные ценности — индивидуальный подход, профессионализм и использование современных технологий.

Наши пациенты – национальные сборные, олимпийцы, молодежные и детские команды, а также все кто заботится о своем здоровье и физическом развитии.
    `,
    teamTitle: "Наша команда",
    decorBlock: [
      '• Индивидуальный подход к каждому пациенту',
      '• Только современные и безопасные методы лечения',
      '• Комплексная диагностика и сопровождение на всех этапах восстановления',
    ]
  },
  kz: {
    historyTitle: 'Орталық тарихы',
    history: `
Мемлекеттік спорттық медицина орталығы 2005 жылы Астанада алғаш мамандандырылған орталық ретінде құрылды.
Біздің мақсатымыз – кәсіби және әуесқой спортшыларға жарақат пен күш түсуден кейін тиімді оңалту мен үлкен нәтижелерге оралуға жағдай жасау.

Орталық мамандары мыңдаған спортшыға жаңа биікке жетуге көмектесті. Біз инновациялық диагностика және оңалту әдістерін енгіземіз, ұжымымыз үнемі кәсіби біліктілігін арттырып отырады.

Басты құндылықтарымыз – дара көзқарас, кәсіпқойлық және заманауи технологиялар.

Біздің пациенттеріміз – ұлттық құрамалар, олимпиадашылар, жастар және балалар командалары, сондай‑ақ денсаулығына және дене дамуына көңіл бөлетін жандар.
    `,
    teamTitle: "Біздің команда",
    decorBlock: [
      '• Әр пациентке жеке көзқарас',
      '• Тек заманауи әрі қауіпсіз емдеу әдістері',
      '• Кешенді диагностика және оңалту кезеңдерінде толық қолдау',
    ]
  }
};

const AboutFull: React.FC = () => {
  const { language } = useLanguage();
  const lang = language as "ru" | "kz";

  return (
    <>
      <Header />
      <section className="py-16 bg-gov-light-blue min-h-screen section-padding animate-fade-in">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-serif font-bold text-gov-dark-blue mb-10 text-center">
            {language === 'ru' ? 'О нашем центре' : 'Біздің орталық туралы'}
          </h1>
          {/* History Section */}
          <div className="max-w-3xl mx-auto mb-12">
            <h2 className="text-2xl font-serif font-bold mb-4 text-gov-blue">{aboutContent[lang].historyTitle}</h2>
            <p className="text-gray-700 text-lg bg-white/70 p-6 rounded-lg shadow-md leading-relaxed">
              {aboutContent[lang].history}
            </p>
          </div>
          <div className="max-w-2xl mx-auto mb-12 bg-white/80 p-6 rounded-lg">
            <ul className="list-disc text-lg pl-4 space-y-2 text-gov-blue">
              {aboutContent[lang].decorBlock.map((v, i) => (
                <li key={i}>{v}</li>
              ))}
            </ul>
          </div>
          {/* Team Section */}
          <div>
            <h2 className="text-2xl font-serif font-bold mb-8 text-gov-blue">{aboutContent[lang].teamTitle}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {team.map((member, idx) => (
                <Card key={idx} className="glass card-gradient text-center animate-fade-in">
                  <CardContent className="flex flex-col items-center p-6">
                    {member.icon}
                    <div className="text-lg font-bold">{member.name[lang]}</div>
                    <div className="text-gray-600 mb-2">{member.position[lang]}</div>
                    <div className="text-gray-500 text-sm">{member.desc[lang]}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default AboutFull;
