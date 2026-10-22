import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Building2, 
  Users, 
  Briefcase, 
  ShieldCheck, 
  Search, 
  Plus, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Phone, 
  Mail, 
  ArrowRight, 
  Filter, 
  FileText, 
  Calendar, 
  Sparkles, 
  LogOut, 
  ExternalLink, 
  ChevronRight,
  Bookmark,
  Check,
  AlertCircle,
  Award
} from 'lucide-react';
import { useEmployer } from '../context/EmployerContext';
import { EmployerJobListing, TalentCandidate, EmployerApplicant } from '../types/employer';
import './EmployerLanding.css';

export const EmployerLanding: React.FC = () => {
  const { 
    employer, 
    isEmployerAuthenticated, 
    employerLogin, 
    employerLogout,
    jobListings,
    postNewJob,
    updateApplicantStatus,
    updateEmployerProfile,
    talentPool,
    savedCandidates,
    toggleSaveCandidate,
    requestCandidateInterview
  } = useEmployer();

  const navigate = useNavigate();

  // Navigation tabs for logged-in employer
  const [activePortalTab, setActivePortalTab] = useState<'vacancies' | 'sourcing' | 'post-job' | 'profile'>('vacancies');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editContactName, setEditContactName] = useState('');
  const [editRoleTitle, setEditRoleTitle] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [editAddress, setEditAddress] = useState('');
  const [editWebsite, setEditWebsite] = useState('');
  const [profileSaveSuccess, setProfileSaveSuccess] = useState(false);

  // Candidate talent pool search & filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [sectorFilter, setSectorFilter] = useState<string>('all');
  const [experienceFilter, setExperienceFilter] = useState<string>('all');
  const [selectedCandidate, setSelectedCandidate] = useState<TalentCandidate | null>(null);
  const [candidateContactSuccess, setCandidateContactSuccess] = useState<string | null>(null);

  // Selected applicant for detailed view in dashboard
  const [selectedApplicant, setSelectedApplicant] = useState<{ job: EmployerJobListing; applicant: EmployerApplicant } | null>(null);

  // New Job Form State
  const [jobTitle, setJobTitle] = useState('');
  const [jobSector, setJobSector] = useState<'Care homes' | 'Healthcare' | 'Supported living' | 'Corporate'>('Care homes');
  const [jobLocation, setJobLocation] = useState('London (Kensington & Chelsea)');
  const [jobContract, setJobContract] = useState<'Permanent' | 'Temporary cover' | 'Full-time' | 'Night shifts' | 'Block booking'>('Permanent');
  const [jobPayRate, setJobPayRate] = useState('£16.00 – £17.50 / hr');
  const [isUrgent, setIsUrgent] = useState(false);
  const [postJobSuccess, setPostJobSuccess] = useState(false);

  // Public quick request staff form state (for non-logged-in landing view)
  const [quickOrg, setQuickOrg] = useState('');
  const [quickContact, setQuickContact] = useState('');
  const [quickEmail, setQuickEmail] = useState('');
  const [quickPhone, setQuickPhone] = useState('');
  const [quickRole, setQuickRole] = useState('');
  const [quickStaffCount, setQuickStaffCount] = useState('1');
  const [quickUrgency, setQuickUrgency] = useState('Immediate (under 48 hrs)');
  const [quickSubmitSuccess, setQuickSubmitSuccess] = useState(false);

  // Filtered candidate pool
  const filteredCandidates = useMemo(() => {
    return talentPool.filter(c => {
      const matchQuery = 
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
        c.location.toLowerCase().includes(searchQuery.toLowerCase());

      const matchSector = sectorFilter === 'all' || c.sector.toLowerCase() === sectorFilter.toLowerCase();
      
      let matchExp = true;
      if (experienceFilter === '3plus') matchExp = c.experienceYears >= 3;
      if (experienceFilter === '5plus') matchExp = c.experienceYears >= 5;
      if (experienceFilter === '8plus') matchExp = c.experienceYears >= 8;

      return matchQuery && matchSector && matchExp;
    });
  }, [talentPool, searchQuery, sectorFilter, experienceFilter]);

  const handlePostJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobTitle.trim()) return;

    postNewJob({
      title: jobTitle.trim(),
      sector: jobSector,
      location: jobLocation.trim() || 'London',
      contractType: jobContract,
      payRate: jobPayRate.trim() || 'Competitive',
      status: 'Active',
      urgentCover: isUrgent
    });

    setJobTitle('');
    setPostJobSuccess(true);
    setTimeout(() => {
      setPostJobSuccess(false);
      setActivePortalTab('vacancies');
    }, 1800);
  };

  const handleQuickRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickOrg.trim() || !quickEmail.trim() || !quickRole.trim()) {
      alert('Please complete the required fields: Organization, Work Email, and Role.');
      return;
    }
    setQuickSubmitSuccess(true);
  };

  const handleCandidateInterviewRequest = (candidate: TalentCandidate) => {
    requestCandidateInterview(candidate.id, `Direct booking inquiry from ${employer ? employer.organisationName : 'Healthcare Employer'}`);
    setCandidateContactSuccess(`Interview brief dispatched for ${candidate.name}. Our placement desk will call you within 15 minutes.`);
    setTimeout(() => setCandidateContactSuccess(null), 5000);
    setSelectedCandidate(null);
  };

  // =========================================================================
  // VIEW A: LOGGED-IN EMPLOYER PORTAL DASHBOARD
  // =========================================================================
  if (isEmployerAuthenticated && employer) {
    const totalApplicants = jobListings.reduce((sum, j) => sum + j.applicants.length, 0);
    const scheduledInterviews = jobListings.reduce(
      (sum, j) => sum + j.applicants.filter(a => a.status === 'Interview Scheduled').length, 
      0
    );

    return (
      <div className="employer-dashboard-page">
        {/* Toast / Notification */}
        {candidateContactSuccess && (
          <div className="emp-toast" role="status">
            <CheckCircle2 size={18} />
            <span>{candidateContactSuccess}</span>
          </div>
        )}

        <div className="container emp-dashboard-container">
          {/* Top Employer Brand Bar */}
          <header className="emp-dash-header">
            <div className="emp-dash-header__left">
              <div className="emp-dash-avatar">
                <Building2 size={24} />
              </div>
              <div>
                <div className="emp-dash-badge-row">
                  <span className="emp-dash-org-name">{employer.organisationName}</span>
                  {employer.cqcRating && (
                    <span className="emp-cqc-tag">
                      <Award size={13} /> CQC {employer.cqcRating}
                    </span>
                  )}
                  <span className="emp-active-pill">Portal Active</span>
                </div>
                <h1 className="emp-dash-welcome">
                  Welcome back, {employer.contactName}
                </h1>
                <p className="emp-dash-meta">
                  {employer.roleTitle} • {employer.location} • {employer.email}
                </p>
              </div>
            </div>

            <div className="emp-dash-header__right">
              <button 
                type="button" 
                onClick={() => setActivePortalTab('post-job')}
                className="btn-pill-green emp-header-action"
              >
                <Plus size={16} /> Post a Vacancy
              </button>
              <button 
                type="button" 
                onClick={employerLogout}
                className="btn-emp-logout"
                title="Sign out of Employer Portal"
              >
                <LogOut size={16} /> Sign out
              </button>
            </div>
          </header>

          {/* Metrics Overview Strip */}
          <section className="emp-metrics-strip">
            <div className="emp-metric-card">
              <span className="emp-metric-num">{jobListings.length}</span>
              <span className="emp-metric-label">Active Vacancies</span>
            </div>
            <div className="emp-metric-card">
              <span className="emp-metric-num text-gold">{totalApplicants}</span>
              <span className="emp-metric-label">Total Candidate Applicants</span>
            </div>
            <div className="emp-metric-card">
              <span className="emp-metric-num">{scheduledInterviews}</span>
              <span className="emp-metric-label">Interviews Scheduled</span>
            </div>
            <div className="emp-metric-card">
              <span className="emp-metric-num">{savedCandidates.length}</span>
              <span className="emp-metric-label">Shortlisted Candidates</span>
            </div>
          </section>

          {/* Tab Navigation */}
          <nav className="emp-dash-tabs" aria-label="Employer portal tabs">
            <button
              type="button"
              className={`emp-tab-btn ${activePortalTab === 'vacancies' ? 'emp-tab-btn--active' : ''}`}
              onClick={() => setActivePortalTab('vacancies')}
            >
              <Briefcase size={16} />
              <span>Active Vacancies & Applicants ({jobListings.length})</span>
            </button>
            <button
              type="button"
              className={`emp-tab-btn ${activePortalTab === 'sourcing' ? 'emp-tab-btn--active' : ''}`}
              onClick={() => setActivePortalTab('sourcing')}
            >
              <Users size={16} />
              <span>Look for an Employee / Talent Pool ({talentPool.length})</span>
            </button>
            <button
              type="button"
              className={`emp-tab-btn ${activePortalTab === 'post-job' ? 'emp-tab-btn--active' : ''}`}
              onClick={() => setActivePortalTab('post-job')}
            >
              <Plus size={16} />
              <span>Post a Vacancy / Shift Cover</span>
            </button>
            <button
              type="button"
              className={`emp-tab-btn ${activePortalTab === 'profile' ? 'emp-tab-btn--active' : ''}`}
              onClick={() => {
                setActivePortalTab('profile');
                if (employer) {
                  setEditContactName(employer.contactName);
                  setEditRoleTitle(employer.roleTitle);
                  setEditPhone(employer.phone);
                  setEditAddress(employer.registeredAddress || employer.location);
                  setEditWebsite(employer.website || '');
                }
              }}
            >
              <Building2 size={16} />
              <span>Company Profile & Documentation</span>
            </button>
          </nav>

          {/* TAB 1: ACTIVE VACANCIES & APPLICANTS */}
          {activePortalTab === 'vacancies' && (
            <div className="emp-tab-content">
              <div className="emp-section-heading-row">
                <div>
                  <h2 className="emp-section-title">Active Vacancies & Received Applications</h2>
                  <p className="emp-section-sub">
                    Review candidate profiles, verify DBS clearances, and schedule interviews directly.
                  </p>
                </div>
                <button 
                  type="button" 
                  onClick={() => setActivePortalTab('post-job')}
                  className="btn-pill-green"
                >
                  <Plus size={16} /> Post New Role
                </button>
              </div>

              <div className="emp-jobs-stack">
                {jobListings.map(job => (
                  <div key={job.id} className="emp-job-card">
                    <div className="emp-job-card__header">
                      <div>
                        <div className="emp-job-tags">
                          <span className="emp-tag emp-tag--sector">{job.sector}</span>
                          <span className="emp-tag">{job.contractType}</span>
                          {job.urgentCover && <span className="emp-tag emp-tag--urgent">Urgent Cover</span>}
                        </div>
                        <h3 className="emp-job-title">{job.title}</h3>
                        <p className="emp-job-meta">
                          <MapPin size={14} /> {job.location} • <Clock size={14} /> Posted {job.postedDate} • <strong>{job.payRate}</strong>
                        </p>
                      </div>

                      <div className="emp-job-status-pill">
                        <span className="status-dot status-dot--active" />
                        <span>{job.status}</span>
                      </div>
                    </div>

                    {/* Applicants List */}
                    <div className="emp-job-applicants-section">
                      <div className="emp-applicants-bar">
                        <h4 className="emp-applicants-count">
                          {job.applicants.length} Candidate Applications Received
                        </h4>
                        <span className="emp-applicants-note">All candidates pre-screened with Enhanced DBS</span>
                      </div>

                      {job.applicants.length === 0 ? (
                        <div className="emp-empty-applicants">
                          <p>No applicants yet for this newly posted role. Candidate matches will appear here automatically.</p>
                        </div>
                      ) : (
                        <div className="emp-applicants-grid">
                          {job.applicants.map(app => (
                            <div key={app.id} className="emp-applicant-card">
                              <div className="emp-applicant-header">
                                <div className="emp-applicant-info">
                                  <div className="emp-applicant-avatar">
                                    {app.candidateName.split(' ').map(n => n[0]).join('')}
                                  </div>
                                  <div>
                                    <h4 className="emp-applicant-name">{app.candidateName}</h4>
                                    <p className="emp-applicant-role">{app.currentRole} • {app.experienceYears} yrs exp</p>
                                  </div>
                                </div>
                                <div className="emp-match-badge" title="Match score based on experience and compliance">
                                  <Sparkles size={13} /> {app.matchScore}% Match
                                </div>
                              </div>

                              <div className="emp-applicant-dbs">
                                <ShieldCheck size={14} className="text-green" />
                                <span>{app.dbsStatus}</span>
                              </div>

                              {app.coverNote && (
                                <p className="emp-applicant-note-snippet">
                                  "{app.coverNote}"
                                </p>
                              )}

                              <div className="emp-applicant-footer">
                                <div className="emp-status-selector-wrap">
                                  <label htmlFor={`status-${app.id}`} className="emp-sr-only">Status</label>
                                  <select
                                    id={`status-${app.id}`}
                                    className={`emp-status-select emp-status--${app.status.toLowerCase().replace(/\s+/g, '-')}`}
                                    value={app.status}
                                    onChange={(e) => updateApplicantStatus(job.id, app.id, e.target.value as any)}
                                  >
                                    <option value="Under Review">Under Review</option>
                                    <option value="Shortlisted">Shortlisted</option>
                                    <option value="Interview Scheduled">Interview Scheduled</option>
                                    <option value="Offer Extended">Offer Extended</option>
                                    <option value="Declined">Declined</option>
                                  </select>
                                </div>

                                <button
                                  type="button"
                                  onClick={() => setSelectedApplicant({ job, applicant: app })}
                                  className="btn-applicant-view"
                                >
                                  View CV & Dossier <ChevronRight size={14} />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: LOOK FOR AN EMPLOYEE / TALENT POOL */}
          {activePortalTab === 'sourcing' && (
            <div className="emp-tab-content">
              <div className="emp-section-heading-row">
                <div>
                  <h2 className="emp-section-title">Look for an Employee • Pre-Screened Talent Pool</h2>
                  <p className="emp-section-sub">
                    Direct access to vetted healthcare professionals with verified DBS on the Update Service.
                  </p>
                </div>
              </div>

              {/* Search & Filters */}
              <div className="emp-talent-filters-bar">
                <div className="emp-search-input-wrap">
                  <Search size={18} className="emp-search-icon" />
                  <input
                    type="text"
                    className="emp-search-input"
                    placeholder="Search by role, skill (e.g. Dementia, NMC Pin, PEG), or location..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <div className="emp-filter-group">
                  <select
                    className="emp-filter-select"
                    value={sectorFilter}
                    onChange={(e) => setSectorFilter(e.target.value)}
                  >
                    <option value="all">All Sectors</option>
                    <option value="Care homes">Care Homes</option>
                    <option value="Healthcare">Healthcare / NHS</option>
                    <option value="Supported living">Supported Living</option>
                  </select>

                  <select
                    className="emp-filter-select"
                    value={experienceFilter}
                    onChange={(e) => setExperienceFilter(e.target.value)}
                  >
                    <option value="all">Any Experience</option>
                    <option value="3plus">3+ Years</option>
                    <option value="5plus">5+ Years</option>
                    <option value="8plus">8+ Years Senior</option>
                  </select>
                </div>
              </div>

              {/* Candidate Cards Grid */}
              <div className="emp-talent-grid">
                {filteredCandidates.map(cand => {
                  const isSaved = savedCandidates.includes(cand.id);
                  return (
                    <div key={cand.id} className="emp-talent-card">
                      <div className="emp-talent-top">
                        <div className="emp-talent-avatar">
                          {cand.avatarInitials}
                        </div>
                        <div className="emp-talent-title-area">
                          <div className="emp-talent-name-row">
                            <h3 className="emp-talent-name">{cand.name}</h3>
                            <button
                              type="button"
                              onClick={() => toggleSaveCandidate(cand.id)}
                              className={`emp-talent-save-btn ${isSaved ? 'emp-talent-save-btn--active' : ''}`}
                              title={isSaved ? 'Remove from shortlist' : 'Save candidate to shortlist'}
                            >
                              <Bookmark size={15} />
                            </button>
                          </div>
                          <p className="emp-talent-headline">{cand.headline}</p>
                        </div>
                      </div>

                      <div className="emp-talent-meta-inline">
                        <span><MapPin size={13} /> {cand.location}</span>
                        <span>•</span>
                        <span><Clock size={13} /> {cand.availability}</span>
                        <span>•</span>
                        <strong className="emp-rate-highlight">{cand.expectedRate}</strong>
                      </div>

                      <div className="emp-talent-skills">
                        {cand.skills.slice(0, 3).map(skill => (
                          <span key={skill} className="emp-skill-chip">{skill}</span>
                        ))}
                      </div>

                      <div className="emp-talent-actions">
                        <button
                          type="button"
                          onClick={() => setSelectedCandidate(cand)}
                          className="btn-pill-outline emp-btn-profile"
                        >
                          View Details
                        </button>
                        <button
                          type="button"
                          onClick={() => handleCandidateInterviewRequest(cand)}
                          className="btn-pill-green emp-btn-hire"
                        >
                          Request Interview ↗
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: POST A VACANCY / SHIFT COVER */}
          {activePortalTab === 'post-job' && (
            <div className="emp-tab-content">
              <div className="emp-post-job-wrap">
                <div className="emp-section-heading-row">
                  <div>
                    <h2 className="emp-section-title">Post a New Vacancy or Shift Coverage</h2>
                    <p className="emp-section-sub">
                      Post your job directly to LICHT's candidate network. Vetted applicants will be routed to your portal.
                    </p>
                  </div>
                </div>

                {postJobSuccess && (
                  <div className="emp-job-success-alert" role="alert">
                    <CheckCircle2 size={24} />
                    <div>
                      <strong>Vacancy Successfully Published!</strong>
                      <p>Your listing is now active. Pre-screened candidates will be matched automatically.</p>
                    </div>
                  </div>
                )}

                <form onSubmit={handlePostJob} className="emp-post-form">
                  <div className="emp-form-grid">
                    <div className="emp-form-field">
                      <label htmlFor="pj-title" className="emp-field-label">Job Title *</label>
                      <input
                        id="pj-title"
                        type="text"
                        className="emp-field-input"
                        placeholder="e.g. Registered Nurse (Band 5) or Senior Care Assistant"
                        value={jobTitle}
                        onChange={(e) => setJobTitle(e.target.value)}
                        required
                      />
                    </div>

                    <div className="emp-form-field">
                      <label htmlFor="pj-sector" className="emp-field-label">Healthcare Sector *</label>
                      <select
                        id="pj-sector"
                        className="emp-field-input"
                        value={jobSector}
                        onChange={(e) => setJobSector(e.target.value as any)}
                      >
                        <option value="Care homes">Care homes</option>
                        <option value="Healthcare">Healthcare & Clinical</option>
                        <option value="Supported living">Supported living</option>
                        <option value="Corporate">Corporate / Management</option>
                      </select>
                    </div>

                    <div className="emp-form-field">
                      <label htmlFor="pj-location" className="emp-field-label">Facility / Work Location *</label>
                      <input
                        id="pj-location"
                        type="text"
                        className="emp-field-input"
                        placeholder="e.g. Kensington, London (W8)"
                        value={jobLocation}
                        onChange={(e) => setJobLocation(e.target.value)}
                        required
                      />
                    </div>

                    <div className="emp-form-field">
                      <label htmlFor="pj-contract" className="emp-field-label">Placement Type *</label>
                      <select
                        id="pj-contract"
                        className="emp-field-input"
                        value={jobContract}
                        onChange={(e) => setJobContract(e.target.value as any)}
                      >
                        <option value="Permanent">Permanent Placement</option>
                        <option value="Temporary cover">Temporary / Locum Cover</option>
                        <option value="Night shifts">Night Shifts Only</option>
                        <option value="Block booking">Block Booking (4+ weeks)</option>
                        <option value="Full-time">Full-time Contract</option>
                      </select>
                    </div>

                    <div className="emp-form-field">
                      <label htmlFor="pj-pay" className="emp-field-label">Target Rate / Salary *</label>
                      <input
                        id="pj-pay"
                        type="text"
                        className="emp-field-input"
                        placeholder="e.g. £16.50 – £18.00 / hr or £42,000 / annum"
                        value={jobPayRate}
                        onChange={(e) => setJobPayRate(e.target.value)}
                        required
                      />
                    </div>

                    <div className="emp-form-field emp-checkbox-field">
                      <label className="emp-checkbox-label">
                        <input
                          type="checkbox"
                          checked={isUrgent}
                          onChange={(e) => setIsUrgent(e.target.checked)}
                        />
                        <span>Flag as Urgent Coverage (Immediate placement required within 24 hours)</span>
                      </label>
                    </div>
                  </div>

                  <div className="emp-form-btn-row">
                    <button type="submit" className="btn-pill-green emp-publish-btn">
                      Publish Vacancy to Talent Pool ↗
                    </button>
                    <button 
                      type="button" 
                      onClick={() => setActivePortalTab('vacancies')}
                      className="btn-pill-outline"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* TAB 4: COMPANY PROFILE & DOCUMENTATION */}
          {activePortalTab === 'profile' && employer && (
            <div className="emp-tab-content">
              <div className="emp-section-heading-row">
                <div>
                  <h2 className="emp-section-title">Healthcare Organisation Profile & Documentation</h2>
                  <p className="emp-section-sub">
                    Manage your facility credentials, registered address, operational leadership, and verified compliance documents.
                  </p>
                </div>
                {!isEditingProfile && (
                  <button 
                    type="button" 
                    onClick={() => setIsEditingProfile(true)}
                    className="btn-pill-green"
                  >
                    Edit Company Details
                  </button>
                )}
              </div>

              {profileSaveSuccess && (
                <div className="emp-toast" role="status" style={{ position: 'relative', top: 'auto', right: 'auto', marginBottom: '20px' }}>
                  <CheckCircle2 size={18} />
                  <span>Company profile updated successfully!</span>
                </div>
              )}

              {isEditingProfile ? (
                <div className="emp-profile-edit-card">
                  <h3 className="emp-section-subtitle">Update Operational Details</h3>
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    updateEmployerProfile({
                      contactName: editContactName.trim() || employer.contactName,
                      roleTitle: editRoleTitle.trim() || employer.roleTitle,
                      phone: editPhone.trim() || employer.phone,
                      registeredAddress: editAddress.trim() || employer.registeredAddress,
                      location: editAddress.trim() || employer.location,
                      website: editWebsite.trim() || employer.website
                    });
                    setIsEditingProfile(false);
                    setProfileSaveSuccess(true);
                    setTimeout(() => setProfileSaveSuccess(false), 4000);
                  }} className="emp-form">
                    <div className="emp-form-grid">
                      <div className="emp-form-field">
                        <label className="emp-field-label">Key Contact Person</label>
                        <input
                          type="text"
                          className="emp-field-input"
                          value={editContactName}
                          onChange={(e) => setEditContactName(e.target.value)}
                        />
                      </div>
                      <div className="emp-form-field">
                        <label className="emp-field-label">Official Role / Job Title</label>
                        <input
                          type="text"
                          className="emp-field-input"
                          value={editRoleTitle}
                          onChange={(e) => setEditRoleTitle(e.target.value)}
                        />
                      </div>
                      <div className="emp-form-field">
                        <label className="emp-field-label">Direct Contact Phone</label>
                        <input
                          type="tel"
                          className="emp-field-input"
                          value={editPhone}
                          onChange={(e) => setEditPhone(e.target.value)}
                        />
                      </div>
                      <div className="emp-form-field">
                        <label className="emp-field-label">Facility Address</label>
                        <input
                          type="text"
                          className="emp-field-input"
                          value={editAddress}
                          onChange={(e) => setEditAddress(e.target.value)}
                        />
                      </div>
                      <div className="emp-form-field" style={{ gridColumn: 'span 2' }}>
                        <label className="emp-field-label">Official Website</label>
                        <input
                          type="url"
                          className="emp-field-input"
                          value={editWebsite}
                          onChange={(e) => setEditWebsite(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="emp-form-btn-row">
                      <button type="submit" className="btn-pill-green">
                        Save Profile Changes
                      </button>
                      <button 
                        type="button" 
                        onClick={() => setIsEditingProfile(false)}
                        className="btn-pill-outline"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                <div className="emp-profile-grid">
                  {/* Card 1: Organisation & Regulatory Overview */}
                  <div className="emp-profile-card">
                    <div className="emp-profile-card__header">
                      <div className="emp-pcard-icon">
                        <Building2 size={22} />
                      </div>
                      <div>
                        <span className="emp-pcard-tag">Registered Provider</span>
                        <h3 className="emp-pcard-title">{employer.organisationName}</h3>
                      </div>
                      {employer.cqcRating && (
                        <span className="emp-cqc-tag emp-cqc-tag--badge">
                          <Award size={13} /> CQC {employer.cqcRating}
                        </span>
                      )}
                    </div>

                    <div className="emp-pcard-body">
                      <div className="emp-pcard-row">
                        <span className="emp-pcard-label">Facility Type:</span>
                        <span className="emp-pcard-value">{employer.facilityType}</span>
                      </div>
                      <div className="emp-pcard-row">
                        <span className="emp-pcard-label">Primary Sector:</span>
                        <span className="emp-pcard-value">{employer.primarySector || 'Care homes'}</span>
                      </div>
                      <div className="emp-pcard-row">
                        <span className="emp-pcard-label">CQC Provider ID:</span>
                        <span className="emp-pcard-value font-mono">{employer.cqcProviderId || '1-102938472'}</span>
                      </div>
                      <div className="emp-pcard-row">
                        <span className="emp-pcard-label">Companies House No:</span>
                        <span className="emp-pcard-value font-mono">{employer.companyNumber || '10982341'}</span>
                      </div>
                      <div className="emp-pcard-row">
                        <span className="emp-pcard-label">Insurance Policy:</span>
                        <span className="emp-pcard-value font-mono">{employer.insurancePolicy || 'UK-AVIVA-MED-849201'}</span>
                      </div>
                      <div className="emp-pcard-row">
                        <span className="emp-pcard-label">Registered Address:</span>
                        <span className="emp-pcard-value">{employer.registeredAddress || employer.location}</span>
                      </div>
                      {employer.website && (
                        <div className="emp-pcard-row">
                          <span className="emp-pcard-label">Website:</span>
                          <a href={employer.website} target="_blank" rel="noopener noreferrer" className="emp-pcard-link">
                            {employer.website} ↗
                          </a>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Card 2: Operational Contact & Placement Desk */}
                  <div className="emp-profile-card">
                    <div className="emp-profile-card__header">
                      <div className="emp-pcard-icon">
                        <Users size={22} />
                      </div>
                      <div>
                        <span className="emp-pcard-tag">Account Leadership</span>
                        <h3 className="emp-pcard-title">{employer.contactName}</h3>
                      </div>
                    </div>

                    <div className="emp-pcard-body">
                      <div className="emp-pcard-row">
                        <span className="emp-pcard-label">Role / Job Title:</span>
                        <span className="emp-pcard-value">{employer.roleTitle}</span>
                      </div>
                      <div className="emp-pcard-row">
                        <span className="emp-pcard-label">Official Email:</span>
                        <span className="emp-pcard-value">{employer.email}</span>
                      </div>
                      <div className="emp-pcard-row">
                        <span className="emp-pcard-label">Direct Telephone:</span>
                        <span className="emp-pcard-value">{employer.phone}</span>
                      </div>
                      <div className="emp-pcard-row">
                        <span className="emp-pcard-label">Dedicated Desk:</span>
                        <span className="emp-pcard-value text-green">London & South East Healthcare Team</span>
                      </div>
                      <div className="emp-pcard-row">
                        <span className="emp-pcard-label">Direct Account SLA:</span>
                        <span className="emp-pcard-value">Emergency Cover &lt; 2 hours</span>
                      </div>
                    </div>
                  </div>

                  {/* Card 3: Compliance & Uploaded Documentation */}
                  <div className="emp-profile-card emp-profile-card--full">
                    <div className="emp-profile-card__header">
                      <div className="emp-pcard-icon text-green">
                        <ShieldCheck size={22} />
                      </div>
                      <div>
                        <span className="emp-pcard-tag">Regulatory Verification</span>
                        <h3 className="emp-pcard-title">Attached Company Verification Documents</h3>
                      </div>
                      <span className="emp-verified-badge">
                        <CheckCircle2 size={14} /> 100% CQC & NHS Framework Verified
                      </span>
                    </div>

                    <div className="emp-docs-grid">
                      {(employer.uploadedDocuments || [
                        { id: 'doc-1', name: 'CQC_Registration_Certificate_2026.pdf', type: 'CQC Certificate', size: '2.4 MB', date: 'Verified', verified: true },
                        { id: 'doc-2', name: 'Employers_Liability_Insurance_Schedule.pdf', type: 'Insurance', size: '1.8 MB', date: 'Verified', verified: true },
                        { id: 'doc-3', name: 'Companies_House_Incorporation.pdf', type: 'Certificate of Incorporation', size: '1.2 MB', date: 'Verified', verified: true }
                      ]).map(doc => (
                        <div key={doc.id} className="emp-doc-card">
                          <div className="emp-doc-card__top">
                            <FileText size={20} className="text-gold" />
                            <span className="emp-doc-status-tag">
                              <CheckCircle2 size={12} /> {doc.verified ? 'Verified' : 'Pending'}
                            </span>
                          </div>
                          <strong className="emp-doc-card__title">{doc.name}</strong>
                          <span className="emp-doc-card__type">{doc.type} • {doc.size}</span>
                          <button
                            type="button"
                            className="emp-doc-download-btn"
                            onClick={() => alert(`Simulated secure document retrieval: ${doc.name}`)}
                          >
                            View Document ↗
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* MODAL: APPLICANT DOSSIER & FULL CV VIEW */}
        {selectedApplicant && (
          <div className="emp-modal-overlay" onClick={() => setSelectedApplicant(null)}>
            <div className="emp-modal-card emp-modal-card--cv" onClick={(e) => e.stopPropagation()}>
              <div className="emp-modal-header">
                <div>
                  <div className="emp-modal-tags-row">
                    <span className="emp-modal-badge">{selectedApplicant.job.title}</span>
                    <span className="emp-match-badge">
                      <Sparkles size={13} /> {selectedApplicant.applicant.matchScore}% Role Match
                    </span>
                  </div>
                  <h3 className="emp-modal-name">{selectedApplicant.applicant.candidateName}</h3>
                  <p className="emp-modal-sub">
                    {selectedApplicant.applicant.currentRole} • {selectedApplicant.applicant.experienceYears} Years Healthcare Experience • Applied on {selectedApplicant.applicant.appliedDate}
                  </p>
                </div>
                <button 
                  type="button" 
                  className="emp-modal-close" 
                  onClick={() => setSelectedApplicant(null)}
                  aria-label="Close CV Dossier"
                >
                  ✕
                </button>
              </div>

              <div className="emp-modal-body">
                {/* Contact & Clearance Summary Strip */}
                <div className="emp-modal-contact-row">
                  <div><strong>Email:</strong> {selectedApplicant.applicant.email}</div>
                  <div><strong>Phone:</strong> {selectedApplicant.applicant.phone}</div>
                  <div><strong>Location:</strong> {selectedApplicant.applicant.location}</div>
                  <div>
                    <strong>Compliance:</strong>{' '}
                    <span className="text-green font-semibold">
                      <ShieldCheck size={13} style={{ display: 'inline', verticalAlign: 'middle' }} /> {selectedApplicant.applicant.dbsStatus}
                    </span>
                  </div>
                </div>

                {/* Professional Statement */}
                <div className="emp-modal-section">
                  <h4 className="emp-modal-sec-title">Professional Statement & Cover Note</h4>
                  <p className="emp-modal-text">{selectedApplicant.applicant.coverNote || 'Dedicated healthcare practitioner with exemplary clinical compliance and care standards.'}</p>
                </div>

                {/* Candidate Work History Timeline */}
                <div className="emp-modal-section">
                  <h4 className="emp-modal-sec-title">Work Experience & Employment History</h4>
                  <div className="emp-cv-timeline">
                    {(selectedApplicant.applicant.workHistory || [
                      {
                        role: selectedApplicant.applicant.currentRole,
                        company: 'Healthcare & Residential Services UK',
                        duration: `${selectedApplicant.applicant.experienceYears} years experience`,
                        details: 'Key responsibilities included administering care plans, supervising shift medication rounds, and liaising with MDT clinical personnel.'
                      }
                    ]).map((work, idx) => (
                      <div key={idx} className="emp-timeline-item">
                        <div className="emp-timeline-marker" />
                        <div className="emp-timeline-content">
                          <div className="emp-timeline-header">
                            <strong className="emp-timeline-role">{work.role}</strong>
                            <span className="emp-timeline-date">{work.duration}</span>
                          </div>
                          <span className="emp-timeline-company">{work.company}</span>
                          <p className="emp-timeline-desc">{work.details}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Education & Qualifications */}
                <div className="emp-modal-section">
                  <h4 className="emp-modal-sec-title">Healthcare Qualifications & Education</h4>
                  <ul className="emp-cert-list">
                    {(selectedApplicant.applicant.education || [
                      'NVQ Level 3 Diploma in Health & Social Care (Adult Care Pathway)',
                      'The Care Certificate – Verified by Skills for Care UK'
                    ]).map((edu, idx) => (
                      <li key={idx}>
                        <CheckCircle2 size={15} className="text-gold" />
                        <span>{edu}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Clinical Skills */}
                <div className="emp-modal-section">
                  <h4 className="emp-modal-sec-title">Clinical Skills & Competencies</h4>
                  <div className="emp-skills-row">
                    {(selectedApplicant.applicant.skills || [
                      'Dementia Care',
                      'Medication Administration Lead',
                      'Safeguarding Adults Level 3',
                      'Care Planning',
                      'Moving & Handling',
                      'Infection Control'
                    ]).map(skill => (
                      <span key={skill} className="emp-skill-chip">{skill}</span>
                    ))}
                  </div>
                </div>

                {/* Mandatory Certifications */}
                <div className="emp-modal-section">
                  <h4 className="emp-modal-sec-title">Verified Certifications & Clinical Clearance</h4>
                  <ul className="emp-cert-list">
                    {(selectedApplicant.applicant.certifications || [
                      'Enhanced DBS on Update Service (Clean & Current)',
                      'Basic Life Support (BLS) & CPR (Resuscitation Council UK)',
                      'Moving & Handling of People Level 2'
                    ]).map((cert, idx) => (
                      <li key={idx}>
                        <CheckCircle2 size={15} className="text-green" />
                        <span>{cert}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* References */}
                <div className="emp-ref-notice">
                  <ShieldCheck size={16} className="text-green" />
                  <span>2 Verified Clinical References on file with LICHT Compliance Team (Registered Manager & Clinical Lead).</span>
                </div>

                {/* Official CV Download Banner */}
                <div className="emp-modal-cv-box">
                  <FileText size={24} className="text-gold" />
                  <div style={{ flex: 1 }}>
                    <strong>{selectedApplicant.applicant.cvFileName}</strong>
                    <p>Verified Candidate Dossier (Clinical References, DBS & Mandatory Training Portfolio attached).</p>
                  </div>
                  <button 
                    type="button" 
                    className="btn-pill-outline emp-cv-dl-btn"
                    onClick={() => {
                      alert(`Downloading official verified CV: ${selectedApplicant.applicant.cvFileName}`);
                    }}
                  >
                    Download CV (PDF) ↗
                  </button>
                </div>

                {/* Decision & Status Actions */}
                <div className="emp-modal-footer-actions">
                  <div className="emp-modal-status-box">
                    <label htmlFor="modal-app-status">Application Status:</label>
                    <select
                      id="modal-app-status"
                      className="emp-status-select"
                      value={selectedApplicant.applicant.status}
                      onChange={(e) => {
                        updateApplicantStatus(selectedApplicant.job.id, selectedApplicant.applicant.id, e.target.value as any);
                        setSelectedApplicant({
                          ...selectedApplicant,
                          applicant: {
                            ...selectedApplicant.applicant,
                            status: e.target.value as any
                          }
                        });
                      }}
                    >
                      <option value="Under Review">Under Review</option>
                      <option value="Shortlisted">Shortlisted</option>
                      <option value="Interview Scheduled">Interview Scheduled</option>
                      <option value="Offer Extended">Offer Extended</option>
                      <option value="Declined">Declined</option>
                    </select>
                  </div>

                  <div className="emp-modal-action-buttons">
                    <button 
                      type="button" 
                      className="btn-pill-green"
                      onClick={() => {
                        updateApplicantStatus(selectedApplicant.job.id, selectedApplicant.applicant.id, 'Interview Scheduled');
                        setSelectedApplicant(null);
                        setCandidateContactSuccess(`Interview invitation dispatched to ${selectedApplicant.applicant.candidateName}. Our placement desk will coordinate times.`);
                      }}
                    >
                      Schedule Interview ↗
                    </button>
                    <button 
                      type="button" 
                      className="btn-pill-outline"
                      onClick={() => {
                        updateApplicantStatus(selectedApplicant.job.id, selectedApplicant.applicant.id, 'Shortlisted');
                        setSelectedApplicant(null);
                        setCandidateContactSuccess(`${selectedApplicant.applicant.candidateName} added to Shortlist.`);
                      }}
                    >
                      Shortlist
                    </button>
                    <button 
                      type="button" 
                      className="btn-pill-outline"
                      onClick={() => setSelectedApplicant(null)}
                    >
                      Close Dossier
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* MODAL: CANDIDATE DETAIL VIEW */}
        {selectedCandidate && (
          <div className="emp-modal-overlay" onClick={() => setSelectedCandidate(null)}>
            <div className="emp-modal-card" onClick={(e) => e.stopPropagation()}>
              <div className="emp-modal-header">
                <div>
                  <span className="emp-modal-badge">{selectedCandidate.sector}</span>
                  <h3 className="emp-modal-name">{selectedCandidate.name}</h3>
                  <p className="emp-modal-sub">{selectedCandidate.headline}</p>
                </div>
                <button 
                  type="button" 
                  className="emp-modal-close" 
                  onClick={() => setSelectedCandidate(null)}
                >
                  ✕
                </button>
              </div>

              <div className="emp-modal-body">
                <p className="emp-modal-text">{selectedCandidate.summary}</p>

                <div className="emp-modal-section">
                  <h4 className="emp-modal-sec-title">Key Healthcare Skills</h4>
                  <div className="emp-skills-row">
                    {selectedCandidate.skills.map(s => (
                      <span key={s} className="emp-skill-chip">{s}</span>
                    ))}
                  </div>
                </div>

                <div className="emp-modal-section">
                  <h4 className="emp-modal-sec-title">Certifications & Accreditations</h4>
                  <ul className="emp-cert-list">
                    {selectedCandidate.certifications.map(c => (
                      <li key={c}><CheckCircle2 size={14} className="text-green" /> {c}</li>
                    ))}
                  </ul>
                </div>

                <div className="emp-modal-actions">
                  <button 
                    type="button" 
                    className="btn-pill-green"
                    onClick={() => handleCandidateInterviewRequest(selectedCandidate)}
                  >
                    Request Candidate for Shift / Interview ↗
                  </button>
                  <button 
                    type="button" 
                    className="btn-pill-outline"
                    onClick={() => setSelectedCandidate(null)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // =========================================================================
  // VIEW B: PUBLIC EMPLOYER LANDING PAGE (NOT LOGGED IN)
  // =========================================================================
  return (
    <div className="employer-landing-page">
      {/* 1. HERO SECTION */}
      <section className="emp-landing-hero">
        <div className="container emp-hero-grid">
          <div className="emp-hero-left">
            <div className="emp-eyebrow">
              <Building2 size={16} />
              <span>LICHT For Healthcare Providers & Employers</span>
            </div>

            <h1 className="emp-hero-title">
              Healthcare staffing engineered for continuity & compliance.
            </h1>

            <p className="emp-hero-subtitle">
              Deploy pre-vetted, DBS-cleared Registered Nurses, Senior Carers, and Healthcare Assistants across London and the UK within 24–48 hours. 100% CQC & NMC audit-ready.
            </p>

            <div className="emp-hero-cta-group">
              <a href="#look-for-employee" className="btn-pill-green emp-hero-btn">
                <Users size={16} /> Look for an Employee ↗
              </a>
              <a href="#post-a-job" className="btn-pill-outline emp-hero-btn">
                <Briefcase size={16} /> Post a Vacancy
              </a>
              <Link to="/employer/login" className="emp-login-pill-link">
                Employer Sign In ↗
              </Link>
            </div>

            <div className="emp-trust-proof">
              <ShieldCheck size={18} className="text-green" />
              <span>CQC Registered & Compliant • Enhanced DBS on Update Service • 24/7 Placement Desk</span>
            </div>
          </div>

          <div className="emp-hero-right">
            <div className="emp-hero-portal-card">
              <div className="emp-hcard-header">
                <div>
                  <span className="emp-hcard-tag">Verified Employer Access</span>
                  <h3 className="emp-hcard-title">Employer Recruitment Portal</h3>
                </div>
                <div className="emp-hcard-icon-wrap">
                  <Building2 size={20} />
                </div>
              </div>

              <p className="emp-hcard-desc">
                Log in to review verified candidate CVs, schedule interviews, and deploy emergency shift coverage.
              </p>

              <div className="emp-hcard-demo-card">
                <div className="emp-demo-badge-row">
                  <span className="emp-demo-pill">
                    <Sparkles size={12} /> Instant Evaluation Demo
                  </span>
                  <span className="emp-demo-facility">St. Jude Care Pavilion</span>
                </div>
                <div className="emp-demo-user-row">
                  <div className="emp-demo-avatar">JT</div>
                  <div className="emp-demo-user-meta">
                    <strong>Dr. Julian Thorne</strong>
                    <span>Registered Manager (Demo Account)</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    employerLogin('j.thorne@stjudecare.co.uk');
                  }}
                  className="emp-demo-action-btn"
                >
                  <span>Launch Employer Portal Demo</span>
                  <ArrowRight size={15} />
                </button>
              </div>

              <div className="emp-hcard-actions-row">
                <Link to="/employer/login" className="emp-hcard-login-link">
                  Sign in with work email →
                </Link>
                <span className="emp-hcard-bullet">•</span>
                <Link to="/employer/register" className="emp-hcard-register-link">
                  Register facility
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. LIVE METRICS STRIP */}
      <section className="emp-stats-strip">
        <div className="container">
          <div className="emp-stats-grid">
            <div className="emp-stat-item">
              <div className="emp-stat-metric-row">
                <span className="emp-stat-num">14,200</span>
                <span className="emp-stat-accent">+</span>
              </div>
              <span className="emp-stat-label">Vetted Healthcare Professionals</span>
              <span className="emp-stat-sub">Across NHS & Private Care</span>
            </div>

            <div className="emp-stat-item">
              <div className="emp-stat-metric-row">
                <span className="emp-stat-num">99.4</span>
                <span className="emp-stat-accent">%</span>
              </div>
              <span className="emp-stat-label">Shift Fill Rate</span>
              <span className="emp-stat-sub">Same-Day & Advance Rotas</span>
            </div>

            <div className="emp-stat-item">
              <div className="emp-stat-metric-row">
                <span className="emp-stat-prefix">&lt;&nbsp;</span>
                <span className="emp-stat-num">48</span>
                <span className="emp-stat-unit">&nbsp;hrs</span>
              </div>
              <span className="emp-stat-label">Average Placement Turnaround</span>
              <span className="emp-stat-sub">Permanent & Contract</span>
            </div>

            <div className="emp-stat-item">
              <div className="emp-stat-metric-row">
                <span className="emp-stat-num">100</span>
                <span className="emp-stat-accent">%</span>
              </div>
              <span className="emp-stat-label">CQC & Safeguarding Audit Pass</span>
              <span className="emp-stat-sub">Zero Compliance Breach</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. "LOOK FOR AN EMPLOYEE" / SMART SOURCING TALENT EXPLORER */}
      <section id="look-for-employee" className="emp-sourcing-section">
        <div className="container">
          <div className="emp-sourcing-header">
            <div className="emp-eyebrow">Smart Sourcing & Talent Pool</div>
            <h2 className="emp-section-heading">
              Look for an employee in our verified candidate network.
            </h2>
            <p className="emp-section-description">
              Browse pre-screened nurses, healthcare assistants, and specialist support workers available for immediate deployment across London and the UK.
            </p>
          </div>

          {/* Search & Filters */}
          <div className="emp-talent-filters-bar">
            <div className="emp-search-input-wrap">
              <Search size={18} className="emp-search-icon" />
              <input
                type="text"
                className="emp-search-input"
                placeholder="Search by role, skill (e.g. Dementia, NMC Pin, PEG), or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="emp-filter-group">
              <select
                className="emp-filter-select"
                value={sectorFilter}
                onChange={(e) => setSectorFilter(e.target.value)}
              >
                <option value="all">All Sectors</option>
                <option value="Care homes">Care Homes</option>
                <option value="Healthcare">Healthcare / Clinical</option>
                <option value="Supported living">Supported Living</option>
              </select>

              <select
                className="emp-filter-select"
                value={experienceFilter}
                onChange={(e) => setExperienceFilter(e.target.value)}
              >
                <option value="all">Any Experience</option>
                <option value="3plus">3+ Years</option>
                <option value="5plus">5+ Years</option>
                <option value="8plus">8+ Years Senior</option>
              </select>
            </div>
          </div>

          {/* Talent Grid */}
          <div className="emp-talent-grid">
            {filteredCandidates.map(cand => (
              <div key={cand.id} className="emp-talent-card">
                <div className="emp-talent-top">
                  <div className="emp-talent-avatar">
                    {cand.avatarInitials}
                  </div>
                  <div className="emp-talent-title-area">
                    <div className="emp-talent-name-row">
                      <h3 className="emp-talent-name">{cand.name}</h3>
                      <span className="emp-talent-verified-badge" title="Identity & DBS Checked">
                        <Check size={11} /> Verified
                      </span>
                    </div>
                    <p className="emp-talent-headline">{cand.headline}</p>
                  </div>
                </div>

                <div className="emp-talent-meta-inline">
                  <span><MapPin size={13} /> {cand.location}</span>
                  <span>•</span>
                  <span><Clock size={13} /> {cand.availability}</span>
                  <span>•</span>
                  <strong className="emp-rate-highlight">{cand.expectedRate}</strong>
                </div>

                <div className="emp-talent-skills">
                  {cand.skills.slice(0, 3).map(skill => (
                    <span key={skill} className="emp-skill-chip">{skill}</span>
                  ))}
                </div>

                <div className="emp-talent-actions">
                  <button
                    type="button"
                    onClick={() => setSelectedCandidate(cand)}
                    className="btn-pill-outline emp-btn-profile"
                  >
                    View Details
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCandidate(cand);
                    }}
                    className="btn-pill-green emp-btn-hire"
                  >
                    Request Candidate ↗
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. "POST A JOB / REQUEST STAFF" FAST INTAKE BUILDER */}
      <section id="post-a-job" className="emp-quick-post-section">
        <div className="container">
          <div className="emp-post-box">
            <div className="emp-post-box__left">
              <div className="emp-eyebrow">Post a Job / Request Staff</div>
              <h2 className="emp-post-title">
                Fill shifts or recruit permanent clinical talent with zero hassle.
              </h2>
              <p className="emp-post-desc">
                Submit your staffing brief. Our dedicated clinical account coordinators will match you with fully compliant candidates within hours.
              </p>

              <div className="emp-post-benefits">
                <div className="emp-p-benefit">
                  <CheckCircle2 size={18} className="text-gold" />
                  <span>28-point compliance check on every candidate</span>
                </div>
                <div className="emp-p-benefit">
                  <CheckCircle2 size={18} className="text-gold" />
                  <span>Immediate shift coverage with 2-hour emergency escalation</span>
                </div>
                <div className="emp-p-benefit">
                  <CheckCircle2 size={18} className="text-gold" />
                  <span>Dedicated clinical account manager & transparent billing</span>
                </div>
              </div>
            </div>

            <div className="emp-post-box__right">
              {quickSubmitSuccess ? (
                <div className="emp-quick-success">
                  <CheckCircle2 size={48} className="text-green" />
                  <h3>Staffing Brief Received</h3>
                  <p>
                    Thank you, {quickContact}. Your vacancy for <strong>{quickRole}</strong> at <em>{quickOrg}</em> has been submitted. A placement coordinator is reviewing your request now.
                  </p>
                  <button
                    type="button"
                    onClick={() => setQuickSubmitSuccess(false)}
                    className="btn-pill-green"
                    style={{ marginTop: '16px' }}
                  >
                    Submit Another Vacancy
                  </button>
                </div>
              ) : (
                <form onSubmit={handleQuickRequestSubmit} className="emp-quick-form">
                  <h3 className="emp-qform-title">Quick Staffing Request</h3>
                  
                  <div className="emp-qform-grid">
                    <div className="emp-qfield">
                      <label htmlFor="q-org" className="emp-qlabel">Healthcare Organisation *</label>
                      <input
                        id="q-org"
                        type="text"
                        className="emp-qinput"
                        placeholder="e.g. Sunrise Care Home"
                        value={quickOrg}
                        onChange={(e) => setQuickOrg(e.target.value)}
                        required
                      />
                    </div>

                    <div className="emp-qfield">
                      <label htmlFor="q-contact" className="emp-qlabel">Your Full Name & Role *</label>
                      <input
                        id="q-contact"
                        type="text"
                        className="emp-qinput"
                        placeholder="e.g. Sarah Jenkins (Manager)"
                        value={quickContact}
                        onChange={(e) => setQuickContact(e.target.value)}
                        required
                      />
                    </div>

                    <div className="emp-qfield">
                      <label htmlFor="q-email" className="emp-qlabel">Work Email *</label>
                      <input
                        id="q-email"
                        type="email"
                        className="emp-qinput"
                        placeholder="s.jenkins@caregroup.co.uk"
                        value={quickEmail}
                        onChange={(e) => setQuickEmail(e.target.value)}
                        required
                      />
                    </div>

                    <div className="emp-qfield">
                      <label htmlFor="q-phone" className="emp-qlabel">Contact Phone</label>
                      <input
                        id="q-phone"
                        type="tel"
                        className="emp-qinput"
                        placeholder="+44 20 7946 0000"
                        value={quickPhone}
                        onChange={(e) => setQuickPhone(e.target.value)}
                      />
                    </div>

                    <div className="emp-qfield">
                      <label htmlFor="q-role" className="emp-qlabel">Role Needed *</label>
                      <input
                        id="q-role"
                        type="text"
                        className="emp-qinput"
                        placeholder="e.g. Registered Nurse (RGN) or Senior Carer"
                        value={quickRole}
                        onChange={(e) => setQuickRole(e.target.value)}
                        required
                      />
                    </div>

                    <div className="emp-qfield">
                      <label htmlFor="q-urgency" className="emp-qlabel">Required Start Date</label>
                      <select
                        id="q-urgency"
                        className="emp-qinput"
                        value={quickUrgency}
                        onChange={(e) => setQuickUrgency(e.target.value)}
                      >
                        <option value="Immediate (under 48 hrs)">Immediate (under 48 hrs)</option>
                        <option value="This week">This week</option>
                        <option value="Next 2 weeks">Next 2 weeks</option>
                        <option value="Future permanent pipeline">Future permanent pipeline</option>
                      </select>
                    </div>
                  </div>

                  <button type="submit" className="btn-pill-green emp-qsubmit-btn">
                    Post Job / Request Staff ↗
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 5. CQC & COMPLIANCE PILLARS */}
      <section className="emp-compliance-section">
        <div className="container">
          <div className="emp-comp-grid">
            <div className="emp-comp-card">
              <ShieldCheck size={28} className="text-gold" />
              <h3>28-Point DBS & Compliance Check</h3>
              <p>
                Every candidate is audited for Enhanced DBS on the Update Service, RTW in the UK, NMC PIN real-time validity, and verified clinical references.
              </p>
            </div>

            <div className="emp-comp-card">
              <Award size={28} className="text-gold" />
              <h3>100% CQC & Safeguarding Ready</h3>
              <p>
                Complete candidate dossiers and training matrix provided before the first shift to keep your care inspection files immaculate.
              </p>
            </div>

            <div className="emp-comp-card">
              <Clock size={28} className="text-gold" />
              <h3>Rapid Response & Shift Continuity</h3>
              <p>
                24/7 staffing dispatch with experienced carers who understand person-centred care and adapt quickly to your unit's workflow.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CANDIDATE MODAL IN PUBLIC VIEW */}
      {selectedCandidate && (
        <div className="emp-modal-overlay" onClick={() => setSelectedCandidate(null)}>
          <div className="emp-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="emp-modal-header">
              <div>
                <span className="emp-modal-badge">{selectedCandidate.sector}</span>
                <h3 className="emp-modal-name">{selectedCandidate.name}</h3>
                <p className="emp-modal-sub">{selectedCandidate.headline}</p>
              </div>
              <button 
                type="button" 
                className="emp-modal-close" 
                onClick={() => setSelectedCandidate(null)}
              >
                ✕
              </button>
            </div>

            <div className="emp-modal-body">
              <p className="emp-modal-text">{selectedCandidate.summary}</p>

              <div className="emp-modal-section">
                <h4 className="emp-modal-sec-title">Key Healthcare Skills</h4>
                <div className="emp-skills-row">
                  {selectedCandidate.skills.map(s => (
                    <span key={s} className="emp-skill-chip">{s}</span>
                  ))}
                </div>
              </div>

              <div className="emp-modal-section">
                <h4 className="emp-modal-sec-title">Certifications & Accreditations</h4>
                <ul className="emp-cert-list">
                  {selectedCandidate.certifications.map(c => (
                    <li key={c}><CheckCircle2 size={14} className="text-green" /> {c}</li>
                  ))}
                </ul>
              </div>

              <div className="emp-modal-actions">
                <button 
                  type="button" 
                  className="btn-pill-green"
                  onClick={() => {
                    handleCandidateInterviewRequest(selectedCandidate);
                  }}
                >
                  Request Candidate Dossier ↗
                </button>
                <button 
                  type="button" 
                  className="btn-pill-outline"
                  onClick={() => setSelectedCandidate(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default EmployerLanding;
