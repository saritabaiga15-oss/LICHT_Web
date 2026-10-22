export type EmployerSector = 'Care homes' | 'Healthcare' | 'Supported living' | 'Corporate';

export interface ApplicantWorkHistory {
  role: string;
  company: string;
  duration: string;
  details: string;
}

export interface EmployerApplicant {
  id: string;
  candidateName: string;
  email: string;
  phone: string;
  location: string;
  appliedDate: string;
  status: 'Under Review' | 'Shortlisted' | 'Interview Scheduled' | 'Offer Extended' | 'Declined';
  dbsStatus: string;
  experienceYears: number;
  currentRole: string;
  cvFileName: string;
  matchScore: number;
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
  sector: EmployerSector;
  location: string;
  contractType: 'Permanent' | 'Temporary cover' | 'Full-time' | 'Night shifts' | 'Block booking';
  payRate: string;
  postedDate: string;
  status: 'Active' | 'Paused' | 'Filled';
  applicants: EmployerApplicant[];
  urgentCover?: boolean;
}

export interface TalentCandidate {
  id: string;
  name: string;
  headline: string;
  role: string;
  sector: EmployerSector;
  location: string;
  postcode: string;
  experienceYears: number;
  dbsStatus: string;
  availability: string;
  expectedRate: string;
  skills: string[];
  certifications: string[];
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
  cqcRating?: 'Outstanding' | 'Good' | 'Requires Improvement' | 'Pending Inspection';
  activeListingsCount: number;
  companyNumber?: string;
  cqcProviderId?: string;
  insurancePolicy?: string;
  registeredAddress?: string;
  postcode?: string;
  website?: string;
  primarySector?: EmployerSector;
  documentsVerified?: boolean;
  uploadedDocuments?: EmployerUploadedDoc[];
  registrationDate?: string;
  verificationStatus: 'Pending' | 'Verified' | 'Rejected';
  password?: string;
}

export interface EmployerLoginResult {
  success: boolean;
  status: 'OK' | 'PENDING' | 'REJECTED' | 'INVALID';
  message?: string;
}

export interface EmployerContextType {
  employer: EmployerAccount | null;
  isEmployerAuthenticated: boolean;
  employerLogin: (email: string, password?: string) => EmployerLoginResult;
  registerEmployer: (data: Partial<EmployerAccount>, password?: string) => EmployerAccount;
  updateEmployerProfile: (data: Partial<EmployerAccount>) => void;
  employerLogout: () => void;
  jobListings: EmployerJobListing[];
  postNewJob: (job: Omit<EmployerJobListing, 'id' | 'postedDate' | 'applicants'>) => void;
  updateApplicantStatus: (jobId: string, applicantId: string, status: EmployerApplicant['status']) => void;
  talentPool: TalentCandidate[];
  savedCandidates: string[];
  toggleSaveCandidate: (candidateId: string) => void;
  requestCandidateInterview: (candidateId: string, message: string) => void;
  allEmployers: EmployerAccount[];
  approveEmployer: (employerId: string) => void;
  rejectEmployer: (employerId: string, reason?: string) => void;
  deleteEmployer: (employerId: string) => void;
}

