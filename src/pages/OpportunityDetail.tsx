import React, { useState, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import {
  MapPin,
  Briefcase,
  Clock,
  Hash,
  Info,
  Check,
  CheckCircle2,
  FileText,
  Sparkles
} from 'lucide-react';
import { Vacancy, mapJobToVacancy } from '../data/mockData';
import { useAuth } from '../context/AuthContext';
import { fetchJobById } from '../services/api';
import './OpportunityDetail.css';

export const OpportunityDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user, isAuthenticated, applyToJob, hasAppliedToJob } = useAuth();
  const location = useLocation();
  const [justApplied, setJustApplied] = useState(false);
  const [job, setJob] = useState<Vacancy | null>(null);
  const [loadState, setLoadState] = useState<'loading' | 'ready' | 'missing'>('loading');
  const [applying, setApplying] = useState(false);
  const [applyError, setApplyError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoadState('loading');
    fetchJobById(id)
      .then((data) => {
        setJob(mapJobToVacancy(data));
        setLoadState('ready');
      })
      .catch(() => setLoadState('missing'));
  }, [id]);

  if (loadState !== 'ready' || !job) {
    return (
      <div className="job-detail-page">
        <div className="container">
          <div className="job-detail-nav">
            <Link to="/opportunities" className="job-back-link">← Back to opportunities</Link>
          </div>
          <div className="job-detail-header">
            {loadState === 'loading' ? (
              <p>Loading vacancy…</p>
            ) : (
              <>
                <h1 className="job-detail-title">This vacancy is no longer available</h1>
                <p className="job-section-p">It may have been filled or withdrawn by the employer.</p>
                <Link to="/opportunities" className="btn-pill-green" style={{ marginTop: '16px' }}>
                  Browse current opportunities ↗
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  const alreadyApplied = hasAppliedToJob(job.dbId || job.id) || justApplied;

  const handleApplyClick = async () => {
    if (!isAuthenticated || applying) return;
    setApplying(true);
    setApplyError(null);
    const res = await applyToJob(job.dbId || job.id);
    setApplying(false);
    if (res.success) {
      setJustApplied(true);
    } else {
      setApplyError(res.message || 'Could not submit your application.');
    }
  };

  return (
    <div className="job-detail-page">
      <div className="container">
        {/* Back navigation */}
        <div className="job-detail-nav">
          <Link to="/opportunities" className="job-back-link">
            ← Back to opportunities <span className="arrow-up-right">↗</span>
          </Link>
        </div>

        {/* Header: Badge, Title, Meta */}
        <div className="job-detail-header">
          <span className="job-badge">{job.sector}</span>
          <h1 className="job-detail-title">{job.title}</h1>

          <div className="job-detail-meta">
            <span className="job-meta-item">
              <MapPin size={16} className="job-meta-icon" />
              {job.location}
            </span>
            <span className="job-meta-item">
              <Briefcase size={16} className="job-meta-icon" />
              {job.contract}
            </span>
            <span className="job-meta-item">
              <Clock size={16} className="job-meta-icon" />
              {job.workingPattern}
            </span>
            <span className="job-meta-item">
              <Hash size={16} className="job-meta-icon" />
              {job.id}
            </span>
          </div>
        </div>

        {/* Main 2-Column Content */}
        <div className="job-detail-grid">
          {/* Left Column: Role Details */}
          <div className="job-detail-main">
            {/* Meaning */}
            <section className="job-section">
              <h2 className="job-section-heading">About the role</h2>
              <p className="job-section-p">{job.roleMeaning || job.summary || 'Full role details will be shared by our consultants when you apply.'}</p>
            </section>

            {/* Involves */}
            {job.whatRoleInvolves.length > 0 && (
            <section className="job-section">
              <h2 className="job-section-heading">What the role involves</h2>
              <ul className="job-check-list" role="list">
                {job.whatRoleInvolves.map((item, index) => (
                  <li key={index} className="job-check-item">
                    <Check size={18} className="job-check-icon" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
            )}

            {/* Brings */}
            {job.whatYouBring.length > 0 && (
            <section className="job-section">
              <h2 className="job-section-heading">What you bring</h2>
              <ul className="job-check-list" role="list">
                {job.whatYouBring.map((item, index) => (
                  <li key={index} className="job-check-item">
                    <Check size={18} className="job-check-icon" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
            )}

            {/* Before Apply */}
            {job.beforeYouApply && (
              <section className="job-section">
                <h2 className="job-section-heading">Before you apply</h2>
                <p className="job-section-p">{job.beforeYouApply}</p>
              </section>
            )}

            {/* Adjustment Callout Box */}
            <div className="job-adjustment-card">
              <h3 className="job-adjustment-title">A fair opportunity to show your skills.</h3>
              <p className="job-adjustment-desc">
                If you need an adjustment to the application process, tell us through the contact form. Please avoid sharing sensitive personal or medical information in your initial message.
              </p>
              <Link to="/contact" className="home-inline-link">
                Ask about an adjustment <span className="arrow-up-right">↗</span>
              </Link>
            </div>
          </div>

          {/* Right Column: At a Glance Card + Photo */}
          <aside className="job-detail-sidebar">
            <div className="at-a-glance-card">
              <h3 className="at-a-glance-title">At a glance</h3>

              <div className="glance-item">
                <span className="glance-label">Sector</span>
                <span className="glance-value">{job.sector}</span>
              </div>

              <div className="glance-item">
                <span className="glance-label">Location</span>
                <span className="glance-value">{job.location}</span>
              </div>

              <div className="glance-item">
                <span className="glance-label">Contract</span>
                <span className="glance-value">{job.contract}</span>
              </div>

              <div className="glance-item">
                <span className="glance-label">Working pattern</span>
                <span className="glance-value">{job.workingPattern}</span>
              </div>

              <div className="glance-item">
                <span className="glance-label">Pay</span>
                <span className="glance-value">{job.pay}</span>
              </div>

              <div className="glance-action-wrap">
                {alreadyApplied ? (
                  <div className="glance-applied-box">
                    <div className="applied-pill">
                      <CheckCircle2 size={16} /> Application Active & Tracked
                    </div>
                    <Link to="/profile" className="btn-pill-green glance-apply-btn" style={{ marginTop: '10px' }}>
                      View in Candidate Profile ↗
                    </Link>
                    <p className="glance-subtext">Employer status updates will appear in your profile tracker.</p>
                  </div>
                ) : isAuthenticated ? (
                  <>
                    <button
                      type="button"
                      onClick={handleApplyClick}
                      className="btn-pill-green glance-apply-btn"
                      style={{ width: '100%', justifyContent: 'center' }}
                      disabled={applying}
                    >
                      {applying ? 'Submitting…' : <>Apply with Saved CV <span className="arrow-up-right">↗</span></>}
                    </button>
                    {applyError && <p className="glance-subtext" role="alert" style={{ color: '#b42318' }}>{applyError}</p>}
                    <p className="glance-subtext">
                      {user?.savedCV
                        ? <>Attaches <strong>{user.savedCV.fileName}</strong> from your candidate profile.</>
                        : <>No CV on file yet — <Link to="/profile" className="gold-link">upload one in your profile</Link> first.</>}
                    </p>
                  </>
                ) : (
                  <>
                    <Link to="/login" state={{ from: location }} className="btn-pill-green glance-apply-btn">
                      Sign in to Apply <span className="arrow-up-right">↗</span>
                    </Link>
                    <p className="glance-subtext">
                      <Link to="/signup" className="gold-link">Create a profile</Link> or <Link to="/submit-cv" className="gold-link">submit CV directly</Link>.
                    </p>
                  </>
                )}
              </div>
            </div>

            {/* Photo below At a Glance card */}
            <div className="job-sidebar-photo-wrap">
              <img
                src={job.image || "/assets/care_home_sector.jpg"}
                alt={`${job.title} at work`}
                className="job-sidebar-photo"
              />
            </div>
          </aside>
        </div>
      </div>

      {/* Mobile Sticky Quick-Apply Bar */}
      <div className="mobile-sticky-apply-bar">
        <div className="sticky-apply-info">
          <strong className="sticky-apply-title">{job.title}</strong>
          <span className="sticky-apply-pay">{job.pay}</span>
        </div>
        <div className="sticky-apply-action">
          {alreadyApplied ? (
            <span className="sticky-applied-badge">
              <CheckCircle2 size={14} /> Applied
            </span>
          ) : isAuthenticated ? (
            <button
              type="button"
              onClick={handleApplyClick}
              className="btn-pill-green sticky-apply-btn"
              disabled={applying}
            >
              Apply with CV ↗
            </button>
          ) : (
            <Link to="/login" state={{ from: location }} className="btn-pill-green sticky-apply-btn">
              Apply ↗
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
