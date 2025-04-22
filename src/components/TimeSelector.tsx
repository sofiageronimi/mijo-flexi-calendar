
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { DayAvailability, TimeSlot } from '@/lib/types';
import { timeSlots } from '@/lib/data';

interface TimeSelectorProps {
  date: string;
  availability: DayAvailability[];
  onAvailabilityChange: (updatedAvailability: DayAvailability[]) => void;
}

const TimeSelector: React.FC<TimeSelectorProps> = ({
  date,
  availability,
  onAvailabilityChange,
}) => {
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
    };
    return new Date(dateString).toLocaleDateString('it-IT', options);
  };

  const currentDayAvailability = availability.find(day => day.date === date) || {
    date,
    availableSlots: [],
  };

  const handleTimeSlotChange = (slot: TimeSlot) => {
    const isSelected = currentDayAvailability.availableSlots.includes(slot);
    
    let updatedAvailability: DayAvailability[];
    
    if (isSelected) {
      // Remove slot if already selected
      const updatedSlots = currentDayAvailability.availableSlots.filter(s => s !== slot);
      
      if (updatedSlots.length === 0) {
        // If no slots left, remove the whole day
        updatedAvailability = availability.filter(day => day.date !== date);
      } else {
        // Update slots for this day
        updatedAvailability = availability.map(day => 
          day.date === date ? { ...day, availableSlots: updatedSlots } : day
        );
      }
    } else {
      // Add slot if not already selected
      if (availability.some(day => day.date === date)) {
        // Day exists, add slot to it
        updatedAvailability = availability.map(day => 
          day.date === date 
            ? { ...day, availableSlots: [...day.availableSlots, slot] } 
            : day
        );
      } else {
        // Day doesn't exist, add it with the new slot
        updatedAvailability = [
          ...availability,
          { date, availableSlots: [slot] }
        ];
      }
    }
    
    onAvailabilityChange(updatedAvailability);
  };

  return (
    <Card className="p-4">
      <div className="font-medium mb-3">{formatDate(date)}</div>
      <div className="space-y-2">
        {timeSlots.map(slot => (
          <div key={slot.id} className="flex items-center space-x-2">
            <Checkbox 
              id={`${date}-${slot.id}`} 
              checked={currentDayAvailability.availableSlots.includes(slot.id as TimeSlot)}
              onCheckedChange={() => handleTimeSlotChange(slot.id as TimeSlot)} 
            />
            <Label 
              htmlFor={`${date}-${slot.id}`}
              className="text-sm flex justify-between w-full cursor-pointer"
            >
              <span>{slot.label}</span>
              <span className="text-gray-500">{slot.timeRange}</span>
            </Label>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default TimeSelector;
