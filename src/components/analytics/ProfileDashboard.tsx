
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, PieChart, LineChart } from '@/components/analytics/Charts';
import { getAnalyticsData } from '@/lib/analytics';

interface ProfileDashboardProps {
  period: string;
}

export const ProfileDashboard: React.FC<ProfileDashboardProps> = ({ period }) => {
  const { profileData } = getAnalyticsData(period);
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Aggiornamenti Profilo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{profileData.profileUpdates.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {profileData.updatesTrend >= 0 ? '+' : ''}{profileData.updatesTrend}% rispetto al periodo precedente
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Visualizzazioni Turni</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{profileData.shiftsViewed.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {profileData.shiftsTrend >= 0 ? '+' : ''}{profileData.shiftsTrend}% rispetto al periodo precedente
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Modalità Esami Attivata</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{profileData.examModeActivations.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {profileData.examModeTrend >= 0 ? '+' : ''}{profileData.examModeTrend}% rispetto al periodo precedente
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Referral Condivisi</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{profileData.referralsShared.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {profileData.referralsTrend >= 0 ? '+' : ''}{profileData.referralsTrend}% rispetto al periodo precedente
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Sezioni Profilo Modificate</CardTitle>
          </CardHeader>
          <CardContent>
            <PieChart data={profileData.updatedSections} />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Valutazione Feedback</CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart data={profileData.feedbackRatings} />
            
            <div className="mt-4 p-4 bg-muted/30 rounded-lg">
              <div className="text-center">
                <div className="text-sm text-muted-foreground">Valutazione media</div>
                <div className="text-3xl font-bold">{profileData.avgRating}/5</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Notifiche e Interazioni</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-medium">Notifiche inviate</span>
                <span className="font-bold">{profileData.notifications.sent.toLocaleString()}</span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Tasso di apertura</span>
                  <span>{profileData.notifications.openRate}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-mijob-blue h-2 rounded-full" 
                    style={{ width: `${profileData.notifications.openRate}%` }}
                  ></div>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-medium">Notifiche smart</span>
                <span className="font-bold">{profileData.smartNotifications.sent.toLocaleString()}</span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Tasso di risposta</span>
                  <span>{profileData.smartNotifications.responseRate}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-mijob-orange h-2 rounded-full" 
                    style={{ width: `${profileData.smartNotifications.responseRate}%` }}
                  ></div>
                </div>
              </div>
            </div>
            
            <LineChart data={profileData.notificationsOverTime} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
