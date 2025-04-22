
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, PieChartComponent, LineChart } from '@/components/analytics/Charts';
import { getAnalyticsData } from '@/lib/analytics';

interface CalendarDashboardProps {
  period: string;
}

export const CalendarDashboard: React.FC<CalendarDashboardProps> = ({ period }) => {
  const { calendarData } = getAnalyticsData(period);
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Calendari Generati</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{calendarData.generated.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {calendarData.generatedTrend >= 0 ? '+' : ''}{calendarData.generatedTrend}% rispetto al periodo precedente
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Disponibilità Media</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{calendarData.avgAvailability} giorni/mese</div>
            <p className="text-xs text-muted-foreground">
              {calendarData.availabilityTrend >= 0 ? '+' : ''}{calendarData.availabilityTrend}% rispetto al periodo precedente
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Fasce Orarie Media</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{calendarData.avgTimeSlots} slot/giorno</div>
            <p className="text-xs text-muted-foreground">
              {calendarData.slotsTrend >= 0 ? '+' : ''}{calendarData.slotsTrend}% rispetto al periodo precedente
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Tasso Completamento</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{calendarData.completionRate}%</div>
            <p className="text-xs text-muted-foreground">
              {calendarData.completionTrend >= 0 ? '+' : ''}{calendarData.completionTrend}% rispetto al periodo precedente
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Distribuzione Fasce Orarie</CardTitle>
          </CardHeader>
          <CardContent>
            <PieChartComponent data={calendarData.timeSlotDistribution} />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Generazioni Calendario per Giorno</CardTitle>
          </CardHeader>
          <CardContent>
            <LineChart data={calendarData.generationByDay} />
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Obiettivi Economici Impostati</CardTitle>
        </CardHeader>
        <CardContent>
          <BarChart data={calendarData.economicGoals} />
          
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-muted/30 rounded-lg p-4 text-center">
              <div className="text-sm text-muted-foreground">Obiettivo Medio</div>
              <div className="text-xl font-bold">€{calendarData.avgGoal}</div>
            </div>
            <div className="bg-muted/30 rounded-lg p-4 text-center">
              <div className="text-sm text-muted-foreground">Obiettivo Mediano</div>
              <div className="text-xl font-bold">€{calendarData.medianGoal}</div>
            </div>
            <div className="bg-muted/30 rounded-lg p-4 text-center">
              <div className="text-sm text-muted-foreground">% Obiettivi Raggiunti</div>
              <div className="text-xl font-bold">{calendarData.goalAchievementRate}%</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
