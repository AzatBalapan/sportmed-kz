
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Award, Microscope, Brain, Handshake } from 'lucide-react';

export const PromoBanner: React.FC = () => {
  const { t } = useLanguage();
  
  const services = [
    { 
      icon: <Award className="w-12 h-12 text-gov-blue" />, 
      title: t('promo.professional'),
      description: {
        ru: 'Команда опытных врачей спортивной медицины',
        kz: 'Тәжірибелі спорт медицина дәрігерлерінің командасы'
      }
    },
    { 
      icon: <Microscope className="w-12 h-12 text-gov-blue" />, 
      title: t('promo.modern'),
      description: {
        ru: 'Новейшее медицинское оборудование для диагностики и лечения',
        kz: 'Диагностика және емдеу үшін ең заманауи медициналық жабдықтар'
      }
    },
    { 
      icon: <Brain className="w-12 h-12 text-gov-blue" />, 
      title: t('promo.individual'),
      description: {
        ru: 'Персонализированные программы лечения для каждого спортсмена',
        kz: 'Әр спортшыға арналған жеке емдеу бағдарламалары'
      }
    },
    { 
      icon: <Handshake className="w-12 h-12 text-gov-blue" />, 
      title: t('promo.complex'),
      description: {
        ru: 'Полный спектр медицинских услуг для спортсменов',
        kz: 'Спортшыларға арналған медициналық қызметтердің толық спектрі'
      }
    },
  ];
  
  return (
    <section id="services" className="py-16 bg-gov-light-blue">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-serif font-bold text-center text-gray-900 mb-12">
          {t('promo.title')}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="bg-white hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="mb-4 flex justify-center">{service.icon}</div>
                <h3 className="text-xl font-medium mb-3 text-center text-gov-dark-blue">{service.title}</h3>
                <p className="text-gray-600 text-center">{service.description[t('language') as 'ru' | 'kz'] || service.description.ru}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-16 bg-gov-blue rounded-lg overflow-hidden shadow-lg">
          <div className="p-8 text-center">
            <h3 className="text-2xl font-medium text-white mb-4">
              {t('language') === 'ru' ? 'Видео о нашем центре' : 'Біздің орталық туралы бейне'}
            </h3>
            <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
              <div className="w-full h-0 pt-[56.25%] bg-gray-800 relative flex items-center justify-center">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-white text-opacity-70">
                    {t('language') === 'ru' ? 'Здесь будет видео о центре' : 'Мұнда орталық туралы бейне болады'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoBanner;
