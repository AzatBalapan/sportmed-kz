
import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Map from './Map';
import FaqDisplay from './FaqDisplay';
import { parseFaqFromText, FaqItem } from '@/utils/faqParser';

const address = 'Куйши Дина 36А, Астана';

export const ContactSection: React.FC = () => {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [faqItems, setFaqItems] = useState<FaqItem[]>([]);

  // Load FAQ content
  useEffect(() => {
    fetch('/lovable-uploads/anticor_txt/questions.txt')
      .then(response => response.text())
      .then(text => {
        setFaqItems(parseFaqFromText(text));
      })
      .catch(error => {
        console.error('Error loading FAQ:', error);
      });
  }, []);

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

  // Filter FAQ items by current language
  const filteredFaqItems = faqItems.filter(item => 
    language === 'ru' ? item.language === 'ru' : item.language === 'kz'
  );

  return (
    <section id="contacts" className="py-8 sm:py-12 md:py-16 bg-white">
      <div className="container mx-auto px-4">
        <Tabs defaultValue="contacts" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6 sm:mb-8">
            <TabsTrigger value="contacts" className="text-sm sm:text-base">
              {language === 'ru' ? 'Контакты' : 'Байланыстар'}
            </TabsTrigger>
            <TabsTrigger value="faq" className="text-sm sm:text-base">
              {language === 'ru' ? 'Часто задаваемые вопросы' : 'Жиі қойылатын сұрақтар'}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="contacts">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
              <div className="order-2 lg:order-1">
                <div className="bg-gray-100 rounded-lg p-4 sm:p-6 md:p-8 h-full">
                  <h3 className="text-xl sm:text-2xl font-serif font-bold mb-4 sm:mb-6">
                    {t('contact.information')}
                  </h3>

                  <div className="space-y-4 sm:space-y-6">
                    <div className="flex items-start">
                      <div className="mr-3 sm:mr-4 text-gov-blue text-lg sm:text-xl">📍</div>
                      <div>
                        <h4 className="font-medium text-base sm:text-lg">{t('contact.address')}</h4>
                        <p className="text-sm sm:text-base text-gray-600">{address}</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="mr-3 sm:mr-4 text-gov-blue text-lg sm:text-xl">📞</div>
                      <div>
                        <h4 className="font-medium text-base sm:text-lg">{t('contact.phone')}</h4>
                        <p className="text-sm sm:text-base text-gray-600">{t('contact.phone.value')}</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="mr-3 sm:mr-4 text-gov-blue text-lg sm:text-xl">✉️</div>
                      <div>
                        <h4 className="font-medium text-base sm:text-lg">{t('contact.email')}</h4>
                        <p className="text-sm sm:text-base text-gray-600">info@csmed.kz</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="mr-3 sm:mr-4 text-gov-blue text-lg sm:text-xl">🕒</div>
                      <div>
                        <h4 className="font-medium text-base sm:text-lg">{t('contact.hours')}</h4>
                        <p className="text-sm sm:text-base text-gray-600">{t('contact.hours.value')}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 sm:mt-8">
                    <Map />
                  </div>
                </div>
              </div>

              <div className="order-1 lg:order-2">
                <Card>
                  <CardContent className="p-4 sm:p-6">
                    <h3 className="text-xl sm:text-2xl font-serif font-bold mb-4 sm:mb-6">
                      {t('contact.form')}
                    </h3>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
          </TabsContent>
          
          <TabsContent value="faq">
            <div className="max-w-4xl mx-auto">
              <h3 className="text-xl sm:text-2xl font-serif font-bold mb-4 sm:mb-6">
                {language === 'ru' ? 'Часто задаваемые вопросы' : 'Жиі қойылатын сұрақтар'}
              </h3>
              {filteredFaqItems.length > 0 ? (
                <FaqDisplay faqItems={filteredFaqItems.map(item => ({
                  id: item.id,
                  question: item.question,
                  answer: item.answer
                }))} />
              ) : (
                <p className="text-sm sm:text-base">{language === 'ru' ? 'FAQ недоступно на текущем языке.' : 'Ағымдағы тілде FAQ қол жетімді емес.'}</p>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default ContactSection;
