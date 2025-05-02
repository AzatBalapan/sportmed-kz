
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import AppCaptcha from './AppCaptcha';
import { useToast } from '@/hooks/use-toast';
import { toast } from '@/components/ui/sonner';

export const RegistrationForm: React.FC = () => {
  const { t } = useLanguage();
  const { toast: uiToast } = useToast();
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
  
  // For form validation
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  
  const validateForm = () => {
    let valid = true;
    const newErrors = { ...errors };
    
    // Validate name
    if (formData.name.trim().length < 2) {
      newErrors.name = t('language') === 'ru' 
        ? 'Имя должно содержать минимум 2 символа' 
        : 'Атыңыз кемінде 2 таңбадан тұруы керек';
      valid = false;
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = t('language') === 'ru' 
        ? 'Введите корректный email адрес' 
        : 'Жарамды электрондық пошта мекенжайын енгізіңіз';
      valid = false;
    }
    
    // Validate phone
    const phoneRegex = /^\+?[0-9]{10,15}$/;
    if (!phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = t('language') === 'ru' 
        ? 'Введите корректный номер телефона' 
        : 'Жарамды телефон нөмірін енгізіңіз';
      valid = false;
    }
    
    // Validate password
    if (formData.password.length < 8) {
      newErrors.password = t('language') === 'ru' 
        ? 'Пароль должен содержать минимум 8 символов' 
        : 'Құпия сөз кемінде 8 таңбадан тұруы керек';
      valid = false;
    }
    
    // Validate password confirmation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = t('language') === 'ru' 
        ? 'Пароли не совпадают' 
        : 'Құпия сөздер сәйкес келмейді';
      valid = false;
    }
    
    setErrors(newErrors);
    return valid;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) {
      return;
    }
    
    // Check captcha
    if (!isCaptchaVerified) {
      uiToast({
        title: t('language') === 'ru' ? 'Ошибка' : 'Қате',
        description: t('language') === 'ru' 
          ? 'Пожалуйста, пройдите проверку CAPTCHA' 
          : 'CAPTCHA тексеруінен өтіңіз',
        variant: 'destructive',
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Store user data in localStorage as a basic form of persistence
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      
      // Check if email already exists
      const emailExists = users.some((user: any) => user.email === formData.email);
      if (emailExists) {
        uiToast({
          title: t('language') === 'ru' ? 'Ошибка регистрации' : 'Тіркеу қатесі',
          description: t('language') === 'ru' 
            ? 'Пользователь с таким email уже существует' 
            : 'Бұл электрондық поштамен пайдаланушы тіркелген',
          variant: 'destructive',
        });
        setIsLoading(false);
        return;
      }
      
      // Add new user (excluding confirmPassword)
      const { confirmPassword, ...userData } = formData;
      users.push({
        ...userData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString()
      });
      
      // Save to localStorage
      localStorage.setItem('users', JSON.stringify(users));
      
      // Show success message
      uiToast({
        title: t('language') === 'ru' ? 'Успешно' : 'Сәтті',
        description: t('language') === 'ru' 
          ? 'Регистрация прошла успешно! Теперь вы можете войти в систему.' 
          : 'Тіркелу сәтті аяқталды! Енді жүйеге кіре аласыз.',
      });
      
      // Simulate email sending notification
      toast(
        t('language') === 'ru' 
          ? 'Подтверждение отправлено' 
          : 'Растау жіберілді',
        {
          description: t('language') === 'ru' 
            ? 'Письмо с подтверждением отправлено на ваш email.' 
            : 'Растау хаты сіздің электрондық поштаңызға жіберілді.',
          duration: 5000,
        }
      );
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
      });
      setIsCaptchaVerified(false);
      
      // Redirect to login page after short delay
      setTimeout(() => {
        navigate('/login');
      }, 2000);
      
    } catch (error) {
      console.error('Registration error:', error);
      uiToast({
        title: t('language') === 'ru' ? 'Ошибка' : 'Қате',
        description: t('language') === 'ru' 
          ? 'Произошла ошибка при регистрации. Пожалуйста, попробуйте снова.' 
          : 'Тіркеу кезінде қате орын алды. Қайталап көріңіз.',
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
              className={errors.name ? "border-red-500" : ""}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
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
              className={errors.email ? "border-red-500" : ""}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
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
              className={errors.phone ? "border-red-500" : ""}
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
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
              className={errors.password ? "border-red-500" : ""}
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
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
              className={errors.confirmPassword ? "border-red-500" : ""}
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
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
              ? 'Примечание: Данные сохраняются локально в вашем браузере.' 
              : 'Ескерту: Деректер сіздің браузеріңізде жергілікті түрде сақталады.'}
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
