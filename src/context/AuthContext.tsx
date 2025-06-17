import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from 'firebase/auth';
import { 
  auth, 
  loginUser, 
  registerUser, 
  logoutUser, 
  getUserData, 
  UserData, 
  checkEmailExists,
  updateUserData 
} from '@/lib/firebase';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from './LanguageContext';

interface AuthContextType {
  user: User | null;
  userData: UserData | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, userData: Omit<UserData, 'uid' | 'createdAt' | 'lastLogin'>) => Promise<void>;
  logout: () => Promise<void>;
  updateUserProfile: (data: Partial<UserData>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { t } = useLanguage();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setUser(user);
      if (user) {
        try {
          const data = await getUserData(user.uid);
          setUserData(data);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      } else {
        setUserData(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const userCredential = await loginUser(email, password);
      const data = await getUserData(userCredential.user.uid);
      setUserData(data);
      toast({
        title: t('language') === 'ru' ? 'Успешный вход' : 'Сәтті кіру',
        description: t('language') === 'ru' 
          ? 'Вы успешно вошли в систему' 
          : 'Сіз жүйеге сәтті кірдіңіз',
      });
    } catch (error: any) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const register = async (email: string, password: string, userData: Omit<UserData, 'uid' | 'createdAt' | 'lastLogin'>) => {
    try {
      console.log('Starting registration in AuthContext...');
      
      // Check if email already exists
      const emailExists = await checkEmailExists(email);
      if (emailExists) {
        throw new Error(t('language') === 'ru' 
          ? 'Пользователь с таким email уже существует' 
          : 'Бұл email-мен пайдаланушы бар');
      }

      console.log('Creating user with Firebase Auth...');
      const userCredential = await registerUser(email, password, userData);
      console.log('User created successfully, fetching user data...');
      
      const data = await getUserData(userCredential.user.uid);
      console.log('User data fetched:', data);
      
      setUserData(data);
      toast({
        title: t('language') === 'ru' ? 'Успешная регистрация' : 'Сәтті тіркелу',
        description: t('language') === 'ru' 
          ? 'Вы успешно зарегистрировались' 
          : 'Сіз сәтті тіркелдіңіз',
      });
    } catch (error: any) {
      console.error('Registration error in AuthContext:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await logoutUser();
      setUserData(null);
      toast({
        title: t('language') === 'ru' ? 'Выход выполнен' : 'Шығу орындалды',
        description: t('language') === 'ru' 
          ? 'Вы успешно вышли из системы' 
          : 'Сіз жүйеден сәтті шықтыңыз',
      });
    } catch (error: any) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  const updateUserProfile = async (data: Partial<UserData>) => {
    if (!user) return;
    
    try {
      await updateUserData(user.uid, data);
      const updatedData = await getUserData(user.uid);
      setUserData(updatedData);
      toast({
        title: t('language') === 'ru' ? 'Профиль обновлен' : 'Профиль жаңартылды',
        description: t('language') === 'ru' 
          ? 'Ваш профиль успешно обновлен' 
          : 'Сіздің профиліңіз сәтті жаңартылды',
      });
    } catch (error: any) {
      console.error('Update profile error:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, userData, loading, login, register, logout, updateUserProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 