
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';
import { Button } from '@/components/ui/button';

export const Header: React.FC = () => {
  const { t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <div className="text-gov-blue font-serif font-bold text-2xl">СпортМед</div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-gov-blue font-medium">
              {t('nav.home')}
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-gov-blue font-medium">
              {t('nav.about')}
            </Link>
            <Link to="/services" className="text-gray-700 hover:text-gov-blue font-medium">
              {t('nav.services')}
            </Link>
            <Link to="/team" className="text-gray-700 hover:text-gov-blue font-medium">
              {t('nav.team')}
            </Link>
            <Link to="/#contacts" className="text-gray-700 hover:text-gov-blue font-medium">
              {t('nav.contacts')}
            </Link>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <LanguageSwitcher />
            <Link to="/login">
              <Button variant="outline" size="sm">
                {t('nav.login')}
              </Button>
            </Link>
            <Link to="/register">
              <Button size="sm">
                {t('nav.register')}
              </Button>
            </Link>
          </div>

          {/* Mobile Navigation Toggle */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5"} />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <nav className="flex flex-col space-y-4">
              <Link
                to="/"
                className="text-gray-700 hover:text-gov-blue font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('nav.home')}
              </Link>
              <Link
                to="/about"
                className="text-gray-700 hover:text-gov-blue font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('nav.about')}
              </Link>
              <Link
                to="/services"
                className="text-gray-700 hover:text-gov-blue font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('nav.services')}
              </Link>
              <Link
                to="/team"
                className="text-gray-700 hover:text-gov-blue font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('nav.team')}
              </Link>
              <Link
                to="/#contacts"
                className="text-gray-700 hover:text-gov-blue font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('nav.contacts')}
              </Link>
              <div className="flex items-center justify-between pt-4">
                <LanguageSwitcher />
                <div className="flex space-x-2">
                  <Link to="/login">
                    <Button variant="outline" size="sm" onClick={() => setIsMenuOpen(false)}>
                      {t('nav.login')}
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button size="sm" onClick={() => setIsMenuOpen(false)}>
                      {t('nav.register')}
                    </Button>
                  </Link>
                </div>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
