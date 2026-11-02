import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  EmployerAccount,
  EmployerJobListing,
  TalentCandidate,
  EmployerApplicant,
  EmployerContextType,
  EmployerLoginResult,
  EmployerActionResult,
  EmployerRegistrationResult,
  EmployerUploadedDoc,
  NewJobInput
} from '../types/employer';
import {
  ApiError,
  getToken,
  setToken,
  employerLogin as apiEmployerLogin,
  employerRegister as apiEmployerRegister,
  fetchEmployerProfile,
  updateEmployerProfileApi,
  fetchEmployerJobs,
  fetchEmployerApplications,
  fetchEmployerDocuments,
  downloadEmployerDocument,
  postNewJob as apiPostNewJob,
  updateJobStatus as apiUpdateJobStatus,
  updateApplicantStatus as apiUpdateApplicantStatus,
  downloadApplicantCv as apiDownloadApplicantCv,
  fetchTalentPool,
  saveTalentCandidate,
  unsaveTalentCandidate,
  requestTalentInterview
} from '../services/api';

const EmployerContext = createContext<EmployerContextType | undefined>(undefined);

const s = (v: unknown): string => (v === null || v === undefined ? '' : String(v));
const arr = <T,>(v: unknown): T[] => (Array.isArray(v) ? (v as T[]) : []);
const initials = (name: string) =>
  name.split(' ').filter(Boolean).map(n => n[0]).join('').slice(0, 2).toUpperCase();
const yearsFromLevel = (level: string) => {
  const m = /(\d+)\+/.exec(level);
  return m ? Number(m[1]) : 0;
};
const formatDate = (iso: string) => {
  if (!iso) return '';
  const d = new Date(iso);
  return isNaN(d.getTime()) ? iso : d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
};
const errorMessage = (err: unknown, fallback: string) =>
  err instanceof Error && err.message ? err.message : fallback;

export function mapEmployer(e: any, docs: EmployerUploadedDoc[] = [], activeListings = 0): EmployerAccount {
  return {
    id: s(e.id),
    contactName: s(e.contactName),
    roleTitle: s(e.roleTitle),
    organisationName: s(e.organisationName),
    facilityType: s(e.facilityType),
    email: s(e.email),
    phone: s(e.phone),
    location: s(e.location),
    cqcRating: s(e.cqcRating) || undefined,
    activeListingsCount: activeListings,
    companyNumber: s(e.companyNumber) || undefined,
    cqcProviderId: s(e.cqcProviderId) || undefined,
    insurancePolicy: s(e.insurancePolicy) || undefined,
    registeredAddress: s(e.registeredAddress) || undefined,
    postcode: s(e.postcode) || undefined,
    website: s(e.website) || undefined,
    primarySector: s(e.primarySector) || undefined,
    documentsVerified: Boolean(e.documentsVerified),
    uploadedDocuments: docs,
    registrationDate: formatDate(s(e.registrationDate)),
    verificationStatus: (s(e.verificationStatus) || 'Pending') as EmployerAccount['verificationStatus'],
    rejectionReason: s(e.rejectionReason) || undefined
  };
}

export const mapDocument = (d: any, verified: boolean): EmployerUploadedDoc => ({
  id: s(d.id),
  name: s(d.fileName),
  type: s(d.docType),
  size: s(d.fileSize),
  date: formatDate(s(d.uploadedDate)),
  verified
});

const mapApplicant = (a: any): EmployerApplicant => ({
  id: s(a.id),
  candidateName: s(a.candidateName),
  email: s(a.candidateEmail),
  phone: s(a.candidatePhone),
  location: s(a.candidateLocation),
  appliedDate: formatDate(s(a.appliedDate)),
  status: (s(a.status) || 'Application Received') as EmployerApplicant['status'],
  dbsStatus: s(a.dbsStatus) || 'Not provided',
  experienceYears: Number(a.experienceYears) || 0,
  currentRole: s(a.currentRole),
  cvFileName: s(a.cvUsed),
  coverNote: s(a.notes) || undefined
});

const mapJob = (j: any, applicants: EmployerApplicant[]): EmployerJobListing => ({
  id: s(j.id),
  title: s(j.title),
  sector: s(j.sector),
  location: s(j.location),
  contractType: s(j.contract) || s(j.type),
  payRate: s(j.pay),
  postedDate: formatDate(s(j.postedDate)),
  status: (s(j.status) || 'Active') as EmployerJobListing['status'],
  applicants,
  urgentCover: Boolean(j.urgentCover)
});

const mapTalent = (c: any): TalentCandidate => {
  const name = s(c.fullName);
  const level = s(c.experienceLevel);
  return {
    id: s(c.id),
    name,
    headline: s(c.headline),
    role: s(c.headline),
    sector: s(c.targetSector),
    location: s(c.location),
    postcode: '',
    experienceYears: yearsFromLevel(level),
    experienceLevel: level,
    dbsStatus: s(c.dbsStatus) || 'Not provided',
    availability: s(c.availability),
    skills: arr<string>(c.skills),
    certifications: arr<string>(c.certifications),
    verified: Boolean(c.dbsVerified) && Boolean(c.rightToWorkVerified),
    avatarInitials: initials(name),
    summary: s(c.bio)
  };
};

export const EmployerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [employer, setEmployer] = useState<EmployerAccount | null>(null);
  const [isEmployerLoading, setIsEmployerLoading] = useState<boolean>(() => Boolean(getToken('employer')));
  const [jobListings, setJobListings] = useState<EmployerJobListing[]>([]);
  const [talentPool, setTalentPool] = useState<TalentCandidate[]>([]);
  const [savedCandidates, setSavedCandidates] = useState<string[]>([]);

  const employerLogout = useCallback(() => {
    setToken('employer', null);
    setEmployer(null);
    setJobListings([]);
    setTalentPool([]);
    setSavedCandidates([]);
  }, []);

  /** Loads everything the dashboard needs from the backend. */
  const loadEmployerData = useCallback(async () => {
    const [profile, jobs, apps, docs, pool] = await Promise.all([
      fetchEmployerProfile(),
      fetchEmployerJobs(),
      fetchEmployerApplications(),
      fetchEmployerDocuments().catch(() => []),
      fetchTalentPool().catch(() => [])
    ]);
    const byJob = new Map<string, EmployerApplicant[]>();
    for (const a of arr<any>(apps)) {
      const key = s(a.jobId);
      byJob.set(key, [...(byJob.get(key) || []), mapApplicant(a)]);
    }
    const listings = arr<any>(jobs)
      .map(j => mapJob(j, byJob.get(s(j.id)) || []))
      .sort((a, b) => Number(b.id) - Number(a.id));
    const verified = Boolean(profile?.documentsVerified);
    setEmployer(mapEmployer(profile, arr<any>(docs).map(d => mapDocument(d, verified)), listings.filter(l => l.status === 'Active').length));
    setJobListings(listings);
    setTalentPool(arr<any>(pool).map(mapTalent));
    setSavedCandidates(arr<unknown>(profile?.savedCandidates).map(s));
  }, []);

  useEffect(() => {
    if (!getToken('employer')) return;
    loadEmployerData()
      .catch(() => employerLogout())
      .finally(() => setIsEmployerLoading(false));
  }, [loadEmployerData, employerLogout]);

  const refreshEmployerData = useCallback(async () => {
    try {
      await loadEmployerData();
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) employerLogout();
    }
  }, [loadEmployerData, employerLogout]);

  const run = useCallback(async (fn: () => Promise<void>, fallback: string): Promise<EmployerActionResult> => {
    try {
      await fn();
      return { success: true };
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) employerLogout();
      return { success: false, message: errorMessage(err, fallback) };
    }
  }, [employerLogout]);

  const employerLogin = async (email: string, password: string): Promise<EmployerLoginResult> => {
    try {
      const data = await apiEmployerLogin({ email: email.trim().toLowerCase(), password });
      setToken('employer', data.token);
      await loadEmployerData();
      return { success: true, status: 'OK' };
    } catch (err) {
      setToken('employer', null);
      const msg = errorMessage(err, 'Login failed.');
      if (err instanceof ApiError && err.status === 403) {
        return { success: false, status: /declined|rejected/i.test(msg) ? 'REJECTED' : 'PENDING', message: msg };
      }
      return { success: false, status: 'INVALID', message: msg };
    }
  };

  const registerEmployer = async (data: Partial<EmployerAccount>, password: string): Promise<EmployerRegistrationResult> => {
    // Errors propagate to the caller so the form can show them
    const res = await apiEmployerRegister({
      contactName: data.contactName,
      roleTitle: data.roleTitle,
      organisationName: data.organisationName,
      facilityType: data.facilityType,
      email: data.email,
      password,
      phone: data.phone,
      location: data.location,
      postcode: data.postcode,
      cqcRating: data.cqcRating,
      companyNumber: data.companyNumber,
      cqcProviderId: data.cqcProviderId,
      insurancePolicy: data.insurancePolicy,
      registeredAddress: data.registeredAddress,
      website: data.website,
      primarySector: data.primarySector
    });
    return { account: mapEmployer(res.employer), documentUploadToken: res.documentUploadToken };
  };

  const updateEmployerProfile = (data: Partial<EmployerAccount>) =>
    run(async () => {
      const saved = await updateEmployerProfileApi(data);
      setEmployer(prev => (prev ? { ...mapEmployer(saved, prev.uploadedDocuments, prev.activeListingsCount) } : prev));
    }, 'Could not save your profile.');

  const postNewJob = (job: NewJobInput) =>
    run(async () => {
      await apiPostNewJob({
        title: job.title,
        sector: job.sector,
        location: job.location,
        contract: job.contractType,
        type: job.contractType,
        pay: job.payRate,
        urgentCover: Boolean(job.urgentCover)
      });
      await loadEmployerData();
    }, 'Could not post this vacancy.');

  const updateJobStatus = (jobId: string, status: EmployerJobListing['status']) =>
    run(async () => {
      await apiUpdateJobStatus(jobId, status);
      setJobListings(prev => prev.map(j => (j.id === jobId ? { ...j, status } : j)));
    }, 'Could not update the vacancy.');

  const updateApplicantStatus = (jobId: string, applicantId: string, status: EmployerApplicant['status']) =>
    run(async () => {
      await apiUpdateApplicantStatus(jobId, applicantId, status);
      setJobListings(prev =>
        prev.map(job =>
          job.id !== jobId
            ? job
            : { ...job, applicants: job.applicants.map(app => (app.id === applicantId ? { ...app, status } : app)) }
        )
      );
    }, 'Could not update the applicant.');

  const downloadApplicantCv = (jobId: string, applicantId: string, fileName?: string) =>
    run(() => apiDownloadApplicantCv(jobId, applicantId, fileName), 'Could not download the CV.');

  const downloadDocument = (docId: string, fileName?: string) =>
    run(() => downloadEmployerDocument(docId, fileName), 'Could not download the document.');

  const toggleSaveCandidate = (candidateId: string) =>
    run(async () => {
      const list = savedCandidates.includes(candidateId)
        ? await unsaveTalentCandidate(candidateId)
        : await saveTalentCandidate(candidateId);
      setSavedCandidates(arr<unknown>(list).map(s));
    }, 'Could not update your shortlist.');

  const requestCandidateInterview = (candidateId: string, message: string) =>
    run(async () => {
      await requestTalentInterview(candidateId, message);
    }, 'Could not send the interview request.');

  return (
    <EmployerContext.Provider
      value={{
        employer,
        isEmployerAuthenticated: Boolean(employer),
        isEmployerLoading,
        employerLogin,
        registerEmployer,
        updateEmployerProfile,
        employerLogout,
        refreshEmployerData,
        jobListings,
        postNewJob,
        updateJobStatus,
        updateApplicantStatus,
        downloadApplicantCv,
        downloadDocument,
        talentPool,
        savedCandidates,
        toggleSaveCandidate,
        requestCandidateInterview
      }}
    >
      {children}
    </EmployerContext.Provider>
  );
};

export const useEmployer = (): EmployerContextType => {
  const context = useContext(EmployerContext);
  if (!context) {
    throw new Error('useEmployer must be used within an EmployerProvider');
  }
  return context;
};
