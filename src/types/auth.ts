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
  | 'Offer Extended'
  | 'Declined'
  | 'Placed';

export interface JobApplication {
  id: string;
  jobId: string;
  jobCode?: string;
  jobTitle: string;
  companyName: string;
  sector: string;
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

/**
 * Candidate profile as shown in the UI. Every string/array field is always defined
 * (empty when the candidate has not provided it) so components never hit null.
 */
export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  location: string;
  postcode: string;
  headline: string;
  experienceLevel: string;
  education: EducationItem[];
  targetSector: string;
  availability: string;
  dbsStatus: string;
  // Set only by the LICHT compliance team
  dbsVerified: boolean;
  rightToWorkVerified: boolean;
  nmcPinVerified: boolean;
  bio: string;
  skills: string[];
  certifications: string[];
  previousExperience: ExperienceItem[];
  savedCV: SavedCV | null;
  appliedJobs: JobApplication[];
  savedJobs: string[];
}

export interface ActionResult {
  success: boolean;
  message?: string;
}

export interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<ActionResult>;
  signup: (profileData: Partial<UserProfile> & { password: string }) => Promise<ActionResult>;
  logout: () => void;
  refreshProfile: () => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<ActionResult>;
  applyToJob: (jobId: string, notes?: string) => Promise<ActionResult>;
  hasAppliedToJob: (jobId: string) => boolean;
  withdrawApplication: (applicationId: string) => Promise<ActionResult>;
  uploadCV: (file: File) => Promise<ActionResult>;
  downloadCV: () => Promise<ActionResult>;
  addExperience: (exp: Omit<ExperienceItem, 'id'>) => Promise<ActionResult>;
  deleteExperience: (id: string) => Promise<ActionResult>;
  addEducation: (edu: Omit<EducationItem, 'id'>) => Promise<ActionResult>;
  deleteEducation: (id: string) => Promise<ActionResult>;
  saveJob: (jobId: string) => Promise<ActionResult>;
  unsaveJob: (jobId: string) => Promise<ActionResult>;
  isJobSaved: (jobId: string) => boolean;
}
