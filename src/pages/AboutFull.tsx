
import React from 'react';
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
    }
  },
];

const AboutFull: React.FC = () => {
  const { t } = useLanguage();
  const lang = t("language") as "ru" | "kz";

  // History/bio - you can refine text/translate from your translation files
  const history = {
    ru: "Государственный центр спортивной медицины был основан в 2005 году в Астане. За годы своей работы мы помогли более 5000 спортсменов обрести здоровье и достичь новых вершин. Мы внедряем современные технологии и инновационные методы реабилитации, обеспечивая высочайший уровень медицинской поддержки для профессиональных и любительских спортсменов.",
    kz: "Мемлекеттік спорттық медицина орталығы 2005 жылы Астанада құрылды. Көп жылдық қызметімізде 5000-нан астам спортшыға денсаулықтарына қол жеткізуге және жаңа биіктерді бағындыруға көмектестік. Біз заманауи технологиялар мен инновациялық оңалту әдістерін енгізіп, кәсіби және әуесқой спортшыларға жоғары деңгейдегі медициналық қолдау көрсетеміз."
  };

  const teamTitle = {
    ru: "Наша команда",
    kz: "Біздің команда"
  };

  return (
    <section className="py-16 bg-white min-h-screen section-padding animate-fade-in">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-serif font-bold text-gov-dark-blue mb-10 text-center">
          {t('about.full.title')}
        </h1>
        {/* History Section */}
        <div className="max-w-3xl mx-auto mb-16">
          <h2 className="text-2xl font-serif font-bold mb-4 text-gov-blue">{t('about.full.history')}</h2>
          <p className="text-gray-700 text-lg bg-gov-light-blue p-6 rounded-lg">
            {history[lang]}
          </p>
        </div>
        {/* Team Section */}
        <div>
          <h2 className="text-2xl font-serif font-bold mb-8 text-gov-blue">{teamTitle[lang]}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, idx) => (
              <Card key={idx} className="glass card-gradient text-center animate-fade-in">
                <CardContent className="flex flex-col items-center p-6">
                  {member.icon}
                  <div className="text-lg font-bold">{member.name[lang]}</div>
                  <div className="text-gray-600">{member.position[lang]}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutFull;
