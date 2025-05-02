
import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { toast } from '@/components/ui/sonner';

export const LoginForm: React.FC = () => {
  const { t } = useLanguage();
  const { toast: uiToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      // Show backend notification
      toast(
        t('language') === 'ru' 
          ? 'Функционал требует подключения к базе данных' 
          : 'Функционалдық дерекқорға қосылуды талап етеді',
        {
          description: t('language') === 'ru' 
            ? 'В данный момент вход работает в демонстрационном режиме. Для полноценной работы необходима интеграция с бэкендом.' 
            : 'Қазіргі уақытта кіру көрсетілім режимінде жұмыс істейді. Толық жұмыс істеу үшін бэкендпен интеграция қажет.',
          duration: 8000,
        }
      );
      
      uiToast({
        title: t('language') === 'ru' ? 'Демо-режим' : 'Демо режимі',
        description: t('language') === 'ru' ? 'Система входа работает в демонстрационном режиме.' : 'Жүйеге кіру көрсетілім режимінде жұмыс істейді.',
      });
      
      setIsLoading(false);
      
      // Reset form
      setEmail('');
      setPassword('');
      setRememberMe(false);
    }, 1500);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-center">{t('login.title')}</CardTitle>
      </CardHeader>
      <CardContent>
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
              ? 'Примечание: Это демо-версия формы входа. Для работы с реальными данными требуется настройка backend-системы.' 
              : 'Ескерту: Бұл кіру формасының демо нұсқасы. Нақты деректермен жұмыс істеу үшін backend жүйесін орнату қажет.'}
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
