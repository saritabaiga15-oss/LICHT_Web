import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2, 
  Users, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  Headphones, 
  FileCheck,
  ArrowRight
} from 'lucide-react';
import { EmployerEnquiryForm } from '../components/recruitment/EmployerEnquiryForm';
import './Employers.css';

export const Employers: React.FC = () => {
  return (
    <div className="employers-page">
      {/* Employers Hero */}
      <section className="employers-hero">
        <div className="container">
          <div className="employers-hero-content">
            <div className="figma-hero-eyebrow">
              <span className="figma-gold-dash" />
              <span>FOR EMPLOYERS</span>
            </div>
            <h1 className="employers-hero-title">
              Let's discuss your recruitment<br />requirements.
            </h1>
            <p className="employers-hero-lead">
              Share the essentials of your vacancy so the appropriate recruitment approach can be considered.
            </p>
          </div>
        </div>
      </section>

      {/* Main Form Section */}
      <section className="section section-dark employer-form-section">
        <div className="container">
          <div className="employer-form-layout">
            <div className="form-column">
              <EmployerEnquiryForm />
            </div>

            <div className="sidebar-column">
              <div className="sidebar-card">
                <div className="sidebar-icon-box">
                  <Clock size={24} className="gold-icon" />
                </div>
                <h3>What Happens After You Submit?</h3>
                <ol className="sidebar-process-steps">
                  <li>
                    <strong>Requirement Evaluation:</strong> A senior consultant reviews your job title, location, shift criteria, and essential credentials.
                  </li>
                  <li>
                    <strong>Direct Consultation:</strong> We contact your hiring manager or care coordinator to confirm terms of business and candidate matching criteria.
                  </li>
                  <li>
                    <strong>Candidate Sourcing:</strong> We screen verified candidates against Right to Work, references, and DBS records.
                  </li>
                  <li>
                    <strong>Profiles & Coordination:</strong> You receive vetted candidate profiles ready for interview or immediate shift placement.
                  </li>
                </ol>
              </div>

              <div className="sidebar-card urgent-support-card">
                <div className="sidebar-icon-box">
                  <Headphones size={24} className="gold-icon" />
                </div>
                <h3>Urgent Staffing Needs?</h3>
                <p>
                  For immediate shift coverage or urgent healthcare rotas, you can also reach our recruitment desk directly.
                </p>
                <div className="urgent-contact-box">
                  <span className="urgent-label">Consultancy Desk</span>
                  <a href="mailto:enquiries@lichtrecruitment.co.uk" className="urgent-email">
                    enquiries@lichtrecruitment.co.uk
                  </a>
                  <span className="urgent-hours">Operating Monday to Friday: 9:00 - 17:30</span>
                </div>
              </div>

              <div className="sidebar-card compliance-sidebar-card">
                <ShieldCheck size={24} className="gold-icon" />
                <h4>Statutory UK Compliance</h4>
                <p>
                  Every candidate presented holds verified Right to Work, Enhanced DBS clearance where required, verified work history, and appropriate health and social care training certifications.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Employer Value Props */}
      <section className="section section-soft">
        <div className="container">
          <div className="section-header-block text-center max-w-800">
            <div className="eyebrow">OUR SERVICE STANDARDS</div>
            <h2 className="section-title">Designed for Care Managers & Corporate Leaders</h2>
            <div className="gold-line center-gold-line" />
          </div>

          <div className="employer-props-grid">
            <div className="prop-card">
              <CheckCircle2 size={22} className="gold-icon" />
              <h4>Tailored Shortlists</h4>
              <p>We do not inundate your inbox with unvetted CVs. Only profiles that meet agreed specifications are put forward.</p>
            </div>

            <div className="prop-card">
              <CheckCircle2 size={22} className="gold-icon" />
              <h4>Reduced Hiring Friction</h4>
              <p>We coordinate interview slots, gather candidate feedback, verify documents, and facilitate offer negotiations.</p>
            </div>

            <div className="prop-card">
              <CheckCircle2 size={22} className="gold-icon" />
              <h4>Transparent Terms</h4>
              <p>Clear fee structures, defined replacement/rebate provisions, and no hidden administration fees.</p>
            </div>

            <div className="prop-card">
              <CheckCircle2 size={22} className="gold-icon" />
              <h4>Regulatory Peace of Mind</h4>
              <p>Full pre-employment audit trails supplied for CQC inspections or internal HR compliance.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
