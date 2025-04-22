
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

export const ContactSection: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <section id="contacts" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-serif font-bold text-center text-gray-900 mb-12">
          {t('contact.title')}
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <div className="bg-gray-100 rounded-lg p-8 h-full">
              <h3 className="text-2xl font-serif font-bold mb-6">
                {t('language') === 'ru' ? 'Наши контакты' : 'Біздің байланыстар'}
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="mr-4 text-gov-blue text-xl">📍</div>
                  <div>
                    <h4 className="font-medium text-lg">{t('contact.address')}</h4>
                    <p className="text-gray-600">{t('contact.address.value')}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mr-4 text-gov-blue text-xl">📞</div>
                  <div>
                    <h4 className="font-medium text-lg">{t('contact.phone')}</h4>
                    <p className="text-gray-600">+7 (777) 123-4567</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mr-4 text-gov-blue text-xl">✉️</div>
                  <div>
                    <h4 className="font-medium text-lg">{t('contact.email')}</h4>
                    <p className="text-gray-600">info@sportmed.kz</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mr-4 text-gov-blue text-xl">🕒</div>
                  <div>
                    <h4 className="font-medium text-lg">{t('contact.hours')}</h4>
                    <p className="text-gray-600">{t('contact.hours.value')}</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <div className="w-full h-64 bg-gray-300 rounded-lg">
                  {/* Map will be integrated here */}
                  <div className="w-full h-full flex items-center justify-center text-gray-500">
                    {t('language') === 'ru' ? 'Карта местоположения' : 'Орналасу картасы'}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-2xl font-serif font-bold mb-6">
                  {t('language') === 'ru' ? 'Напишите нам' : 'Бізге жазыңыз'}
                </h3>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        {t('language') === 'ru' ? 'Имя' : 'Аты'}
                      </label>
                      <Input placeholder={t('language') === 'ru' ? 'Ваше имя' : 'Сіздің атыңыз'} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        {t('language') === 'ru' ? 'Телефон' : 'Телефон'}
                      </label>
                      <Input placeholder="+7 (___) ___-____" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      {t('language') === 'ru' ? 'Электронная почта' : 'Электрондық пошта'}
                    </label>
                    <Input placeholder="example@email.com" type="email" />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      {t('language') === 'ru' ? 'Сообщение' : 'Хабарлама'}
                    </label>
                    <Textarea 
                      placeholder={t('language') === 'ru' ? 'Ваше сообщение...' : 'Сіздің хабарламаңыз...'}
                      rows={5} 
                    />
                  </div>
                  
                  <Button className="w-full bg-gov-blue hover:bg-gov-dark-blue">
                    {t('language') === 'ru' ? 'Отправить сообщение' : 'Хабарлама жіберу'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
