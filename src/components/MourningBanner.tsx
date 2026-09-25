import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { isNationalMourningDayActive, MOURNING_BANNER_TEXT, MOURNING_BANNER_LINK } from '@/lib/mourningDay';

/**
 * Full-width black/white banner shown site-wide on the National Day of
 * Mourning, per the Ministry's recommendations for how media and government
 * web resources should present themselves that day: black background, white
 * text, fixed to the top of the page (not scrolled away), clickable through
 * to coverage of the event.
 *
 * Also publishes its own rendered height as `--mourning-banner-height` on
 * <html>, so the sticky Header can offset itself below it without hardcoding
 * a pixel value (the text wraps differently by language and screen width).
 */
const MourningBanner: React.FC = () => {
  const { language } = useLanguage();
  const [active] = useState(() => isNationalMourningDayActive());
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!active) {
      document.documentElement.style.setProperty('--mourning-banner-height', '0px');
      return;
    }

    const el = ref.current;
    if (!el) return;

    const setHeight = () => {
      document.documentElement.style.setProperty('--mourning-banner-height', `${el.offsetHeight}px`);
    };
    setHeight();

    const observer = new ResizeObserver(setHeight);
    observer.observe(el);
    window.addEventListener('resize', setHeight);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', setHeight);
      document.documentElement.style.setProperty('--mourning-banner-height', '0px');
    };
  }, [active]);

  if (!active) return null;

  const text = MOURNING_BANNER_TEXT[language] ?? MOURNING_BANNER_TEXT.ru;

  return (
    <div ref={ref} className="sticky top-0 z-[100] w-full bg-black">
      <a
        href={MOURNING_BANNER_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full px-4 py-2 text-center text-xs sm:text-sm font-medium text-white underline-offset-2 hover:underline"
      >
        {text}
      </a>
    </div>
  );
};

export default MourningBanner;
