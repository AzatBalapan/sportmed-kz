
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

const Services: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="py-16 bg-white min-h-screen">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-serif font-bold mb-6">{t('services.title')}</h1>
        <p className="mb-10 text-lg text-gray-700">{t('services.subtitle')}</p>
        <div>
          <ul className="space-y-6 text-lg">
            <li>• {t('services.list.checkup')}</li>
            <li>• {t('services.list.rehab')}</li>
            <li>• {t('services.list.consult')}</li>
            <li>• {t('services.list.diagnostic')}</li>
            <li>• {t('services.list.physio')}</li>
            <li>• {t('services.list.nutrition')}</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Services;
