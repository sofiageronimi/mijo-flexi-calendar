
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { format, addDays, eachDayOfInterval, isSameDay } from 'date-fns';
import { DayAvailability, JobCategory } from '@/lib/types';
import { jobCategories } from '@/lib/data';
import TimeSelector from './TimeSelector';

interface AvailabilityFormProps {
  onSubmit: (formData: {
    availability: DayAvailability[];
    monthlyGoal: number;
    preferredCategories: JobCategory[];
  }) => void;
}

const AvailabilityForm: React.FC<AvailabilityFormProps> = ({ onSubmit }) => {
  const [startDate] = useState<Date>(new Date());
  const [endDate] = useState<Date>(addDays(new Date(), 30));
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [availability, setAvailability] = useState<DayAvailability[]>([]);
  const [monthlyGoal, setMonthlyGoal] = useState<number>(500);
  const [preferredCategories, setPreferredCategories] = useState<JobCategory[]>([]);
  
  const days = eachDayOfInterval({
    start: startDate,
    end: endDate,
  });
  
  const formatDateString = (date: Date): string => {
    return format(date, 'yyyy-MM-dd');
  };
  
  const handleDateClick = (date: Date) => {
    // Toggle date selection
    if (selectedDates.some(d => isSameDay(d, date))) {
      setSelectedDates(selectedDates.filter(d => !isSameDay(d, date)));
    } else {
      setSelectedDates([...selectedDates, date]);
    }
  };
  
  const handleAvailabilityChange = (updatedAvailability: DayAvailability[]) => {
    setAvailability(updatedAvailability);
  };
  
  const handleCategoryToggle = (category: JobCategory) => {
    if (preferredCategories.includes(category)) {
      setPreferredCategories(preferredCategories.filter(c => c !== category));
    } else {
      setPreferredCategories([...preferredCategories, category]);
    }
  };
  
  const handleSubmit = () => {
    onSubmit({
      availability,
      monthlyGoal,
      preferredCategories,
    });
  };
  
  // Group dates by weeks for calendar display
  const weeks: Date[][] = [];
  let currentWeek: Date[] = [];
  
  days.forEach((day, index) => {
    const dayOfWeek = day.getDay();
    const adjustedDayOfWeek = dayOfWeek === 0 ? 6 : dayOfWeek - 1; // Adjust to have Monday as 0
    
    if (adjustedDayOfWeek === 0 && index !== 0) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
    
    currentWeek.push(day);
    
    if (index === days.length - 1) {
      weeks.push(currentWeek);
    }
  });
  
  // Pad first week with null values for empty days
  const firstDayOfWeek = days[0].getDay();
  const adjustedFirstDay = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;
  weeks[0] = [...Array(adjustedFirstDay).fill(null), ...weeks[0]];
  
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Seleziona i giorni disponibili</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="grid grid-cols-7 gap-1 text-center mb-2">
              {['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'].map(day => (
                <div key={day} className="text-sm font-medium">
                  {day}
                </div>
              ))}
            </div>
            
            {weeks.map((week, weekIndex) => (
              <div key={weekIndex} className="grid grid-cols-7 gap-1 mb-1">
                {week.map((day, dayIndex) => {
                  if (!day) return <div key={`empty-${dayIndex}`} />;
                  
                  const isSelected = selectedDates.some(d => isSameDay(d, day));
                  const isToday = isSameDay(day, new Date());
                  
                  return (
                    <button
                      key={formatDateString(day)}
                      type="button"
                      onClick={() => handleDateClick(day)}
                      className={`
                        aspect-square flex items-center justify-center rounded-md text-sm
                        transition-colors focus:outline-none focus:ring-2 focus:ring-mijob-blue
                        ${isToday ? 'border border-mijob-blue' : ''}
                        ${
                          isSelected
                            ? 'bg-mijob-blue text-white'
                            : 'hover:bg-gray-100'
                        }
                      `}
                    >
                      {format(day, 'd')}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {selectedDates.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Imposta la tua disponibilità oraria</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {selectedDates.map(date => (
                <TimeSelector
                  key={formatDateString(date)}
                  date={formatDateString(date)}
                  availability={availability}
                  onAvailabilityChange={handleAvailabilityChange}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      )}
      
      <Card>
        <CardHeader>
          <CardTitle>Imposta il tuo obiettivo economico</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="monthlyGoal">Quanto vorresti guadagnare questo mese?</Label>
              <div className="relative mt-1">
                <Input
                  id="monthlyGoal"
                  type="number"
                  min={0}
                  value={monthlyGoal}
                  onChange={(e) => setMonthlyGoal(Number(e.target.value))}
                  className="pl-8"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <span className="text-gray-500">€</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Categorie di lavoro preferite</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {jobCategories.map(category => (
              <div key={category.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`category-${category.id}`}
                  checked={preferredCategories.includes(category.id)}
                  onCheckedChange={() => handleCategoryToggle(category.id)}
                />
                <Label htmlFor={`category-${category.id}`} className="cursor-pointer">
                  <span className="mr-1">{category.icon}</span> {category.label}
                </Label>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            onClick={handleSubmit} 
            className="w-full bg-mijob-orange hover:bg-mijob-orange/90"
            disabled={availability.length === 0 || preferredCategories.length === 0}
          >
            Genera calendario
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AvailabilityForm;
