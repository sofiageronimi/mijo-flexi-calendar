
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import CalendarGrid from '@/components/CalendarGrid';
import { mockUser } from '@/lib/data';
import { useNavigate } from 'react-router-dom';

const ProfileTabs = () => {
  const navigate = useNavigate();
  
  return (
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
              <CalendarGrid 
                month={new Date()} 
                jobs={mockUser.upcomingJobs} 
              />
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
  );
};

export default ProfileTabs;
