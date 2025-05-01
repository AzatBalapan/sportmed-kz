
import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User } from 'lucide-react';
import { doctors } from '@/data/doctors';

interface TeamListProps {
  onSelectDoctor: (doctorId: string) => void;
}

const TeamList: React.FC<TeamListProps> = ({ onSelectDoctor }) => {
  const { language } = useLanguage();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {doctors.map((doctor) => (
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
            <div className="flex items-center text-sm text-gray-500 mb-4">
              <span className="font-medium mr-2">{language === 'ru' ? 'Стаж:' : 'Тәжірибе:'}</span>
              <span>{doctor.experience[language]}</span>
            </div>
            <Button 
              onClick={() => onSelectDoctor(doctor.id)} 
              variant="outline" 
              className="w-full"
            >
              {language === 'ru' ? 'Подробнее' : 'Толығырақ'}
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default TeamList;
