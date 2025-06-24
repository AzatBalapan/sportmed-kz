import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, Send } from 'lucide-react';
import { EmailService, DirectorMessage } from '@/lib/emailService';

interface DirectorContactFormProps {
  className?: string;
}

export const DirectorContactForm: React.FC<DirectorContactFormProps> = ({ className }) => {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<DirectorMessage>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate the message
      const validation = EmailService.validateMessage(formData);
      if (!validation.isValid) {
        toast({
          title: t('director.contact.error'),
          description: validation.errors.join(', '),
          variant: 'destructive',
        });
        return;
      }

      // Send the message
      const success = await EmailService.sendToDirector(formData);

      if (success) {
        toast({
          title: t('director.contact.success'),
          description: t('director.contact.success.description'),
        });

        // Reset form and close dialog
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
        setIsOpen(false);
      } else {
        toast({
          title: t('director.contact.error'),
          description: t('director.contact.error.description'),
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: t('director.contact.error'),
        description: t('director.contact.error.description'),
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          className={`bg-gov-blue hover:bg-gov-dark-blue text-white ${className}`}
          size="lg"
        >
          <Mail className="w-4 h-4 mr-2" />
          {t('director.contact.button')}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-serif">
            {t('director.contact.title')}
          </DialogTitle>
          <DialogDescription className="text-base">
            {t('director.contact.subtitle')}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">{t('director.contact.name')}</Label>
              <Input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder={t('director.contact.name')}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">{t('director.contact.email')}</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder="example@email.com"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">{t('director.contact.phone')}</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
                required
                placeholder="+7 (___) ___-____"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="subject">{t('director.contact.subject')}</Label>
              <Input
                id="subject"
                name="subject"
                type="text"
                value={formData.subject}
                onChange={handleInputChange}
                required
                placeholder={t('director.contact.subject')}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="message">{t('director.contact.message')}</Label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              required
              rows={6}
              placeholder={t('director.contact.message.placeholder')}
              className="resize-none"
            />
          </div>
          
          <div className="flex justify-end space-x-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
              disabled={isSubmitting}
            >
              {language === 'ru' ? 'Отмена' : 'Бас тарту'}
            </Button>
            <Button
              type="submit"
              className="bg-gov-blue hover:bg-gov-dark-blue"
              disabled={isSubmitting}
            >
              <Send className="w-4 h-4 mr-2" />
              {isSubmitting ? t('director.contact.sending') : t('director.contact.send')}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DirectorContactForm; 