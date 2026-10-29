export interface ExperienceItem {
  id: string;
  jobTitle: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  responsibilities: string;
}

export interface SavedCV {
  fileName: string;
  fileSize: string;
  uploadedDate: string;
  fileUrl?: string;
}

export type ApplicationStatus = 
  | 'Application Received'
  | 'Under Review'
  | 'Shortlisted'
  | 'Interview Scheduled'
  | 'Offer Extended';

export interface JobApplication {
  id: string;
  jobId: string;
  jobTitle: string;
  companyName: string;
  sector: 'Care homes' | 'Healthcare' | 'Supported living' | 'Corporate';
  location: string;
  contractType: string;
  pay: string;
  appliedDate: string;
  status: ApplicationStatus;
  cvUsed: string;
  notes?: string;
}

export type ExperienceLevel = 
  | 'Student'
  | 'Fresher / Entry level'
  | '1+ years of experience'
  | '3+ years of experience'
  | '5+ years of experience'
  | '10+ years of experience';

export interface EducationItem {
  id: string;
  qualification: string;
  fieldOfStudy: string;
  institution: string;
  graduationYear: string;
}

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  location: string;
  postcode: string;
  headline: string;
  experienceLevel: ExperienceLevel;
  education: EducationItem[];
  targetSector: 'Care homes' | 'Healthcare' | 'Supported living' | 'Corporate';
  availability: 'Immediately available' | '1 week notice' | '2 weeks notice' | '1 month notice';
  dbsStatus: 'Enhanced DBS on Update Service' | 'Standard DBS' | 'In Progress' | 'Not Registered';
  bio: string;
  skills: string[];
  certifications: string[];
  previousExperience: ExperienceItem[];
  savedCV: SavedCV | null;
  appliedJobs: JobApplication[];
  savedJobs: string[];
}

export interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  login: (email: string, password?: string) => Promise<{ success: boolean; message?: string }>;
  signup: (profileData: Partial<UserProfile>) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
  applyToJob: (job: {
    id: string;
    title: string;
    sector: 'Care homes' | 'Healthcare' | 'Supported living' | 'Corporate';
    location: string;
    contract: string;
    pay: string;
    companyName?: string;
  }, notes?: string) => boolean;
  hasAppliedToJob: (jobId: string) => boolean;
  withdrawApplication: (applicationId: string) => void;
  updateCV: (cv: SavedCV) => void;
  addExperience: (exp: Omit<ExperienceItem, 'id'>) => void;
  deleteExperience: (id: string) => void;
  addEducation: (edu: Omit<EducationItem, 'id'>) => void;
  deleteEducation: (id: string) => void;
  saveJob: (jobId: string) => void;
  unsaveJob: (jobId: string) => void;
  isJobSaved: (jobId: string) => boolean;
}
