
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { mockJobs, jobCategories, timeSlots } from '@/lib/data';

const JobDetail = () => {
  const { id } = useParams<{ id: string }>();
  const job = mockJobs.find(job => job.id === id);
  
  if (!job) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow py-12 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl font-bold mb-4">Offerta non trovata</h1>
            <p className="text-gray-600 mb-6">L'offerta di lavoro che stai cercando non è disponibile o è stata rimossa.</p>
            <Link to="/jobs">
              <Button>Torna alle offerte</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  const category = jobCategories.find(cat => cat.id === job.category);
  const timeSlot = timeSlots.find(slot => slot.id === job.timeSlot);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-8 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="mb-6">
            <Link to="/jobs" className="text-mijob-blue hover:underline inline-flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Torna alle offerte
            </Link>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6 md:p-8 mb-8">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold mb-2">{job.title}</h1>
                <p className="text-gray-600 text-lg">{job.company}</p>
              </div>
              <div className="mt-4 md:mt-0 text-right">
                <span className="inline-block bg-mijob-blue/10 text-mijob-blue px-3 py-1 rounded-full text-sm font-medium">
                  {category?.icon} {category?.label}
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="flex flex-col">
                <span className="text-gray-600 text-sm mb-1">Retribuzione</span>
                <span className="text-xl font-semibold text-mijob-orange">{job.hourlyRate}€/ora</span>
                <span className="text-gray-600 text-sm">{job.hourlyRate * job.duration}€ totali</span>
              </div>
              
              <div className="flex flex-col">
                <span className="text-gray-600 text-sm mb-1">Durata</span>
                <span className="text-xl font-semibold">{job.duration} ore</span>
                <span className="text-gray-600 text-sm">{timeSlot?.label} ({timeSlot?.timeRange})</span>
              </div>
              
              <div className="flex flex-col">
                <span className="text-gray-600 text-sm mb-1">Data</span>
                <span className="text-xl font-semibold">
                  {new Date(job.date).toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' })}
                </span>
              </div>
            </div>
            
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-3">Descrizione</h2>
              <p className="text-gray-700">{job.description}</p>
            </div>
            
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-3">Requisiti</h2>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                {job.requirements.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </div>
            
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-3">Luogo</h2>
              <p className="text-gray-700">{job.location}</p>
              <div className="h-40 bg-gray-200 rounded-lg mt-3">
                <div className="h-full flex items-center justify-center text-gray-500">
                  Mappa del luogo di lavoro
                </div>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row gap-4">
              <a href={job.applicationUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
                <Button className="w-full bg-mijob-orange hover:bg-mijob-orange/90">
                  Candidati ora
                </Button>
              </a>
              <Link to="/calendar" className="flex-1">
                <Button variant="outline" className="w-full">
                  Aggiungi al calendario
                </Button>
              </Link>
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-4">Altre offerte simili</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {mockJobs
                .filter(j => j.id !== job.id && j.category === job.category)
                .slice(0, 3)
                .map(similarJob => (
                  <Card key={similarJob.id} className="overflow-hidden hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <h3 className="font-semibold mb-1">{similarJob.title}</h3>
                      <p className="text-gray-600 text-sm mb-2">{similarJob.company}</p>
                      <div className="flex justify-between items-center mt-3">
                        <span className="text-mijob-orange font-medium">{similarJob.hourlyRate}€/ora</span>
                        <Link 
                          to={`/job/${similarJob.id}`} 
                          className="text-sm font-medium text-mijob-blue hover:underline"
                        >
                          Dettagli
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))
              }
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default JobDetail;
