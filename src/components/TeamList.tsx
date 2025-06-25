import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User } from 'lucide-react';
import { doctors } from '@/data/doctors';
import { useNavigate } from 'react-router-dom';

interface TeamListProps {
  onSelectDoctor: (doctorId: string) => void;
}

// Define department types
type Department = {
  id: string;
  nameRu: string;
  nameKz: string;
  order: number;
}

const TeamList: React.FC<TeamListProps> = ({ onSelectDoctor }) => {
  const { language } = useLanguage();
  const navigate = useNavigate();

  // Define departments - only medical and other staff, remove management
  const departments: Department[] = [
    { id: 'sportmed', nameRu: 'Отделение спортивной медицины и медико-биологического обеспечения', nameKz: 'Спорттық медицина және медико-биологиялық қамтамасыз ету бөлімі', order: 1 },
    { id: 'rehabilitation', nameRu: 'Реабилитация', nameKz: 'Реабилитация', order: 2 },
    { id: 'psychologist', nameRu: 'Спортивный психолог', nameKz: 'Спорттық психолог', order: 3 },
    { id: 'nursing', nameRu: 'Средний медицинский персонал', nameKz: 'Орта медициналық персонал', order: 4 },
    { id: 'other', nameRu: 'Отделение специалистов по профилю', nameKz: 'Мамандандырылған дәрігерлер бөлімі', order: 5 },
  ];

  // Group doctors by department
  const doctorsByDepartment: { [key: string]: any[] } = {};
  
  // Initialize empty arrays for each department
  departments.forEach(dept => {
    doctorsByDepartment[dept.id] = [];
  });

  // Define staff with proper hierarchy - only non-management staff
  const staff = [
    // Отделение споривной медицины и медико-биологического отделения
    { id: "zhiengazina", name: { ru: "Жиенгазина Асия Нуржановна", kz: "Жиенгазина Асия Нуржановна" }, position: { ru: "Заведующая отделом", kz: "Бөлім меңгерушісі" }, department: "sportmed", order: 1 },
    { id: "boltaev", name: { ru: "Болтаев Олжас Талгатович", kz: "Болтаев Олжас Талгатович" }, position: { ru: "Врач спортивной медицины", kz: "Спорт медицинасы дәрігері" }, department: "sportmed", order: 2 },
    { id: "adilbaev", name: { ru: "Адильбаев Бауыржан Клышбекович", kz: "Адильбаев Бауыржан Клышбекович" }, position: { ru: "Врач спортивной медицины", kz: "Спорт медицинасы дәрігері" }, department: "sportmed", order: 3 },

    // Реабилитация
    { id: "aidarbekov", name: { ru: "Айдарбеков Арыс Айдарбекович", kz: "Айдарбеков Арыс Айдарбекұлы" }, position: { ru: "Врач-реабилитолог, мануальный терапевт, специалист по кинезотерапии", kz: "Реабилитолог дәрігер, мануалды терапевт, кинезотерапия саласының маманы" }, department: "rehabilitation", order: 1 },
    { id: "volchkov", name: { ru: "Волчков Сергей Александрович", kz: "Волчков Сергей Александрович" }, position: { ru: "Массажист", kz: "Массажист" }, department: "rehabilitation", order: 2 },
    { id: "kairatbek", name: { ru: "Кайратбек Айгерим", kz: "Қайратбек Айгерім" }, position: { ru: "Врач физической медицины и реабилитации", kz: "Физикалық медицина және реабилитация дәрігері" }, department: "rehabilitation", order: 3 },
    { id: "fayzolda", name: { ru: "Файзолда Марзия", kz: "Файзолда Марзия" }, position: { ru: "Медицинская сестра", kz: "Мейірбике" }, department: "rehabilitation", order: 4 },

    // Средний медицинский персонал
    { id: "tynyshtykova", name: { ru: "Тыныштықова Ляззат Елубаевна", kz: "Тыныштықова Ляззат Елубаевна" }, position: { ru: "Медицинская сестра", kz: "Мейірбике" }, department: "nursing", order: 1 },
    { id: "anes", name: { ru: "Анес Назерке Мендуллаевна", kz: "Анес Назерке Мендуллаевна" }, position: { ru: "Медицинская сестра / Сестринское дело", kz: "Медбике / Сестрин ісі" }, department: "nursing", order: 2 },
    { id: "kolkhozov", name: { ru: "Колхозов Айдар Оразбекович", kz: "Колхозов Айдар Оразбекович" }, position: { ru: "Фельдшер выездной бригады скорой медицинской помощи", kz: "Жедел жәрдем бригадасының фельдшері" }, department: "nursing", order: 3 },
    { id: "burambaeva", name: { ru: "Бурамбаева Зауре Амангельдиновна", kz: "Бурамбаева Зауре Амангельдиновна" }, position: { ru: "Медицинская сестра", kz: "Медициналық мейірбике" }, department: "nursing", order: 4 },

    // Спортивный психолог
    { id: "kozhakhmetova", name: { ru: "Кожахметова Жанна Ербулатовна", kz: "Кожахметова Жанна Ербулатовна" }, position: { ru: "Спортивный психолог", kz: "Спорт психологы" }, department: "psychologist", order: 1 },

    // Прочие специалисты
    { id: "nurgalieva", name: { ru: "Нұрғалиева Зере Тілеубекқызы", kz: "Нұрғалиева Зере Тілеубекқызы" }, position: { ru: "Врач УЗИ", kz: "УДЗ дәрігері" }, department: "other", order: 1 },
    { id: "nugmetollanova", name: { ru: "Нығметолланова Сәния Миржанқызы", kz: "Нығметолланова Сәния Миржанқызы" }, position: { ru: "Врач-эндокринолог", kz: "Эндокринолог дәрігері" }, department: "other", order: 3 },
    { id: "makenqyzy", name: { ru: "Макенқызы Ақерке", kz: "Макенқызы Ақерке" }, position: { ru: "Офтальмолог", kz: "Офтальмолог" }, department: "other", order: 4 },
    { id: "toygulova", name: { ru: "Тойгулова Динара Баймухановна", kz: "Тойгулова Динара Баймухановна" }, position: { ru: "Стоматолог", kz: "Стоматолог" }, department: "other", order: 5 },
    { id: "akhmetova", name: { ru: "Ахметова Гульнара Умурзаковна", kz: "Ахметова Гүлнара Умурзақызы" }, position: { ru: "Врач-оториноларинголог высшей категории", kz: "Жоғары санатты оториноларинголог дәрігері" }, department: "other", order: 6 },
    { id: "erbolatova", name: { ru: "Ерболатова Гульжаухар Мирамбековна", kz: "Ерболатова Гульжаухар Мирамбековна" }, position: { ru: "Кардиолог", kz: "Кардиолог" }, department: "other", order: 7 },
    { id: "nartbaev", name: { ru: "Нартбаев Есмұрат Кажымуханович", kz: "Нартбаев Есмұрат Кажымуханович" }, position: { ru: "Хирург – травматолог", kz: "Хирург – травматолог" }, department: "other", order: 8 },
    { id: "khamitov", name: { ru: "Хамитов Ержан Рахимович", kz: "Хамитов Ержан Рахимұлы" }, position: { ru: "Врач-невролог", kz: "Невролог дәрігері" }, department: "other", order: 9 },
    { id: "utesheva", name: { ru: "Утешева Сауле Шакеновна", kz: "Утешева Сауле Шакеновна" }, position: { ru: "Гинеколог", kz: "Гинеколог" }, department: "other", order: 10 },
    { id: "kokymbaeva", name: { ru: "Қоқымбаева Айгерім Бейбітжанқызы", kz: "Қоқымбаева Айгерім Бейбітжанқызы" }, position: { ru: "Медицинская сестра", kz: "Мейірбике" }, department: "other", order: 12 },
  ];

  // Add all existing doctors to their departments
  doctors.forEach(doctor => {
    // Find if the doctor is in our updated staff list
    const staffMember = staff.find(s => s.id === doctor.id);
    
    if (staffMember) {
      // Use the department from our updated mapping
      const departmentId = staffMember.department;
      if (doctorsByDepartment[departmentId]) {
        doctorsByDepartment[departmentId].push({
          ...doctor,
          department: departmentId,
          order: staffMember.order
        });
      }
    }
  });

  // Add staff who are not already in the doctors array
  staff.forEach(staffMember => {
    const existingDoctor = doctors.find(d => d.id === staffMember.id);
    if (!existingDoctor && doctorsByDepartment[staffMember.department]) {
      doctorsByDepartment[staffMember.department].push({
        id: staffMember.id,
        name: staffMember.name,
        position: staffMember.position,
        department: staffMember.department,
        order: staffMember.order,
        isNewStaff: true // Mark as new staff without detailed info
      });
    }
  });

  // Find Nigmetova Asemgul Altaevna
  const nigmetova = staff.find(s => s.id === 'nigmetova');
  const nigmetovaDoctor = doctors.find(d => d.id === 'nigmetova');
  const nigmetovaData = nigmetovaDoctor
    ? { ...nigmetovaDoctor, ...nigmetova, isNewStaff: false }
    : { ...nigmetova, isNewStaff: true };

  return (
    <div className="space-y-16">
      {/* Special group for Главная медсестра */}
      {nigmetovaData && (
        <div className="mb-12">
          <h2 className="text-2xl font-serif font-bold text-center mb-8">
            {language === 'ru' ? 'Главная медсестра' : 'Бас мейірбике'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
            <Card key={nigmetovaData.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="relative h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
                {nigmetovaData && 'image' in nigmetovaData && nigmetovaData.image ? (
                  <img 
                    src={nigmetovaData.image} 
                    alt={nigmetovaData.name[language]} 
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <User size={64} className="text-gray-400" />
                )}
              </div>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-2">{nigmetovaData.name[language]}</h3>
                <p className="text-gray-600 text-sm mb-4">{nigmetovaData.position[language]}</p>
                {'experience' in nigmetovaData && nigmetovaData.experience && (
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <span className="font-medium mr-2">{language === 'ru' ? 'Стаж:' : 'Тәжірибе:'}</span>
                    <span>{nigmetovaData.experience[language]}</span>
                  </div>
                )}
                {/* Only show More button for doctors with detailed info */}
                {!nigmetovaData.isNewStaff && (
                  <Button 
                    onClick={() => onSelectDoctor(nigmetovaData.id)} 
                    variant="outline" 
                    className="w-full"
                  >
                    {language === 'ru' ? 'Подробнее' : 'Толығырақ'}
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      )}
      {/* Display each department with its staff */}
      {departments
        .filter(dept => doctorsByDepartment[dept.id] && doctorsByDepartment[dept.id].length > 0)
        .sort((a, b) => a.order - b.order)
        .map((department) => (
          <div key={department.id} className="mb-12">
            <h2 className="text-2xl font-serif font-bold text-center mb-8">
              {language === 'ru' ? department.nameRu : department.nameKz}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {doctorsByDepartment[department.id]
                .sort((a, b) => (a.order || 999) - (b.order || 999))
                .map((doctor) => (
                <Card key={doctor.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="relative h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
                    {doctor.image ? (
                      <img 
                        src={doctor.image} 
                        alt={doctor.name[language]} 
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <User size={64} className="text-gray-400" />
                    )}
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-2">{doctor.name[language]}</h3>
                    <p className="text-gray-600 text-sm mb-4">{doctor.position[language]}</p>
                    {doctor.experience && (
                      <div className="flex items-center text-sm text-gray-500 mb-4">
                        <span className="font-medium mr-2">{language === 'ru' ? 'Стаж:' : 'Тәжірибе:'}</span>
                        <span>{doctor.experience[language]}</span>
                      </div>
                    )}
                    {/* Only show More button for doctors with detailed info */}
                    {!doctor.isNewStaff && (
                      <Button 
                        onClick={() => onSelectDoctor(doctor.id)} 
                        variant="outline" 
                        className="w-full"
                      >
                        {language === 'ru' ? 'Подробнее' : 'Толығырақ'}
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
    </div>
  );
};

export default TeamList;
