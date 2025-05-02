
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';

export const LoginForm: React.FC = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Get users from localStorage
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      
      // Find user with matching email
      const user = users.find((u: any) => u.email === email);
      
      if (!user) {
        setError(t('language') === 'ru' 
          ? 'Пользователь с таким email не найден' 
          : 'Мұндай электрондық поштамен пайдаланушы табылмады');
        setIsLoading(false);
        return;
      }
      
      // Check password
      if (user.password !== password) {
        setError(t('language') === 'ru' 
          ? 'Неверный пароль' 
          : 'Қате құпия сөз');
        setIsLoading(false);
        return;
      }
      
      // Login successful
      
      // Save auth state
      localStorage.setItem('currentUser', JSON.stringify({
        id: user.id,
        name: user.name,
        email: user.email,
        rememberMe
      }));
      
      toast({
        title: t('language') === 'ru' ? 'Успешный вход' : 'Сәтті кіру',
        description: t('language') === 'ru' 
          ? `Добро пожаловать, ${user.name}!` 
          : `Қош келдіңіз, ${user.name}!`,
      });
      
      // Redirect to home page
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch (error) {
      console.error('Login error:', error);
      setError(t('language') === 'ru' 
          ? 'Произошла ошибка при входе. Пожалуйста, попробуйте снова.' 
          : 'Кіру кезінде қате орын алды. Қайталап көріңіз.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-center">{t('login.title')}</CardTitle>
      </CardHeader>
      <CardContent>
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-md text-sm">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">{t('login.email')}</Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@email.com"
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">{t('login.password')}</Label>
              <Link
                to="/forgot-password"
                className="text-sm text-gov-blue hover:underline"
              >
                {t('login.forgot')}
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="remember" 
              checked={rememberMe}
              onCheckedChange={(checked) => setRememberMe(checked === true)}
            />
            <label
              htmlFor="remember"
              className="text-sm text-gray-600 cursor-pointer"
            >
              {t('language') === 'ru' ? 'Запомнить меня' : 'Мені есте сақтау'}
            </label>
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-gov-blue hover:bg-gov-dark-blue"
            disabled={isLoading}
          >
            {isLoading ? 
              (t('language') === 'ru' ? 'Загрузка...' : 'Жүктелуде...') : 
              t('login.button')}
          </Button>
          
          <div className="text-xs text-amber-600 mt-2 text-center">
            {t('language') === 'ru' 
              ? 'Примечание: Для демонстрации используется локальное хранилище браузера.' 
              : 'Ескерту: Көрсету үшін браузердің жергілікті қоймасы пайдаланылады.'}
          </div>
        </form>
        
        <div className="mt-6 text-center">
          <Link 
            to="/register" 
            className="text-gov-blue hover:underline"
          >
            {t('login.register')}
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
