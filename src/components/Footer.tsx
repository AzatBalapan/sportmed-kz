
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-gov-dark-blue text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-serif mb-4">СМЦ</h3>
            <p className="text-gray-300 mb-4">
              {t('about.description')}
            </p>
          </div>
          <div>
            <h3 className="text-xl font-serif mb-4">{t('nav.services')}</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link to="/services" className="hover:text-white transition-colors">
                  {t('nav.services')}
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  {t('nav.about')}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-serif mb-4">{t('contact.title')}</h3>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-start">
                <span className="mr-2">📍</span>
                <span>{t('contact.address.value')}</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">📞</span>
                <span>{t('contact.phone.value')}</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✉️</span>
                <span>{t('contact.email.value')}</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">🕒</span>
                <span>{t('contact.hours.value')}</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-6 mt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400 mb-4 md:mb-0">{t('footer.rights')}</p>
          <div className="flex space-x-4">
            <Link to="/privacy" className="text-sm text-gray-400 hover:text-white">
              {t('footer.policy')}
            </Link>
            <Link to="/terms" className="text-sm text-gray-400 hover:text-white">
              {t('footer.terms')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
