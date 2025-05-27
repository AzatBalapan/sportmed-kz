
import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';
import { Button } from '@/components/ui/button';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

export const Header: React.FC = () => {
  const { t } = useLanguage();
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const headerRef = useRef<HTMLElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAboutDropdownToggle = () => {
    setAboutDropdownOpen(!aboutDropdownOpen);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header 
      ref={headerRef}
      className={`sticky top-0 z-20 w-full transition-all duration-300 ${
        isScrolled ? 'bg-white/90 backdrop-blur-sm shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 z-30 text-lg font-serif font-bold text-gov-blue">
            <img src="/lovable-uploads/icon_for_web.png" width="32" height="32" alt="Logo" />
            <span>{t('nav.home')}</span>
          </Link>

          {/* Desktop Navigation */}
          {!isMobile && (
            <nav className="flex items-center space-x-6">
              <Link 
                to="/services" 
                className="text-gray-700 hover:text-gov-blue transition-colors"
              >
                {t('nav.services')}
              </Link>
              
              {/* About dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center text-gray-700 hover:text-gov-blue transition-colors focus:outline-none">
                    {t('nav.about')}
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DropdownMenuItem>
                    <Link to="/director" className="w-full">
                      {t('nav.director')}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to="/about" className="w-full">
                      {t('nav.aboutCenter')}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to="/legal-acts" className="w-full">
                      {t('nav.legalActs')}
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <Link 
                to="/team" 
                className="text-gray-700 hover:text-gov-blue transition-colors"
              >
                {t('nav.team')}
              </Link>
              <Link 
                to="/compliance" 
                className="text-gray-700 hover:text-gov-blue transition-colors"
              >
                {t('nav.compliance')}
              </Link>
              <Link 
                to="/news" 
                className="text-gray-700 hover:text-gov-blue transition-colors"
              >
                {t('nav.news')}
              </Link>
              <Link 
                to="/presidential-address" 
                className="text-gray-700 hover:text-gov-blue transition-colors"
              >
                {t('nav.presidentialAddress')}
              </Link>
              <Link 
                to="/contacts" 
                className="text-gray-700 hover:text-gov-blue transition-colors"
              >
                {t('nav.contacts')}
              </Link>

              <div className="pl-4 border-l border-gray-300">
                <LanguageSwitcher />
              </div>

              <Link to="/login">
                <Button variant="outline" className="border-gov-blue text-gov-blue hover:bg-gov-blue hover:text-white">
                  {t('nav.login')}
                </Button>
              </Link>
            </nav>
          )}

          {/* Mobile Menu Button */}
          {isMobile && (
            <div className="flex items-center space-x-4">
              <LanguageSwitcher />
              <Button 
                variant="ghost" 
                size="icon"
                onClick={toggleMobileMenu}
                className="z-30"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Navigation Overlay */}
      {isMobile && (
        <div 
          className={`fixed inset-0 bg-white z-20 transition-all duration-300 ${
            mobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <div className="container mx-auto px-4 pt-24 pb-8">
            <nav className="flex flex-col space-y-4">
              <Link 
                to="/services" 
                className="text-xl py-2 border-b border-gray-100"
              >
                {t('nav.services')}
              </Link>
              
              <div className="flex flex-col">
                <button 
                  onClick={handleAboutDropdownToggle}
                  className="flex items-center justify-between text-xl py-2 border-b border-gray-100"
                >
                  {t('nav.about')}
                  <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${aboutDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {aboutDropdownOpen && (
                  <div className="ml-4 mt-2 space-y-2">
                    <Link to="/director" className="block py-2">
                      {t('nav.director')}
                    </Link>
                    <Link to="/about" className="block py-2">
                      {t('nav.aboutCenter')}
                    </Link>
                    <Link to="/legal-acts" className="block py-2">
                      {t('nav.legalActs')}
                    </Link>
                  </div>
                )}
              </div>
              
              <Link 
                to="/team" 
                className="text-xl py-2 border-b border-gray-100"
              >
                {t('nav.team')}
              </Link>
              <Link 
                to="/compliance" 
                className="text-xl py-2 border-b border-gray-100"
              >
                {t('nav.compliance')}
              </Link>
              <Link 
                to="/news" 
                className="text-xl py-2 border-b border-gray-100"
              >
                {t('nav.news')}
              </Link>
              <Link 
                to="/presidential-address" 
                className="text-xl py-2 border-b border-gray-100"
              >
                {t('nav.presidentialAddress')}
              </Link>
              <Link 
                to="/contacts" 
                className="text-xl py-2 border-b border-gray-100"
              >
                {t('nav.contacts')}
              </Link>
              <Link 
                to="/login" 
                className="text-xl py-2"
              >
                {t('nav.login')}
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
