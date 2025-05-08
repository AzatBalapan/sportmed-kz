
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

  // Define departments
  const departments: Department[] = [
    { id: 'management', nameRu: 'Управленческий персонал', nameKz: 'Басқару қызметкерлері', order: 1 },
    { id: 'accounting', nameRu: 'Отдел учета и планирования', nameKz: 'Есеп және жоспарлау бөлімі', order: 2 },
    { id: 'legal', nameRu: 'Правовой и кадровый отдел', nameKz: 'Құқық және кадр бөлімі', order: 3 },
    { id: 'administrative', nameRu: 'Административно-хозяйственный отдел', nameKz: 'Әкімшілік-шаруашылық бөлім', order: 4 },
    { id: 'methodical', nameRu: 'Организационно-методический отдел', nameKz: 'Ұйымдастыру-әдістемелік бөлім', order: 5 },
    { id: 'nursing', nameRu: 'Главная медицинская сестра', nameKz: 'Бас мейірбике', order: 6 },
    { id: 'sports-medicine', nameRu: 'Отделение спортивной медицины и медико-биологического обеспечения', nameKz: 'Спорт медицинасы және медициналық-биологиялық қамтамасыз ету бөлімі', order: 7 },
    { id: 'specialists', nameRu: 'Отделение специалистов по профилю', nameKz: 'Мамандандырылған дәрігерлер бөлімі', order: 8 },
    { id: 'diagnostics', nameRu: 'Отделении функциональной диагностики', nameKz: 'Функционалды диагностика бөлімі', order: 9 },
    { id: 'physiotherapy', nameRu: 'Отделение физиотерапии, лечебной физкультуры и массажа', nameKz: 'Физиотерапия, емдік дене шынықтыру және массаж бөлімі', order: 10 },
    { id: 'mid-medical', nameRu: 'Средний медперсонал', nameKz: 'Орта медицина қызметкерлері', order: 11 },
  ];

  // Group doctors by department
  const doctorsByDepartment: { [key: string]: any[] } = {};
  
  // Initialize empty arrays for each department
  departments.forEach(dept => {
    doctorsByDepartment[dept.id] = [];
  });

  // Add doctors to their departments
  doctors.forEach(doctor => {
    if (doctor.department) {
      if (doctorsByDepartment[doctor.department]) {
        doctorsByDepartment[doctor.department].push(doctor);
      } else {
        // Default to specialists if no valid department
        doctorsByDepartment['specialists'].push(doctor);
      }
    } else {
      // For backwards compatibility with existing data
      doctorsByDepartment['specialists'].push(doctor);
    }
  });

  // Add people from the provided template who aren't in the doctors array
  const additionalStaff = [
    // Management
    { id: "nurmatov", name: { ru: "Нурматов Азамат Басимбекович", kz: "Нурматов Азамат Басимбекович" }, position: { ru: "Руководитель", kz: "Басшы" }, department: "management" },
    { id: "abduhadirov", name: { ru: "Абдыхадиров Данияр Нурланович", kz: "Абдыхадиров Данияр Нурланович" }, position: { ru: "Заместитель руководителя по медицинской части", kz: "Медицина бөлімі жөніндегі басшының орынбасары" }, department: "management" },
    { id: "tuyebayev", name: { ru: "Туйебаев Ашим Еркинович", kz: "Туйебаев Ашим Еркинович" }, position: { ru: "Заместитель руководителя по административно-экономической части", kz: "Әкімшілік-экономикалық бөлімі жөніндегі басшының орынбасары" }, department: "management" },
    { id: "tazhiyeva", name: { ru: "Тажиева Айжан Альпикызы", kz: "Тажиева Айжан Альпикызы" }, position: { ru: "Комплаенс-офицер", kz: "Комплаенс-офицер" }, department: "management" },
    
    // Accounting
    { id: "bekmukhambet", name: { ru: "Бекмухамбет Салтанат", kz: "Бекмухамбет Салтанат" }, position: { ru: "Главный бухгалтер", kz: "Бас бухгалтер" }, department: "accounting" },
    { id: "alibayev", name: { ru: "Алибаев Миргалим Серикович", kz: "Алибаев Миргалим Серикович" }, position: { ru: "Экономист", kz: "Экономист" }, department: "accounting" },
    { id: "zhumukova", name: { ru: "Жумукова Жибек Бериковна", kz: "Жумукова Жибек Бериковна" }, position: { ru: "Бухгалтер", kz: "Бухгалтер" }, department: "accounting" },
    
    // Legal
    { id: "alpysbekov", name: { ru: "Алпысбеков Бауыржан Кайыржанович", kz: "Алпысбеков Бауыржан Кайыржанович" }, position: { ru: "Менеджер по государственным закупкам", kz: "Мемлекеттік сатып алу жөніндегі менеджер" }, department: "legal" },
    { id: "soltanbek", name: { ru: "Солтанбек Айгерім Нұрмағамбетқызы", kz: "Солтанбек Айгерім Нұрмағамбетқызы" }, position: { ru: "Делопроизводитель", kz: "Іс-қағаздар жүргізуші" }, department: "legal" },
    
    // Administrative
    { id: "sarbasov", name: { ru: "Сарбасов Самат Амирович", kz: "Сарбасов Самат Амирович" }, position: { ru: "Администратор", kz: "Әкімші" }, department: "administrative" },
    { id: "balapan", name: { ru: "Балапан Азат Берікжанұлы", kz: "Балапан Азат Берікжанұлы" }, position: { ru: "Специалист по ІТ", kz: "ІТ маман" }, department: "administrative" },
    { id: "riskeldina", name: { ru: "Рыскельдина Таңшолпан Айманатқызы", kz: "Рыскельдина Таңшолпан Айманатқызы" }, position: { ru: "Секретарь-референт", kz: "Хатшы-референт" }, department: "administrative" },
    { id: "ortbayeva", name: { ru: "Ортбаева Лаура Серикказыкызы", kz: "Ортбаева Лаура Серикказыкызы" }, position: { ru: "Санитар", kz: "Санитар" }, department: "administrative" },
    
    // Chief nurse
    { id: "nigmetova", name: { ru: "Нигметова Асемгуль Алтаевна", kz: "Нигметова Асемгуль Алтаевна" }, position: { ru: "Главная медсестра", kz: "Бас мейірбике" }, department: "nursing" },
    
    // Middle medical personnel
    { id: "tynyshtykova", name: { ru: "Тыныштықова Ләззат Елубайқызы", kz: "Тыныштықова Ләззат Елубайқызы" }, position: { ru: "Медицинская сестра", kz: "Мейірбике" }, department: "mid-medical" },
    { id: "kokymbaeva", name: { ru: "Қоқымбаева Айгерім Бейбітжанқызы", kz: "Қоқымбаева Айгерім Бейбітжанқызы" }, position: { ru: "Медицинская сестра", kz: "Мейірбике" }, department: "mid-medical" },
    { id: "fayzolda", name: { ru: "Файзолда Марзия", kz: "Файзолда Марзия" }, position: { ru: "Медицинская сестра", kz: "Мейірбике" }, department: "mid-medical" },
    { id: "tolegenova", name: { ru: "Толегенова Булбул Тлеубаевна", kz: "Толегенова Булбул Тлеубаевна" }, position: { ru: "Медицинская сестра", kz: "Мейірбике" }, department: "mid-medical" },
    { id: "volchkov", name: { ru: "Волчков Сергей Александрович", kz: "Волчков Сергей Александрович" }, position: { ru: "Массажист", kz: "Массажист" }, department: "mid-medical" },
  ];

  // Add staff who are not already in the doctors array
  additionalStaff.forEach(staff => {
    const existingDoctor = doctors.find(d => d.id === staff.id);
    if (!existingDoctor && doctorsByDepartment[staff.department]) {
      doctorsByDepartment[staff.department].push({
        id: staff.id,
        name: staff.name,
        position: staff.position,
        department: staff.department,
        isNewStaff: true // Mark as new staff without detailed info
      });
    }
  });

  return (
    <div className="space-y-16">
      {/* Display each department with its staff */}
      {departments
        .filter(dept => doctorsByDepartment[dept.id].length > 0)
        .sort((a, b) => a.order - b.order)
        .map((department) => (
          <div key={department.id} className="mb-12">
            <h2 className="text-2xl font-serif font-bold text-center mb-8">
              {language === 'ru' ? department.nameRu : department.nameKz}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {doctorsByDepartment[department.id].map((doctor) => (
                <Card key={doctor.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="relative h-48 bg-gray-200 flex items-center justify-center">
                    {doctor.image ? (
                      <img 
                        src={doctor.image} 
                        alt={doctor.name[language]} 
                        className="w-full h-full object-cover"
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
