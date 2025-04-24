import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AvailabilityForm from '@/components/AvailabilityForm';
import CalendarGrid from '@/components/CalendarGrid';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, X } from "lucide-react";
import { DayAvailability, JobCategory, JobListing } from '@/lib/types';
import { mockJobs, isAuthenticated } from '@/lib/data';
import { toast } from '@/hooks/use-toast';
import { trackPageView, trackEvent, trackCalendarCreation } from '@/lib/analytics';

const Calendar = () => {
  const [generatedCalendar, setGeneratedCalendar] = useState<JobListing[]>([]);
  const [showCalendar, setShowCalendar] = useState(false);
  const [monthlyGoal, setMonthlyGoal] = useState(0);
  const [estimatedEarnings, setEstimatedEarnings] = useState(0);
  const [acceptedJobs, setAcceptedJobs] = useState<string[]>([]);
  const [rejectedJobs, setRejectedJobs] = useState<string[]>([]);
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
    // Track calendar creation event
    trackCalendarCreation(
      formData.availability.length,
      formData.availability.reduce((total, day) => total + day.availableSlots.length, 0),
      formData.monthlyGoal
    );

    // Generate one job per available time slot
    let generatedJobs: JobListing[] = [];
    
    formData.availability.forEach(dayAvailability => {
      dayAvailability.availableSlots.forEach(slot => {
        // Filter jobs for this date and preferred categories
        const availableJobs = mockJobs.filter(job => 
          job.date === dayAvailability.date &&
          formData.preferredCategories.includes(job.category)
        );

        // If there are jobs available for this slot, pick the highest paying one
        if (availableJobs.length > 0) {
          const bestJob = [...availableJobs].sort((a, b) => b.hourlyRate - a.hourlyRate)[0];
          generatedJobs.push({
            ...bestJob,
            timeSlot: slot // Assign the job to this specific time slot
          });
        }
      });
    });

    // Sort by hourly rate
    generatedJobs.sort((a, b) => b.hourlyRate - a.hourlyRate);

    // Calculate total earnings
    const totalEarnings = generatedJobs.reduce((sum, job) => 
      sum + (job.hourlyRate * job.duration), 0
    );

    setGeneratedCalendar(generatedJobs);
    setMonthlyGoal(formData.monthlyGoal);
    setEstimatedEarnings(totalEarnings);
    setShowCalendar(true);
    setAcceptedJobs([]);
    setRejectedJobs([]);

    // Track successful calendar generation
    trackEvent('Calendar', 'Generate', 'Success', generatedJobs.length);

    toast({
      title: "Calendario generato",
      description: `Abbiamo trovato ${generatedJobs.length} opportunità in base alle tue preferenze.`,
    });
  };
  
  const resetCalendar = () => {
    setShowCalendar(false);
    setGeneratedCalendar([]);
    setAcceptedJobs([]);
    setRejectedJobs([]);
    trackEvent('Calendar', 'Reset', 'User initiated');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleAcceptCalendar = () => {
    const allJobIds = generatedCalendar.map(job => job.id);
    setAcceptedJobs(allJobIds);
    setRejectedJobs([]);
    trackEvent('Calendar', 'Accept', 'All jobs');
    toast({
      title: "Calendario accettato",
      description: "Hai accettato tutte le opportunità del calendario.",
    });
  };
  
  const handleRejectCalendar = () => {
    const allJobIds = generatedCalendar.map(job => job.id);
    setRejectedJobs(allJobIds);
    setAcceptedJobs([]);
    trackEvent('Calendar', 'Reject', 'All jobs');
    toast({
      title: "Calendario rifiutato",
      description: "Hai rifiutato tutte le opportunità del calendario.",
    });
  };
  
  const handleJobToggle = (jobId: string, accept: boolean) => {
    if (accept) {
      // If accepting, add to accepted and remove from rejected if present
      setAcceptedJobs(prev => [...prev.filter(id => id !== jobId), jobId]);
      setRejectedJobs(prev => prev.filter(id => id !== jobId));
      trackEvent('Calendar', 'Accept', jobId);
      toast({
        title: "Opportunità accettata",
        description: "Hai accettato questa opportunità di lavoro.",
      });
    } else {
      // If rejecting, add to rejected and remove from accepted if present
      setRejectedJobs(prev => [...prev.filter(id => id !== jobId), jobId]);
      setAcceptedJobs(prev => prev.filter(id => id !== jobId));
      trackEvent('Calendar', 'Reject', jobId);
      toast({
        title: "Opportunità rifiutata",
        description: "Hai rifiutato questa opportunità di lavoro.",
      });
    }
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
                      <div className="flex space-x-2">
                        <Button variant="outline" onClick={resetCalendar}>
                          Modifica preferenze
                        </Button>
                        <Button 
                          variant="default" 
                          className="bg-green-500 hover:bg-green-600"
                          onClick={handleAcceptCalendar}
                        >
                          <Check className="mr-1" /> Accetta tutto
                        </Button>
                        <Button 
                          variant="destructive"
                          onClick={handleRejectCalendar}
                        >
                          <X className="mr-1" /> Rifiuta tutto
                        </Button>
                      </div>
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
                      
                      <div className="pt-4 mt-4 border-t">
                        <p className="font-medium">Stato opportunità</p>
                        <p className="text-sm">Accettate: {acceptedJobs.length}</p>
                        <p className="text-sm">Rifiutate: {rejectedJobs.length}</p>
                        <p className="text-sm">In attesa: {generatedCalendar.length - acceptedJobs.length - rejectedJobs.length}</p>
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
                          {generatedCalendar.map(job => {
                            const isAccepted = acceptedJobs.includes(job.id);
                            const isRejected = rejectedJobs.includes(job.id);
                            
                            return (
                              <div key={job.id} className={`flex items-center justify-between border-b pb-4 ${
                                isRejected ? 'opacity-60' : ''
                              }`}>
                                <div>
                                  <h3 className="font-semibold">{job.title}</h3>
                                  <p className="text-gray-600 text-sm">{job.company} • {job.location}</p>
                                  <p className="text-gray-600 text-sm">
                                    {new Date(job.date).toLocaleDateString('it-IT', { day: 'numeric', month: 'long' })} • {job.duration} ore
                                  </p>
                                  {isAccepted && (
                                    <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded mt-1">
                                      ✓ Accettato
                                    </span>
                                  )}
                                  {isRejected && (
                                    <span className="inline-block bg-red-100 text-red-800 text-xs px-2 py-1 rounded mt-1">
                                      ✗ Rifiutato
                                    </span>
                                  )}
                                </div>
                                <div className="text-right">
                                  <p className="font-medium text-mijob-orange">{job.hourlyRate}€/ora</p>
                                  <div className="flex space-x-2 mt-2">
                                    {!isAccepted && !isRejected ? (
                                      <>
                                        <Button 
                                          size="sm"
                                          variant="outline"
                                          className="border-green-500 text-green-500 hover:bg-green-50"
                                          onClick={() => handleJobToggle(job.id, true)}
                                        >
                                          <Check className="h-4 w-4 mr-1" /> Accetta
                                        </Button>
                                        <Button 
                                          size="sm"
                                          variant="outline"
                                          className="border-red-500 text-red-500 hover:bg-red-50"
                                          onClick={() => handleJobToggle(job.id, false)}
                                        >
                                          <X className="h-4 w-4 mr-1" /> Rifiuta
                                        </Button>
                                      </>
                                    ) : (
                                      <Button 
                                        size="sm"
                                        variant="outline"
                                        onClick={() => {
                                          setAcceptedJobs(prev => prev.filter(id => id !== job.id));
                                          setRejectedJobs(prev => prev.filter(id => id !== job.id));
                                        }}
                                      >
                                        Annulla
                                      </Button>
                                    )}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
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
