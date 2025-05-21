
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Toaster } from '@/components/ui/toaster';
import ScrollToTop from '@/components/ScrollToTop';
import SocialLinks from '@/components/SocialLinks';

const Director: React.FC = () => {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-serif font-bold text-center mb-8">
            {language === 'ru' ? 'Руководитель центра' : 'Орталық басшысы'}
          </h1>

          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
            <div className="md:w-1/3">
              <div className="rounded-lg overflow-hidden h-auto">
                <img 
                  src="/lovable-uploads/81bf838b-f931-4d9a-92a3-34bbbc98046e.png" 
                  alt="Нурматов Азамат Басимбекович" 
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>

            <div className="md:w-2/3">
              <h2 className="text-2xl font-serif font-bold mb-2">Нурматов Азамат Басимбекович</h2>
              <p className="text-xl text-gov-blue mb-6">
                {language === 'ru' ? 'Руководитель' : 'Басшы'}
              </p>

              <div className="prose max-w-none">
                <p className="mb-4">
                  {language === 'ru' 
                    ? 'Нурматов Азамат Басимбекович является руководителем Спортивного Медицинского Центра Астаны. Под его руководством центр стал ведущим учреждением в области спортивной медицины в Казахстане.'
                    : 'Нурматов Азамат Басимбекович Астананың Спорт медициналық орталығының басшысы болып табылады. Оның басшылығымен орталық Қазақстандағы спорт медицинасы саласындағы жетекші мекемеге айналды.'}
                </p>
                
                <p>
                  {language === 'ru'
                    ? 'Благодаря его профессиональному опыту и знаниям в области спортивной медицины, центр обеспечивает высококачественную медицинскую поддержку для спортсменов всех уровней. Под его руководством внедряются новейшие технологии и методики для диагностики, лечения и реабилитации спортсменов.'
                    : 'Оның спорт медицинасы саласындағы кәсіби тәжірибесі мен білімінің арқасында орталық барлық деңгейдегі спортшыларға жоғары сапалы медициналық көмек көрсетеді. Оның басшылығымен спортшыларды диагностикалау, емдеу және оңалту үшін ең жаңа технологиялар мен әдістер енгізілуде.'}
                </p>
              </div>
            </div>
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

export default Director;
