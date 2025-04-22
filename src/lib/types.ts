
export type JobCategory = 
  | "hospitality" 
  | "retail" 
  | "events" 
  | "tutoring" 
  | "delivery" 
  | "office" 
  | "customer_service" 
  | "other";

export type TimeSlot = "morning" | "afternoon" | "evening";

export interface DayAvailability {
  date: string; // YYYY-MM-DD format
  availableSlots: TimeSlot[];
}

export interface JobListing {
  id: string;
  title: string;
  company: string;
  location: string;
  category: JobCategory;
  hourlyRate: number;
  duration: number; // In hours
  description: string;
  requirements: string[];
  date: string; // YYYY-MM-DD format
  timeSlot: TimeSlot;
  applicationUrl: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  profilePicture?: string;
  preferences: {
    categories: JobCategory[];
    minHourlyRate?: number;
  };
  availability: DayAvailability[];
  monthlyGoal?: number;
  earnedThisMonth: number;
  upcomingJobs: JobListing[];
  pendingApplications: JobListing[];
  completedJobs: JobListing[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
}
