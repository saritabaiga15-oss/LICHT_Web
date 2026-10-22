import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, AuthContextType, SavedCV, ExperienceItem, JobApplication, EducationItem } from '../types/auth';
import { DEMO_USER_PROFILE } from '../data/demoUser';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = 'licht_recruitment_auth_user';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to parse user from localStorage', e);
    }
    // Default to Eleanor Vance demo account on initial visit so the user immediately experiences the full profile
    return DEMO_USER_PROFILE;
  });

  // Keep localStorage updated
  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch (e) {
      console.error('Failed to save user to localStorage', e);
    }
  }, [user]);

  const login = (email: string, _password?: string): boolean => {
    // Check if email matches demo or log in with demo data
    if (email.toLowerCase().includes('eleanor') || email.toLowerCase().includes('demo') || !user) {
      setUser(DEMO_USER_PROFILE);
    } else {
      // If logging in with previously stored or new email
      setUser(prev => prev ? { ...prev, email } : {
        ...DEMO_USER_PROFILE,
        email,
        fullName: email.split('@')[0].replace(/[._]/g, ' ')
      });
    }
    return true;
  };

  const signup = (profileData: Partial<UserProfile>) => {
    const newUser: UserProfile = {
      id: `cand-${Date.now().toString().slice(-4)}`,
      fullName: profileData.fullName || 'New Candidate',
      email: profileData.email || 'candidate@licht-talent.co.uk',
      phone: profileData.phone || '+44 7700 900000',
      location: profileData.location || 'London, UK',
      postcode: profileData.postcode || 'SW1A 1AA',
      headline: profileData.headline || (profileData.targetSector ? `${profileData.targetSector} Specialist` : 'Healthcare Professional'),
      experienceLevel: profileData.experienceLevel || '1+ years of experience',
      education: profileData.education || [],
      targetSector: profileData.targetSector || 'Care homes',
      availability: profileData.availability || 'Immediately available',
      dbsStatus: profileData.dbsStatus || 'Enhanced DBS on Update Service',
      bio: profileData.bio || 'Compassionate, verified healthcare professional registered with LICHT Recruitment Services Limited.',
      skills: profileData.skills && profileData.skills.length > 0 
        ? profileData.skills 
        : ['Patient Care', 'Communication', 'Health & Safety', 'Record Keeping'],
      certifications: profileData.certifications && profileData.certifications.length > 0
        ? profileData.certifications
        : ['Right to Work in UK', 'Enhanced DBS Certificate'],
      previousExperience: profileData.previousExperience && profileData.previousExperience.length > 0
        ? profileData.previousExperience
        : [],
      savedCV: profileData.savedCV || {
        fileName: `${(profileData.fullName || 'Candidate').replace(/\s+/g, '_')}_CV.pdf`,
        fileSize: '380 KB',
        uploadedDate: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
      },
      appliedJobs: [],
      savedJobs: []
    };

    setUser(newUser);
  };

  const logout = () => {
    setUser(null);
  };

  const updateProfile = (updates: Partial<UserProfile>) => {
    setUser(prev => {
      if (!prev) return null;
      return { ...prev, ...updates };
    });
  };

  const applyToJob = (job: {
    id: string;
    title: string;
    sector: 'Care homes' | 'Healthcare' | 'Supported living' | 'Corporate';
    location: string;
    contract: string;
    pay: string;
    companyName?: string;
  }, notes?: string): boolean => {
    if (!user) return false;

    // Check if already applied
    const alreadyApplied = user.appliedJobs.some(app => app.jobId === job.id);
    if (alreadyApplied) return false;

    const newApplication: JobApplication = {
      id: `app-${Date.now().toString().slice(-4)}`,
      jobId: job.id,
      jobTitle: job.title,
      companyName: job.companyName || `${job.sector} Placement Partner (via LICHT)`,
      sector: job.sector,
      location: job.location,
      contractType: job.contract,
      pay: job.pay,
      appliedDate: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      status: 'Application Received',
      cvUsed: user.savedCV?.fileName || 'Attached Candidate Profile.pdf',
      notes: notes || 'Application submitted directly via LICHT candidate portal.'
    };

    setUser(prev => {
      if (!prev) return null;
      return {
        ...prev,
        appliedJobs: [newApplication, ...prev.appliedJobs]
      };
    });

    return true;
  };

  const hasAppliedToJob = (jobId: string): boolean => {
    if (!user) return false;
    return user.appliedJobs.some(app => app.jobId.toLowerCase() === jobId.toLowerCase());
  };

  const withdrawApplication = (applicationId: string) => {
    setUser(prev => {
      if (!prev) return null;
      return {
        ...prev,
        appliedJobs: prev.appliedJobs.filter(app => app.id !== applicationId)
      };
    });
  };

  const updateCV = (cv: SavedCV) => {
    setUser(prev => {
      if (!prev) return null;
      return { ...prev, savedCV: cv };
    });
  };

  const addExperience = (exp: Omit<ExperienceItem, 'id'>) => {
    const newExp: ExperienceItem = {
      ...exp,
      id: `exp-${Date.now().toString().slice(-4)}`
    };
    setUser(prev => {
      if (!prev) return null;
      return {
        ...prev,
        previousExperience: [newExp, ...prev.previousExperience]
      };
    });
  };

  const deleteExperience = (id: string) => {
    setUser(prev => {
      if (!prev) return null;
      return {
        ...prev,
        previousExperience: prev.previousExperience.filter(exp => exp.id !== id)
      };
    });
  };

  const addEducation = (edu: Omit<EducationItem, 'id'>) => {
    const newEdu: EducationItem = {
      ...edu,
      id: `edu-${Date.now().toString().slice(-4)}`
    };
    setUser(prev => {
      if (!prev) return null;
      return {
        ...prev,
        education: [newEdu, ...(prev.education || [])]
      };
    });
  };

  const deleteEducation = (id: string) => {
    setUser(prev => {
      if (!prev) return null;
      return {
        ...prev,
        education: (prev.education || []).filter(e => e.id !== id)
      };
    });
  };

  const saveJob = (jobId: string) => {
    setUser(prev => {
      if (!prev) return null;
      if (prev.savedJobs.includes(jobId)) return prev;
      return { ...prev, savedJobs: [...prev.savedJobs, jobId] };
    });
  };

  const unsaveJob = (jobId: string) => {
    setUser(prev => {
      if (!prev) return null;
      return { ...prev, savedJobs: prev.savedJobs.filter(id => id !== jobId) };
    });
  };

  const isJobSaved = (jobId: string): boolean => {
    if (!user) return false;
    return user.savedJobs.includes(jobId);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
        updateProfile,
        applyToJob,
        hasAppliedToJob,
        withdrawApplication,
        updateCV,
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
