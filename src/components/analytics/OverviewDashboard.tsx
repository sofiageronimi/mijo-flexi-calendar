
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, PieChart, LineChart } from '@/components/analytics/Charts';
import { getAnalyticsData } from '@/lib/analytics';
import { Users, Activity, Clock, Smartphone, MapPin } from 'lucide-react';

interface OverviewDashboardProps {
  period: string;
}

export const OverviewDashboard: React.FC<OverviewDashboardProps> = ({ period }) => {
  const { visitorData, sessionData, deviceData, locationData } = getAnalyticsData(period);
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Visitatori Unici</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{visitorData.uniqueVisitors.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {visitorData.trend >= 0 ? '+' : ''}{visitorData.trend}% rispetto al periodo precedente
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Sessioni Totali</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{sessionData.totalSessions.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {sessionData.trend >= 0 ? '+' : ''}{sessionData.trend}% rispetto al periodo precedente
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Tempo Medio per Sessione</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{sessionData.avgSessionTime} min</div>
            <p className="text-xs text-muted-foreground">
              {sessionData.avgTimeTrend >= 0 ? '+' : ''}{sessionData.avgTimeTrend}% rispetto al periodo precedente
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Conversione Registrazione</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{sessionData.conversionRate}%</div>
            <p className="text-xs text-muted-foreground">
              {sessionData.conversionTrend >= 0 ? '+' : ''}{sessionData.conversionTrend}% rispetto al periodo precedente
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Dispositivi Utilizzati</CardTitle>
          </CardHeader>
          <CardContent>
            <PieChart data={deviceData.devices} />
          </CardContent>
        </Card>
        
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Andamento Visitatori</CardTitle>
          </CardHeader>
          <CardContent>
            <LineChart data={visitorData.timeline} />
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Distribuzione Geografica</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {locationData.cities.map((city, index) => (
              <div key={index} className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-mijob-orange" />
                <div>
                  <div className="font-medium">{city.name}</div>
                  <div className="text-sm text-muted-foreground">{city.percentage}%</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
