
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import { ChevronLeft, User } from 'lucide-react';
import { doctors } from '@/data/doctors';

interface TeamDetailsProps {
  doctorId: string;
  onBack: () => void;
}

const TeamDetails: React.FC<TeamDetailsProps> = ({ doctorId, onBack }) => {
  const { t, language } = useLanguage();
  const doctor = doctors.find(d => d.id === doctorId);

  if (!doctor) {
    return (
      <div className="text-center py-12">
        <p>{language === 'ru' ? 'Специалист не найден' : 'Маман табылмады'}</p>
        <Button onClick={onBack} className="mt-4">
          <ChevronLeft className="mr-2 h-4 w-4" />
          {t('team.back')}
        </Button>
      </div>
    );
  }

  // Department translations
  const getDepartmentName = () => {
    const departmentId = doctor.department;
    if (!departmentId) return "";
    
    const departmentMap: {[key: string]: {ru: string, kz: string}} = {
      "management": {
        ru: "Управленческий персонал",
        kz: "Басқару қызметкерлері"
      },
      "sports-medicine": {
        ru: "Отделение спортивной медицины и медико-биологического обеспечения",
        kz: "Спорт медицинасы және медициналық-биологиялық қамтамасыз ету бөлімі"
      },
      "specialists": {
        ru: "Отделение специалистов по профилю",
        kz: "Мамандандырылған дәрігерлер бөлімі"
      },
      "diagnostics": {
        ru: "Отделении функциональной диагностики",
        kz: "Функционалды диагностика бөлімі"
      },
      "physiotherapy": {
        ru: "Отделение физиотерапии, лечебной физкультуры и массажа",
        kz: "Физиотерапия, емдік дене шынықтыру және массаж бөлімі"
      },
      "medical-staff": {
        ru: "Медицинский персонал",
        kz: "Медициналық қызметкерлер"
      }
    };
    
    return departmentMap[departmentId]?.[language] || "";
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Button onClick={onBack} variant="ghost" className="mb-6">
        <ChevronLeft className="mr-2 h-4 w-4" />
        {t('team.back')}
      </Button>
      
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/3">
          <div className="bg-gray-200 rounded-lg overflow-hidden h-72 flex items-center justify-center">
            {doctor.image ? (
              <img 
                src={doctor.image} 
                alt={doctor.name[language]} 
                className="w-full h-full object-cover"
              />
            ) : (
              <User size={96} className="text-gray-400" />
            )}
          </div>
        </div>
        
        <div className="md:w-2/3">
          <h1 className="text-3xl font-serif font-bold mb-2">{doctor.name[language]}</h1>
          <p className="text-xl text-gov-blue mb-4">{doctor.position[language]}</p>
          
          {getDepartmentName() && (
            <div className="mb-6">
              <h2 className="text-lg font-medium mb-2">{language === 'ru' ? 'Отдел' : 'Бөлім'}</h2>
              <p className="text-gray-700">{getDepartmentName()}</p>
            </div>
          )}
          
          {doctor.experience && doctor.experience[language] && (
            <div className="mb-6">
              <h2 className="text-lg font-medium mb-2">{t('team.experience')}</h2>
              <p className="text-gray-700">{doctor.experience[language]}</p>
            </div>
          )}
          
          {doctor.education && doctor.education[language] && (
            <div className="mb-6">
              <h2 className="text-lg font-medium mb-2">{t('team.education')}</h2>
              <div className="text-gray-700" dangerouslySetInnerHTML={{ __html: doctor.education[language].replace(/\n/g, '<br/>') }} />
            </div>
          )}
          
          {doctor.specialization && doctor.specialization[language] && (
            <div className="mb-6">
              <h2 className="text-lg font-medium mb-2">{t('team.specialization')}</h2>
              <div className="text-gray-700" dangerouslySetInnerHTML={{ __html: doctor.specialization[language].replace(/\n/g, '<br/>') }} />
            </div>
          )}
          
          {doctor.certificates && doctor.certificates[language] && (
            <div className="mb-6">
              <h2 className="text-lg font-medium mb-2">{t('team.certificates')}</h2>
              <div className="text-gray-700" dangerouslySetInnerHTML={{ __html: doctor.certificates[language].replace(/\n/g, '<br/>') }} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeamDetails;
