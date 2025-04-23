import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import JobCard from '@/components/JobCard';
import CalendarGrid from '@/components/CalendarGrid';
import { mockUser, isAuthenticated, jobCategories } from '@/lib/data';
import { toast } from '@/hooks/use-toast';

const Profile = () => {
  const [examMode, setExamMode] = useState(false);
  const [userData, setUserData] = useState<{ name: string; email: string } | null>(null);
  const navigate = useNavigate();
  const authenticated = isAuthenticated();
  
  useEffect(() => {
    if (!authenticated) {
      toast({
        title: "Accesso negato",
        description: "Devi effettuare l'accesso per visualizzare il tuo profilo.",
        variant: "destructive",
      });
      navigate('/auth');
    } else {
      const userString = localStorage.getItem('mijob_user');
      if (userString) {
        try {
          setUserData(JSON.parse(userString));
        } catch (error) {
          console.error("Error parsing user data", error);
        }
      }
    }
  }, [authenticated, navigate]);
  
  const toggleExamMode = () => {
    setExamMode(!examMode);
    toast({
      title: examMode ? "Modalità Esami disattivata" : "Modalità Esami attivata",
      description: examMode 
        ? "Tornerai a ricevere tutte le notifiche e le offerte di lavoro." 
        : "Le notifiche e i turni saranno ridotti durante il periodo d'esame.",
    });
  };
  
  if (!authenticated || !userData) {
    return null;
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-6">Il mio profilo</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* User Profile Card */}
              <div className="md:col-span-1">
                <Card className="mb-8">
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center">
                      <div className="w-24 h-24 rounded-full bg-mijob-blue/10 flex items-center justify-center mb-4">
                        <span className="text-3xl">{userData.name.charAt(0)}</span>
                      </div>
                      <h2 className="text-xl font-semibold">{userData.name}</h2>
                      <p className="text-gray-600 text-sm mb-4">{userData.email}</p>
                      
                      <div className="w-full mt-4">
                        <div className="flex items-center justify-between mb-6">
                          <div>
                            <p className="font-medium">Modalità Esami</p>
                            <p className="text-xs text-gray-600">Riduce notifiche e turni</p>
                          </div>
                          <Switch checked={examMode} onCheckedChange={toggleExamMode} />
                        </div>
                        
                        <div className="space-y-2">
                          <p className="font-medium">Categorie preferite</p>
                          <div className="flex flex-wrap gap-2">
                            {mockUser.preferences.categories.map(categoryId => {
                              const category = jobCategories.find(c => c.id === categoryId);
                              return (
                                <Badge key={categoryId} variant="outline" className="bg-gray-100">
                                  {category?.icon} {category?.label}
                                </Badge>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Obiettivo mensile</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <div className="flex justify-between mb-1">
                        <span className="font-medium text-gray-700">Guadagnato finora</span>
                        <span className="font-medium text-mijob-orange">{mockUser.earnedThisMonth}€</span>
                      </div>
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Obiettivo</span>
                        <span>{mockUser.monthlyGoal}€</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                        <div 
                          className="bg-mijob-orange h-2.5 rounded-full" 
                          style={{ width: `${Math.min(100, (mockUser.earnedThisMonth / mockUser.monthlyGoal!) * 100)}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="pt-3 border-t">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Mancanti</span>
                        <span className="font-medium">{(mockUser.monthlyGoal! - mockUser.earnedThisMonth)}€</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Main Content */}
              <div className="md:col-span-2">
                <Tabs defaultValue="calendar" className="space-y-6">
                  <TabsList className="mb-4">
                    <TabsTrigger value="calendar">Calendario</TabsTrigger>
                    <TabsTrigger value="upcoming">Prossimi turni</TabsTrigger>
                    <TabsTrigger value="pending">In attesa</TabsTrigger>
                    <TabsTrigger value="history">Storico</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="calendar" className="mt-0">
                    <Card>
                      <CardHeader>
                        <CardTitle>Il mio calendario</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CalendarGrid month={new Date()} jobs={mockUser.upcomingJobs} />
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="upcoming" className="mt-0">
                    <Card>
                      <CardHeader>
                        <CardTitle>Prossimi turni confermati</CardTitle>
                      </CardHeader>
                      <CardContent>
                        {mockUser.upcomingJobs.length > 0 ? (
                          <div className="space-y-4">
                            {mockUser.upcomingJobs.map(job => (
                              <div key={job.id} className="border-b pb-4 last:border-0">
                                <h3 className="font-semibold">{job.title}</h3>
                                <p className="text-gray-600 text-sm mb-2">{job.company} • {job.location}</p>
                                <div className="flex justify-between">
                                  <p className="text-sm">
                                    <span className="text-gray-600">
                                      {new Date(job.date).toLocaleDateString('it-IT', { day: 'numeric', month: 'long' })}
                                    </span>
                                    <span className="mx-1">•</span>
                                    <span className="text-gray-600">{job.duration} ore</span>
                                  </p>
                                  <p className="font-medium text-mijob-orange">{job.hourlyRate}€/ora</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-8">
                            <p className="text-gray-600">Non hai turni confermati in programma.</p>
                            <Button variant="outline" className="mt-4" onClick={() => navigate('/calendar')}>
                              Crea calendario
                            </Button>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="pending" className="mt-0">
                    <Card>
                      <CardHeader>
                        <CardTitle>Candidature in attesa</CardTitle>
                      </CardHeader>
                      <CardContent>
                        {mockUser.pendingApplications.length > 0 ? (
                          <div className="space-y-6">
                            {mockUser.pendingApplications.map(job => (
                              <div key={job.id} className="border-b pb-4 last:border-0">
                                <h3 className="font-semibold">{job.title}</h3>
                                <p className="text-gray-600 text-sm">{job.company} • {job.location}</p>
                                <div className="flex justify-between items-center mt-2">
                                  <p className="text-sm text-gray-600">
                                    Candidatura inviata il 25 aprile
                                  </p>
                                  <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                                    In attesa
                                  </Badge>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-8">
                            <p className="text-gray-600">Non hai candidature in attesa.</p>
                            <Button variant="outline" className="mt-4" onClick={() => navigate('/jobs')}>
                              Esplora offerte
                            </Button>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="history" className="mt-0">
                    <Card>
                      <CardHeader>
                        <CardTitle>Storico lavori</CardTitle>
                      </CardHeader>
                      <CardContent>
                        {mockUser.completedJobs.length > 0 ? (
                          <div className="space-y-6">
                            {mockUser.completedJobs.map(job => (
                              <div key={job.id} className="border-b pb-4 last:border-0">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <h3 className="font-semibold">{job.title}</h3>
                                    <p className="text-gray-600 text-sm">{job.company} • {job.location}</p>
                                    <p className="text-sm text-gray-600 mt-1">
                                      {new Date(job.date).toLocaleDateString('it-IT', { day: 'numeric', month: 'long' })}
                                    </p>
                                  </div>
                                  <div className="text-right">
                                    <p className="font-medium text-green-600">{job.hourlyRate * job.duration}€</p>
                                    <Badge className="mt-1 bg-green-100 text-green-800 hover:bg-green-100">
                                      Completato
                                    </Badge>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-8">
                            <p className="text-gray-600">Non hai ancora completato nessun lavoro.</p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;
