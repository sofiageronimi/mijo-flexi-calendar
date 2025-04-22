
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, LineChart } from '@/components/analytics/Charts';
import { getAnalyticsData } from '@/lib/analytics';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface JobsDashboardProps {
  period: string;
}

export const JobsDashboard: React.FC<JobsDashboardProps> = ({ period }) => {
  const { jobsData } = getAnalyticsData(period);
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Visualizzazioni Offerte</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{jobsData.totalViews.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {jobsData.viewsTrend >= 0 ? '+' : ''}{jobsData.viewsTrend}% rispetto al periodo precedente
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Click-Through Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{jobsData.ctr}%</div>
            <p className="text-xs text-muted-foreground">
              {jobsData.ctrTrend >= 0 ? '+' : ''}{jobsData.ctrTrend}% rispetto al periodo precedente
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Tempo Medio su Offerta</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{jobsData.avgTimeOnPage} sec</div>
            <p className="text-xs text-muted-foreground">
              {jobsData.timeOnPageTrend >= 0 ? '+' : ''}{jobsData.timeOnPageTrend}% rispetto al periodo precedente
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Candidature</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{jobsData.applications.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {jobsData.applicationsTrend >= 0 ? '+' : ''}{jobsData.applicationsTrend}% rispetto al periodo precedente
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Offerte Più Visualizzate</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Offerta</TableHead>
                <TableHead>Azienda</TableHead>
                <TableHead>Visualizzazioni</TableHead>
                <TableHead>CTR</TableHead>
                <TableHead>Candidature</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {jobsData.topJobs.map((job, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{job.title}</TableCell>
                  <TableCell>{job.company}</TableCell>
                  <TableCell>{job.views.toLocaleString()}</TableCell>
                  <TableCell>{job.ctr}%</TableCell>
                  <TableCell>{job.applications}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Filtri Più Utilizzati</CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart data={jobsData.popularFilters} />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Visualizzazioni per Categoria</CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart data={jobsData.categoryViews} />
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Andamento Visualizzazioni</CardTitle>
        </CardHeader>
        <CardContent>
          <LineChart data={jobsData.viewsOverTime} />
        </CardContent>
      </Card>
    </div>
  );
};
