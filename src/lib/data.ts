import { JobCategory, JobListing, TimeSlot, TeamMember } from "./types";

export const jobCategories: { id: JobCategory; label: string; icon: string }[] = [
  { id: "hospitality", label: "Hospitality", icon: "🍽️" },
  { id: "retail", label: "Retail", icon: "🛍️" },
  { id: "events", label: "Events", icon: "🎉" },
  { id: "tutoring", label: "Tutoring", icon: "📚" },
  { id: "delivery", label: "Delivery", icon: "🚚" },
  { id: "office", label: "Office Work", icon: "💼" },
  { id: "customer_service", label: "Customer Service", icon: "🤝" },
  { id: "other", label: "Other", icon: "✨" },
];

export const timeSlots: { id: TimeSlot; label: string; timeRange: string }[] = [
  { id: "morning", label: "Morning", timeRange: "8:00 - 12:00" },
  { id: "afternoon", label: "Afternoon", timeRange: "12:00 - 18:00" },
  { id: "evening", label: "Evening", timeRange: "18:00 - 23:00" },
];

export const mockJobs: JobListing[] = [
  {
    id: "job-1",
    title: "Cameriere per evento aziendale",
    company: "EventiMilano",
    location: "Milano Centro",
    category: "hospitality",
    hourlyRate: 12,
    duration: 4,
    description: "Cerchiamo camerieri per un evento aziendale esclusivo nel centro di Milano. Esperienza non necessaria ma gradita.",
    requirements: ["Disponibilità 18-22", "Abbigliamento formale", "Attitudine al cliente"],
    date: "2025-05-05",
    timeSlot: "evening",
    applicationUrl: "/job-detail/job-1",
  },
  {
    id: "job-2",
    title: "Assistente vendita weekend",
    company: "FashionRetail",
    location: "CityLife Shopping District",
    category: "retail",
    hourlyRate: 10,
    duration: 8,
    description: "Assistente alle vendite per negozio di abbigliamento nel weekend. Aiuterai i clienti nella scelta e gestione cassa.",
    requirements: ["Disponibilità weekend", "Passione per la moda", "Inglese base"],
    date: "2025-05-06",
    timeSlot: "afternoon",
    applicationUrl: "/job-detail/job-2",
  },
  {
    id: "job-3",
    title: "Consegna pasti a domicilio",
    company: "SpeedFood",
    location: "Milano Zona 4",
    category: "delivery",
    hourlyRate: 11,
    duration: 3,
    description: "Consegna pasti a domicilio con proprio mezzo. Orari flessibili, pagamento a sera.",
    requirements: ["Bici o scooter proprio", "Smartphone con dati", "Disponibilità immediata"],
    date: "2025-05-07",
    timeSlot: "evening",
    applicationUrl: "/job-detail/job-3",
  },
  {
    id: "job-4",
    title: "Tutor di matematica",
    company: "Ripetizioni Top",
    location: "Online o in presenza",
    category: "tutoring",
    hourlyRate: 15,
    duration: 2,
    description: "Cerchiamo studenti di ingegneria/matematica per lezioni private a studenti delle superiori.",
    requirements: ["Competenze matematiche avanzate", "Pazienza", "Esperienza didattica gradita"],
    date: "2025-05-08",
    timeSlot: "afternoon",
    applicationUrl: "/job-detail/job-4",
  },
  {
    id: "job-5",
    title: "Hostess per fiera",
    company: "Milano Expo Events",
    location: "Rho Fiera",
    category: "events",
    hourlyRate: 14,
    duration: 8,
    description: "Hostess per stand aziendale alla fiera del mobile. Dovrai accogliere visitatori e distribuire materiale.",
    requirements: ["Inglese fluente", "Bella presenza", "Disponibilità 23-27 Aprile"],
    date: "2025-05-09",
    timeSlot: "morning",
    applicationUrl: "/job-detail/job-5",
  },
  {
    id: "job-6",
    title: "Barista weekend",
    company: "Caffè Centro",
    location: "Milano Porta Venezia",
    category: "hospitality",
    hourlyRate: 10,
    duration: 6,
    description: "Cerchiamo barista per turni weekend in caffetteria centrale. Preparazione caffè, servizio ai tavoli.",
    requirements: ["Esperienza minima", "Disponibilità weekend", "Attitudine al cliente"],
    date: "2025-05-10",
    timeSlot: "morning",
    applicationUrl: "/job-detail/job-6",
  },
  {
    id: "job-7",
    title: "Supporto clienti part-time",
    company: "TechSupport",
    location: "Remote",
    category: "customer_service",
    hourlyRate: 12,
    duration: 4,
    description: "Assistenza clienti via chat per azienda tech. Turni flessibili, lavoro da remoto.",
    requirements: ["Conoscenze informatiche base", "Ottime capacità comunicative", "Internet stabile"],
    date: "2025-05-11",
    timeSlot: "afternoon",
    applicationUrl: "/job-detail/job-7",
  },
  {
    id: "job-8",
    title: "Volantinaggio promozionale",
    company: "PromoMarketing",
    location: "Milano Vari Quartieri",
    category: "other",
    hourlyRate: 9,
    duration: 3,
    description: "Distribuzione volantini promozionali per nuovo ristorante. Zone centrali di Milano.",
    requirements: ["Predisposizione al contatto col pubblico", "Abbigliamento curato", "Puntualità"],
    date: "2025-05-12",
    timeSlot: "afternoon",
    applicationUrl: "/job-detail/job-8",
  },
];

export const teamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Francesca",
    role: "Co-founder",
    bio: "Studentessa di economia con la passione per l'innovazione sociale",
    image: "https://i.pravatar.cc/400?img=1",
  },
  {
    id: "2",
    name: "Daniele",
    role: "Co-founder",
    bio: "Studente di informatica e sviluppatore con esperienza in startup",
    image: "https://i.pravatar.cc/400?img=3",
  },
  {
    id: "3",
    name: "Marco",
    role: "Co-founder",
    bio: "Laureando in design che crede nella potenza della UX per risolvere problemi",
    image: "https://i.pravatar.cc/400?img=4",
  },
  {
    id: "4",
    name: "Sofia",
    role: "Co-founder",
    bio: "Studentessa di marketing con esperienza nel settore delle risorse umane",
    image: "https://i.pravatar.cc/400?img=5",
  },
  {
    id: "5",
    name: "Timothy",
    role: "Co-founder",
    bio: "Studente di finanza con esperienza in analisi dati e business development",
    image: "https://i.pravatar.cc/400?img=6",
  },
];

// Mock user for development
export const mockUser = {
  id: "user-1",
  name: "Mario Rossi",
  email: "mario.rossi@studente.it",
  profilePicture: "https://i.pravatar.cc/300",
  preferences: {
    categories: ["hospitality", "retail", "events"],
    minHourlyRate: 10,
  },
  availability: [
    {
      date: "2025-05-05",
      availableSlots: ["afternoon", "evening"],
    },
    {
      date: "2025-05-06",
      availableSlots: ["morning"],
    },
    {
      date: "2025-05-07",
      availableSlots: ["afternoon", "evening"],
    },
    {
      date: "2025-05-08",
      availableSlots: ["morning", "afternoon"],
    },
  ],
  monthlyGoal: 500,
  earnedThisMonth: 320,
  upcomingJobs: [mockJobs[0], mockJobs[2]],
  pendingApplications: [mockJobs[4]],
  completedJobs: [
    {
      ...mockJobs[1],
      date: "2025-04-20",
    },
    {
      ...mockJobs[3],
      date: "2025-04-15",
    },
  ],
};

// Authentication helper functions
export const isAuthenticated = (): boolean => {
  return localStorage.getItem('mijob_authenticated') === 'true';
};

export const getCurrentUser = () => {
  const userString = localStorage.getItem('mijob_user');
  if (userString) {
    try {
      return JSON.parse(userString);
    } catch (error) {
      console.error("Error parsing user data", error);
      return null;
    }
  }
  return null;
};

export const logout = () => {
  localStorage.removeItem('mijob_authenticated');
  localStorage.removeItem('mijob_user');
};
