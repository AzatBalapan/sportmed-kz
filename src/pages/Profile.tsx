import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Toaster } from '@/components/ui/toaster';
import ScrollToTop from '@/components/ScrollToTop';
import SocialLinks from '@/components/SocialLinks';
import { User, Mail, Phone, Key, Save } from 'lucide-react';
import { updatePassword, EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';

const Profile: React.FC = () => {
  const { t, language } = useLanguage();
  const { user, userData, updateUserProfile } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordLoading, setIsPasswordLoading] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  
  const [profileData, setProfileData] = useState({
    name: userData?.name || '',
    email: userData?.email || '',
    phone: userData?.phone || '',
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await updateUserProfile(profileData);
      toast({
        title: language === 'ru' ? 'Профиль обновлен' : 'Профиль жаңартылды',
        description: language === 'ru' 
          ? 'Ваши данные успешно обновлены' 
          : 'Сіздің деректеріңіз сәтті жаңартылды',
      });
    } catch (error: any) {
      toast({
        title: language === 'ru' ? 'Ошибка' : 'Қате',
        description: language === 'ru' 
          ? 'Не удалось обновить профиль' 
          : 'Профильді жаңарту мүмкін емес',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        title: language === 'ru' ? 'Ошибка' : 'Қате',
        description: language === 'ru' 
          ? 'Новые пароли не совпадают' 
          : 'Жаңа құпия сөздер сәйкес келмейді',
        variant: 'destructive',
      });
      return;
    }

    if (passwordData.newPassword.length < 8) {
      toast({
        title: language === 'ru' ? 'Ошибка' : 'Қате',
        description: language === 'ru' 
          ? 'Пароль должен содержать минимум 8 символов' 
          : 'Құпия сөз кемінде 8 таңбадан тұруы керек',
        variant: 'destructive',
      });
      return;
    }

    setIsPasswordLoading(true);

    try {
      if (!user || !user.email) {
        throw new Error('User not found');
      }

      // Re-authenticate user
      const credential = EmailAuthProvider.credential(user.email, passwordData.currentPassword);
      await reauthenticateWithCredential(user, credential);

      // Update password
      await updatePassword(user, passwordData.newPassword);

      toast({
        title: language === 'ru' ? 'Пароль изменен' : 'Құпия сөз өзгертілді',
        description: language === 'ru' 
          ? 'Ваш пароль успешно изменен' 
          : 'Сіздің құпия сөзіңіз сәтті өзгертілді',
      });

      // Reset form
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
      setShowPasswordForm(false);
    } catch (error: any) {
      console.error('Password change error:', error);
      
      let errorMessage = language === 'ru' 
        ? 'Не удалось изменить пароль' 
        : 'Құпия сөзді өзгерту мүмкін емес';

      if (error.code === 'auth/wrong-password') {
        errorMessage = language === 'ru' 
          ? 'Неверный текущий пароль' 
          : 'Қате қазіргі құпия сөз';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = language === 'ru' 
          ? 'Новый пароль слишком слабый' 
          : 'Жаңа құпия сөз тым әлсіз';
      }

      toast({
        title: language === 'ru' ? 'Ошибка' : 'Қате',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setIsPasswordLoading(false);
    }
  };

  if (!user || !userData) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <p className="text-gray-600">
                {language === 'ru' ? 'Пожалуйста, войдите в систему' : 'Жүйеге кіріңіз'}
              </p>
            </div>
          </div>
        </main>
        <Footer />
        <Toaster />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-serif font-bold text-center mb-8 text-gov-blue">
              {language === 'ru' ? 'Мой аккаунт' : 'Менің есептік жазбам'}
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Profile Information */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="w-5 h-5 mr-2" />
                    {language === 'ru' ? 'Информация профиля' : 'Профиль ақпараты'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleProfileSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">
                        {language === 'ru' ? 'Имя и фамилия' : 'Аты-жөні'}
                      </Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          value={profileData.name}
                          onChange={handleProfileChange}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">
                        {language === 'ru' ? 'Email' : 'Email'}
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={profileData.email}
                          onChange={handleProfileChange}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">
                        {language === 'ru' ? 'Телефон' : 'Телефон'}
                      </Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={profileData.phone}
                          onChange={handleProfileChange}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <Button type="submit" className="w-full" disabled={isLoading}>
                      <Save className="w-4 h-4 mr-2" />
                      {isLoading 
                        ? (language === 'ru' ? 'Сохранение...' : 'Сақтау...') 
                        : (language === 'ru' ? 'Сохранить изменения' : 'Өзгерістерді сақтау')
                      }
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Change Password */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Key className="w-5 h-5 mr-2" />
                    {language === 'ru' ? 'Изменить пароль' : 'Құпия сөзді өзгерту'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {!showPasswordForm ? (
                    <div className="text-center py-8">
                      <p className="text-gray-600 mb-4">
                        {language === 'ru' 
                          ? 'Нажмите кнопку ниже, чтобы изменить пароль' 
                          : 'Құпия сөзді өзгерту үшін төмендегі батырманы басыңыз'
                        }
                      </p>
                      <Button 
                        onClick={() => setShowPasswordForm(true)}
                        variant="outline"
                        className="border-gov-blue text-gov-blue hover:bg-gov-blue hover:text-white"
                      >
                        <Key className="w-4 h-4 mr-2" />
                        {language === 'ru' ? 'Изменить пароль' : 'Құпия сөзді өзгерту'}
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handlePasswordSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="currentPassword">
                          {language === 'ru' ? 'Текущий пароль' : 'Қазіргі құпия сөз'}
                        </Label>
                        <Input
                          id="currentPassword"
                          name="currentPassword"
                          type="password"
                          value={passwordData.currentPassword}
                          onChange={handlePasswordChange}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="newPassword">
                          {language === 'ru' ? 'Новый пароль' : 'Жаңа құпия сөз'}
                        </Label>
                        <Input
                          id="newPassword"
                          name="newPassword"
                          type="password"
                          value={passwordData.newPassword}
                          onChange={handlePasswordChange}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">
                          {language === 'ru' ? 'Подтвердите новый пароль' : 'Жаңа құпия сөзді растаңыз'}
                        </Label>
                        <Input
                          id="confirmPassword"
                          name="confirmPassword"
                          type="password"
                          value={passwordData.confirmPassword}
                          onChange={handlePasswordChange}
                          required
                        />
                      </div>

                      <div className="flex space-x-2">
                        <Button type="submit" className="flex-1" disabled={isPasswordLoading}>
                          {isPasswordLoading 
                            ? (language === 'ru' ? 'Изменение...' : 'Өзгерту...') 
                            : (language === 'ru' ? 'Изменить пароль' : 'Құпия сөзді өзгерту')
                          }
                        </Button>
                        <Button 
                          type="button" 
                          variant="outline"
                          onClick={() => {
                            setShowPasswordForm(false);
                            setPasswordData({
                              currentPassword: '',
                              newPassword: '',
                              confirmPassword: '',
                            });
                          }}
                        >
                          {language === 'ru' ? 'Отмена' : 'Бас тарту'}
                        </Button>
                      </div>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <ScrollToTop />
      <Toaster />
    </div>
  );
};

export default Profile; 