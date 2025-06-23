import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import { ChevronLeft, User, GraduationCap, Award, Briefcase, Stethoscope } from 'lucide-react';
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
    <div className="max-w-6xl mx-auto">
      <Button onClick={onBack} variant="ghost" className="mb-6">
        <ChevronLeft className="mr-2 h-4 w-4" />
        {t('team.back')}
      </Button>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Photo and Basic Info */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="aspect-[3/4] bg-gray-100 flex items-center justify-center overflow-hidden">
              {doctor.image ? (
                <img 
                  src={doctor.image} 
                  alt={doctor.name[language]} 
                  className="w-full h-full object-cover object-top"
                />
              ) : (
                <User size={120} className="text-gray-400" />
              )}
            </div>
            <div className="p-6">
              <h1 className="text-2xl font-bold mb-2">{doctor.name[language]}</h1>
              <p className="text-lg text-blue-600 mb-4">{doctor.position[language]}</p>
              
              {getDepartmentName() && (
                <div className="mb-4">
                  <div className="flex items-center mb-2">
                    <Briefcase className="w-4 h-4 mr-2 text-gray-500" />
                    <span className="font-medium text-gray-700">{language === 'ru' ? 'Отдел' : 'Бөлім'}</span>
                  </div>
                  <p className="text-gray-600 text-sm pl-6">{getDepartmentName()}</p>
                </div>
              )}
              
              {doctor.experience && doctor.experience[language] && (
                <div className="mb-4">
                  <div className="flex items-center mb-2">
                    <Stethoscope className="w-4 h-4 mr-2 text-gray-500" />
                    <span className="font-medium text-gray-700">{t('team.experience')}</span>
                  </div>
                  <p className="text-gray-600 text-sm pl-6">{doctor.experience[language]}</p>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Right Column - Detailed Information */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="space-y-8">
              {doctor.education && doctor.education[language] && (
                <div>
                  <div className="flex items-center mb-4">
                    <div className="bg-blue-100 p-2 rounded-lg mr-3">
                      <GraduationCap className="w-5 h-5 text-blue-600" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-800">{t('team.education')}</h2>
                  </div>
                  <div className="ml-12">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: doctor.education[language].replace(/\n/g, '<br/>') }} />
                    </div>
                  </div>
                </div>
              )}
              
              {'specialization' in doctor && doctor.specialization && doctor.specialization[language] && (
                <div>
                  <div className="flex items-center mb-4">
                    <div className="bg-green-100 p-2 rounded-lg mr-3">
                      <Stethoscope className="w-5 h-5 text-green-600" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-800">{t('team.specialization')}</h2>
                  </div>
                  <div className="ml-12">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: doctor.specialization[language].replace(/\n/g, '<br/>') }} />
                    </div>
                  </div>
                </div>
              )}
              
              {doctor.certificates && doctor.certificates[language] && (
                <div>
                  <div className="flex items-center mb-4">
                    <div className="bg-orange-100 p-2 rounded-lg mr-3">
                      <Award className="w-5 h-5 text-orange-600" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-800">{t('team.certificates')}</h2>
                  </div>
                  <div className="ml-12">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: doctor.certificates[language].replace(/\n/g, '<br/>') }} />
                    </div>
                  </div>
                </div>
              )}
              {/* Work experience section */}
              {'work' in doctor && doctor.work && doctor.work[language] && (
                <div>
                  <div className="flex items-center mb-4">
                    <div className="bg-gray-200 p-2 rounded-lg mr-3">
                      <Briefcase className="w-5 h-5 text-gray-700" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-800">{language === 'ru' ? 'Опыт работы' : 'Жұмыс тәжірибесі'}</h2>
                  </div>
                  <div className="ml-12">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: doctor.work[language].replace(/\n/g, '<br/>') }} />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamDetails;
