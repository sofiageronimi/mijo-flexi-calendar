
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FunnelChart, LineChart } from '@/components/analytics/Charts';
import { getAnalyticsData } from '@/lib/analytics';

interface FunnelDashboardProps {
  period: string;
}

export const FunnelDashboard: React.FC<FunnelDashboardProps> = ({ period }) => {
  const { funnelData, conversionData } = getAnalyticsData(period);
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Funnel di Conversione</CardTitle>
        </CardHeader>
        <CardContent>
          <FunnelChart data={funnelData.steps} />
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-8">
            {funnelData.steps.map((step, index) => (
              <Card key={index} className="bg-muted/40 border-none">
                <CardContent className="p-4">
                  <div className="font-medium">{step.name}</div>
                  <div className="text-2xl font-bold">{step.value}%</div>
                  <div className="text-xs text-muted-foreground">Tasso conversione</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Drop-off Rate per Step</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {funnelData.dropoff.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{item.stage}</span>
                    <span className="font-bold">{item.rate}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-mijob-orange h-2 rounded-full" 
                      style={{ width: `${item.rate}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>CTA Più Cliccate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {funnelData.cta.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{item.name}</span>
                    <span className="font-bold">{item.clicks.toLocaleString()} click</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-mijob-blue h-2 rounded-full" 
                      style={{ width: `${(item.clicks / Math.max(...funnelData.cta.map(i => i.clicks))) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Tempo Medio Completamento Funnel</CardTitle>
        </CardHeader>
        <CardContent>
          <LineChart data={conversionData.timeToConvert} />
          
          <div className="mt-6 p-4 bg-muted/30 rounded-lg">
            <div className="text-center">
              <div className="text-sm text-muted-foreground">Tempo medio attuale</div>
              <div className="text-3xl font-bold">{conversionData.avgTime} minuti</div>
              <div className="text-sm text-muted-foreground mt-1">
                {conversionData.timeTrend >= 0 ? '+' : ''}{conversionData.timeTrend}% rispetto al periodo precedente
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
