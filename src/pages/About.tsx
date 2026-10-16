import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  Target, 
  Eye, 
  HeartHandshake, 
  CheckCircle2, 
  Users, 
  Briefcase, 
  Building2,
  Lock,
  ArrowRight
} from 'lucide-react';
import './About.css';

export const About: React.FC = () => {
  const coreValues = [
    {
      title: 'Professionalism',
      description: 'We uphold the highest ethical standards, clear operational procedures, and disciplined recruitment practices in every interaction.'
    },
    {
      title: 'Reliability',
      description: 'We follow through on commitments, provide dependable workforce support, and deliver transparent communication to clients and candidates.'
    },
    {
      title: 'Respect',
      description: 'We value the time, aspirations, and individual dignity of every candidate and workplace partner we work alongside.'
    },
    {
      title: 'Clear Communication',
      description: 'We prioritise open, honest, and regular updates throughout the recruitment journey, leaving no party in ambiguity.'
    },
    {
      title: 'Responsibility & Compliance',
      description: 'We ensure recruitment workflows align with statutory employment standards, right-to-work verification, and safeguarding expectations.'
    },
    {
      title: 'Candidate Dignity',
      description: 'We recognize that healthcare and corporate careers represent livelihood and purpose, ensuring respectful evaluation and feedback.'
    },
    {
      title: 'Client Understanding',
      description: 'We take the time to appreciate the operational pressures, rota requirements, and culture of each care provider and organisation.'
    }
  ];

  return (
    <div className="about-page">
      {/* Page Hero */}
      <section className="about-hero">
        <div className="container text-center max-w-800">
          <div className="figma-hero-eyebrow center-eyebrow">
            <span className="figma-gold-dash" />
            <span>ABOUT LICHT</span>
          </div>
          <h1 className="about-hero-title">
            Recruitment with a Professional, <br />
            <span className="hero-text-gold">People-Focused Approach</span>
          </h1>
          <p className="about-hero-lead">
            LICHT Recruitment Services Limited supports recruitment needs across care homes, healthcare, and corporate environments throughout the United Kingdom.
          </p>
        </div>
      </section>

      {/* Company Introduction */}
      <section className="section section-dark intro-section">
        <div className="container intro-grid">
          <div className="intro-text-col">
            <div className="eyebrow">WHO WE ARE</div>
            <h2>Connecting Great People with Great Organisations</h2>
            <div className="gold-line" />
            <p>
              LICHT RECRUITMENT SERVICES LIMITED was established to bridge the critical gap between organisations requiring dedicated, verified staffing solutions and qualified candidates seeking meaningful employment.
            </p>
            <p>
              We believe that recruitment in essential sectors like care homes and healthcare requires extraordinary care, attentiveness, and responsibility. Our consultants work closely with care managers, healthcare operational leads, and corporate hiring teams to thoroughly understand specific vacancy requirements before recommending candidate profiles.
            </p>
            <p>
              By combining diligent pre-screening, honest communication, and respectful candidate relationship management, we strive to make recruitment a dependable, low-friction experience for everyone involved.
            </p>
          </div>

          <div className="intro-image-col">
            <div className="intro-image-wrapper">
              <img 
                src="/assets/hero_recruitment.jpg" 
                alt="LICHT Corporate Recruitment Consultation" 
                className="intro-image"
              />
              <div className="intro-floating-stat">
                <ShieldCheck size={28} className="gold-icon" />
                <div>
                  <span className="stat-title">UK Employment Compliant</span>
                  <span className="stat-desc">DBS & Right to Work Verified Sourcing</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section section-soft mission-vision-section">
        <div className="container mission-vision-grid">
          <div className="mv-card">
            <div className="mv-icon-box">
              <Target size={28} className="gold-icon" />
            </div>
            <span className="mv-label">OUR MISSION</span>
            <h3>Purposeful Recruitment Alignment</h3>
            <div className="gold-line" />
            <p>
              To support organisations and candidates through a professional, transparent recruitment process focused on role requirements, clear communication, and suitable connections that endure.
            </p>
          </div>

          <div className="mv-card">
            <div className="mv-icon-box">
              <Eye size={28} className="gold-icon" />
            </div>
            <span className="mv-label">OUR VISION</span>
            <h3>Trusted Long-Term Partnerships</h3>
            <div className="gold-line" />
            <p>
              To build trusted recruitment relationships across care homes, healthcare, and corporate business by maintaining a consistent focus on professionalism, reliability, and human potential.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section section-dark values-section">
        <div className="container">
          <div className="section-header-block text-center max-w-800">
            <div className="eyebrow">OUR CORE PRINCIPLES</div>
            <h2 className="section-title">The Values That Guide Our Work</h2>
            <div className="gold-line center-gold-line" />
            <p className="section-description">
              These fundamental values underpin every conversation, pre-screening assessment, and placement we facilitate.
            </p>
          </div>

          <div className="values-grid">
            {coreValues.map((val, idx) => (
              <div key={idx} className="value-card">
                <div className="value-check-icon">
                  <CheckCircle2 size={20} className="gold-icon" />
                </div>
                <div>
                  <h4 className="value-title">{val.title}</h4>
                  <p className="value-desc">{val.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pre-Screening & Quality Statement */}
      <section className="section section-soft vetting-section">
        <div className="container vetting-container">
          <div className="vetting-text">
            <div className="eyebrow">STANDARDS & COMPLIANCE</div>
            <h2>Our Diligent Approach to Pre-Screening</h2>
            <div className="gold-line" />
            <p>
              Recruitment standards directly impact workplace safety and quality of service, particularly within residential care homes and healthcare institutions. We implement consistent pre-screening procedures:
            </p>
            <ul className="vetting-list">
              <li>
                <CheckCircle2 size={16} className="gold-icon" />
                <span><strong>Identity Authentication:</strong> Thorough validation of legal identification documents and address history.</span>
              </li>
              <li>
                <CheckCircle2 size={16} className="gold-icon" />
                <span><strong>Right to Work Verification:</strong> Documented check of eligibility to work in the UK in compliance with Home Office guidelines.</span>
              </li>
              <li>
                <CheckCircle2 size={16} className="gold-icon" />
                <span><strong>Reference Verification:</strong> Obtaining satisfactory employment and character references covering relevant service history.</span>
              </li>
              <li>
                <CheckCircle2 size={16} className="gold-icon" />
                <span><strong>Qualifications & Safeguarding:</strong> Checking role-relevant certifications (e.g. NVQ, Care Certificate, Mandatory Training) and facilitating Enhanced DBS clearances.</span>
              </li>
            </ul>
          </div>

          <div className="vetting-box-card">
            <Lock size={32} className="gold-icon mb-3" />
            <h3>Commitment to Transparency</h3>
            <p>
              We operate with complete clarity regarding what checks have been conducted and provide full documentation packages to client hiring managers prior to candidate commencement.
            </p>
            <Link to="/employers" className="btn btn-primary" style={{ marginTop: '1.25rem', width: '100%' }}>
              <span>Request Recruitment Support</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="section section-dark text-center">
        <div className="container max-w-800">
          <h2>Ready to Discuss Your Staffing or Career Needs?</h2>
          <div className="gold-line center-gold-line" />
          <p className="lead-paragraph">
            Whether you manage a care home needing dependable shift workers, or you are a professional seeking your next opportunity, our team is ready to assist.
          </p>
          <div className="closing-btn-group">
            <Link to="/employers" className="btn btn-primary">
              <Users size={16} />
              <span>For Employers</span>
            </Link>
            <Link to="/submit-cv" className="btn btn-secondary">
              <Briefcase size={16} />
              <span>For Job Seekers</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
