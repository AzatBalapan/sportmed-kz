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
    setAboutDropdownOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuOpen && headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [mobileMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const handleAboutDropdownToggle = () => {
    setAboutDropdownOpen(!aboutDropdownOpen);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setAboutDropdownOpen(false);
  };

  return (
    <header 
      ref={headerRef}
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 z-50" onClick={closeMobileMenu}>
            <img src="/lovable-uploads/icon_for_web.png" width="28" height="28" className="sm:w-8 sm:h-8" alt="Logo" />
          </Link>

          {/* Desktop Navigation */}
          {!isMobile && (
            <nav className="flex items-center space-x-4 lg:space-x-6">
              <Link 
                to="/" 
                className="text-gov-blue font-serif font-bold hover:text-gov-blue transition-colors text-sm lg:text-base"
              >
                {t('nav.home')}
              </Link>
              <Link 
                to="/services" 
                className="text-gray-700 hover:text-gov-blue transition-colors text-sm lg:text-base"
              >
                {t('nav.services')}
              </Link>
              
              {/* About dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center text-gray-700 hover:text-gov-blue transition-colors focus:outline-none text-sm lg:text-base">
                    {t('nav.about')}
                    <ChevronDown className="ml-1 h-3 w-3 lg:h-4 lg:w-4" />
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
                className="text-gray-700 hover:text-gov-blue transition-colors text-sm lg:text-base"
              >
                {t('nav.team')}
              </Link>
              <Link 
                to="/news" 
                className="text-gray-700 hover:text-gov-blue transition-colors text-sm lg:text-base"
              >
                {t('nav.news')}
              </Link>
              <Link 
                to="/presidential-address" 
                className="text-gray-700 hover:text-gov-blue transition-colors text-sm lg:text-base"
              >
                {t('nav.presidentialAddress')}
              </Link>
              <Link 
                to="/compliance" 
                className="text-gray-700 hover:text-gov-blue transition-colors text-sm lg:text-base"
              >
                {t('nav.compliance')}
              </Link>
              <Link 
                to="/contacts" 
                className="text-gray-700 hover:text-gov-blue transition-colors text-sm lg:text-base"
              >
                {t('nav.contacts')}
              </Link>

              <div className="pl-3 lg:pl-4 border-l border-gray-300">
                <LanguageSwitcher />
              </div>

              <Link to="/login">
                <Button variant="outline" size="sm" className="border-gov-blue text-gov-blue hover:bg-gov-blue hover:text-white text-xs lg:text-sm">
                  {t('nav.login')}
                </Button>
              </Link>
            </nav>
          )}

          {/* Mobile Menu Button */}
          {isMobile && (
            <div className="flex items-center space-x-3 z-50">
              <LanguageSwitcher />
              <Button 
                variant="ghost" 
                size="sm"
                onClick={toggleMobileMenu}
                className="p-2"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobile && (
        <div 
          className={`fixed inset-0 bg-white/95 backdrop-blur-sm z-40 transition-all duration-300 ease-in-out ${
            mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
          style={{ top: '3.5rem' }}
        >
          <div className="container mx-auto px-4 py-4 h-[calc(100vh-3.5rem)] overflow-y-auto">
            <nav className="flex flex-col space-y-2">
              <Link 
                to="/" 
                className="text-base py-2 px-3 text-gov-blue font-serif font-bold hover:bg-gray-50 rounded transition-colors"
                onClick={closeMobileMenu}
              >
                {t('nav.home')}
              </Link>
              <Link 
                to="/services" 
                className="text-base py-2 px-3 hover:bg-gray-50 rounded transition-colors"
                onClick={closeMobileMenu}
              >
                {t('nav.services')}
              </Link>
              
              {/* Mobile About Dropdown */}
              <div className="relative">
                <button 
                  onClick={handleAboutDropdownToggle}
                  className="w-full flex items-center justify-between text-base py-2 px-3 hover:bg-gray-50 rounded transition-colors"
                >
                  {t('nav.about')}
                  <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${aboutDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                
                <div className={`overflow-hidden transition-all duration-200 ease-in-out ${
                  aboutDropdownOpen ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  <div className="ml-4 space-y-1">
                    <Link 
                      to="/director" 
                      className="block py-1.5 px-3 text-sm text-gray-600 hover:bg-gray-50 rounded transition-colors"
                      onClick={closeMobileMenu}
                    >
                      {t('nav.director')}
                    </Link>
                    <Link 
                      to="/about" 
                      className="block py-1.5 px-3 text-sm text-gray-600 hover:bg-gray-50 rounded transition-colors"
                      onClick={closeMobileMenu}
                    >
                      {t('nav.aboutCenter')}
                    </Link>
                    <Link 
                      to="/legal-acts" 
                      className="block py-1.5 px-3 text-sm text-gray-600 hover:bg-gray-50 rounded transition-colors"
                      onClick={closeMobileMenu}
                    >
                      {t('nav.legalActs')}
                    </Link>
                  </div>
                </div>
              </div>
              
              <Link 
                to="/team" 
                className="text-base py-2 px-3 hover:bg-gray-50 rounded transition-colors"
                onClick={closeMobileMenu}
              >
                {t('nav.team')}
              </Link>
              <Link 
                to="/news" 
                className="text-base py-2 px-3 hover:bg-gray-50 rounded transition-colors"
                onClick={closeMobileMenu}
              >
                {t('nav.news')}
              </Link>
              <Link 
                to="/presidential-address" 
                className="text-base py-2 px-3 hover:bg-gray-50 rounded transition-colors"
                onClick={closeMobileMenu}
              >
                {t('nav.presidentialAddress')}
              </Link>
              <Link 
                to="/compliance" 
                className="text-base py-2 px-3 hover:bg-gray-50 rounded transition-colors"
                onClick={closeMobileMenu}
              >
                {t('nav.compliance')}
              </Link>
              <Link 
                to="/contacts" 
                className="text-base py-2 px-3 hover:bg-gray-50 rounded transition-colors"
                onClick={closeMobileMenu}
              >
                {t('nav.contacts')}
              </Link>
              <div className="mt-4 px-3">
                <Link to="/login" onClick={closeMobileMenu}>
                  <Button className="w-full bg-gov-blue hover:bg-gov-dark-blue text-white">
                    {t('nav.login')}
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
