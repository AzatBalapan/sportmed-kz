import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import AppCaptcha from './AppCaptcha';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';

export const RegistrationForm: React.FC = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const { register } = useAuth();
  const navigate = useNavigate();
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const getErrorMessage = (error: any): string => {
    console.log('Registration error:', error);
    
    // Firebase Auth error codes
    switch (error.code) {
      case 'auth/email-already-in-use':
        return t('language') === 'ru' 
          ? 'Этот email уже используется' 
          : 'Бұл email қолданыста';
      case 'auth/invalid-email':
        return t('language') === 'ru' 
          ? 'Неверный формат email' 
          : 'Email пішімі қате';
      case 'auth/operation-not-allowed':
        return t('language') === 'ru' 
          ? 'Регистрация по email отключена' 
          : 'Email арқылы тіркеу өшірілген';
      case 'auth/weak-password':
        return t('language') === 'ru' 
          ? 'Пароль слишком слабый' 
          : 'Құпия сөз тым әлсіз';
      case 'permission-denied':
        return t('language') === 'ru' 
          ? 'Ошибка доступа к базе данных' 
          : 'Дерекқорға қол жеткізу қатесі';
      default:
        return error.message || (t('language') === 'ru' 
          ? 'Произошла ошибка при регистрации' 
          : 'Тіркелу кезінде қате орын алды');
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isCaptchaVerified) {
      toast({
        title: t('language') === 'ru' ? 'Ошибка' : 'Қате',
        description: t('language') === 'ru' 
          ? 'Пожалуйста, пройдите проверку CAPTCHA' 
          : 'CAPTCHA тексеруінен өтіңіз',
        variant: 'destructive',
      });
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: t('language') === 'ru' ? 'Ошибка' : 'Қате',
        description: t('language') === 'ru' 
          ? 'Пароли не совпадают' 
          : 'Құпия сөздер сәйкес келмейді',
        variant: 'destructive',
      });
      return;
    }

    if (formData.password.length < 8) {
      toast({
        title: t('language') === 'ru' ? 'Ошибка' : 'Қате',
        description: t('language') === 'ru' 
          ? 'Пароль должен содержать минимум 8 символов' 
          : 'Құпия сөз кемінде 8 таңбадан тұруы керек',
        variant: 'destructive',
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      console.log('Starting registration process...');
      await register(formData.email, formData.password, {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
      });
      console.log('Registration successful, redirecting...');
      navigate('/'); // Redirect to home page after successful registration
    } catch (error: any) {
      console.error('Registration error details:', error);
      toast({
        title: t('language') === 'ru' ? 'Ошибка регистрации' : 'Тіркелу қатесі',
        description: getErrorMessage(error),
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-center">{t('register.title')}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">{t('register.name')}</Label>
            <Input
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder={t('language') === 'ru' ? 'Иван Иванов' : 'Асан Асанов'}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">{t('register.email')}</Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="example@email.com"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone">{t('register.phone')}</Label>
            <Input
              id="phone"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              placeholder="+7 (___) ___-____"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">{t('register.password')}</Label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              value={formData.password}
              onChange={handleChange}
              minLength={8}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">{t('register.confirm')}</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>
          
          <AppCaptcha onVerify={(verified) => setIsCaptchaVerified(verified)} />
          
          <Button 
            type="submit" 
            className="w-full bg-gov-blue hover:bg-gov-dark-blue"
            disabled={isLoading}
          >
            {isLoading ? 
              (t('language') === 'ru' ? 'Загрузка...' : 'Жүктелуде...') : 
              t('register.button')
            }
          </Button>
          
          <div className="text-xs text-amber-600 mt-2 text-center">
            {t('language') === 'ru' 
              ? 'Примечание: Это демо-версия формы регистрации. Для работы с реальными данными требуется настройка backend-системы.' 
              : 'Ескерту: Бұл тіркеу формасының демо нұсқасы. Нақты деректермен жұмыс істеу үшін backend жүйесін орнату қажет.'}
          </div>
        </form>
        
        <div className="mt-6 text-center">
          <Link 
            to="/login" 
            className="text-gov-blue hover:underline"
          >
            {t('register.login')}
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default RegistrationForm;
