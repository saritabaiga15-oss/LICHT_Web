import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Lock,
  Mail,
  Eye,
  EyeOff,
  CheckCircle2,
  XCircle,
  Clock,
  Building2,
  FileText,
  Users,
  Briefcase,
  AlertTriangle,
  LogOut,
  ChevronDown,
  ChevronUp,
  Download,
  Search,
  Filter,
  Home,
  GraduationCap,
  Award,
  Phone,
  MapPin,
  Calendar,
  Sparkles,
  UserCheck,
  Check,
  ArrowRight
} from 'lucide-react';
import { mapEmployer, mapDocument } from '../context/EmployerContext';
import { EmployerAccount, EmployerJobListing } from '../types/employer';
import {
  ApiError,
  getToken,
  setToken,
  adminLogin,
  fetchAdminCandidates,
  fetchAdminEmployers,
  fetchAdminEmployerDocuments,
  downloadAdminEmployerDocument,
  fetchAdminJobs,
  fetchAdminApplications,
  updateAdminApplicationStatus,
  updateCandidateCompliance,
  approveAdminEmployer,
  rejectAdminEmployer,
  deleteAdminEmployer,
  downloadAdminCandidateCv
} from '../services/api';
import './AdminPortal.css';

// Admin portal types

type AdminPortalRole = 'employers' | 'jobseekers';
type EmployerView = 'pending' | 'verified' | 'rejected' | 'jobs' | 'all';
type JobSeekerView = 'candidates' | 'applications' | 'compliance';

interface AdminCandidate {
  id: string;
  name: string;
  avatarInitials: string;
  headline: string;
  email: string;
  phone: string;
  location: string;
  postcode: string;
  sector: string;
  experienceLevel: string;
  education: {
    qualification: string;
    fieldOfStudy: string;
    institution: string;
    graduationYear: string;
  }[];
  skills: string[];
  certifications: string[];
  dbsStatus: string;
  dbsVerified: boolean;
  rightToWorkVerified: boolean;
  nmcPinVerified?: boolean;
  availability: string;
  hasCv: boolean;
  cvFileName: string;
  cvFileSize: string;
  registrationDate: string;
}

interface AdminApplication {
  id: string;
  candidateId: string;
  candidateName: string;
  candidateEmail: string;
  jobId: string;
  jobTitle: string;
  employerName: string;
  sector: string;
  location: string;
  appliedDate: string;
  status: 'Application Received' | 'Under Review' | 'Shortlisted' | 'Interview Scheduled' | 'Offer Extended' | 'Placed' | 'Declined';
  cvFileName: string;
  candidateNote?: string;
}

const str = (v: unknown) => (v === null || v === undefined ? '' : String(v));
const fmtDate = (iso: string) => {
  if (!iso) return '';
  const d = new Date(iso);
  return isNaN(d.getTime()) ? iso : d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
};

const mapAdminCandidate = (c: any): AdminCandidate => {
  const name = str(c.fullName) || 'Candidate';
  return {
    id: str(c.id),
    name,
    avatarInitials: name.split(' ').filter(Boolean).map(n => n[0]).join('').substring(0, 2).toUpperCase(),
    headline: str(c.headline),
    email: str(c.email),
    phone: str(c.phone),
    location: str(c.location),
    postcode: str(c.postcode),
    sector: str(c.targetSector),
    experienceLevel: str(c.experienceLevel),
    education: (Array.isArray(c.education) ? c.education : []).map((e: any) => ({
      qualification: str(e.qualification),
      fieldOfStudy: str(e.fieldOfStudy),
      institution: str(e.institution),
      graduationYear: str(e.graduationYear)
    })),
    skills: Array.isArray(c.skills) ? c.skills : [],
    certifications: Array.isArray(c.certifications) ? c.certifications : [],
    dbsStatus: str(c.dbsStatus) || 'Not provided',
    dbsVerified: Boolean(c.dbsVerified),
    rightToWorkVerified: Boolean(c.rightToWorkVerified),
    nmcPinVerified: Boolean(c.nmcPinVerified),
    availability: str(c.availability),
    hasCv: Boolean(c.savedCvFileName),
    cvFileName: str(c.savedCvFileName) || 'No CV uploaded',
    cvFileSize: str(c.savedCvFileSize),
    registrationDate: fmtDate(str(c.createdAt))
  };
};

const mapAdminApplication = (a: any): AdminApplication => ({
  id: str(a.id),
  candidateId: str(a.candidateId),
  candidateName: str(a.candidateName),
  candidateEmail: str(a.candidateEmail),
  jobId: str(a.jobId),
  jobTitle: str(a.jobTitle),
  employerName: str(a.companyName),
  sector: str(a.sector),
  location: str(a.location),
  appliedDate: fmtDate(str(a.appliedDate)),
  status: (str(a.status) || 'Application Received') as AdminApplication['status'],
  cvFileName: str(a.cvUsed),
  candidateNote: str(a.notes) || undefined
});

export const AdminPortal: React.FC = () => {
  // Admin auth state (token is kept in sessionStorage, so a refresh keeps the session)
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => Boolean(getToken('admin')));
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [showAdminPass, setShowAdminPass] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Top level role switcher: 'employers' | 'jobseekers'
  const [activeRole, setActiveRole] = useState<AdminPortalRole>('employers');

  // Sub navigation for Employers
  const [employerView, setEmployerView] = useState<EmployerView>('pending');
  // Sub navigation for Job Seekers
  const [jobSeekerView, setJobSeekerView] = useState<JobSeekerView>('candidates');

  // Live data from the backend
  const [allEmployers, setAllEmployers] = useState<EmployerAccount[]>([]);
  const [candidates, setCandidates] = useState<AdminCandidate[]>([]);
  const [applications, setApplications] = useState<AdminApplication[]>([]);
  const [jobListings, setJobListings] = useState<EmployerJobListing[]>([]);
  const [loadError, setLoadError] = useState<string | null>(null);

  const handleAdminLogout = () => {
    setToken('admin', null);
    setIsAdminLoggedIn(false);
  };

  const handleApiError = (err: unknown, fallback: string) => {
    if (err instanceof ApiError && err.status === 401) {
      handleAdminLogout();
      setLoginError('Your admin session has expired. Please sign in again.');
      return;
    }
    setLoadError(err instanceof Error && err.message ? err.message : fallback);
  };

  const loadAdminData = async () => {
    setLoadError(null);
    try {
      const [emps, cands, apps, jobs] = await Promise.all([
        fetchAdminEmployers(),
        fetchAdminCandidates(),
        fetchAdminApplications(),
        fetchAdminJobs()
      ]);
      const empList: any[] = Array.isArray(emps) ? emps : [];
      const docs = await Promise.all(empList.map(e => fetchAdminEmployerDocuments(e.id).catch(() => [])));
      setAllEmployers(empList.map((e, i) =>
        mapEmployer(e, (Array.isArray(docs[i]) ? docs[i] : []).map((d: any) => mapDocument(d, Boolean(e.documentsVerified))))
      ).sort((a, b) => Number(b.id) - Number(a.id)));
      setCandidates((Array.isArray(cands) ? cands : []).map(mapAdminCandidate));
      const appList = (Array.isArray(apps) ? apps : []).map(mapAdminApplication);
      setApplications(appList);
      setJobListings((Array.isArray(jobs) ? jobs : []).map((j: any) => ({
        id: str(j.id),
        title: str(j.title),
        sector: str(j.sector),
        location: str(j.location),
        contractType: str(j.contract) || str(j.type),
        payRate: str(j.pay),
        postedDate: fmtDate(str(j.postedDate)),
        status: (str(j.status) || 'Active') as EmployerJobListing['status'],
        urgentCover: Boolean(j.urgentCover),
        // Only the count is shown in the admin requisitions view
        applicants: appList.filter(a => a.jobId === str(j.id)) as any
      })));
    } catch (err) {
      handleApiError(err, 'Could not load admin data.');
    }
  };

  useEffect(() => {
    if (isAdminLoggedIn) loadAdminData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAdminLoggedIn]);

  // Employer state
  const [expandedEmployerId, setExpandedEmployerId] = useState<string | null>(null);
  const [employerSearch, setEmployerSearch] = useState('');
  const [rejectReason, setRejectReason] = useState('');
  const [rejectingId, setRejectingId] = useState<string | null>(null);
  const [actionFeedback, setActionFeedback] = useState<{ id: string; type: 'approved' | 'rejected' } | null>(null);

  // Job Seeker filters & state
  const [candidateSearch, setCandidateSearch] = useState('');
  const [candidateExpFilter, setCandidateExpFilter] = useState<string>('All');
  const [candidateSectorFilter, setCandidateSectorFilter] = useState<string>('All');
  const [candidateComplianceFilter, setCandidateComplianceFilter] = useState<string>('All');
  const [expandedCandidateId, setExpandedCandidateId] = useState<string | null>(null);
  const [selectedCandidateForModal, setSelectedCandidateForModal] = useState<AdminCandidate | null>(null);

  // Application search & filter
  const [appSearch, setAppSearch] = useState('');
  const [appStatusFilter, setAppStatusFilter] = useState<string>('All');

  // Login handler
  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setIsLoggingIn(true);

    try {
      const data = await adminLogin({ email: adminEmail.trim(), password: adminPassword });
      setToken('admin', data.token);
      setAdminPassword('');
      setIsAdminLoggedIn(true);
    } catch (err: any) {
      setLoginError(err?.message || 'Authentication failed. Please verify administrator credentials.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const replaceEmployer = (saved: any, prev: EmployerAccount) =>
    setAllEmployers(list => list.map(e => (e.id === prev.id
      ? mapEmployer(saved, (prev.uploadedDocuments || []).map(d => ({ ...d, verified: Boolean(saved.documentsVerified) })))
      : e)));

  // Employer actions (the list only changes once the backend confirms)
  const handleApprove = async (emp: EmployerAccount) => {
    try {
      replaceEmployer(await approveAdminEmployer(emp.id), emp);
      setActionFeedback({ id: emp.id, type: 'approved' });
      setRejectingId(null);
      setExpandedEmployerId(null);
      setTimeout(() => setActionFeedback(null), 3500);
    } catch (err) {
      handleApiError(err, 'Could not approve this employer.');
    }
  };

  const handleReject = async (emp: EmployerAccount) => {
    try {
      replaceEmployer(await rejectAdminEmployer(emp.id, rejectReason || undefined), emp);
      setActionFeedback({ id: emp.id, type: 'rejected' });
      setRejectingId(null);
      setRejectReason('');
      setExpandedEmployerId(null);
      setTimeout(() => setActionFeedback(null), 3500);
    } catch (err) {
      handleApiError(err, 'Could not decline this employer.');
    }
  };

  const handleDeleteEmployer = async (emp: EmployerAccount) => {
    try {
      await deleteAdminEmployer(emp.id);
      setAllEmployers(list => list.filter(e => e.id !== emp.id));
    } catch (err) {
      handleApiError(err, 'Could not delete this employer.');
    }
  };

  const handleDownloadDocument = (emp: EmployerAccount, docId: string, name: string) =>
    downloadAdminEmployerDocument(emp.id, docId, name).catch(err => handleApiError(err, 'Could not download the document.'));

  const handleDownloadCandidateCv = (cand: AdminCandidate) =>
    downloadAdminCandidateCv(cand.id, cand.cvFileName).catch(err => handleApiError(err, 'Could not download the CV.'));

  // Candidate verification actions: compute the new value first, then persist it
  const setCompliance = async (cand: AdminCandidate, field: 'dbsVerified' | 'rightToWorkVerified' | 'nmcPinVerified') => {
    const next = !cand[field];
    try {
      const saved = await updateCandidateCompliance(cand.id, { [field]: next });
      const mapped = mapAdminCandidate(saved);
      setCandidates(prev => prev.map(c => (c.id === cand.id ? mapped : c)));
      setSelectedCandidateForModal(prev => (prev && prev.id === cand.id ? mapped : prev));
    } catch (err) {
      handleApiError(err, 'Could not update compliance status.');
    }
  };

  const toggleDBSVerify = (candId: string) => {
    const cand = candidates.find(c => c.id === candId);
    if (cand) setCompliance(cand, 'dbsVerified');
  };

  const toggleRightToWorkVerify = (candId: string) => {
    const cand = candidates.find(c => c.id === candId);
    if (cand) setCompliance(cand, 'rightToWorkVerified');
  };

  // Application status update
  const handleApplicationStatusChange = async (appId: string, newStatus: AdminApplication['status']) => {
    try {
      await updateAdminApplicationStatus(appId, newStatus);
      setApplications(prev => prev.map(a => (a.id === appId ? { ...a, status: newStatus } : a)));
    } catch (err) {
      handleApiError(err, 'Could not update the application status.');
    }
  };

  // Filtered Employers
  const filteredEmployers = allEmployers.filter(emp => {
    const q = employerSearch.toLowerCase();
    const matchSearch =
      !q ||
      emp.organisationName.toLowerCase().includes(q) ||
      emp.contactName.toLowerCase().includes(q) ||
      emp.email.toLowerCase().includes(q) ||
      emp.facilityType.toLowerCase().includes(q) ||
      emp.location.toLowerCase().includes(q);

    if (!matchSearch) return false;

    if (employerView === 'pending') return emp.verificationStatus === 'Pending';
    if (employerView === 'verified') return emp.verificationStatus === 'Verified';
    if (employerView === 'rejected') return emp.verificationStatus === 'Rejected';
    return true; // 'all' or 'jobs'
  });

  // Filtered Candidates
  const filteredCandidates = candidates.filter(cand => {
    const q = candidateSearch.toLowerCase();
    const matchSearch =
      !q ||
      cand.name.toLowerCase().includes(q) ||
      cand.headline.toLowerCase().includes(q) ||
      cand.email.toLowerCase().includes(q) ||
      cand.location.toLowerCase().includes(q) ||
      cand.skills.some(s => s.toLowerCase().includes(q));

    if (!matchSearch) return false;

    if (candidateExpFilter !== 'All') {
      if (candidateExpFilter === 'Student' && cand.experienceLevel !== 'Student') return false;
      if (candidateExpFilter === 'Fresher' && cand.experienceLevel !== 'Fresher / Entry level') return false;
      if (candidateExpFilter === '1+' && cand.experienceLevel !== '1+ years of experience') return false;
      if (candidateExpFilter === '3+' && cand.experienceLevel !== '3+ years of experience') return false;
      if (candidateExpFilter === '5+' && cand.experienceLevel !== '5+ years of experience') return false;
      if (candidateExpFilter === '10+' && cand.experienceLevel !== '10+ years of experience') return false;
    }

    if (candidateSectorFilter !== 'All' && cand.sector !== candidateSectorFilter) {
      return false;
    }

    if (candidateComplianceFilter === 'Verified DBS' && !cand.dbsVerified) return false;
    if (candidateComplianceFilter === 'Verified Right to Work' && !cand.rightToWorkVerified) return false;

    return true;
  });

  // Filtered Applications
  const filteredApplications = applications.filter(app => {
    const q = appSearch.toLowerCase();
    const matchSearch =
      !q ||
      app.candidateName.toLowerCase().includes(q) ||
      app.jobTitle.toLowerCase().includes(q) ||
      app.employerName.toLowerCase().includes(q);

    if (!matchSearch) return false;

    if (appStatusFilter !== 'All' && app.status !== appStatusFilter) {
      return false;
    }

    return true;
  });

  const filteredJobs = jobListings.filter(job => {
    const q = employerSearch.toLowerCase();
    return !q || job.title.toLowerCase().includes(q) || job.sector.toLowerCase().includes(q) || job.location.toLowerCase().includes(q);
  });

  // Counts
  const pendingEmployerCount = allEmployers.filter(e => e.verificationStatus === 'Pending').length;
  const verifiedEmployerCount = allEmployers.filter(e => e.verificationStatus === 'Verified').length;
  const totalEmployerDocuments = allEmployers.reduce((acc, e) => acc + (e.uploadedDocuments?.length || 0), 0);

  const totalCandidatesCount = candidates.length;
  const totalVerifiedCandidates = candidates.filter(c => c.dbsVerified && c.rightToWorkVerified).length;
  const activeApplicationsCount = applications.filter(a => a.status !== 'Declined' && a.status !== 'Placed').length;
  const placedCandidatesCount = applications.filter(a => a.status === 'Placed').length;

  // ──────────────────────────────────────────
  // LOGIN SCREEN
  // ──────────────────────────────────────────
  if (!isAdminLoggedIn) {
    return (
      <div className="admin-login-page">
        <div className="admin-login-card">
          <div className="admin-login-logo">
            <ShieldCheck size={32} />
          </div>
          <h1 className="admin-login-title">LICHT Admin Command Portal</h1>
          <p className="admin-login-sub">
            Internal Operations & Compliance Management System
          </p>

          {loginError && (
            <div className="admin-login-error" role="alert">
              <AlertTriangle size={16} />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleAdminLogin} className="admin-login-form" noValidate>
            <div className="admin-field">
              <label htmlFor="admin-email" className="admin-label">Admin Email</label>
              <div className="admin-input-wrap">
                <Mail size={17} className="admin-field-icon" />
                <input
                  id="admin-email"
                  type="email"
                  className="admin-input"
                  placeholder="admin@lichtrecruitmentservices.com"
                  value={adminEmail}
                  onChange={e => setAdminEmail(e.target.value)}
                  required
                  autoComplete="username"
                />
              </div>
            </div>

            <div className="admin-field">
              <label htmlFor="admin-password" className="admin-label">Admin Security Password</label>
              <div className="admin-input-wrap">
                <Lock size={17} className="admin-field-icon" />
                <input
                  id="admin-password"
                  type={showAdminPass ? 'text' : 'password'}
                  className="admin-input"
                  placeholder="••••••••••••"
                  value={adminPassword}
                  onChange={e => setAdminPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="admin-eye-btn"
                  onClick={() => setShowAdminPass(!showAdminPass)}
                  aria-label={showAdminPass ? 'Hide password' : 'Show password'}
                >
                  {showAdminPass ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="admin-login-btn"
              disabled={isLoggingIn}
            >
              {isLoggingIn ? 'Verifying Credentials...' : 'Authenticate & Enter Admin Portal'}
            </button>
          </form>

          <div className="admin-back-link">
            <Link to="/"><Home size={14} /> Return to Public Portal</Link>
          </div>
        </div>
      </div>
    );
  }

  // ──────────────────────────────────────────
  // MAIN ADMIN DASHBOARD
  // ──────────────────────────────────────────
  return (
    <div className="admin-portal">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-sidebar-brand">
          <div className="admin-brand-icon">
            <ShieldCheck size={22} />
          </div>
          <div className="admin-brand-text">
            <strong>LICHT Admin</strong>
            <span>Operations Console</span>
          </div>
        </div>

        {/* PRIMARY TOGGLE: Employers vs Job Seekers */}
        <div className="admin-sidebar-toggle-section">
          <span className="admin-toggle-label">Management Domain</span>
          <div className="admin-domain-toggle">
            <button
              type="button"
              className={`domain-toggle-btn ${activeRole === 'employers' ? 'active' : ''}`}
              onClick={() => setActiveRole('employers')}
            >
              <Building2 size={16} />
              <span>Employers</span>
              {pendingEmployerCount > 0 && (
                <span className="domain-badge-alert">{pendingEmployerCount}</span>
              )}
            </button>

            <button
              type="button"
              className={`domain-toggle-btn ${activeRole === 'jobseekers' ? 'active' : ''}`}
              onClick={() => setActiveRole('jobseekers')}
            >
              <Users size={16} />
              <span>Job Seekers</span>
              <span className="domain-badge">{candidates.length}</span>
            </button>
          </div>
        </div>

        {/* Sub-navigation depending on activeRole */}
        <nav className="admin-nav mobile-tab-scroller">
          {activeRole === 'employers' ? (
            <>
              <div className="admin-nav-group-title">Employer Desk</div>
              <button
                className={`admin-nav-item ${employerView === 'pending' ? 'active' : ''}`}
                onClick={() => setEmployerView('pending')}
              >
                <Clock size={16} />
                <span>Verification Desk</span>
                {pendingEmployerCount > 0 && (
                  <span className="admin-nav-badge alert">{pendingEmployerCount}</span>
                )}
              </button>
              <button
                className={`admin-nav-item ${employerView === 'verified' ? 'active' : ''}`}
                onClick={() => setEmployerView('verified')}
              >
                <CheckCircle2 size={16} />
                <span>Verified Facilities</span>
                <span className="admin-nav-badge">{verifiedEmployerCount}</span>
              </button>
              <button
                className={`admin-nav-item ${employerView === 'jobs' ? 'active' : ''}`}
                onClick={() => setEmployerView('jobs')}
              >
                <Briefcase size={16} />
                <span>Job Requisitions</span>
                <span className="admin-nav-badge">{jobListings.length}</span>
              </button>
              <button
                className={`admin-nav-item ${employerView === 'rejected' ? 'active' : ''}`}
                onClick={() => setEmployerView('rejected')}
              >
                <XCircle size={16} />
                <span>Declined / Queries</span>
              </button>
              <button
                className={`admin-nav-item ${employerView === 'all' ? 'active' : ''}`}
                onClick={() => setEmployerView('all')}
              >
                <Building2 size={16} />
                <span>All Employers</span>
              </button>
            </>
          ) : (
            <>
              <div className="admin-nav-group-title">Job Seeker Desk</div>
              <button
                className={`admin-nav-item ${jobSeekerView === 'candidates' ? 'active' : ''}`}
                onClick={() => setJobSeekerView('candidates')}
              >
                <Users size={16} />
                <span>Candidate Talent Pool</span>
                <span className="admin-nav-badge">{candidates.length}</span>
              </button>
              <button
                className={`admin-nav-item ${jobSeekerView === 'applications' ? 'active' : ''}`}
                onClick={() => setJobSeekerView('applications')}
              >
                <FileText size={16} />
                <span>Live Applications</span>
                <span className="admin-nav-badge alert">{activeApplicationsCount}</span>
              </button>
              <button
                className={`admin-nav-item ${jobSeekerView === 'compliance' ? 'active' : ''}`}
                onClick={() => setJobSeekerView('compliance')}
              >
                <Award size={16} />
                <span>CV & Compliance Vetting</span>
                <span className="admin-nav-badge">{totalVerifiedCandidates}</span>
              </button>
            </>
          )}
        </nav>

        {/* Sidebar Footer */}
        <div className="admin-sidebar-footer">
          <div className="admin-logged-as">
            <span className="admin-avatar">AD</span>
            <div className="admin-info">
              <span className="admin-name">LICHT Senior Officer</span>
              <span className="admin-role">Super Administrator</span>
            </div>
          </div>
          <button
            className="admin-logout-btn"
            onClick={handleAdminLogout}
          >
            <LogOut size={15} />
            <span>Sign Out</span>
          </button>
          <Link to="/" className="admin-home-link">
            <Home size={13} /> Exit to Main Site
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="admin-main">
        {/* Top Header Bar with Mode Toggle & Stats */}
        <header className="admin-header">
          <div className="admin-header-title-wrap">
            <div className="admin-role-badge">
              {activeRole === 'employers' ? (
                <span><Building2 size={14} /> EMPLOYER OPERATIONS</span>
              ) : (
                <span><Users size={14} /> JOB SEEKER & TALENT DESK</span>
              )}
            </div>
            <h1 className="admin-page-title">
              {activeRole === 'employers' ? (
                <>
                  {employerView === 'pending' && 'Employer Compliance Verification Desk'}
                  {employerView === 'verified' && 'Verified Healthcare Facilities & Employers'}
                  {employerView === 'jobs' && 'Active Job Requisitions & Vacancies'}
                  {employerView === 'rejected' && 'Declined / Query Applications'}
                  {employerView === 'all' && 'Comprehensive Employer Directory'}
                </>
              ) : (
                <>
                  {jobSeekerView === 'candidates' && 'Candidate Talent Directory & Experience Profiles'}
                  {jobSeekerView === 'applications' && 'Job Applications Tracking & Placement Pipeline'}
                  {jobSeekerView === 'compliance' && 'Candidate Compliance, DBS & Right-to-Work Vetting'}
                </>
              )}
            </h1>
            <p className="admin-page-sub">
              {activeRole === 'employers'
                ? 'Review facility compliance, CQC certificates, insurance credentials, and manage recruitment postings.'
                : 'Manage registered healthcare professionals, evaluate qualifications, screen CVs, and track hiring stages.'}
            </p>
          </div>

          {/* Top Quick Toggle */}
          <div className="admin-header-controls">
            <div className="admin-top-toggle">
              <button
                type="button"
                className={`top-toggle-item ${activeRole === 'employers' ? 'selected' : ''}`}
                onClick={() => setActiveRole('employers')}
              >
                <Building2 size={15} />
                <span>Employers</span>
                {pendingEmployerCount > 0 && (
                  <span className="toggle-pill-alert">{pendingEmployerCount}</span>
                )}
              </button>
              <button
                type="button"
                className={`top-toggle-item ${activeRole === 'jobseekers' ? 'selected' : ''}`}
                onClick={() => setActiveRole('jobseekers')}
              >
                <Users size={15} />
                <span>Job Seekers</span>
                <span className="toggle-pill">{candidates.length}</span>
              </button>
            </div>
          </div>
        </header>

        {/* Global KPI Stat Cards */}
        {activeRole === 'employers' ? (
          <div className="admin-stats-grid">
            <div
              className={`admin-stat-card ${employerView === 'pending' ? 'selected-stat' : ''}`}
              onClick={() => setEmployerView('pending')}
            >
              <div className="admin-stat-icon pending-icon">
                <Clock size={20} />
              </div>
              <div className="admin-stat-body">
                <span className="admin-stat-num">{pendingEmployerCount}</span>
                <span className="admin-stat-label">Pending Verification</span>
              </div>
              {pendingEmployerCount > 0 && <span className="stat-tag urgent">Action Required</span>}
            </div>

            <div
              className={`admin-stat-card ${employerView === 'verified' ? 'selected-stat' : ''}`}
              onClick={() => setEmployerView('verified')}
            >
              <div className="admin-stat-icon verified-icon">
                <CheckCircle2 size={20} />
              </div>
              <div className="admin-stat-body">
                <span className="admin-stat-num">{verifiedEmployerCount}</span>
                <span className="admin-stat-label">Verified Facilities</span>
              </div>
              <span className="stat-tag good">Active CQC Registered</span>
            </div>

            <div
              className={`admin-stat-card ${employerView === 'jobs' ? 'selected-stat' : ''}`}
              onClick={() => setEmployerView('jobs')}
            >
              <div className="admin-stat-icon jobs-icon">
                <Briefcase size={20} />
              </div>
              <div className="admin-stat-body">
                <span className="admin-stat-num">{jobListings.length}</span>
                <span className="admin-stat-label">Live Vacancies</span>
              </div>
              <span className="stat-tag info">Public Board</span>
            </div>

            <div className="admin-stat-card">
              <div className="admin-stat-icon docs-icon">
                <FileText size={20} />
              </div>
              <div className="admin-stat-body">
                <span className="admin-stat-num">{totalEmployerDocuments}</span>
                <span className="admin-stat-label">Compliance Documents</span>
              </div>
              <span className="stat-tag neutral">Inspections & Insurance</span>
            </div>
          </div>
        ) : (
          <div className="admin-stats-grid">
            <div
              className={`admin-stat-card ${jobSeekerView === 'candidates' ? 'selected-stat' : ''}`}
              onClick={() => setJobSeekerView('candidates')}
            >
              <div className="admin-stat-icon users-icon">
                <Users size={20} />
              </div>
              <div className="admin-stat-body">
                <span className="admin-stat-num">{totalCandidatesCount}</span>
                <span className="admin-stat-label">Registered Candidates</span>
              </div>
              <span className="stat-tag good">All Sectors</span>
            </div>

            <div
              className={`admin-stat-card ${jobSeekerView === 'applications' ? 'selected-stat' : ''}`}
              onClick={() => setJobSeekerView('applications')}
            >
              <div className="admin-stat-icon app-icon">
                <FileText size={20} />
              </div>
              <div className="admin-stat-body">
                <span className="admin-stat-num">{activeApplicationsCount}</span>
                <span className="admin-stat-label">Active Applications</span>
              </div>
              <span className="stat-tag urgent">In Pipeline</span>
            </div>

            <div
              className={`admin-stat-card ${jobSeekerView === 'compliance' ? 'selected-stat' : ''}`}
              onClick={() => setJobSeekerView('compliance')}
            >
              <div className="admin-stat-icon verified-icon">
                <UserCheck size={20} />
              </div>
              <div className="admin-stat-body">
                <span className="admin-stat-num">{totalVerifiedCandidates}</span>
                <span className="admin-stat-label">Fully Vetted (DBS + RTW)</span>
              </div>
              <span className="stat-tag good">Ready to Deploy</span>
            </div>

            <div className="admin-stat-card">
              <div className="admin-stat-icon placed-icon">
                <Award size={20} />
              </div>
              <div className="admin-stat-body">
                <span className="admin-stat-num">{placedCandidatesCount}</span>
                <span className="admin-stat-label">Confirmed Placements</span>
              </div>
              <span className="stat-tag success">Placed this Quarter</span>
            </div>
          </div>
        )}

        {loadError && (
          <div className="admin-login-error" role="alert">
            <AlertTriangle size={16} />
            <span>{loadError}</span>
            <button type="button" className="admin-btn-action-small" onClick={loadAdminData}>Retry</button>
          </div>
        )}

        {/* Action feedback toast */}
        {actionFeedback && (
          <div className={`admin-toast-feedback ${actionFeedback.type}`} role="status">
            {actionFeedback.type === 'approved' ? (
              <>
                <CheckCircle2 size={18} />
                <span>Employer successfully verified and granted full access to LICHT Portal.</span>
              </>
            ) : (
              <>
                <XCircle size={18} />
                <span>Employer registration declined. Their portal access has been removed.</span>
              </>
            )}
          </div>
        )}

        {/* ══════════════════════════════════════════
            SIDE A: EMPLOYERS MANAGEMENT
            ══════════════════════════════════════════ */}
        {activeRole === 'employers' && (
          <div className="admin-view-container">
            {employerView === 'jobs' ? (
              /* Job Requisitions View */
              <div className="admin-jobs-wrapper">
                <div className="admin-filter-bar">
                  <div className="admin-search-wrap">
                    <Search size={16} className="admin-search-icon" />
                    <input
                      type="text"
                      className="admin-search-input"
                      placeholder="Search jobs by title, sector, location…"
                      value={employerSearch}
                      onChange={e => setEmployerSearch(e.target.value)}
                    />
                  </div>
                </div>

                <div className="admin-jobs-grid">
                  {filteredJobs.length === 0 && (
                    <div className="admin-empty-state">
                      <Briefcase size={44} className="admin-empty-icon" />
                      <h3>No vacancies found</h3>
                    </div>
                  )}
                  {filteredJobs.map(job => (
                    <div key={job.id} className="admin-job-card">
                      <div className="admin-job-top">
                        <span className="admin-job-sector">{job.sector}</span>
                        <span className={`admin-job-status ${job.status.toLowerCase()}`}>{job.status}</span>
                      </div>
                      <h3 className="admin-job-title">{job.title}</h3>
                      <div className="admin-job-meta">
                        <span><MapPin size={14} /> {job.location}</span>
                        <span><Briefcase size={14} /> {job.contractType}</span>
                        <span><Clock size={14} /> {job.payRate}</span>
                      </div>
                      <div className="admin-job-footer">
                        <div className="admin-job-applicants">
                          <Users size={14} />
                          <strong>{job.applicants.length}</strong> applicants registered
                        </div>
                        <span className="admin-job-date">Posted {job.postedDate}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              /* Employers List View */
              <div className="admin-employers-wrapper">
                <div className="admin-filter-bar">
                  <div className="admin-search-wrap">
                    <Search size={16} className="admin-search-icon" />
                    <input
                      type="text"
                      className="admin-search-input"
                      placeholder="Search facility name, manager, email, or sector…"
                      value={employerSearch}
                      onChange={e => setEmployerSearch(e.target.value)}
                    />
                  </div>
                  <div className="admin-filter-count">
                    Showing <strong>{filteredEmployers.length}</strong> employer{filteredEmployers.length !== 1 ? 's' : ''}
                  </div>
                </div>

                {filteredEmployers.length === 0 ? (
                  <div className="admin-empty-state">
                    <Building2 size={44} className="admin-empty-icon" />
                    <h3>No employers found</h3>
                    <p>There are no employer accounts matching this filter criteria.</p>
                  </div>
                ) : (
                  <div className="admin-cards-list">
                    {filteredEmployers.map(emp => {
                      const isExpanded = expandedEmployerId === emp.id;
                      const isRejectingThis = rejectingId === emp.id;

                      return (
                        <div key={emp.id} className={`admin-card ${isExpanded ? 'expanded' : ''}`}>
                          {/* Card Summary Row */}
                          <div
                            className="admin-card-header"
                            onClick={() => setExpandedEmployerId(isExpanded ? null : emp.id)}
                          >
                            <div className="admin-card-left">
                              <div className="admin-card-icon">
                                <Building2 size={20} />
                              </div>
                              <div className="admin-card-titles">
                                <div className="admin-title-row">
                                  <h3 className="admin-card-org">{emp.organisationName}</h3>
                                  <span className={`admin-badge-status ${emp.verificationStatus.toLowerCase()}`}>
                                    {emp.verificationStatus === 'Verified' && <CheckCircle2 size={13} />}
                                    {emp.verificationStatus === 'Pending' && <Clock size={13} />}
                                    {emp.verificationStatus === 'Rejected' && <XCircle size={13} />}
                                    {emp.verificationStatus}
                                  </span>
                                  {emp.cqcRating && (
                                    <span className="admin-cqc-tag">CQC: {emp.cqcRating}</span>
                                  )}
                                </div>
                                <div className="admin-card-meta">
                                  <span>{emp.contactName} ({emp.roleTitle})</span>
                                  <span>•</span>
                                  <span>{emp.facilityType}</span>
                                  <span>•</span>
                                  <span>{emp.location}</span>
                                  <span>•</span>
                                  <span>Registered {emp.registrationDate || 'Recently'}</span>
                                </div>
                              </div>
                            </div>

                            <div className="admin-card-right">
                              <div className="admin-doc-count-pill">
                                <FileText size={14} />
                                <span>{emp.uploadedDocuments?.length || 0} docs</span>
                              </div>
                              <button
                                className="admin-expand-btn"
                                aria-label={isExpanded ? 'Collapse' : 'Expand'}
                              >
                                {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                              </button>
                            </div>
                          </div>

                          {/* Expanded Card Details */}
                          {isExpanded && (
                            <div className="admin-card-details">
                              <div className="admin-info-grid">
                                <div className="admin-info-item">
                                  <span className="admin-info-label">Contact Person</span>
                                  <span className="admin-info-val">{emp.contactName} ({emp.roleTitle})</span>
                                </div>
                                <div className="admin-info-item">
                                  <span className="admin-info-label">Email Address</span>
                                  <span className="admin-info-val">{emp.email}</span>
                                </div>
                                <div className="admin-info-item">
                                  <span className="admin-info-label">Telephone</span>
                                  <span className="admin-info-val">{emp.phone}</span>
                                </div>
                                <div className="admin-info-item">
                                  <span className="admin-info-label">Company Registration No.</span>
                                  <span className="admin-info-val">{emp.companyNumber || '—'}</span>
                                </div>
                                <div className="admin-info-item">
                                  <span className="admin-info-label">CQC Provider ID</span>
                                  <span className="admin-info-val">{emp.cqcProviderId || '—'}</span>
                                </div>
                                <div className="admin-info-item">
                                  <span className="admin-info-label">Insurance Policy Reference</span>
                                  <span className="admin-info-val">{emp.insurancePolicy || '—'}</span>
                                </div>
                                <div className="admin-info-item admin-full-span">
                                  <span className="admin-info-label">Full Registered Address</span>
                                  <span className="admin-info-val">{emp.registeredAddress || emp.location}</span>
                                </div>
                              </div>

                              {/* Uploaded Compliance Documents */}
                              <div className="admin-docs-block">
                                <h4 className="admin-section-subhead">
                                  <FileText size={15} /> Uploaded Compliance Documentation ({emp.uploadedDocuments?.length || 0})
                                </h4>
                                {emp.uploadedDocuments && emp.uploadedDocuments.length > 0 ? (
                                  <div className="admin-docs-list">
                                    {emp.uploadedDocuments.map(doc => (
                                      <div key={doc.id} className="admin-doc-row">
                                        <div className="admin-doc-left">
                                          <div className="admin-doc-badge">PDF</div>
                                          <div>
                                            <strong className="admin-doc-title">{doc.name}</strong>
                                            <span className="admin-doc-meta">{doc.type} · {doc.size} · Uploaded: {doc.date}</span>
                                          </div>
                                        </div>
                                        <div className="admin-doc-actions">
                                          {doc.verified ? (
                                            <span className="doc-status-good"><CheckCircle2 size={13} /> Verified</span>
                                          ) : (
                                            <span className="doc-status-pend"><Clock size={13} /> Pending Vetting</span>
                                          )}
                                          <button
                                            className="admin-btn-action-small"
                                            onClick={() => handleDownloadDocument(emp, doc.id, doc.name)}
                                          >
                                            <Download size={13} /> View / Download
                                          </button>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                ) : (
                                  <div className="admin-no-docs-note">No documents uploaded for this facility.</div>
                                )}
                              </div>

                              {/* Decision Action Buttons */}
                              <div className="admin-action-row">
                                {isRejectingThis && (
                                  <div className="admin-reject-panel">
                                    <input
                                      type="text"
                                      className="admin-reject-input"
                                      placeholder="Provide compliance query or reason for declining…"
                                      value={rejectReason}
                                      onChange={e => setRejectReason(e.target.value)}
                                    />
                                    <div className="admin-reject-buttons">
                                      <button
                                        className="admin-btn-cancel"
                                        onClick={() => { setRejectingId(null); setRejectReason(''); }}
                                      >
                                        Cancel
                                      </button>
                                      <button
                                        className="admin-btn-danger"
                                        onClick={() => handleReject(emp)}
                                      >
                                        <XCircle size={15} /> Confirm {emp.verificationStatus === 'Verified' ? 'Revoke' : 'Decline'}
                                      </button>
                                    </div>
                                  </div>
                                )}
                                {emp.verificationStatus === 'Pending' && !isRejectingThis && (
                                  <>
                                    <button
                                      className="admin-btn-primary"
                                      onClick={() => handleApprove(emp)}
                                    >
                                      <CheckCircle2 size={16} /> Approve & Grant Verified Access
                                    </button>
                                    <button
                                      className="admin-btn-outline-danger"
                                      onClick={() => setRejectingId(emp.id)}
                                    >
                                      <XCircle size={16} /> Decline Registration
                                    </button>
                                  </>
                                )}

                                {emp.verificationStatus === 'Verified' && !isRejectingThis && (
                                  <button
                                    className="admin-btn-outline-danger"
                                    onClick={() => setRejectingId(emp.id)}
                                  >
                                    <XCircle size={15} /> Revoke / Re-evaluate Compliance
                                  </button>
                                )}

                                {emp.verificationStatus === 'Rejected' && (
                                  <button
                                    className="admin-btn-primary"
                                    onClick={() => handleApprove(emp)}
                                  >
                                    <CheckCircle2 size={15} /> Re-Approve Facility
                                  </button>
                                )}

                                <button
                                  className="admin-btn-delete"
                                  onClick={() => {
                                    if (window.confirm(`Permanently remove ${emp.organisationName}? Their vacancies will be closed.`)) {
                                      handleDeleteEmployer(emp);
                                    }
                                  }}
                                >
                                  Delete Account
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ══════════════════════════════════════════
            SIDE B: JOB SEEKERS MANAGEMENT
            ══════════════════════════════════════════ */}
        {activeRole === 'jobseekers' && (
          <div className="admin-view-container">
            {jobSeekerView === 'applications' ? (
              /* Live Job Applications Pipeline */
              <div className="admin-applications-wrapper">
                <div className="admin-filter-bar">
                  <div className="admin-search-wrap">
                    <Search size={16} className="admin-search-icon" />
                    <input
                      type="text"
                      className="admin-search-input"
                      placeholder="Search applications by candidate, role, or facility…"
                      value={appSearch}
                      onChange={e => setAppSearch(e.target.value)}
                    />
                  </div>
                  <div className="admin-filter-group">
                    <label className="admin-filter-label"><Filter size={14} /> Status:</label>
                    <select
                      className="admin-select"
                      value={appStatusFilter}
                      onChange={e => setAppStatusFilter(e.target.value)}
                    >
                      <option value="All">All Statuses ({applications.length})</option>
                      <option value="Application Received">Application Received</option>
                      <option value="Under Review">Under Review</option>
                      <option value="Shortlisted">Shortlisted</option>
                      <option value="Interview Scheduled">Interview Scheduled</option>
                      <option value="Offer Extended">Offer Extended</option>
                      <option value="Placed">Placed</option>
                      <option value="Declined">Declined</option>
                    </select>
                  </div>
                </div>

                <div className="admin-table-container">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Candidate</th>
                        <th>Target Role</th>
                        <th>Facility / Employer</th>
                        <th>Applied Date</th>
                        <th>CV Used</th>
                        <th>Application Status</th>
                        <th>Candidate Note</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredApplications.map(app => (
                        <tr key={app.id}>
                          <td>
                            <div className="admin-cand-cell">
                              <span className="cand-mini-avatar">{app.candidateName.split(' ').map(n=>n[0]).join('')}</span>
                              <div>
                                <strong>{app.candidateName}</strong>
                                <span className="cand-email">{app.candidateEmail}</span>
                              </div>
                            </div>
                          </td>
                          <td>
                            <strong>{app.jobTitle}</strong>
                            <span className="cand-sub-text">{app.sector}</span>
                          </td>
                          <td>
                            <span>{app.employerName}</span>
                            <span className="cand-sub-text">{app.location}</span>
                          </td>
                          <td>{app.appliedDate}</td>
                          <td>
                            <span className="cand-sub-text">{app.cvFileName || '—'}</span>
                          </td>
                          <td>
                            <select
                              className={`status-select ${app.status.toLowerCase().replace(/\s+/g, '-')}`}
                              value={app.status}
                              onChange={e => handleApplicationStatusChange(app.id, e.target.value as AdminApplication['status'])}
                            >
                              <option value="Application Received">Application Received</option>
                              <option value="Under Review">Under Review</option>
                              <option value="Shortlisted">Shortlisted</option>
                              <option value="Interview Scheduled">Interview Scheduled</option>
                              <option value="Offer Extended">Offer Extended</option>
                              <option value="Placed">Placed</option>
                              <option value="Declined">Declined</option>
                            </select>
                          </td>
                          <td>
                            <div className="admin-notes-cell" title={app.candidateNote}>
                              {app.candidateNote || '—'}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              /* Candidates Directory & Compliance Desk */
              <div className="admin-candidates-wrapper">
                {/* Advanced Filter Bar for Experience, Sector, Compliance */}
                <div className="admin-filter-bar complex">
                  <div className="admin-search-wrap">
                    <Search size={16} className="admin-search-icon" />
                    <input
                      type="text"
                      className="admin-search-input"
                      placeholder="Search candidates by name, qualification, skills…"
                      value={candidateSearch}
                      onChange={e => setCandidateSearch(e.target.value)}
                    />
                  </div>

                  <div className="admin-filters-inline">
                    {/* Experience Level Dropdown Requested by User */}
                    <div className="admin-filter-item">
                      <label className="admin-filter-label">Experience:</label>
                      <select
                        className="admin-select"
                        value={candidateExpFilter}
                        onChange={e => setCandidateExpFilter(e.target.value)}
                      >
                        <option value="All">All Levels</option>
                        <option value="Student">Student</option>
                        <option value="Fresher">Fresher / Entry level</option>
                        <option value="1+">1+ years of experience</option>
                        <option value="3+">3+ years of experience</option>
                        <option value="5+">5+ years of experience</option>
                        <option value="10+">10+ years of experience</option>
                      </select>
                    </div>

                    {/* Sector Filter */}
                    <div className="admin-filter-item">
                      <label className="admin-filter-label">Sector:</label>
                      <select
                        className="admin-select"
                        value={candidateSectorFilter}
                        onChange={e => setCandidateSectorFilter(e.target.value)}
                      >
                        <option value="All">All Sectors</option>
                        <option value="Care homes">Care homes</option>
                        <option value="Healthcare">Healthcare</option>
                        <option value="Supported living">Supported living</option>
                        <option value="Corporate">Corporate</option>
                      </select>
                    </div>

                    {/* Compliance Filter */}
                    <div className="admin-filter-item">
                      <label className="admin-filter-label">Compliance:</label>
                      <select
                        className="admin-select"
                        value={candidateComplianceFilter}
                        onChange={e => setCandidateComplianceFilter(e.target.value)}
                      >
                        <option value="All">All Statuses</option>
                        <option value="Verified DBS">Verified DBS</option>
                        <option value="Verified Right to Work">Verified Right to Work</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Candidate Cards Grid */}
                <div className="admin-candidates-list">
                  {filteredCandidates.map(cand => {
                    const isExpanded = expandedCandidateId === cand.id;

                    return (
                      <div key={cand.id} className={`admin-cand-card ${isExpanded ? 'open' : ''}`}>
                        <div
                          className="admin-cand-header"
                          onClick={() => setExpandedCandidateId(isExpanded ? null : cand.id)}
                        >
                          <div className="admin-cand-left">
                            <div className="admin-cand-avatar">
                              {cand.avatarInitials}
                            </div>
                            <div className="admin-cand-titles">
                              <div className="cand-name-row">
                                <h3 className="cand-fullname">{cand.name}</h3>
                                <span className="cand-exp-pill">{cand.experienceLevel}</span>
                                <span className="cand-sector-pill">{cand.sector}</span>
                              </div>
                              <p className="cand-headline">{cand.headline}</p>
                              <div className="cand-sub-meta">
                                <span><MapPin size={13} /> {cand.location} ({cand.postcode})</span>
                                <span>•</span>
                                <span><Mail size={13} /> {cand.email}</span>
                                <span>•</span>
                                <span><Phone size={13} /> {cand.phone}</span>
                              </div>
                            </div>
                          </div>

                          <div className="admin-cand-right">
                            <div className="cand-compliance-badges">
                              <span className={`compliance-tag ${cand.dbsVerified ? 'verified' : 'pending'}`}>
                                {cand.dbsVerified ? <Check size={12} /> : <Clock size={12} />}
                                DBS {cand.dbsVerified ? 'Verified' : 'Pending'}
                              </span>
                              <span className={`compliance-tag ${cand.rightToWorkVerified ? 'verified' : 'pending'}`}>
                                {cand.rightToWorkVerified ? <Check size={12} /> : <Clock size={12} />}
                                Right to Work {cand.rightToWorkVerified ? 'Checked' : 'Pending'}
                              </span>
                            </div>
                            <button className="admin-expand-btn" aria-label="Toggle Details">
                              {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                            </button>
                          </div>
                        </div>

                        {/* Expandable Candidate Full Details */}
                        {isExpanded && (
                          <div className="admin-cand-expanded-content">
                            {/* Education Background Section */}
                            <div className="cand-detail-section">
                              <h4 className="cand-section-title">
                                <GraduationCap size={16} /> Education & Academic Qualifications
                              </h4>
                              <div className="cand-edu-list">
                                {cand.education.length === 0 && (
                                  <span className="cand-sub-text">No education recorded.</span>
                                )}
                                {cand.education.map((edu, idx) => (
                                  <div key={idx} className="cand-edu-item">
                                    <div className="edu-dot" />
                                    <div>
                                      <strong className="edu-qual">{edu.qualification}</strong>
                                      <div className="edu-details">
                                        <span>{edu.fieldOfStudy}</span> • <span>{edu.institution}</span> • <span className="edu-year">{edu.graduationYear}</span>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Skills & Certifications */}
                            <div className="cand-detail-section">
                              <h4 className="cand-section-title">
                                <Award size={16} /> Clinical & Professional Competencies
                              </h4>
                              <div className="cand-skills-chips">
                                {cand.skills.map((skill, sIdx) => (
                                  <span key={sIdx} className="cand-skill-chip">{skill}</span>
                                ))}
                              </div>
                              <div className="cand-certs-list">
                                {cand.certifications.map((cert, cIdx) => (
                                  <div key={cIdx} className="cand-cert-item">
                                    <CheckCircle2 size={13} className="cert-check" />
                                    <span>{cert}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Uploaded CV & Compliance Controls */}
                            <div className="cand-detail-section cv-compliance-box">
                              <div className="cv-info-col">
                                <h4 className="cand-section-title">
                                  <FileText size={16} /> Uploaded Candidate CV
                                </h4>
                                <div className="cand-cv-file">
                                  <FileText size={18} className="cv-icon" />
                                  <div>
                                    <strong>{cand.cvFileName}</strong>
                                    <span>{cand.hasCv ? cand.cvFileSize : "Candidate has not uploaded a CV"}</span>
                                  </div>
                                  {cand.hasCv && (
                                    <button
                                      className="cand-dl-cv-btn"
                                      onClick={() => handleDownloadCandidateCv(cand)}
                                    >
                                      <Download size={14} /> Download CV
                                    </button>
                                  )}
                                </div>
                              </div>

                              <div className="compliance-controls-col">
                                <h4 className="cand-section-title">
                                  <UserCheck size={16} /> Admin Compliance Verification
                                </h4>
                                <div className="compliance-toggle-buttons">
                                  <button
                                    type="button"
                                    className={`compliance-toggle-btn ${cand.dbsVerified ? 'active' : ''}`}
                                    onClick={() => toggleDBSVerify(cand.id)}
                                  >
                                    {cand.dbsVerified ? <CheckCircle2 size={15} /> : <Clock size={15} />}
                                    <span>{cand.dbsVerified ? 'DBS Verified (Click to Revoke)' : 'Mark DBS Verified'}</span>
                                  </button>

                                  <button
                                    type="button"
                                    className={`compliance-toggle-btn ${cand.rightToWorkVerified ? 'active' : ''}`}
                                    onClick={() => toggleRightToWorkVerify(cand.id)}
                                  >
                                    {cand.rightToWorkVerified ? <CheckCircle2 size={15} /> : <Clock size={15} />}
                                    <span>{cand.rightToWorkVerified ? 'Right-to-Work Verified' : 'Mark Right-to-Work Verified'}</span>
                                  </button>

                                  <button
                                    type="button"
                                    className={`compliance-toggle-btn ${cand.nmcPinVerified ? 'active' : ''}`}
                                    onClick={() => setCompliance(cand, 'nmcPinVerified')}
                                  >
                                    {cand.nmcPinVerified ? <CheckCircle2 size={15} /> : <Clock size={15} />}
                                    <span>{cand.nmcPinVerified ? 'NMC PIN Verified' : 'Mark NMC PIN Verified (nurses)'}</span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminPortal;
