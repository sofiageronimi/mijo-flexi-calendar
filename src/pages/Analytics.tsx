
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { OverviewDashboard } from '@/components/analytics/OverviewDashboard';
import { FunnelDashboard } from '@/components/analytics/FunnelDashboard';
import { CalendarDashboard } from '@/components/analytics/CalendarDashboard';
import { JobsDashboard } from '@/components/analytics/JobsDashboard';
import { ProfileDashboard } from '@/components/analytics/ProfileDashboard';
import { TechnicalDashboard } from '@/components/analytics/TechnicalDashboard';
import { isAuthenticated } from '@/lib/data';
import { toast } from '@/hooks/use-toast';

const Analytics = () => {
  const [dateRange, setDateRange] = useState<string>('7d');
  const navigate = useNavigate();
  const authenticated = isAuthenticated();
  
  if (!authenticated) {
    toast({
      title: "Accesso richiesto",
      description: "Per visualizzare le analytics, devi prima accedere.",
      variant: "destructive",
    });
    navigate('/auth');
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">Analytics Dashboard</h1>
              <p className="text-gray-600 mt-2">
                Monitora l'utilizzo della piattaforma e ottimizza l'esperienza utente
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <Select 
                value={dateRange} 
                onValueChange={setDateRange}
              >
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Seleziona periodo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">Ultimi 7 giorni</SelectItem>
                  <SelectItem value="30d">Ultimi 30 giorni</SelectItem>
                  <SelectItem value="90d">Ultimi 90 giorni</SelectItem>
                  <SelectItem value="year">Ultimo anno</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid grid-cols-3 md:grid-cols-6 mb-4">
              <TabsTrigger value="overview">Generale</TabsTrigger>
              <TabsTrigger value="funnel">Funnel</TabsTrigger>
              <TabsTrigger value="calendar">Calendario</TabsTrigger>
              <TabsTrigger value="jobs">Offerte</TabsTrigger>
              <TabsTrigger value="profile">Profilo</TabsTrigger>
              <TabsTrigger value="technical">Performance</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview">
              <OverviewDashboard period={dateRange} />
            </TabsContent>
            
            <TabsContent value="funnel">
              <FunnelDashboard period={dateRange} />
            </TabsContent>
            
            <TabsContent value="calendar">
              <CalendarDashboard period={dateRange} />
            </TabsContent>
            
            <TabsContent value="jobs">
              <JobsDashboard period={dateRange} />
            </TabsContent>
            
            <TabsContent value="profile">
              <ProfileDashboard period={dateRange} />
            </TabsContent>
            
            <TabsContent value="technical">
              <TechnicalDashboard period={dateRange} />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Analytics;
