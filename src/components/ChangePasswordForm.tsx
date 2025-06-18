import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/context/AuthContext';
import { updatePassword, EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';

export const ChangePasswordForm: React.FC = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!user || !user.email) {
        throw new Error(t('language') === 'ru' 
          ? 'Пользователь не авторизован' 
          : 'Пайдаланушы авторизацияланбаған');
      }

      if (formData.newPassword !== formData.confirmPassword) {
        throw new Error(t('language') === 'ru' 
          ? 'Новые пароли не совпадают' 
          : 'Жаңа құпия сөздер сәйкес келмейді');
      }

      if (formData.newPassword.length < 6) {
        throw new Error(t('language') === 'ru' 
          ? 'Новый пароль должен содержать минимум 6 символов' 
          : 'Жаңа құпия сөз кемінде 6 таңба болуы керек');
      }

      // Re-authenticate user before changing password
      const credential = EmailAuthProvider.credential(user.email, formData.currentPassword);
      await reauthenticateWithCredential(user, credential);

      // Update password
      await updatePassword(user, formData.newPassword);

      toast({
        title: t('language') === 'ru' ? 'Успешно' : 'Сәтті',
        description: t('language') === 'ru' 
          ? 'Пароль успешно изменен' 
          : 'Құпия сөз сәтті өзгертілді',
      });

      // Clear form
      setFormData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });

      // Redirect to home page
      navigate('/');
    } catch (error: any) {
      console.error('Password change error:', error);
      
      let errorMessage = '';
      if (error.code === 'auth/wrong-password') {
        errorMessage = t('language') === 'ru' 
          ? 'Неверный текущий пароль' 
          : 'Қате ағымдағы құпия сөз';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = t('language') === 'ru' 
          ? 'Новый пароль слишком слабый' 
          : 'Жаңа құпия сөз тым әлсіз';
      } else {
        errorMessage = error.message || (t('language') === 'ru' 
          ? 'Произошла ошибка при смене пароля' 
          : 'Құпия сөзді өзгерту кезінде қате орын алды');
      }

      toast({
        title: t('language') === 'ru' ? 'Ошибка' : 'Қате',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-center">
          {t('language') === 'ru' ? 'Изменить пароль' : 'Құпия сөзді өзгерту'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="currentPassword">
              {t('language') === 'ru' ? 'Текущий пароль' : 'Ағымдағы құпия сөз'}
            </Label>
            <Input
              id="currentPassword"
              name="currentPassword"
              type="password"
              required
              value={formData.currentPassword}
              onChange={handleChange}
              placeholder={t('language') === 'ru' ? 'Введите текущий пароль' : 'Ағымдағы құпия сөзді енгізіңіз'}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="newPassword">
              {t('language') === 'ru' ? 'Новый пароль' : 'Жаңа құпия сөз'}
            </Label>
            <Input
              id="newPassword"
              name="newPassword"
              type="password"
              required
              value={formData.newPassword}
              onChange={handleChange}
              placeholder={t('language') === 'ru' ? 'Введите новый пароль' : 'Жаңа құпия сөзді енгізіңіз'}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">
              {t('language') === 'ru' ? 'Подтвердите новый пароль' : 'Жаңа құпия сөзді растау'}
            </Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder={t('language') === 'ru' ? 'Повторите новый пароль' : 'Жаңа құпия сөзді қайталаңыз'}
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-gov-blue hover:bg-gov-dark-blue"
            disabled={isLoading}
          >
            {isLoading ? 
              (t('language') === 'ru' ? 'Загрузка...' : 'Жүктелуде...') : 
              (t('language') === 'ru' ? 'Изменить пароль' : 'Құпия сөзді өзгерту')}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ChangePasswordForm; 