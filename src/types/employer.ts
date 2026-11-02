export type EmployerSector = 'Care homes' | 'Healthcare' | 'Supported living' | 'Corporate';

export interface ApplicantWorkHistory {
  role: string;
  company: string;
  duration: string;
  details: string;
}

export type EmployerApplicantStatus =
  | 'Application Received'
  | 'Under Review'
  | 'Shortlisted'
  | 'Interview Scheduled'
  | 'Offer Extended'
  | 'Declined'
  | 'Placed';

export interface EmployerApplicant {
  id: string;
  candidateName: string;
  email: string;
  phone: string;
  location: string;
  appliedDate: string;
  status: EmployerApplicantStatus;
  dbsStatus: string;
  experienceYears: number;
  currentRole: string;
  cvFileName: string;
  matchScore?: number;
  coverNote?: string;
  skills?: string[];
  education?: string[];
  certifications?: string[];
  workHistory?: ApplicantWorkHistory[];
  referencesAvailable?: boolean;
}

export interface EmployerJobListing {
  id: string;
  title: string;
  sector: string;
  location: string;
  contractType: string;
  payRate: string;
  postedDate: string;
  status: 'Active' | 'Paused' | 'Filled';
  applicants: EmployerApplicant[];
  urgentCover?: boolean;
}

export interface NewJobInput {
  title: string;
  sector: string;
  location: string;
  contractType: string;
  payRate: string;
  urgentCover?: boolean;
}

export interface TalentCandidate {
  id: string;
  name: string;
  headline: string;
  role: string;
  sector: string;
  location: string;
  postcode: string;
  experienceYears: number;
  experienceLevel: string;
  dbsStatus: string;
  availability: string;
  expectedRate?: string;
  skills: string[];
  certifications: string[];
  // True only when LICHT has verified both DBS and Right to Work
  verified: boolean;
  avatarInitials: string;
  summary: string;
}

export interface EmployerUploadedDoc {
  id: string;
  name: string;
  type: string;
  size: string;
  date: string;
  verified: boolean;
}

export interface EmployerAccount {
  id: string;
  contactName: string;
  roleTitle: string;
  organisationName: string;
  facilityType: string;
  email: string;
  phone: string;
  location: string;
  cqcRating?: string;
  activeListingsCount: number;
  companyNumber?: string;
  cqcProviderId?: string;
  insurancePolicy?: string;
  registeredAddress?: string;
  postcode?: string;
  website?: string;
  primarySector?: string;
  documentsVerified?: boolean;
  uploadedDocuments?: EmployerUploadedDoc[];
  registrationDate?: string;
  verificationStatus: 'Pending' | 'Verified' | 'Rejected';
  rejectionReason?: string;
}

export interface EmployerLoginResult {
  success: boolean;
  status: 'OK' | 'PENDING' | 'REJECTED' | 'INVALID';
  message?: string;
}

export interface EmployerActionResult {
  success: boolean;
  message?: string;
}

export interface EmployerRegistrationResult {
  account: EmployerAccount;
  /** One-hour token that can only upload compliance documents for this registration */
  documentUploadToken?: string;
}

export interface EmployerContextType {
  employer: EmployerAccount | null;
  isEmployerAuthenticated: boolean;
  isEmployerLoading: boolean;
  employerLogin: (email: string, password: string) => Promise<EmployerLoginResult>;
  registerEmployer: (data: Partial<EmployerAccount>, password: string) => Promise<EmployerRegistrationResult>;
  updateEmployerProfile: (data: Partial<EmployerAccount>) => Promise<EmployerActionResult>;
  employerLogout: () => void;
  refreshEmployerData: () => Promise<void>;
  jobListings: EmployerJobListing[];
  postNewJob: (job: NewJobInput) => Promise<EmployerActionResult>;
  updateJobStatus: (jobId: string, status: EmployerJobListing['status']) => Promise<EmployerActionResult>;
  updateApplicantStatus: (jobId: string, applicantId: string, status: EmployerApplicantStatus) => Promise<EmployerActionResult>;
  downloadApplicantCv: (jobId: string, applicantId: string, fileName?: string) => Promise<EmployerActionResult>;
  downloadDocument: (docId: string, fileName?: string) => Promise<EmployerActionResult>;
  talentPool: TalentCandidate[];
  savedCandidates: string[];
  toggleSaveCandidate: (candidateId: string) => Promise<EmployerActionResult>;
  requestCandidateInterview: (candidateId: string, message: string) => Promise<EmployerActionResult>;
}
