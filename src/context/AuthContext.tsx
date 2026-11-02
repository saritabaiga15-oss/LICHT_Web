import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { UserProfile, AuthContextType, ExperienceItem, JobApplication, EducationItem, ActionResult } from '../types/auth';
import {
  ApiError,
  getToken,
  setToken,
  candidateRegister,
  candidateLogin,
  fetchCandidateProfile,
  fetchCandidateApplications,
  applyToJob as apiApplyToJob,
  withdrawCandidateApplication as apiWithdrawApplication,
  saveJob as apiSaveJob,
  unsaveJob as apiUnsaveJob,
  updateCandidateProfile as apiUpdateCandidateProfile,
  uploadCandidateCv,
  downloadOwnCv,
  addCandidateExperience,
  deleteCandidateExperience,
  addCandidateEducation,
  deleteCandidateEducation
} from '../services/api';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const s = (v: unknown): string => (v === null || v === undefined ? '' : String(v));
const arr = <T,>(v: unknown): T[] => (Array.isArray(v) ? (v as T[]) : []);

const formatDate = (iso: string) => {
  if (!iso) return '';
  const d = new Date(iso);
  return isNaN(d.getTime()) ? iso : d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
};

/** Maps the backend Candidate entity into the null-safe UI profile. */
function mapCandidate(c: any, appliedJobs: JobApplication[] = []): UserProfile {
  return {
    id: s(c.id),
    fullName: s(c.fullName),
    email: s(c.email),
    phone: s(c.phone),
    location: s(c.location),
    postcode: s(c.postcode),
    headline: s(c.headline),
    experienceLevel: s(c.experienceLevel),
    targetSector: s(c.targetSector),
    availability: s(c.availability),
    dbsStatus: s(c.dbsStatus),
    dbsVerified: Boolean(c.dbsVerified),
    rightToWorkVerified: Boolean(c.rightToWorkVerified),
    nmcPinVerified: Boolean(c.nmcPinVerified),
    bio: s(c.bio),
    skills: arr<string>(c.skills),
    certifications: arr<string>(c.certifications),
    previousExperience: arr<any>(c.previousExperience).map(mapExperience),
    education: arr<any>(c.education).map(mapEducation),
    savedCV: c.savedCvFileName
      ? { fileName: s(c.savedCvFileName), fileSize: s(c.savedCvFileSize), uploadedDate: formatDate(s(c.savedCvUploadedDate)) }
      : null,
    appliedJobs,
    savedJobs: arr<unknown>(c.savedJobs).map(s)
  };
}

const mapExperience = (e: any): ExperienceItem => ({
  id: s(e.id),
  jobTitle: s(e.jobTitle),
  company: s(e.company),
  location: s(e.location),
  startDate: s(e.startDate),
  endDate: s(e.endDate),
  current: Boolean(e.current),
  responsibilities: s(e.responsibilities)
});

const mapEducation = (e: any): EducationItem => ({
  id: s(e.id),
  qualification: s(e.qualification),
  fieldOfStudy: s(e.fieldOfStudy),
  institution: s(e.institution),
  graduationYear: s(e.graduationYear)
});

const mapApplication = (a: any): JobApplication => ({
  id: s(a.id),
  jobId: s(a.jobId),
  jobTitle: s(a.jobTitle),
  companyName: s(a.companyName),
  sector: s(a.sector),
  location: s(a.location),
  contractType: s(a.contractType),
  pay: s(a.pay),
  appliedDate: formatDate(s(a.appliedDate)),
  status: (s(a.status) || 'Application Received') as JobApplication['status'],
  cvUsed: s(a.cvUsed),
  notes: s(a.notes)
});

const errorMessage = (err: unknown, fallback: string) =>
  err instanceof Error && err.message ? err.message : fallback;

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(() => Boolean(getToken('candidate')));

  const logout = useCallback(() => {
    setToken('candidate', null);
    setUser(null);
  }, []);

  /** Wraps an API call: on 401 the session has expired, so sign out. */
  const run = useCallback(async (fn: () => Promise<void>, fallback: string): Promise<ActionResult> => {
    try {
      await fn();
      return { success: true };
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) logout();
      return { success: false, message: errorMessage(err, fallback) };
    }
  }, [logout]);

  const loadSession = useCallback(async () => {
    const [profile, apps] = await Promise.all([fetchCandidateProfile(), fetchCandidateApplications()]);
    setUser(mapCandidate(profile, arr<any>(apps).map(mapApplication)));
  }, []);

  // Restore the session from a stored token on first load
  useEffect(() => {
    if (!getToken('candidate')) return;
    loadSession()
      .catch(() => logout())
      .finally(() => setIsLoading(false));
  }, [loadSession, logout]);

  const refreshProfile = useCallback(async () => {
    if (!getToken('candidate')) return;
    try {
      await loadSession();
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) logout();
    }
  }, [loadSession, logout]);

  const login = async (email: string, password: string): Promise<ActionResult> => {
    try {
      const data = await candidateLogin({ email, password });
      setToken('candidate', data.token);
      const apps = await fetchCandidateApplications().catch(() => []);
      setUser(mapCandidate(data.user, arr<any>(apps).map(mapApplication)));
      return { success: true };
    } catch (err) {
      return { success: false, message: errorMessage(err, 'Invalid email or password.') };
    }
  };

  const signup = async (profileData: Partial<UserProfile> & { password: string }): Promise<ActionResult> => {
    try {
      // Only send what the candidate actually entered; never invent placeholder details
      const data = await candidateRegister({
        fullName: profileData.fullName,
        email: profileData.email,
        password: profileData.password,
        phone: profileData.phone || null,
        location: profileData.location || null,
        postcode: profileData.postcode || null,
        headline: profileData.headline || null,
        experienceLevel: profileData.experienceLevel || null,
        targetSector: profileData.targetSector || null,
        availability: profileData.availability || null,
        dbsStatus: profileData.dbsStatus || null,
        bio: profileData.bio || null,
        skills: profileData.skills || [],
        certifications: profileData.certifications || []
      });
      setToken('candidate', data.token);
      setUser(mapCandidate(data.user));
      return { success: true };
    } catch (err) {
      return { success: false, message: errorMessage(err, 'Could not complete registration.') };
    }
  };

  const updateProfile = (updates: Partial<UserProfile>) =>
    run(async () => {
      const saved = await apiUpdateCandidateProfile(updates);
      setUser(prev => (prev ? { ...mapCandidate(saved, prev.appliedJobs) } : prev));
    }, 'Could not save your profile.');

  const applyToJob = (jobId: string, notes?: string) =>
    run(async () => {
      const app = await apiApplyToJob(jobId, notes);
      setUser(prev => (prev ? { ...prev, appliedJobs: [mapApplication(app), ...prev.appliedJobs] } : prev));
    }, 'Could not submit your application.');

  const hasAppliedToJob = (jobId: string): boolean =>
    Boolean(user?.appliedJobs.some(app => app.jobId === String(jobId)));

  const withdrawApplication = (applicationId: string) =>
    run(async () => {
      await apiWithdrawApplication(applicationId);
      setUser(prev => (prev ? { ...prev, appliedJobs: prev.appliedJobs.filter(a => a.id !== applicationId) } : prev));
    }, 'Could not withdraw the application.');

  const uploadCV = (file: File) =>
    run(async () => {
      const cv = await uploadCandidateCv(file);
      setUser(prev => (prev ? {
        ...prev,
        savedCV: { fileName: s(cv.fileName), fileSize: s(cv.fileSize), uploadedDate: formatDate(s(cv.uploadedDate)) }
      } : prev));
    }, 'Could not upload your CV.');

  const downloadCV = () => run(() => downloadOwnCv(user?.savedCV?.fileName), 'Could not download your CV.');

  const addExperience = (exp: Omit<ExperienceItem, 'id'>) =>
    run(async () => {
      const list = await addCandidateExperience(exp);
      setUser(prev => (prev ? { ...prev, previousExperience: arr<any>(list).map(mapExperience) } : prev));
    }, 'Could not add experience.');

  const deleteExperience = (id: string) =>
    run(async () => {
      const list = await deleteCandidateExperience(id);
      setUser(prev => (prev ? { ...prev, previousExperience: arr<any>(list).map(mapExperience) } : prev));
    }, 'Could not remove experience.');

  const addEducation = (edu: Omit<EducationItem, 'id'>) =>
    run(async () => {
      const list = await addCandidateEducation(edu);
      setUser(prev => (prev ? { ...prev, education: arr<any>(list).map(mapEducation) } : prev));
    }, 'Could not add qualification.');

  const deleteEducation = (id: string) =>
    run(async () => {
      const list = await deleteCandidateEducation(id);
      setUser(prev => (prev ? { ...prev, education: arr<any>(list).map(mapEducation) } : prev));
    }, 'Could not remove qualification.');

  const saveJob = (jobId: string) =>
    run(async () => {
      const list = await apiSaveJob(jobId);
      setUser(prev => (prev ? { ...prev, savedJobs: arr<unknown>(list).map(s) } : prev));
    }, 'Could not save this job.');

  const unsaveJob = (jobId: string) =>
    run(async () => {
      const list = await apiUnsaveJob(jobId);
      setUser(prev => (prev ? { ...prev, savedJobs: arr<unknown>(list).map(s) } : prev));
    }, 'Could not remove this job.');

  const isJobSaved = (jobId: string): boolean => Boolean(user?.savedJobs.includes(String(jobId)));

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        logout,
        refreshProfile,
        updateProfile,
        applyToJob,
        hasAppliedToJob,
        withdrawApplication,
        uploadCV,
        downloadCV,
        addExperience,
        deleteExperience,
        addEducation,
        deleteEducation,
        saveJob,
        unsaveJob,
        isJobSaved
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
