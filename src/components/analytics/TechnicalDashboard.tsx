
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, LineChart } from '@/components/analytics/Charts';
import { getAnalyticsData } from '@/lib/analytics';

interface TechnicalDashboardProps {
  period: string;
}

export const TechnicalDashboard: React.FC<TechnicalDashboardProps> = ({ period }) => {
  const { technicalData } = getAnalyticsData(period);
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Tempo Caricamento Medio</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{technicalData.avgLoadTime} sec</div>
            <p className="text-xs text-muted-foreground">
              {technicalData.loadTimeTrend <= 0 ? '' : '+'}{technicalData.loadTimeTrend}% rispetto al periodo precedente
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Errori</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{technicalData.errors.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {technicalData.errorsTrend <= 0 ? '' : '+'}{technicalData.errorsTrend}% rispetto al periodo precedente
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Mobile vs Desktop</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{technicalData.mobilePercentage}%</div>
            <p className="text-xs text-muted-foreground">utenti da dispositivi mobili</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Modalità Dark</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{technicalData.darkModePercentage}%</div>
            <p className="text-xs text-muted-foreground">utenti che usano modalità dark</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Tempi di Caricamento per Pagina</CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart data={technicalData.loadTimeByPage} />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Errori per Tipo</CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart data={technicalData.errorsByType} />
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Performance nel Tempo</CardTitle>
        </CardHeader>
        <CardContent>
          <LineChart data={technicalData.performanceOverTime} />
          
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-muted/30 rounded-lg p-4">
              <div className="text-sm text-muted-foreground">Browser Principali</div>
              <div className="mt-2 space-y-2">
                {technicalData.browsers.map((browser, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span>{browser.name}</span>
                    <span className="font-medium">{browser.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-muted/30 rounded-lg p-4">
              <div className="text-sm text-muted-foreground">Pagine con Più Errori</div>
              <div className="mt-2 space-y-2">
                {technicalData.errorPages.map((page, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span>{page.name}</span>
                    <span className="font-medium">{page.errors}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-muted/30 rounded-lg p-4">
              <div className="text-sm text-muted-foreground">Dispositivi Principali</div>
              <div className="mt-2 space-y-2">
                {technicalData.devices.map((device, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span>{device.name}</span>
                    <span className="font-medium">{device.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
