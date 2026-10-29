import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  EmployerAccount, 
  EmployerJobListing, 
  TalentCandidate, 
  EmployerApplicant,
  EmployerContextType,
  EmployerLoginResult 
} from '../types/employer';
import { DEMO_EMPLOYER, INITIAL_EMPLOYER_JOBS, TALENT_POOL, INITIAL_ALL_EMPLOYERS } from '../data/employerData';
import { employerLogin as apiEmployerLogin, employerRegister as apiEmployerRegister, postNewJob as apiPostNewJob } from '../services/api';

const EMPLOYER_STORAGE_KEY = 'licht_employer_profile';
const ALL_EMPLOYERS_STORAGE_KEY = 'licht_all_employers';
const EMPLOYER_JOBS_KEY = 'licht_employer_jobs';
const SAVED_CANDIDATES_KEY = 'licht_employer_saved_cand';

const EmployerContext = createContext<EmployerContextType | undefined>(undefined);

export const EmployerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [allEmployers, setAllEmployers] = useState<EmployerAccount[]>(() => {
    try {
      const stored = localStorage.getItem(ALL_EMPLOYERS_STORAGE_KEY);
      return stored ? JSON.parse(stored) : INITIAL_ALL_EMPLOYERS;
    } catch {
      return INITIAL_ALL_EMPLOYERS;
    }
  });

  const [employer, setEmployer] = useState<EmployerAccount | null>(() => {
    try {
      const stored = localStorage.getItem(EMPLOYER_STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const [jobListings, setJobListings] = useState<EmployerJobListing[]>(() => {
    try {
      const stored = localStorage.getItem(EMPLOYER_JOBS_KEY);
      return stored ? JSON.parse(stored) : INITIAL_EMPLOYER_JOBS;
    } catch {
      return INITIAL_EMPLOYER_JOBS;
    }
  });

  const [savedCandidates, setSavedCandidates] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(SAVED_CANDIDATES_KEY);
      return stored ? JSON.parse(stored) : ['cand-001'];
    } catch {
      return ['cand-001'];
    }
  });

  const [talentPool] = useState<TalentCandidate[]>(TALENT_POOL);

  useEffect(() => {
    localStorage.setItem(ALL_EMPLOYERS_STORAGE_KEY, JSON.stringify(allEmployers));
  }, [allEmployers]);

  useEffect(() => {
    if (employer) {
      localStorage.setItem(EMPLOYER_STORAGE_KEY, JSON.stringify(employer));
    } else {
      localStorage.removeItem(EMPLOYER_STORAGE_KEY);
    }
  }, [employer]);

  useEffect(() => {
    localStorage.setItem(EMPLOYER_JOBS_KEY, JSON.stringify(jobListings));
  }, [jobListings]);

  useEffect(() => {
    localStorage.setItem(SAVED_CANDIDATES_KEY, JSON.stringify(savedCandidates));
  }, [savedCandidates]);

  const employerLogin = async (email: string, password?: string): Promise<EmployerLoginResult> => {
    const cleanEmail = email.trim().toLowerCase();

    // 1. Try Live Spring Boot backend & PostgreSQL Neon DB
    try {
      const res = await apiEmployerLogin({ email: cleanEmail, password: password || 'Secure2026!' });
      if (res && res.success && res.data) {
        if (res.data.token) {
          localStorage.setItem('licht_token', res.data.token);
        }
        if (res.data.employer) {
          const emp = res.data.employer;
          const mappedEmp: EmployerAccount = {
            ...DEMO_EMPLOYER,
            id: String(emp.id),
            contactName: emp.contactName,
            roleTitle: emp.roleTitle || 'Registered Manager',
            organisationName: emp.organisationName,
            facilityType: emp.facilityType || 'Care Home & Residential Facility',
            email: emp.email,
            phone: emp.phone || '+44 20 7946 0812',
            location: emp.location || 'London, United Kingdom',
            cqcRating: emp.cqcRating || 'Good',
            registeredAddress: emp.registeredAddress || '72 High Street, London',
            postcode: emp.postcode || 'W8 4QP',
            website: emp.website || 'https://www.carefacility.co.uk',
            primarySector: emp.primarySector || 'Care homes',
            verificationStatus: (emp.verificationStatus as any) || 'Verified',
            documentsVerified: Boolean(emp.documentsVerified)
          };
          setEmployer(mappedEmp);
          return { success: true, status: 'OK' };
        }
      }
    } catch (err: any) {
      const msg = err?.message || '';
      if (msg.toLowerCase().includes('pending') || msg.toLowerCase().includes('verification')) {
        return {
          success: false,
          status: 'PENDING',
          message: msg
        };
      }
      if (msg.toLowerCase().includes('rejected') || msg.toLowerCase().includes('declined')) {
        return {
          success: false,
          status: 'REJECTED',
          message: msg
        };
      }
      if (msg.toLowerCase().includes('incorrect') || msg.toLowerCase().includes('no organisation')) {
        return {
          success: false,
          status: 'INVALID',
          message: msg
        };
      }
    }

    // 2. Check in registered allEmployers
    const match = allEmployers.find(e => e.email.toLowerCase() === cleanEmail);

    if (match) {
      if (match.verificationStatus === 'Pending') {
        return {
          success: false,
          status: 'PENDING',
          message: `Registration for "${match.organisationName}" is currently pending verification from the LICHT Admin Compliance Desk. Once verified, you will be able to log in.`
        };
      }

      if (match.verificationStatus === 'Rejected') {
        return {
          success: false,
          status: 'REJECTED',
          message: `The registration for "${match.organisationName}" was declined during compliance review. Please contact support@lichtrecruitment.co.uk.`
        };
      }

      setEmployer(match);
      return { success: true, status: 'OK' };
    }

    // Demo account fallback
    if (cleanEmail.includes('thorne') || cleanEmail.includes('demo') || cleanEmail === 'j.thorne@stjudecare.co.uk') {
      const demoMatch = allEmployers.find(e => e.id === 'emp-001') || DEMO_EMPLOYER;
      setEmployer(demoMatch);
      return { success: true, status: 'OK' };
    }

    return {
      success: false,
      status: 'INVALID',
      message: 'No employer account found with these credentials. Please check your email or register your company.'
    };
  };

  const registerEmployer = async (data: Partial<EmployerAccount>, password?: string): Promise<EmployerAccount> => {
    const newAccount: EmployerAccount = {
      id: `emp-${Date.now()}`,
      contactName: data.contactName || 'Healthcare Director',
      roleTitle: data.roleTitle || 'Registered Manager',
      organisationName: data.organisationName || 'Healthcare Facility',
      facilityType: data.facilityType || 'Care Home & Residential Facility',
      email: data.email || 'director@carehome.co.uk',
      phone: data.phone || '+44 20 7946 0812',
      location: data.location || (data.postcode ? `London (${data.postcode})` : 'London, United Kingdom'),
      cqcRating: data.cqcRating || 'Good',
      companyNumber: data.companyNumber || `12${Math.floor(100000 + Math.random() * 900000)}`,
      cqcProviderId: data.cqcProviderId || `1-${Math.floor(100000000 + Math.random() * 900000000)}`,
      insurancePolicy: data.insurancePolicy || `UK-HIS-${Math.floor(100000 + Math.random() * 900000)}`,
      registeredAddress: data.registeredAddress || '72 High Street, Kensington, London W8 4QP',
      postcode: data.postcode || 'W8 4QP',
      website: data.website || 'https://www.carefacility.co.uk',
      primarySector: data.primarySector || 'Care homes',
      documentsVerified: false,
      verificationStatus: 'Pending',
      password: password || 'Secure2026!',
      activeListingsCount: 0,
      uploadedDocuments: data.uploadedDocuments || [
        { id: `doc-${Date.now()}-1`, name: 'CQC_Registration_Certificate.pdf', type: 'CQC Certificate', size: '2.4 MB', date: 'Attached Today', verified: false },
        { id: `doc-${Date.now()}-2`, name: 'Employers_Liability_Insurance_Schedule.pdf', type: 'Insurance', size: '1.8 MB', date: 'Attached Today', verified: false }
      ],
      registrationDate: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
    };

    // Sync to live Spring Boot backend (Neon DB)
    try {
      const res = await apiEmployerRegister({
        contactName: newAccount.contactName,
        roleTitle: newAccount.roleTitle,
        organisationName: newAccount.organisationName,
        facilityType: newAccount.facilityType,
        email: newAccount.email,
        password: newAccount.password,
        phone: newAccount.phone,
        location: newAccount.location,
        postcode: newAccount.postcode,
        cqcRating: newAccount.cqcRating,
        companyNumber: newAccount.companyNumber,
        cqcProviderId: newAccount.cqcProviderId,
        insurancePolicy: newAccount.insurancePolicy,
        registeredAddress: newAccount.registeredAddress,
        website: newAccount.website,
        primarySector: newAccount.primarySector
      });
      if (res && res.data?.employer) {
        newAccount.id = String(res.data.employer.id);
      }
    } catch (err: any) {
      console.warn('Backend employer register note:', err?.message);
    }

    // Add to allEmployers list
    setAllEmployers(prev => [newAccount, ...prev]);

    return newAccount;
  };


  const approveEmployer = (employerId: string) => {
    setAllEmployers(prev => prev.map(e => {
      if (e.id !== employerId) return e;
      return {
        ...e,
        verificationStatus: 'Verified',
        documentsVerified: true,
        uploadedDocuments: (e.uploadedDocuments || []).map(doc => ({ ...doc, verified: true }))
      };
    }));

    // If currently logged in as this employer, update session
    setEmployer(prev => {
      if (prev && prev.id === employerId) {
        return {
          ...prev,
          verificationStatus: 'Verified',
          documentsVerified: true,
          uploadedDocuments: (prev.uploadedDocuments || []).map(doc => ({ ...doc, verified: true }))
        };
      }
      return prev;
    });
  };

  const rejectEmployer = (employerId: string, _reason?: string) => {
    setAllEmployers(prev => prev.map(e => {
      if (e.id !== employerId) return e;
      return {
        ...e,
        verificationStatus: 'Rejected'
      };
    }));
  };

  const deleteEmployer = (employerId: string) => {
    setAllEmployers(prev => prev.filter(e => e.id !== employerId));
    if (employer?.id === employerId) {
      setEmployer(null);
    }
  };

  const updateEmployerProfile = (data: Partial<EmployerAccount>) => {
    if (!employer) return;
    const updated = { ...employer, ...data };
    setEmployer(updated);
    setAllEmployers(prev => prev.map(e => e.id === employer.id ? updated : e));
  };

  const employerLogout = () => {
    setEmployer(null);
  };

  const postNewJob = (job: Omit<EmployerJobListing, 'id' | 'postedDate' | 'applicants'>) => {
    const newEntry: EmployerJobListing = {
      ...job,
      id: `emp-job-${Date.now()}`,
      postedDate: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      applicants: []
    };
    // Sync posted job to backend
    apiPostNewJob({
      title: job.title,
      sector: job.sector,
      location: job.location,
      contract: job.contractType,
      type: job.contractType,
      pay: job.payRate,
      urgentCover: job.urgentCover || false,
      summary: `Urgent staffing requirement for ${job.title} in ${job.location}`,
      companyName: employer ? employer.organisationName : 'LICHT Healthcare Partner'
    }).catch(() => {});

    setJobListings(prev => [newEntry, ...prev]);
  };

  const updateApplicantStatus = (
    jobId: string, 
    applicantId: string, 
    status: EmployerApplicant['status']
  ) => {
    setJobListings(prev => 
      prev.map(job => {
        if (job.id !== jobId) return job;
        return {
          ...job,
          applicants: job.applicants.map(app => 
            app.id === applicantId ? { ...app, status } : app
          )
        };
      })
    );
  };

  const toggleSaveCandidate = (candidateId: string) => {
    setSavedCandidates(prev => 
      prev.includes(candidateId)
        ? prev.filter(id => id !== candidateId)
        : [...prev, candidateId]
    );
  };

  const requestCandidateInterview = (_candidateId: string, _message: string) => {
    // Simulated instant dispatch to LICHT placement desk
  };

  return (
    <EmployerContext.Provider
      value={{
        employer,
        isEmployerAuthenticated: Boolean(employer),
        employerLogin,
        registerEmployer,
        updateEmployerProfile,
        employerLogout,
        jobListings,
        postNewJob,
        updateApplicantStatus,
        talentPool,
        savedCandidates,
        toggleSaveCandidate,
        requestCandidateInterview,
        allEmployers,
        approveEmployer,
        rejectEmployer,
        deleteEmployer
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
