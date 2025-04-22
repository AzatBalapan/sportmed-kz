
import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';

interface AppCaptchaProps {
  onVerify: (verified: boolean) => void;
}

export const AppCaptcha: React.FC<AppCaptchaProps> = ({ onVerify }) => {
  const { t } = useLanguage();
  const [captchaText, setCaptchaText] = useState('');
  const [userInput, setUserInput] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState('');

  const generateCaptcha = () => {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let captcha = '';
    for (let i = 0; i < 6; i++) {
      captcha += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaText(captcha);
    setUserInput('');
    setError('');
    setIsVerified(false);
    onVerify(false);
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const handleVerify = () => {
    if (userInput === captchaText) {
      setIsVerified(true);
      setError('');
      onVerify(true);
    } else {
      setError(t('language') === 'ru' ? 'Неверный код. Попробуйте еще раз.' : 'Қате код. Қайтадан көріңіз.');
      generateCaptcha();
      onVerify(false);
    }
  };

  return (
    <Card className="mt-4 bg-gray-50">
      <CardContent className="pt-4">
        <p className="mb-3 text-sm text-gray-600">
          {t('register.captcha')}
        </p>
        {!isVerified ? (
          <div className="space-y-4">
            <div className="bg-white relative overflow-hidden p-4 rounded border">
              <div 
                className="select-none text-xl font-mono tracking-widest"
                style={{ 
                  fontFamily: 'monospace', 
                  fontWeight: 'bold',
                  letterSpacing: '0.5em',
                  textDecoration: 'line-through',
                  color: '#333',
                  background: 'repeating-linear-gradient(45deg, #f0f0f0, #f0f0f0 10px, #e0e0e0 10px, #e0e0e0 20px)',
                  padding: '10px',
                  borderRadius: '4px',
                  textAlign: 'center',
                }}
              >
                {captchaText}
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                className="absolute top-0 right-0 text-gray-500"
                onClick={generateCaptcha}
              >
                ↻
              </Button>
            </div>
            
            <div className="space-y-2">
              <Input 
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder={t('language') === 'ru' ? 'Введите код с картинки' : 'Суреттегі кодты енгізіңіз'}
                className="bg-white"
              />
              {error && <p className="text-red-500 text-sm">{error}</p>}
            </div>
            
            <Button 
              onClick={handleVerify}
              className="w-full bg-gov-blue hover:bg-gov-dark-blue"
            >
              {t('language') === 'ru' ? 'Проверить' : 'Тексеру'}
            </Button>
          </div>
        ) : (
          <div className="text-center py-2">
            <div className="text-green-600 mb-2">
              ✓ {t('language') === 'ru' ? 'Проверка пройдена' : 'Тексеру өтті'}
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={generateCaptcha}
            >
              {t('language') === 'ru' ? 'Сбросить' : 'Қайта бастау'}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AppCaptcha;
