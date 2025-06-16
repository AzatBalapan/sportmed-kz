
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

  // Define departments - only management and medical staff
  const departments: Department[] = [
    { id: 'management', nameRu: 'Управленческий персонал', nameKz: 'Басқару қызметкерлері', order: 1 },
    { id: 'medical-staff', nameRu: 'Медицинский персонал', nameKz: 'Медициналық қызметкерлер', order: 2 },
  ];

  // Group doctors by department
  const doctorsByDepartment: { [key: string]: any[] } = {};
  
  // Initialize empty arrays for each department
  departments.forEach(dept => {
    doctorsByDepartment[dept.id] = [];
  });

  // Define staff with proper hierarchy - Тажиева removed, Абдыхадиров moved to management, Толегенова removed
  const staff = [
    // Management
    { id: "nurmatov", name: { ru: "Нурматов Азамат Басимбекович", kz: "Нурматов Азамат Басимбекович" }, position: { ru: "Руководитель", kz: "Басшы" }, department: "management", order: 1 },
    { id: "tuyebayev", name: { ru: "Туйебаев Ашим Еркинович", kz: "Туйебаев Ашим Еркинович" }, position: { ru: "Заместитель руководителя по административно-экономической части", kz: "Әкімшілік-экономикалық бөлімі жөніндегі басшының орынбасары" }, department: "management", order: 2 },
    { id: "abduhadirov", name: { ru: "Абдыхадиров Данияр Нурланович", kz: "Абдыхадиров Данияр Нурланович" }, position: { ru: "Заместитель руководителя по медицинской части", kz: "Медицина бөлімі жөніндегі басшының орынбасары" }, department: "management", order: 3 },
    
    // Medical Staff - with Жиенгазина А.Н. as first
    { id: "zhiengazina", name: { ru: "Жиенгазина А.Н.", kz: "Жиенгазина А.Н." }, position: { ru: "Заведующая отделом", kz: "Бөлім меңгерушісі" }, department: "medical-staff", order: 1 },
    { id: "nurgalieva", name: { ru: "Нұрғалиева Зере Тілеубекқызы", kz: "Нұрғалиева Зере Тілеубекқызы" }, position: { ru: "Врач УЗИ", kz: "УДЗ дәрігері" }, department: "medical-staff", order: 2 },
    { id: "nigmetova", name: { ru: "Нигметова Асемгуль Алтаевна", kz: "Нигметова Асемгуль Алтаевна" }, position: { ru: "Главная медсестра", kz: "Бас мейірбике" }, department: "medical-staff", order: 3 },
    { id: "nygmetollanova", name: { ru: "Нығметолланова Сәния Миржанқызы", kz: "Нығметолланова Сәния Миржанқызы" }, position: { ru: "Эндокринолог", kz: "Эндокринолог" }, department: "medical-staff", order: 4 },
    { id: "makenqyzy", name: { ru: "Макенқызы Ақерке", kz: "Макенқызы Ақерке" }, position: { ru: "Офтальмолог", kz: "Офтальмолог" }, department: "medical-staff", order: 5 },
    { id: "toygulova", name: { ru: "Тойгулова Динара Баймухановна", kz: "Тойгулова Динара Баймухановна" }, position: { ru: "Стоматолог", kz: "Стоматолог" }, department: "medical-staff", order: 6 },
    { id: "akhmetova", name: { ru: "Ахметова Гульнара Умурзаковна", kz: "Ахметова Гульнара Умурзаковна" }, position: { ru: "Оториноларинголог", kz: "Оториноларинголог" }, department: "medical-staff", order: 7 },
    { id: "erbolatova", name: { ru: "Ерболатова Гульжаухар Мирамбековна", kz: "Ерболатова Гульжаухар Мирамбековна" }, position: { ru: "Кардиолог", kz: "Кардиолог" }, department: "medical-staff", order: 8 },
    { id: "nartbaev", name: { ru: "Нартбаев Есмұрат Кажымуханович", kz: "Нартбаев Есмұрат Кажымуханович" }, position: { ru: "Хирург – травматолог", kz: "Хирург – травматолог" }, department: "medical-staff", order: 9 },
    { id: "khamitov", name: { ru: "Хамитов Ержан Рахимович", kz: "Хамитов Ержан Рахимович" }, position: { ru: "Невролог", kz: "Невролог" }, department: "medical-staff", order: 10 },
    { id: "utesheva", name: { ru: "Утешева Сауле Шакеновна", kz: "Утешева Сауле Шакеновна" }, position: { ru: "Гинеколог", kz: "Гинеколог" }, department: "medical-staff", order: 11 },
    { id: "kairatbek", name: { ru: "Кайратбек Айгерим", kz: "Кайратбек Айгерим" }, position: { ru: "Врач", kz: "Дәрігер" }, department: "medical-staff", order: 12 },
    { id: "adilbaev", name: { ru: "Адільбаев Бауыржан Клышбекович", kz: "Адільбаев Бауыржан Клышбекович" }, position: { ru: "Врач спортивной медицины", kz: "Спорт медицинасы дәрігері" }, department: "medical-staff", order: 13 },
    { id: "kozhakhmetova", name: { ru: "Кожахметова Жанна Ербулатовна", kz: "Кожахметова Жанна Ербулатовна" }, position: { ru: "Спортивный психолог", kz: "Спорт психологы" }, department: "medical-staff", order: 14 },
    { id: "aidarbekkov", name: { ru: "Айдарбеков Арыс Айдарбекұлы", kz: "Айдарбеков Арыс Айдарбекұлы" }, position: { ru: "Врач", kz: "Дәрігер" }, department: "medical-staff", order: 15 },
    { id: "boltaev", name: { ru: "Болтаев Олжас Талгатович", kz: "Болтаев Олжас Талгатович" }, position: { ru: "Врач спортивной медицины", kz: "Спорт медицинасы дәрігері" }, department: "medical-staff", order: 16 },
    
    // Nursing staff included in medical-staff (Толегенова removed)
    { id: "tynyshtykova", name: { ru: "Тыныштықова Ләззат Елубайқызы", kz: "Тыныштықова Ләззат Елубайқызы" }, position: { ru: "Медицинская сестра", kz: "Мейірбике" }, department: "medical-staff", order: 17 },
    { id: "kokymbaeva", name: { ru: "Қоқымбаева Айгерім Бейбітжанқызы", kz: "Қоқымбаева Айгерім Бейбітжанқызы" }, position: { ru: "Медицинская сестра", kz: "Мейірбике" }, department: "medical-staff", order: 18 },
    { id: "fayzolda", name: { ru: "Файзолда Марзия", kz: "Файзолда Марзия" }, position: { ru: "Медицинская сестра", kz: "Мейірбике" }, department: "medical-staff", order: 19 },
    { id: "volchkov", name: { ru: "Волчков Сергей Александрович", kz: "Волчков Сергей Александрович" }, position: { ru: "Массажист", kz: "Массажист" }, department: "medical-staff", order: 20 },
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

  return (
    <div className="space-y-16">
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
                        className="w-full h-full object-cover object-top"
                        style={{ objectPosition: 'center top' }}
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
