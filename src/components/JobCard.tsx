
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { JobListing } from '@/lib/types';
import { jobCategories, timeSlots } from '@/lib/data';

interface JobCardProps {
  job: JobListing;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const category = jobCategories.find(cat => cat.id === job.category);
  const timeSlot = timeSlots.find(slot => slot.id === job.timeSlot);
  
  const totalPay = job.hourlyRate * job.duration;
  
  return (
    <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold text-lg mb-1">{job.title}</h3>
            <p className="text-gray-600 text-sm mb-2">{job.company}</p>
          </div>
          <span className="text-sm bg-mijob-blue/10 text-mijob-blue px-2 py-1 rounded-full">
            {category?.icon} {category?.label}
          </span>
        </div>
        
        <div className="mt-4 space-y-2">
          <div className="flex items-center text-gray-600">
            <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-sm">{job.location}</span>
          </div>
          
          <div className="flex items-center text-gray-600">
            <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm">{job.duration} ore • {timeSlot?.label}</span>
          </div>
          
          <div className="flex items-center text-gray-600">
            <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-sm">{new Date(job.date).toLocaleDateString('it-IT', { day: 'numeric', month: 'long' })}</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="bg-gray-50 px-6 py-4 flex justify-between items-center">
        <div>
          <span className="text-mijob-orange font-medium">{job.hourlyRate}€/ora</span>
          <span className="text-gray-500 text-sm ml-1">• {totalPay}€ totali</span>
        </div>
        
        <Link 
          to={`/job/${job.id}`} 
          className="text-sm font-medium text-mijob-blue hover:text-mijob-blue/80 transition-colors"
        >
          Vedi dettagli
        </Link>
      </CardFooter>
    </Card>
  );
};

export default JobCard;
