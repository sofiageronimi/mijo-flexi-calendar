
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { JobListing } from '@/lib/types';
import { timeSlots } from '@/lib/data';

interface CalendarGridProps {
  month: Date;
  jobs: JobListing[];
}

const CalendarGrid: React.FC<CalendarGridProps> = ({ month, jobs }) => {
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    const days = [];
    for (let i = 1; i <= daysInMonth; i++) {
      const currentDate = new Date(year, month, i);
      days.push(currentDate);
    }
    
    return days;
  };
  
  const days = getDaysInMonth(month);
  
  // Get the first day of the month to determine the starting point
  const firstDayOfMonth = new Date(month.getFullYear(), month.getMonth(), 1).getDay();
  // Adjust for Sunday as 0
  const startOffset = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
  
  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };
  
  return (
    <div className="mt-6">
      <Card className="border rounded-lg overflow-hidden">
        <CardHeader className="bg-gray-50 border-b">
          <CardTitle className="text-xl">
            {month.toLocaleDateString('it-IT', { month: 'long', year: 'numeric' })}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="grid grid-cols-7 text-sm">
            {['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'].map(day => (
              <div key={day} className="py-2 font-medium text-center border-b">
                {day}
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-7">
            {/* Empty cells for days before the 1st of the month */}
            {Array.from({ length: startOffset }).map((_, index) => (
              <div key={`empty-start-${index}`} className="min-h-[100px] p-1 border-t border-r"></div>
            ))}
            
            {/* Calendar days */}
            {days.map((day) => {
              const dateString = formatDate(day);
              const dayJobs = jobs.filter(job => job.date === dateString);
              const isToday = new Date().toDateString() === day.toDateString();
              
              return (
                <div
                  key={dateString}
                  className={`min-h-[100px] p-1 border-t border-r relative ${
                    isToday ? 'bg-mijob-blue/5' : ''
                  }`}
                >
                  <div className={`text-right p-1 ${isToday ? 'font-bold text-mijob-blue' : ''}`}>
                    {day.getDate()}
                  </div>
                  
                  <div className="mt-1 space-y-1">
                    {dayJobs.map((job) => {
                      const timeSlot = timeSlots.find(slot => slot.id === job.timeSlot);
                      
                      return (
                        <div
                          key={job.id}
                          className="text-xs p-1 rounded bg-mijob-blue/10 text-mijob-blue truncate"
                          title={`${job.title} - ${job.company} - ${job.hourlyRate}€/ora`}
                        >
                          <div className="font-medium truncate">{job.title}</div>
                          <div>{timeSlot?.timeRange} • {job.hourlyRate}€/h</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
            
            {/* Empty cells for days after the last day of the month */}
            {Array.from({ length: (7 - ((days.length + startOffset) % 7)) % 7 }).map((_, index) => (
              <div key={`empty-end-${index}`} className="min-h-[100px] p-1 border-t border-r"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CalendarGrid;
