import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Briefcase, 
  Calendar, 
  FileText, 
  Download, 
  UploadCloud, 
  CheckCircle2, 
  Clock, 
  Building2, 
  ShieldCheck, 
  Plus, 
  Trash2, 
  Edit3, 
  LogOut, 
  ExternalLink, 
  Bookmark, 
  AlertCircle,
  ChevronRight,
  Sparkles,
  GraduationCap
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { SAMPLE_VACANCIES } from '../data/mockData';
import './Profile.css';

export const Profile: React.FC = () => {
  const { 
    user, 
    logout, 
    withdrawApplication, 
    updateCV, 
    addExperience, 
    deleteExperience,
    addEducation,
    deleteEducation,
    updateProfile 
  } = useAuth();
  
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<'applications' | 'cv' | 'experience' | 'saved'>('applications');
  const [showAddExpModal, setShowAddExpModal] = useState(false);
  const [showAddEduModal, setShowAddEduModal] = useState(false);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  // New education form state
  const [newEduQual, setNewEduQual] = useState('NVQ / Diploma (Level 2 or 3 in Health & Social Care)');
  const [newEduField, setNewEduField] = useState('');
  const [newEduInst, setNewEduInst] = useState('');
  const [newEduYear, setNewEduYear] = useState('');

  // New experience form state
  const [newTitle, setNewTitle] = useState('');
  const [newCompany, setNewCompany] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newStartDate, setNewStartDate] = useState('');
  const [newEndDate, setNewEndDate] = useState('');
  const [newCurrent, setNewCurrent] = useState(false);
  const [newResp, setNewResp] = useState('');

  if (!user) {
    return (
      <div className="profile-page">
        <div className="container profile-empty-state">
          <User size={48} className="empty-icon" />
          <h2>No Active Session</h2>
          <p>Please sign in or create a candidate profile to view your applied companies and saved CV.</p>
          <div className="empty-btn-row">
            <Link to="/login" className="btn-pill-green">Sign in</Link>
            <Link to="/signup" className="btn-pill-outline">Create account</Link>
          </div>
        </div>
      </div>
    );
  }

  const triggerToast = (msg: string) => {
    setSuccessToast(msg);
    setTimeout(() => setSuccessToast(null), 4000);
  };

  const handleLogout = () => {
    logout();
    navigate('/', { replace: true });
  };

  const handleCvUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const sizeKb = Math.round(file.size / 1024);
      updateCV({
        fileName: file.name,
        fileSize: `${sizeKb} KB`,
        uploadedDate: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
      });
      triggerToast(`Saved CV updated: ${file.name}`);
    }
  };

  const handleMockDownloadCV = () => {
    if (!user.savedCV) return;
    const blob = new Blob([
      `LICHT RECRUITMENT SERVICES LIMITED - CANDIDATE RESUME\n\n` +
      `Candidate: ${user.fullName}\n` +
      `Email: ${user.email}\n` +
      `Phone: ${user.phone}\n` +
      `Location: ${user.location}\n` +
      `Target Sector: ${user.targetSector}\n` +
      `DBS Clearance: ${user.dbsStatus}\n` +
      `Availability: ${user.availability}\n\n` +
      `PROFILE SUMMARY:\n${user.bio}\n\n` +
      `PREVIOUS EXPERIENCE:\n` +
      user.previousExperience.map(e => `- ${e.jobTitle} at ${e.company} (${e.startDate} – ${e.current ? 'Present' : e.endDate})\n  ${e.responsibilities}`).join('\n\n') +
      `\n\nCORE SKILLS:\n` + user.skills.join(', ') +
      `\n\nCERTIFICATIONS:\n` + user.certifications.join(', ')
    ], { type: 'text/plain' });

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = user.savedCV.fileName.replace(/\.pdf$/i, '.txt');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    triggerToast('CV downloaded successfully.');
  };

  const handleSaveNewExperience = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newCompany.trim()) return;

    addExperience({
      jobTitle: newTitle.trim(),
      company: newCompany.trim(),
      location: newLocation.trim() || user.location,
      startDate: newStartDate.trim() || '2024',
      endDate: newCurrent ? 'Present' : (newEndDate.trim() || '2025'),
      current: newCurrent,
      responsibilities: newResp.trim() || 'Supported daily operations and service user care plans.'
    });

    setNewTitle('');
    setNewCompany('');
    setNewLocation('');
    setNewStartDate('');
    setNewEndDate('');
    setNewCurrent(false);
    setNewResp('');
    setShowAddExpModal(false);
    triggerToast('New experience entry added to profile.');
  };

  const handleSaveNewEducation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEduQual.trim()) return;

    addEducation({
      qualification: newEduQual.trim(),
      fieldOfStudy: newEduField.trim() || 'Health & Social Care',
      institution: newEduInst.trim() || 'City & Guilds / College',
      graduationYear: newEduYear.trim() || '2024'
    });

    setNewEduQual('NVQ / Diploma (Level 2 or 3 in Health & Social Care)');
    setNewEduField('');
    setNewEduInst('');
    setNewEduYear('');
    setShowAddEduModal(false);
    triggerToast('Education qualification added to profile.');
  };

  // Get saved vacancies data
  const savedVacanciesList = SAMPLE_VACANCIES.filter(v => user.savedJobs.includes(v.id));

  // Count active applications
  const inReviewCount = user.appliedJobs.filter(
    a => a.status === 'Interview Scheduled' || a.status === 'Under Review' || a.status === 'Shortlisted'
  ).length;

  return (
    <div className="profile-page">
      <div className="container profile-container">
        {/* Toast Alert */}
        {successToast && (
          <div className="profile-toast" role="status">
            <CheckCircle2 size={18} />
            <span>{successToast}</span>
          </div>
        )}

        {/* 1. CANDIDATE PROFILE HEADER CARD */}
        <section className="profile-header-card">
          <div className="profile-header-top">
            <div className="profile-avatar-wrap">
              <div className="profile-avatar-initials">
                {user.fullName.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </div>
              <span className="profile-verified-dot" title="DBS & ID Verified" />
            </div>

            <div className="profile-header-details">
              <div className="profile-name-row">
                <h1 className="profile-name">{user.fullName}</h1>
                <span className="profile-dbs-badge">
                  <ShieldCheck size={14} />
                  <span>{user.dbsStatus.includes('Enhanced') ? 'Enhanced DBS Verified' : 'DBS Registered'}</span>
                </span>
                <span className="profile-sector-badge">{user.targetSector}</span>
                {user.experienceLevel && (
                  <span className="profile-exp-badge">
                    <Briefcase size={13} />
                    <span>{user.experienceLevel}</span>
                  </span>
                )}
              </div>

              <p className="profile-headline">{user.headline}</p>

              <div className="profile-meta-chips">
                <span className="meta-chip">
                  <MapPin size={14} className="meta-chip-icon" />
                  {user.location} {user.postcode && `(${user.postcode})`}
                </span>
                <span className="meta-chip">
                  <Mail size={14} className="meta-chip-icon" />
                  {user.email}
                </span>
                <span className="meta-chip">
                  <Phone size={14} className="meta-chip-icon" />
                  {user.phone}
                </span>
                <span className="meta-chip meta-chip--avail">
                  <Clock size={14} className="meta-chip-icon" />
                  {user.availability}
                </span>
              </div>
            </div>

            <div className="profile-header-actions">
              <Link to="/employer" className="btn-pill-outline profile-employer-chip-btn" title="Employer hiring & talent sourcing">
                <Building2 size={14} /> Look for an employee
              </Link>
              <Link to="/opportunities" className="btn-pill-green profile-action-btn">
                Browse Vacancies ↗
              </Link>
              <button 
                type="button" 
                onClick={handleLogout}
                className="btn-profile-logout"
                title="Sign out of candidate portal"
              >
                <LogOut size={16} /> Sign out
              </button>
            </div>
          </div>
        </section>

        {/* 2. METRICS STRIP */}
        <section className="profile-metrics-strip">
          <div className="metric-box">
            <span className="metric-val">{user.appliedJobs.length}</span>
            <span className="metric-lbl">Total Applications</span>
          </div>
          <div className="metric-box">
            <span className="metric-val text-gold">{inReviewCount}</span>
            <span className="metric-lbl">Interviews / In Review</span>
          </div>
          <div className="metric-box">
            <span className="metric-val">{user.previousExperience.length}</span>
            <span className="metric-lbl">Recorded Previous Roles</span>
          </div>
          <div className="metric-box">
            <span className="metric-val text-green">{user.savedCV ? 'Active' : 'Missing'}</span>
            <span className="metric-lbl">Saved CV Document</span>
          </div>
        </section>

        {/* 2B. LOOK FOR AN EMPLOYEE BANNER */}
        <div className="profile-employer-banner">
          <div className="profile-emp-banner-content">
            <div className="profile-emp-badge">
              <Building2 size={14} />
              <span>Healthcare Provider & Employer Portal</span>
            </div>
            <h2 className="profile-emp-title">
              Looking to hire qualified staff? Look for an employee
            </h2>
            <p className="profile-emp-desc">
              Access pre-screened nurses, healthcare assistants, and support workers with verified Enhanced DBS, or sign in to your dedicated Employer Portal.
            </p>
          </div>
          <div className="profile-emp-banner-actions">
            <Link to="/employer" className="btn-pill-green profile-emp-cta">
              Look for an employee ↗
            </Link>
            <Link to="/employer/login" className="profile-emp-sublink">
              Employer Sign In →
            </Link>
          </div>
        </div>

        {/* 3. DASHBOARD TABS NAVIGATION */}
        <div className="profile-nav-tabs">
          <button
            type="button"
            className={`profile-tab-btn ${activeTab === 'applications' ? 'profile-tab-btn--active' : ''}`}
            onClick={() => setActiveTab('applications')}
          >
            <Building2 size={16} />
            <span>Applied Companies & Roles ({user.appliedJobs.length})</span>
          </button>

          <button
            type="button"
            className={`profile-tab-btn ${activeTab === 'cv' ? 'profile-tab-btn--active' : ''}`}
            onClick={() => setActiveTab('cv')}
          >
            <FileText size={16} />
            <span>Saved CV & Documents</span>
          </button>

          <button
            type="button"
            className={`profile-tab-btn ${activeTab === 'experience' ? 'profile-tab-btn--active' : ''}`}
            onClick={() => setActiveTab('experience')}
          >
            <Briefcase size={16} />
            <span>Previous Experience & Skills</span>
          </button>

          <button
            type="button"
            className={`profile-tab-btn ${activeTab === 'saved' ? 'profile-tab-btn--active' : ''}`}
            onClick={() => setActiveTab('saved')}
          >
            <Bookmark size={16} />
            <span>Saved Roles ({user.savedJobs.length})</span>
          </button>
        </div>

        {/* 4. TAB CONTENTS */}
        <div className="profile-tab-content">
          {/* ================= TAB 1: APPLIED COMPANIES & ROLES ================= */}
          {activeTab === 'applications' && (
            <div className="tab-pane">
              <div className="pane-header-row">
                <div>
                  <h2 className="pane-title">Companies & Opportunities You Have Applied To</h2>
                  <p className="pane-desc">
                    Real-time status updates from UK healthcare trusts, residential care homes, and supported living providers.
                  </p>
                </div>
                <Link to="/opportunities" className="btn-pill-outline pane-cta">
                  Explore More Roles ↗
                </Link>
              </div>

              {user.appliedJobs.length === 0 ? (
                <div className="no-items-card">
                  <Building2 size={40} className="no-items-icon" />
                  <h3>No applications submitted yet</h3>
                  <p>When you apply for vacancies using your candidate profile, they will be tracked right here.</p>
                  <Link to="/opportunities" className="btn-pill-green" style={{ marginTop: '16px' }}>
                    Browse Available Opportunities ↗
                  </Link>
                </div>
              ) : (
                <div className="applications-table-card">
                  <div className="applications-list">
                    {user.appliedJobs.map((app) => {
                      const getStatusBadge = (status: string) => {
                        switch (status) {
                          case 'Interview Scheduled':
                            return <span className="status-badge status-badge--interview"><Sparkles size={13} /> Interview Scheduled</span>;
                          case 'Under Review':
                            return <span className="status-badge status-badge--review"><Clock size={13} /> Under Review</span>;
                          case 'Shortlisted':
                            return <span className="status-badge status-badge--shortlist"><CheckCircle2 size={13} /> Shortlisted</span>;
                          case 'Offer Extended':
                            return <span className="status-badge status-badge--offer"><ShieldCheck size={13} /> Offer Extended</span>;
                          default:
                            return <span className="status-badge status-badge--received"><CheckCircle2 size={13} /> Application Received</span>;
                        }
                      };

                      return (
                        <div key={app.id} className="application-row-card">
                          <div className="app-main-info">
                            <div className="app-company-tag">
                              <Building2 size={15} className="app-co-icon" />
                              <strong className="app-company-name">{app.companyName}</strong>
                            </div>
                            <h3 className="app-role-title">
                              <Link to={`/opportunities/${app.jobId}`} className="app-role-link">
                                {app.jobTitle}
                              </Link>
                            </h3>
                            <div className="app-meta-row">
                              <span className="app-meta-tag">{app.sector}</span>
                              <span className="app-meta-dot">·</span>
                              <span className="app-meta-tag">{app.location}</span>
                              <span className="app-meta-dot">·</span>
                              <span className="app-meta-tag">{app.contractType}</span>
                              <span className="app-meta-dot">·</span>
                              <span className="app-meta-tag pay-tag">{app.pay}</span>
                            </div>
                            {app.notes && (
                              <div className="app-notes-box">
                                <span className="app-notes-label">Employer Update:</span> {app.notes}
                              </div>
                            )}
                          </div>

                          <div className="app-status-side">
                            {getStatusBadge(app.status)}
                            <span className="app-date">Applied on {app.appliedDate}</span>
                            <div className="app-cv-tag">
                              <FileText size={12} />
                              <span>{app.cvUsed}</span>
                            </div>
                            <div className="app-row-actions">
                              <Link to={`/opportunities/${app.jobId}`} className="app-view-link">
                                View Vacancy <ExternalLink size={13} />
                              </Link>
                              <button
                                type="button"
                                onClick={() => {
                                  if (confirm(`Withdraw application for ${app.jobTitle} at ${app.companyName}?`)) {
                                    withdrawApplication(app.id);
                                    triggerToast(`Application for ${app.jobTitle} withdrawn.`);
                                  }
                                }}
                                className="app-withdraw-btn"
                              >
                                Withdraw
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ================= TAB 2: SAVED CV & DOCUMENTS ================= */}
          {activeTab === 'cv' && (
            <div className="tab-pane">
              <div className="pane-header-row">
                <div>
                  <h2 className="pane-title">Saved CV & Verification Documents</h2>
                  <p className="pane-desc">
                    Your stored resume is automatically submitted when you apply for healthcare & care home positions.
                  </p>
                </div>
              </div>

              <div className="cv-dashboard-grid">
                {/* Active CV Card */}
                <div className="cv-detail-card">
                  <div className="cv-card-top">
                    <div className="cv-card-icon-wrap">
                      <FileText size={32} color="#a88538" />
                    </div>
                    <div className="cv-card-main-meta">
                      <span className="cv-active-label">Primary Active CV</span>
                      <h3 className="cv-card-filename">{user.savedCV?.fileName || 'No CV currently attached'}</h3>
                      <div className="cv-card-meta-list">
                        <span>File Size: {user.savedCV?.fileSize || 'N/A'}</span>
                        <span>·</span>
                        <span>Last Uploaded: {user.savedCV?.uploadedDate || 'N/A'}</span>
                        <span>·</span>
                        <span className="cv-format-badge">PDF / Verified</span>
                      </div>
                    </div>
                  </div>

                  <div className="cv-card-actions-row">
                    <button
                      type="button"
                      onClick={handleMockDownloadCV}
                      className="btn-pill-green cv-download-btn"
                    >
                      <Download size={16} /> Download / Preview Saved CV
                    </button>

                    <label className="btn-pill-outline cv-replace-btn">
                      <UploadCloud size={16} /> Replace with New Version
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleCvUpload}
                        style={{ display: 'none' }}
                      />
                    </label>
                  </div>
                </div>

                {/* Compliance & Right-to-Work Verification Box */}
                <div className="compliance-card">
                  <div className="compliance-header">
                    <ShieldCheck size={22} className="comp-icon" />
                    <h3 className="comp-title">Compliance & Registration Status</h3>
                  </div>

                  <div className="compliance-checklist">
                    <div className="comp-item">
                      <CheckCircle2 size={18} className="comp-check" />
                      <div>
                        <strong>Enhanced DBS Clearance</strong>
                        <p>{user.dbsStatus}</p>
                      </div>
                    </div>

                    <div className="comp-item">
                      <CheckCircle2 size={18} className="comp-check" />
                      <div>
                        <strong>Right to Work in UK</strong>
                        <p>Verified documentation on file under Home Office guidelines</p>
                      </div>
                    </div>

                    <div className="comp-item">
                      <CheckCircle2 size={18} className="comp-check" />
                      <div>
                        <strong>Care & Clinical References</strong>
                        <p>2 professional employer references verified by LICHT Placement Team</p>
                      </div>
                    </div>

                    <div className="comp-item">
                      <CheckCircle2 size={18} className="comp-check" />
                      <div>
                        <strong>Mandatory Care Training</strong>
                        <p>Moving & Handling, Safeguarding Adults & Infection Control current</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================= TAB 3: PREVIOUS EXPERIENCE & SKILLS ================= */}
          {activeTab === 'experience' && (
            <div className="tab-pane">
              <div className="pane-header-row">
                <div>
                  <h2 className="pane-title">Previous Experience & Professional Background</h2>
                  <p className="pane-desc">
                    Your employment chronology and verified clinical competencies provided during sign-up.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowAddExpModal(true)}
                  className="btn-pill-green pane-cta"
                >
                  <Plus size={16} /> Add Past Experience
                </button>
              </div>

              {/* Bio Statement */}
              <div className="profile-bio-box">
                <h4 className="bio-box-heading">Candidate Summary & Professional Statement</h4>
                <p className="bio-box-text">{user.bio}</p>
              </div>

              {/* Experience Timeline */}
              <div className="profile-timeline-wrap">
                <h3 className="timeline-section-title">Employment History ({user.previousExperience.length} roles)</h3>
                
                {user.previousExperience.length === 0 ? (
                  <div className="no-items-card">
                    <Briefcase size={36} className="no-items-icon" />
                    <p>No previous roles recorded. Click below to add your first work history entry.</p>
                    <button
                      type="button"
                      onClick={() => setShowAddExpModal(true)}
                      className="btn-pill-outline"
                      style={{ marginTop: '12px' }}
                    >
                      <Plus size={16} /> Add Role
                    </button>
                  </div>
                ) : (
                  <div className="timeline-stack">
                    {user.previousExperience.map((exp, idx) => (
                      <div key={exp.id} className="timeline-entry">
                        <div className="timeline-line-marker">
                          <span className="timeline-dot" />
                          {idx < user.previousExperience.length - 1 && <span className="timeline-v-line" />}
                        </div>

                        <div className="timeline-content-card">
                          <div className="timeline-header-row">
                            <div>
                              <h4 className="timeline-role-title">{exp.jobTitle}</h4>
                              <div className="timeline-company-row">
                                <Building2 size={14} className="timeline-icon" />
                                <strong className="timeline-company">{exp.company}</strong>
                                <span className="timeline-meta-dot">·</span>
                                <span className="timeline-loc">{exp.location}</span>
                              </div>
                            </div>

                            <div className="timeline-date-side">
                              <span className="timeline-period">
                                {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                              </span>
                              {exp.current && <span className="timeline-current-pill">Current Role</span>}
                              <button
                                type="button"
                                onClick={() => {
                                  deleteExperience(exp.id);
                                  triggerToast('Experience entry removed.');
                                }}
                                className="timeline-del-btn"
                                title="Delete this role"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </div>

                          <p className="timeline-resp-text">{exp.responsibilities}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Educational Background & Qualifications Section */}
              <div className="profile-education-wrap">
                <div className="pane-header-row" style={{ marginBottom: '16px' }}>
                  <h3 className="timeline-section-title" style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
                    <GraduationCap size={18} className="text-gold" /> Educational Background & Qualifications ({user.education ? user.education.length : 0})
                  </h3>
                  <button
                    type="button"
                    onClick={() => setShowAddEduModal(true)}
                    className="btn-pill-outline"
                    style={{ fontSize: '0.8125rem', padding: '6px 14px' }}
                  >
                    <Plus size={14} /> Add Qualification
                  </button>
                </div>

                {(!user.education || user.education.length === 0) ? (
                  <div className="no-items-card" style={{ padding: '24px' }}>
                    <GraduationCap size={32} className="no-items-icon" />
                    <p>No formal qualifications recorded. Add your degree, healthcare diploma, or care certificate.</p>
                    <button
                      type="button"
                      onClick={() => setShowAddEduModal(true)}
                      className="btn-pill-outline"
                      style={{ marginTop: '12px' }}
                    >
                      <Plus size={14} /> Add Qualification
                    </button>
                  </div>
                ) : (
                  <div className="education-profile-grid">
                    {user.education.map(edu => (
                      <div key={edu.id} className="education-profile-card">
                        <div className="edu-prof-top">
                          <div className="edu-prof-icon">
                            <GraduationCap size={18} />
                          </div>
                          <div className="edu-prof-main">
                            <h4 className="edu-prof-qual">{edu.qualification}</h4>
                            {edu.fieldOfStudy && (
                              <p className="edu-prof-field">{edu.fieldOfStudy}</p>
                            )}
                            <div className="edu-prof-meta">
                              {edu.institution && <span>{edu.institution}</span>}
                              {edu.institution && edu.graduationYear && <span>·</span>}
                              {edu.graduationYear && <span className="edu-prof-year">Completed {edu.graduationYear}</span>}
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              deleteEducation(edu.id);
                              triggerToast('Qualification entry removed.');
                            }}
                            className="timeline-del-btn"
                            title="Delete qualification"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Skills & Certifications Grid */}
              <div className="profile-skills-grid">
                <div className="skills-column-card">
                  <h4 className="skills-column-title">Core Competencies & Clinical Skills</h4>
                  <div className="skills-badges-wrap">
                    {user.skills.map((skill, index) => (
                      <span key={index} className="skill-badge-item">
                        <CheckCircle2 size={13} className="skill-check-icon" />
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="skills-column-card">
                  <h4 className="skills-column-title">Accreditations & Certifications</h4>
                  <div className="skills-badges-wrap">
                    {user.certifications.map((cert, index) => (
                      <span key={index} className="cert-badge-item">
                        <ShieldCheck size={13} className="cert-check-icon" />
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================= TAB 4: SAVED ROLES ================= */}
          {activeTab === 'saved' && (
            <div className="tab-pane">
              <div className="pane-header-row">
                <div>
                  <h2 className="pane-title">Saved Opportunities ({savedVacanciesList.length})</h2>
                  <p className="pane-desc">
                    Vacancies you have bookmarked for later consideration.
                  </p>
                </div>
              </div>

              {savedVacanciesList.length === 0 ? (
                <div className="no-items-card">
                  <Bookmark size={40} className="no-items-icon" />
                  <h3>No saved roles</h3>
                  <p>Bookmark vacancies while browsing to view them here later.</p>
                  <Link to="/opportunities" className="btn-pill-green" style={{ marginTop: '16px' }}>
                    Browse Available Opportunities ↗
                  </Link>
                </div>
              ) : (
                <div className="saved-roles-grid">
                  {savedVacanciesList.map((job) => (
                    <div key={job.id} className="saved-job-card">
                      <span className="saved-job-sector">{job.sector}</span>
                      <h3 className="saved-job-title">
                        <Link to={`/opportunities/${job.id}`}>{job.title}</Link>
                      </h3>
                      <div className="saved-job-meta">
                        <span><MapPin size={13} /> {job.location}</span>
                        <span><Briefcase size={13} /> {job.contract}</span>
                        <span><Clock size={13} /> {job.workingPattern}</span>
                      </div>
                      <p className="saved-job-summary">{job.summary}</p>
                      <div className="saved-job-action-row">
                        <Link to={`/opportunities/${job.id}`} className="btn-pill-green saved-apply-btn">
                          View & Apply ↗
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Modal: Add Past Experience */}
      {showAddExpModal && (
        <div className="modal-backdrop" role="dialog" aria-modal="true">
          <div className="modal-card">
            <div className="modal-header">
              <h3 className="modal-title">Add Previous Work Experience</h3>
              <button 
                type="button" 
                onClick={() => setShowAddExpModal(false)}
                className="modal-close-btn"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveNewExperience} className="modal-form">
              <div className="form-field">
                <label className="field-label">Job Title *</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Care Assistant or Healthcare Support Worker"
                  className="auth-input"
                  style={{ paddingLeft: '14px' }}
                  required
                />
              </div>

              <div className="form-field">
                <label className="field-label">Employer / Care Organisation *</label>
                <input
                  type="text"
                  value={newCompany}
                  onChange={(e) => setNewCompany(e.target.value)}
                  placeholder="e.g. Sunrise Care Home, Bupa Healthcare"
                  className="auth-input"
                  style={{ paddingLeft: '14px' }}
                  required
                />
              </div>

              <div className="form-grid-2">
                <div className="form-field">
                  <label className="field-label">Location</label>
                  <input
                    type="text"
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    placeholder="e.g. London, UK"
                    className="auth-input"
                    style={{ paddingLeft: '14px' }}
                  />
                </div>

                <div className="form-field">
                  <label className="field-label">Start Date</label>
                  <input
                    type="text"
                    value={newStartDate}
                    onChange={(e) => setNewStartDate(e.target.value)}
                    placeholder="e.g. Sept 2021"
                    className="auth-input"
                    style={{ paddingLeft: '14px' }}
                  />
                </div>
              </div>

              <div className="form-field">
                <label className="field-label">End Date</label>
                <input
                  type="text"
                  value={newCurrent ? 'Present' : newEndDate}
                  disabled={newCurrent}
                  onChange={(e) => setNewEndDate(e.target.value)}
                  placeholder="e.g. Feb 2024"
                  className="auth-input"
                  style={{ paddingLeft: '14px' }}
                />
                <label className="exp-current-checkbox" style={{ marginTop: '8px' }}>
                  <input
                    type="checkbox"
                    checked={newCurrent}
                    onChange={(e) => setNewCurrent(e.target.checked)}
                  />
                  <span>I currently work here</span>
                </label>
              </div>

              <div className="form-field">
                <label className="field-label">Key Duties & Clinical Responsibilities</label>
                <textarea
                  value={newResp}
                  onChange={(e) => setNewResp(e.target.value)}
                  placeholder="Briefly state your day-to-day responsibilities and patient care..."
                  rows={3}
                  className="auth-textarea"
                />
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  onClick={() => setShowAddExpModal(false)}
                  className="btn-pill-outline"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-pill-green">
                  Save to Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: ADD EDUCATION QUALIFICATION ================= */}
      {showAddEduModal && (
        <div className="profile-modal-overlay" onClick={() => setShowAddEduModal(false)}>
          <div className="profile-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-head">
              <div>
                <span className="figma-eyebrow" style={{ fontSize: '0.72rem' }}>Candidate Credentials</span>
                <h3 className="modal-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <GraduationCap size={20} className="text-gold" /> Add Educational Qualification
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowAddEduModal(false)}
                className="modal-close-btn"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveNewEducation} className="modal-form">
              <div className="form-field">
                <label className="field-label">Degree / Qualification *</label>
                <select
                  value={newEduQual}
                  onChange={(e) => setNewEduQual(e.target.value)}
                  className="auth-select"
                >
                  <option value="NVQ / Diploma (Level 2 or 3 in Health & Social Care)">NVQ / Diploma (Level 2 or 3 in Health & Social Care)</option>
                  <option value="Bachelor's Degree (BSc Nursing / Healthcare)">Bachelor's Degree (BSc Nursing / Healthcare / Science)</option>
                  <option value="Care Certificate (Skills for Care UK)">Care Certificate (Skills for Care UK)</option>
                  <option value="Secondary School (GCSE / A-Levels)">Secondary School (GCSE / A-Levels)</option>
                  <option value="Student / In Progress Healthcare Degree">Student / In-Progress Healthcare Studies</option>
                  <option value="Master's Degree (MSc / Postgraduate)">Master's Degree (MSc / Postgraduate)</option>
                  <option value="Higher National Diploma (HND)">Diploma / Higher National Diploma (HND)</option>
                  <option value="Other Healthcare Accreditation">Other Healthcare Accreditation</option>
                </select>
              </div>

              <div className="form-field">
                <label className="field-label">Field of Study / Course Subject</label>
                <input
                  type="text"
                  value={newEduField}
                  onChange={(e) => setNewEduField(e.target.value)}
                  placeholder="e.g. Health & Social Care, Adult Nursing, Biology"
                  className="auth-input"
                  style={{ paddingLeft: '14px' }}
                />
              </div>

              <div className="form-field">
                <label className="field-label">College / University / Awarding Body</label>
                <input
                  type="text"
                  value={newEduInst}
                  onChange={(e) => setNewEduInst(e.target.value)}
                  placeholder="e.g. City & Guilds London, King's College London, NHS Academy"
                  className="auth-input"
                  style={{ paddingLeft: '14px' }}
                />
              </div>

              <div className="form-field">
                <label className="field-label">Year of Completion / Expected</label>
                <input
                  type="text"
                  value={newEduYear}
                  onChange={(e) => setNewEduYear(e.target.value)}
                  placeholder="e.g. 2024 or Expected 2026"
                  className="auth-input"
                  style={{ paddingLeft: '14px' }}
                />
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  onClick={() => setShowAddEduModal(false)}
                  className="btn-pill-outline"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-pill-green">
                  Save Qualification
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
