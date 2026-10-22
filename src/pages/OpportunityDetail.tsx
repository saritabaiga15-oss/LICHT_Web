import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
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
import { SAMPLE_VACANCIES, Vacancy } from '../data/mockData';
import { useAuth } from '../context/AuthContext';
import './OpportunityDetail.css';

export const OpportunityDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user, isAuthenticated, applyToJob, hasAppliedToJob } = useAuth();
  const [justApplied, setJustApplied] = useState(false);

  // If no ID or ID not found, default to first vacancy (CA-101) so Screenshot 5 always shows
  const job: Vacancy = 
    SAMPLE_VACANCIES.find((v) => v.id.toLowerCase() === id?.toLowerCase()) || 
    SAMPLE_VACANCIES[0];

  const alreadyApplied = hasAppliedToJob(job.id) || justApplied;

  const handleApplyClick = () => {
    if (!isAuthenticated) return;
    const success = applyToJob({
      id: job.id,
      title: job.title,
      sector: job.sector,
      location: job.location,
      contract: job.contract,
      pay: job.pay,
      companyName: `${job.sector} Placement Partner (${job.location})`
    });
    if (success) {
      setJustApplied(true);
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

        {/* Demo Notice Banner */}
        <div className="opp-notice-banner job-detail-banner">
          <Info size={18} className="opp-notice-icon" />
          <div>
            <strong className="opp-notice-title">Example role · Not a live vacancy</strong>
            <p className="opp-notice-text">
              This page illustrates the role details and application journey.
            </p>
          </div>
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
              <h2 className="job-section-heading">A role with everyday meaning.</h2>
              <p className="job-section-p">{job.roleMeaning}</p>
            </section>

            {/* Involves */}
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

            {/* Brings */}
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

            {/* Before Apply */}
            <section className="job-section">
              <h2 className="job-section-heading">Before you apply</h2>
              <p className="job-section-p">{job.beforeYouApply}</p>
            </section>

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
                    >
                      Apply with Saved CV <span className="arrow-up-right">↗</span>
                    </button>
                    <p className="glance-subtext">
                      Attaches <strong>{user?.savedCV?.fileName || 'your saved CV'}</strong> from your candidate profile.
                    </p>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="btn-pill-green glance-apply-btn">
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
            >
              Apply with CV ↗
            </button>
          ) : (
            <Link to="/login" className="btn-pill-green sticky-apply-btn">
              Apply ↗
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
