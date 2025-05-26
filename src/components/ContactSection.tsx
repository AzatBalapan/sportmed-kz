
import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import Map from './Map';

const address = 'Куйши Дина 36А, Астана';

export const ContactSection: React.FC = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const phone = formData.get('phone') as string;
    const message = formData.get('message') as string;

    // Create mailto link with the form data
    const subject = encodeURIComponent('Обращение с сайта');
    const body = encodeURIComponent(`
Имя: ${name}
Телефон: ${phone}
Сообщение: ${message}
    `);
    
    const mailtoLink = `mailto:info@csmed.kz?subject=${subject}&body=${body}`;
    
    // Open email client
    window.location.href = mailtoLink;

    toast({
      title: "Форма отправлена",
      description: "Ваше сообщение будет отправлено через почтовый клиент",
    });

    // Reset form
    e.currentTarget.reset();
    setIsSubmitting(false);
  };

  return (
    <section id="contacts" className="py-16 bg-white">
      <div className="container mx-auto px-4">
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
                    <p className="text-gray-600">info@csmed.kz</p>
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
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        {t('register.name')}
                      </label>
                      <Input name="name" placeholder={t('register.name')} required />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        {t('contact.phone')}
                      </label>
                      <Input name="phone" placeholder="+7 (___) ___-____" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      {t('contact.message')}
                    </label>
                    <Textarea
                      name="message"
                      placeholder={t('contact.message.placeholder')}
                      rows={5}
                      required
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-gov-blue hover:bg-gov-dark-blue"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Отправка...' : t('login.button')}
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
