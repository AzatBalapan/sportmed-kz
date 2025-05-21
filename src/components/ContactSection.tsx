
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import Map from './Map';

const address = 'Куйши Дина 36А, Астана';

export const ContactSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="contacts" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Removed duplicate title here */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <div className="bg-gray-100 rounded-lg p-8 h-full">
              <h3 className="text-2xl font-serif font-bold mb-6">
                {t('contact.information')}
              </h3>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="mr-4 text-gov-blue text-xl">📍</div>
                  <div>
                    <h4 className="font-medium text-lg">{t('contact.address')}</h4>
                    <p className="text-gray-600">{address}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="mr-4 text-gov-blue text-xl">📞</div>
                  <div>
                    <h4 className="font-medium text-lg">{t('contact.phone')}</h4>
                    <p className="text-gray-600">{t('contact.phone.value')}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="mr-4 text-gov-blue text-xl">✉️</div>
                  <div>
                    <h4 className="font-medium text-lg">{t('contact.email')}</h4>
                    <p className="text-gray-600">{t('contact.email.value')}</p>
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
                <Map />
              </div>
            </div>
          </div>

          <div>
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-2xl font-serif font-bold mb-6">
                  {t('contact.form')}
                </h3>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        {t('register.name')}
                      </label>
                      <Input placeholder={t('register.name')} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        {t('contact.phone')}
                      </label>
                      <Input placeholder="+7 (___) ___-____" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      {t('contact.email')}
                    </label>
                    <Input placeholder={t('contact.email')} type="email" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      {t('contact.message')}
                    </label>
                    <Textarea
                      placeholder={t('contact.message.placeholder')}
                      rows={5}
                    />
                  </div>
                  <Button className="w-full bg-gov-blue hover:bg-gov-dark-blue">
                    {t('login.button')}
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
