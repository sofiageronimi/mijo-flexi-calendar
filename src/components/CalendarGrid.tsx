
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { JobListing } from '@/lib/types';
import { timeSlots } from '@/lib/data';

interface CalendarGridProps {
  month: Date;
  jobs: JobListing[];
}

const CalendarGrid: React.FC<CalendarGridProps> = ({ month: initialMonth, jobs }) => {
  const [currentMonth, setCurrentMonth] = useState(initialMonth);

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth(prevMonth => {
      const newMonth = new Date(prevMonth);
      if (direction === 'next') {
        newMonth.setMonth(newMonth.getMonth() + 1);
      } else {
        newMonth.setMonth(newMonth.getMonth() - 1);
      }
      return newMonth;
    });
  };

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
  
  const days = getDaysInMonth(currentMonth);
  
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();
  const startOffset = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
  
  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };
  
  const categoryColors: { [key: string]: string } = {
    hospitality: 'bg-[#9b87f5] text-white',
    retail: 'bg-[#F97316] text-white',
    events: 'bg-[#D946EF] text-white',
    tutoring: 'bg-[#0EA5E9] text-white',
    delivery: 'bg-[#33C3F0] text-white',
    office: 'bg-[#8B5CF6] text-white',
    customer_service: 'bg-[#1EAEDB] text-white',
    other: 'bg-gray-500 text-white'
  };

  // Debug logs
  console.log("CalendarGrid received jobs:", jobs);
  console.log("Month:", currentMonth);

  return (
    <div className="mt-6">
      <Card className="border rounded-lg overflow-hidden">
        <CardHeader className="bg-gray-50 border-b">
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              size="icon"
              onClick={() => navigateMonth('prev')}
              className="h-8 w-8"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <CardTitle className="text-xl">
              {currentMonth.toLocaleDateString('it-IT', { month: 'long', year: 'numeric' })}
            </CardTitle>
            <Button
              variant="outline"
              size="icon"
              onClick={() => navigateMonth('next')}
              className="h-8 w-8"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
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
            {Array.from({ length: startOffset }).map((_, index) => (
              <div key={`empty-start-${index}`} className="min-h-[120px] p-1 border-t border-r"></div>
            ))}
            
            {days.map((day) => {
              const dateString = formatDate(day);
              const dayJobs = jobs.filter(job => job.date === dateString);
              const isToday = new Date().toDateString() === day.toDateString();
              
              return (
                <div
                  key={dateString}
                  className={`min-h-[120px] p-1 border-t border-r relative ${
                    isToday ? 'bg-mijob-blue/5' : ''
                  }`}
                >
                  <div className={`text-right p-1 ${isToday ? 'font-bold text-mijob-blue' : ''}`}>
                    {day.getDate()}
                  </div>
                  
                  <div className="mt-1 space-y-1 max-h-[100px] overflow-y-auto">
                    {dayJobs && dayJobs.length > 0 ? (
                      dayJobs.map((job) => {
                        const timeSlot = timeSlots.find(slot => slot.id === job.timeSlot);
                        const categoryColor = categoryColors[job.category] || categoryColors.other;
                        const durationText = job.duration === 1 ? 'ora' : 'ore';
                        
                        return (
                          <div
                            key={job.id}
                            className={`
                              text-xs p-1 rounded ${categoryColor} 
                              transition-all hover:opacity-90 cursor-pointer
                              animate-fade-in
                            `}
                            title={`${job.title} - ${job.company} - ${job.hourlyRate}€/ora`}
                          >
                            <div className="font-medium truncate">{job.title}</div>
                            <div className="text-[10px] opacity-90">
                              {timeSlot?.timeRange || ''} • {job.duration} {durationText}
                            </div>
                            <div className="text-[10px] truncate opacity-90">{job.company}</div>
                            <div className="text-[10px] font-medium">{job.hourlyRate}€/h</div>
                          </div>
                        );
                      })
                    ) : (
                      <div className="text-[10px] text-gray-400 text-center mt-2">
                        Nessun lavoro
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
            
            {Array.from({ length: (7 - ((days.length + startOffset) % 7)) % 7 }).map((_, index) => (
              <div key={`empty-end-${index}`} className="min-h-[120px] p-1 border-t border-r"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CalendarGrid;

