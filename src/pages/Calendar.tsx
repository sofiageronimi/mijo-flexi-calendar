
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AvailabilityForm from '@/components/AvailabilityForm';
import CalendarGrid from '@/components/CalendarGrid';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DayAvailability, JobCategory, JobListing } from '@/lib/types';
import { mockJobs, isAuthenticated } from '@/lib/data';
import { toast } from '@/hooks/use-toast';
import { trackPageView, trackEvent, trackCalendarCreation } from '@/lib/analytics';

const Calendar = () => {
  const [generatedCalendar, setGeneratedCalendar] = useState<JobListing[]>([]);
  const [showCalendar, setShowCalendar] = useState(false);
  const [monthlyGoal, setMonthlyGoal] = useState(0);
  const [estimatedEarnings, setEstimatedEarnings] = useState(0);
  const navigate = useNavigate();
  const authenticated = isAuthenticated();
  
  useEffect(() => {
    // Track page view
    trackPageView('Calendar');
    
    if (!authenticated) {
      toast({
        title: "Accesso richiesto",
        description: "Per creare il tuo calendario personalizzato, devi prima accedere o registrarti.",
        variant: "destructive",
      });
      navigate('/auth');
    }
  }, [authenticated, navigate]);
  
  const handleAvailabilitySubmit = (formData: {
    availability: DayAvailability[];
    monthlyGoal: number;
    preferredCategories: JobCategory[];
  }) => {
    // In a real app, this would make an API call to generate a personalized calendar
    
    // Track calendar creation event
    trackCalendarCreation(
      formData.availability.length,
      formData.availability.reduce((total, day) => total + day.availableSlots.length, 0),
      formData.monthlyGoal
    );
    
    // Mock implementation: filter jobs based on preferences and availability
    const availableDates = formData.availability.map(a => a.date);
    
    // Filter jobs by preferred categories and dates
    let filteredJobs = mockJobs.filter(job => {
      // Check if job is on an available date
      const jobOnAvailableDate = availableDates.includes(job.date);
      // Check if job is in preferred categories
      const jobInPreferredCategory = formData.preferredCategories.includes(job.category);
      return jobOnAvailableDate && jobInPreferredCategory;
    });
    
    // Check if job time slot matches availability for that day
    filteredJobs = filteredJobs.filter(job => {
      const dayAvailability = formData.availability.find(a => a.date === job.date);
      return dayAvailability?.availableSlots.includes(job.timeSlot);
    });
    
    // Sort by hourly rate to maximize earnings (if we have enough jobs)
    filteredJobs.sort((a, b) => b.hourlyRate - a.hourlyRate);
    
    // Calculate total earnings
    const totalEarnings = filteredJobs.reduce((sum, job) => sum + (job.hourlyRate * job.duration), 0);
    
    setGeneratedCalendar(filteredJobs);
    setMonthlyGoal(formData.monthlyGoal);
    setEstimatedEarnings(totalEarnings);
    setShowCalendar(true);
    
    // Track successful calendar generation
    trackEvent('Calendar', 'Generate', 'Success', filteredJobs.length);
    
    toast({
      title: "Calendario generato",
      description: `Abbiamo trovato ${filteredJobs.length} opportunità in base alle tue preferenze.`,
    });
  };
  
  const resetCalendar = () => {
    setShowCalendar(false);
    setGeneratedCalendar([]);
    trackEvent('Calendar', 'Reset', 'User initiated');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleJobApplication = (jobId: string) => {
    trackEvent('Calendar', 'Apply', jobId);
    toast({
      title: "Candidatura inviata",
      description: "La tua candidatura è stata inviata con successo.",
    });
  };
  
  if (!authenticated) {
    return null; // Will redirect via useEffect
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Crea il tuo calendario</h1>
            <p className="text-gray-600">
              Personalizza il tuo calendario in base a disponibilità, preferenze e obiettivi economici.
            </p>
          </div>
          
          {!showCalendar ? (
            <AvailabilityForm onSubmit={handleAvailabilitySubmit} />
          ) : (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="md:col-span-2">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-2xl font-semibold">Il tuo calendario</h2>
                      <Button variant="outline" onClick={resetCalendar}>
                        Modifica preferenze
                      </Button>
                    </div>
                    
                    <CalendarGrid 
                      month={new Date()} 
                      jobs={generatedCalendar} 
                    />
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold mb-4">Resoconto</h2>
                    
                    <div className="space-y-4">
                      <div>
                        <p className="text-gray-600">Obiettivo mensile</p>
                        <p className="text-2xl font-bold">{monthlyGoal}€</p>
                      </div>
                      
                      <div>
                        <p className="text-gray-600">Guadagno stimato</p>
                        <p className="text-2xl font-bold text-mijob-orange">{estimatedEarnings}€</p>
                      </div>
                      
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                        <div 
                          className="bg-mijob-blue h-2.5 rounded-full" 
                          style={{ width: `${Math.min(100, (estimatedEarnings / monthlyGoal) * 100)}%` }}
                        ></div>
                      </div>
                      <p className="text-sm text-gray-600">
                        {estimatedEarnings >= monthlyGoal 
                          ? 'Hai raggiunto il tuo obiettivo!' 
                          : `Mancano ${(monthlyGoal - estimatedEarnings).toFixed(2)}€ al tuo obiettivo`
                        }
                      </p>
                      
                      <div className="pt-4 mt-4 border-t">
                        <p className="font-medium">Opportunità trovate</p>
                        <p className="text-xl">{generatedCalendar.length} lavoretti</p>
                      </div>
                      
                      <div className="pt-4 mt-4 border-t">
                        <p className="font-medium">Ore di lavoro totali</p>
                        <p className="text-xl">
                          {generatedCalendar.reduce((sum, job) => sum + job.duration, 0)} ore
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div>
                <Tabs defaultValue="upcoming">
                  <TabsList className="mb-4">
                    <TabsTrigger value="upcoming">Lavoretti proposti</TabsTrigger>
                    <TabsTrigger value="pending">Richieste in attesa</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="upcoming" className="mt-0">
                    <div className="bg-white rounded-lg shadow-sm p-6">
                      {generatedCalendar.length > 0 ? (
                        <div className="space-y-4">
                          {generatedCalendar.map(job => (
                            <div key={job.id} className="flex items-center justify-between border-b pb-4">
                              <div>
                                <h3 className="font-semibold">{job.title}</h3>
                                <p className="text-gray-600 text-sm">{job.company} • {job.location}</p>
                                <p className="text-gray-600 text-sm">
                                  {new Date(job.date).toLocaleDateString('it-IT', { day: 'numeric', month: 'long' })} • {job.duration} ore
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="font-medium text-mijob-orange">{job.hourlyRate}€/ora</p>
                                <Button 
                                  size="sm" 
                                  className="mt-2"
                                  onClick={() => handleJobApplication(job.id)}
                                >
                                  Candidati
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <p className="text-gray-600">Nessun lavoretto disponibile con le tue preferenze attuali.</p>
                          <Button variant="outline" onClick={resetCalendar} className="mt-4">
                            Modifica preferenze
                          </Button>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="pending" className="mt-0">
                    <div className="bg-white rounded-lg shadow-sm p-6 text-center py-8">
                      <p className="text-gray-600">Non hai ancora candidature in attesa.</p>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Calendar;
