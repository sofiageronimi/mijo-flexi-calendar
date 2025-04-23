import { JobCategory } from './types';

// Mock data generator for analytics dashboards
// In a real application, this would fetch data from an analytics API

export const getAnalyticsData = (period: string) => {
  // Helper to generate trending percentages
  const getTrend = () => Math.floor(Math.random() * 30) - 10;
  
  // Helper to generate positive trending percentages
  const getPositiveTrend = () => Math.floor(Math.random() * 20) + 1;
  
  // Generate timeline data
  const generateTimelineData = (days: number) => {
    const data = [];
    const today = new Date();
    
    for (let i = days; i >= 0; i--) {
      const date = new Date();
      date.setDate(today.getDate() - i);
      
      data.push({
        date: date.toLocaleDateString('it-IT', { day: 'numeric', month: 'short' }),
        value: Math.floor(Math.random() * 1000) + 100
      });
    }
    
    return data;
  };
  
  // Overview Dashboard Data
  const visitorData = {
    uniqueVisitors: 12543,
    trend: getTrend(),
    timeline: generateTimelineData(period === '7d' ? 7 : period === '30d' ? 30 : 90)
  };
  
  const sessionData = {
    totalSessions: 18721,
    trend: getTrend(),
    avgSessionTime: 4.2,
    avgTimeTrend: getTrend(),
    conversionRate: 12.5,
    conversionTrend: getTrend()
  };
  
  const deviceData = {
    devices: [
      { name: 'Mobile', value: 65 },
      { name: 'Desktop', value: 30 },
      { name: 'Tablet', value: 5 }
    ]
  };
  
  const locationData = {
    cities: [
      { name: 'Milano', percentage: 32 },
      { name: 'Roma', percentage: 24 },
      { name: 'Torino', percentage: 16 },
      { name: 'Bologna', percentage: 12 },
      { name: 'Napoli', percentage: 8 },
      { name: 'Firenze', percentage: 5 },
      { name: 'Bari', percentage: 3 }
    ]
  };
  
  // Funnel Dashboard Data
  const funnelData = {
    steps: [
      { name: 'Visita Homepage', value: 100 },
      { name: 'Visualizza Offerte', value: 68 },
      { name: 'Visita Calendario', value: 42 },
      { name: 'Registrazione', value: 24 },
      { name: 'Calendario Generato', value: 15 }
    ],
    dropoff: [
      { stage: 'Homepage → Offerte', rate: 32 },
      { stage: 'Offerte → Calendario', rate: 38 },
      { stage: 'Calendario → Registrazione', rate: 43 },
      { stage: 'Registrazione → Generazione', rate: 39 }
    ],
    cta: [
      { name: 'Crea il Tuo Calendario', clicks: 8452 },
      { name: 'Esplora Offerte', clicks: 6241 },
      { name: 'Registrati', clicks: 4130 },
      { name: 'Inizia Ora', clicks: 3845 },
      { name: 'Candidati', clicks: 2918 }
    ]
  };
  
  const conversionData = {
    avgTime: 12.5,
    timeTrend: getTrend(),
    timeToConvert: generateTimelineData(30).map(item => ({
      ...item,
      value: Math.floor(Math.random() * 5) + 10
    }))
  };
  
  // Calendar Dashboard Data
  const calendarData = {
    generated: 3254,
    generatedTrend: getTrend(),
    avgAvailability: 8.2,
    availabilityTrend: getTrend(),
    avgTimeSlots: 2.4,
    slotsTrend: getTrend(),
    completionRate: 78,
    completionTrend: getTrend(),
    timeSlotDistribution: [
      { name: 'Mattina', value: 45 },
      { name: 'Pomeriggio', value: 35 },
      { name: 'Sera', value: 20 }
    ],
    generationByDay: generateTimelineData(30),
    economicGoals: [
      { name: '0-300€', value: 25 },
      { name: '300-500€', value: 35 },
      { name: '500-800€', value: 30 },
      { name: '800-1000€', value: 7 },
      { name: '1000+€', value: 3 }
    ],
    avgGoal: 520,
    medianGoal: 480,
    goalAchievementRate: 64
  };
  
  // Jobs Dashboard Data
  const jobsData = {
    totalViews: 28456,
    viewsTrend: getTrend(),
    ctr: 18.4,
    ctrTrend: getTrend(),
    avgTimeOnPage: 85,
    timeOnPageTrend: getTrend(),
    applications: 2154,
    applicationsTrend: getTrend(),
    topJobs: [
      { title: 'Barista - Weekend', company: 'Café Milano', views: 1234, ctr: 24, applications: 87 },
      { title: 'Consegne a domicilio', company: 'QuickFood', views: 1121, ctr: 21, applications: 65 },
      { title: 'Ripetizioni di matematica', company: 'TutorMe', views: 984, ctr: 19, applications: 52 },
      { title: 'Hostess per eventi aziendali', company: 'EventiTop', views: 876, ctr: 17, applications: 41 },
      { title: 'Commesso/a part-time', company: 'FashionStore', views: 765, ctr: 15, applications: 38 }
    ],
    popularFilters: [
      { name: 'Zona', value: 42 },
      { name: 'Retribuzione', value: 38 },
      { name: 'Categoria', value: 32 },
      { name: 'Orario', value: 28 },
      { name: 'Data', value: 20 }
    ],
    categoryViews: [
      { name: 'Hospitality', value: 28 },
      { name: 'Delivery', value: 24 },
      { name: 'Eventi', value: 18 },
      { name: 'Tutoring', value: 16 },
      { name: 'Retail', value: 14 }
    ],
    viewsOverTime: generateTimelineData(30)
  };
  
  // Profile Dashboard Data
  const profileData = {
    profileUpdates: 1845,
    updatesTrend: getTrend(),
    shiftsViewed: 4532,
    shiftsTrend: getTrend(),
    examModeActivations: 752,
    examModeTrend: getTrend(),
    referralsShared: 321,
    referralsTrend: getTrend(),
    updatedSections: [
      { name: 'Disponibilità', value: 40 },
      { name: 'Dati personali', value: 25 },
      { name: 'Preferenze lavoro', value: 20 },
      { name: 'Obiettivi economici', value: 15 }
    ],
    feedbackRatings: [
      { name: '5 stelle', value: 45 },
      { name: '4 stelle', value: 30 },
      { name: '3 stelle', value: 15 },
      { name: '2 stelle', value: 7 },
      { name: '1 stella', value: 3 }
    ],
    avgRating: 4.1,
    notifications: {
      sent: 12543,
      openRate: 72
    },
    smartNotifications: {
      sent: 4325,
      responseRate: 35
    },
    notificationsOverTime: generateTimelineData(30)
  };
  
  // Technical Dashboard Data
  const technicalData = {
    avgLoadTime: 1.8,
    loadTimeTrend: -5, // Negative trend is good for load time
    errors: 124,
    errorsTrend: -2,
    mobilePercentage: 65,
    darkModePercentage: 28,
    loadTimeByPage: [
      { name: 'Homepage', value: 1.5 },
      { name: 'Offerte', value: 2.1 },
      { name: 'Calendario', value: 2.3 },
      { name: 'Profilo', value: 1.7 },
      { name: 'Auth', value: 1.2 }
    ],
    errorsByType: [
      { name: '404 Not Found', value: 56 },
      { name: '500 Server Error', value: 23 },
      { name: 'JavaScript', value: 34 },
      { name: 'Network', value: 11 }
    ],
    performanceOverTime: generateTimelineData(30).map(item => ({
      ...item,
      value: Math.random() * 1 + 1.5
    })),
    browsers: [
      { name: 'Chrome', percentage: 64 },
      { name: 'Safari', percentage: 21 },
      { name: 'Firefox', percentage: 10 },
      { name: 'Edge', percentage: 5 }
    ],
    errorPages: [
      { name: 'Job Detail', errors: 45 },
      { name: 'Calendario', errors: 32 },
      { name: 'Registrazione', errors: 28 },
      { name: 'Profilo', errors: 19 }
    ],
    devices: [
      { name: 'iPhone', percentage: 42 },
      { name: 'Android', percentage: 23 },
      { name: 'Windows', percentage: 20 },
      { name: 'Mac', percentage: 10 },
      { name: 'iPad', percentage: 5 }
    ]
  };

  return {
    visitorData,
    sessionData,
    deviceData,
    locationData,
    funnelData,
    conversionData,
    calendarData,
    jobsData,
    profileData,
    technicalData
  };
};

// Tracking functions - integrated with Google Tag Manager
export const trackPageView = (pageName: string) => {
  console.log(`Analytics: Page view - ${pageName}`);
  
  // Push data to GTM dataLayer
  if (window.dataLayer) {
    window.dataLayer.push({
      event: 'pageView',
      pageName: pageName
    });
  }
};

export const trackEvent = (category: string, action: string, label?: string, value?: number) => {
  console.log(`Analytics: Event - ${category} / ${action} / ${label || 'N/A'} / ${value || 'N/A'}`);
  
  // Push event data to GTM dataLayer
  if (window.dataLayer) {
    window.dataLayer.push({
      event: 'customEvent',
      eventCategory: category,
      eventAction: action,
      eventLabel: label || undefined,
      eventValue: value || undefined
    });
  }
};

export const trackConversion = (stage: string) => {
  console.log(`Analytics: Funnel conversion - ${stage}`);
  
  // Push conversion data to GTM dataLayer
  if (window.dataLayer) {
    window.dataLayer.push({
      event: 'conversion',
      conversionStage: stage
    });
  }
};

export const trackJobInteraction = (jobId: string, action: 'view' | 'click' | 'apply') => {
  console.log(`Analytics: Job interaction - ${jobId} / ${action}`);
  
  // Push job interaction data to GTM dataLayer
  if (window.dataLayer) {
    window.dataLayer.push({
      event: 'jobInteraction',
      jobId: jobId,
      interactionType: action
    });
  }
};

export const trackCalendarCreation = (availability: number, timeSlots: number, goal: number) => {
  console.log(`Analytics: Calendar creation - Days: ${availability}, Slots: ${timeSlots}, Goal: €${goal}`);
  
  // Push calendar creation data to GTM dataLayer
  if (window.dataLayer) {
    window.dataLayer.push({
      event: 'calendarCreation',
      daysAvailable: availability,
      timeSlots: timeSlots,
      economicGoal: goal
    });
  }
};

// Add TypeScript interface to global Window object
declare global {
  interface Window {
    dataLayer: any[];
  }
}
