import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2, 
  ShieldCheck, 
  CheckCircle2, 
  Users, 
  Briefcase, 
  ArrowRight,
  TrendingUp,
  FileSpreadsheet
} from 'lucide-react';
import { EmployerEnquiryForm } from '../components/recruitment/EmployerEnquiryForm';
import { Accordion } from '../components/common/Accordion';
import './SectorPages.css';

export const CorporateRecruitment: React.FC = () => {
  const corporateRoles = [
    {
      title: 'Office & Facilities Administrators',
      description: 'Dependable administrators overseeing workplace reception, supplier management, documentation, and executive diary management.'
    },
    {
      title: 'Customer Service & Client Support Teams',
      description: 'Articulate client representatives ensuring superior service delivery, resolution of inbound business queries, and customer satisfaction.'
    },
    {
      title: 'Operations & Project Coordinators',
      description: 'Detail-oriented coordinators facilitating daily business operations, tracking deliverables, logistics, and resource allocation.'
    },
    {
      title: 'HR & Recruitment Support Specialists',
      description: 'Internal HR administrators handling onboarding paperwork, compliance documentation, rota management, and staff records.'
    }
  ];

  const corporateFaqs = [
    {
      question: 'What types of businesses do you provide corporate recruitment for?',
      answer: 'We support small-to-medium enterprises (SMEs), professional practices, healthcare head offices, logistics firms, and corporate organisations requiring dependable administrative and operational talent.'
    },
    {
      question: 'Do you screen corporate candidates for software and technical proficiency?',
      answer: 'Yes. We assess candidates against required proficiencies including Microsoft Office 365, CRM systems, written business English, numeracy, and operational management systems.'
    },
    {
      question: 'Can you assist with hybrid or remote corporate roles?',
      answer: 'Yes. We recruit for on-site, hybrid, and remote workplace models across the UK, ensuring candidates have proven self-management skills and suitable home-working setups where applicable.'
    }
  ];

  return (
    <div className="sector-page corporate-sector-page">
      {/* Sector Hero */}
      <section className="sector-hero">
        <div className="container sector-hero-container">
          <div className="sector-hero-text">
            <div className="figma-hero-eyebrow">
              <span className="figma-gold-dash" />
              <span>CORPORATE RECRUITMENT</span>
            </div>
            <h1>
              The Right People for <br />
              <span className="hero-text-gold">Your Business</span>
            </h1>
            <p className="sector-hero-lead">
              Recruitment support for organisations seeking suitable candidates across business support, administration, customer service, operations, and agreed professional functions.
            </p>
            <div className="hero-cta-group">
              <a href="#enquiry-form" className="btn btn-primary">
                <Users size={16} />
                <span>Request Corporate Staffing</span>
              </a>
              <Link to="/opportunities" className="btn btn-secondary">
                <span>View Corporate Vacancies</span>
              </Link>
            </div>
          </div>

          <div className="sector-hero-media">
            <div className="sector-hero-image-frame">
              <img 
                src="/assets/corporate_sector.jpg" 
                alt="Corporate Professionals Collaborating in Contemporary London Office" 
                className="sector-hero-img"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Corporate Benefits & Approach */}
      <section className="section section-dark">
        <div className="container">
          <div className="section-header-block text-center max-w-800">
            <div className="eyebrow">TALENT MATCHING</div>
            <h2 className="section-title">A Structured Corporate Hiring Methodology</h2>
            <div className="gold-line center-gold-line" />
            <p className="section-description">
              Finding the right corporate hire involves more than reviewing a CV. We examine role competencies, culture alignment, and problem-solving capability.
            </p>
          </div>

          <div className="standards-grid">
            <div className="standard-card">
              <CheckCircle2 size={24} className="gold-icon" />
              <h4>Competency & Skill Evaluation</h4>
              <p>Practical verification of administrative capability, software proficiencies, and business communication standards.</p>
            </div>

            <div className="standard-card">
              <CheckCircle2 size={24} className="gold-icon" />
              <h4>Cultural & Team Compatibility</h4>
              <p>Ensuring candidate values, pace of work, and interpersonal style align with your workplace environment.</p>
            </div>

            <div className="standard-card">
              <CheckCircle2 size={24} className="gold-icon" />
              <h4>Right to Work & Reference History</h4>
              <p>Comprehensive pre-employment checking including UK Right to Work and verified professional employment references.</p>
            </div>

            <div className="standard-card">
              <CheckCircle2 size={24} className="gold-icon" />
              <h4>Coordinated Interview Scheduling</h4>
              <p>Seamless management of candidate communications, interviews, testing, and feedback coordination.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Roles Supported */}
      <section className="section section-soft">
        <div className="container">
          <div className="section-header-block text-center max-w-800">
            <div className="eyebrow">BUSINESS ROLES</div>
            <h2 className="section-title">Positions We Support Across Corporate Sectors</h2>
            <div className="gold-line center-gold-line" />
          </div>

          <div className="roles-detailed-grid">
            {corporateRoles.map((role, idx) => (
              <div key={idx} className="role-detailed-card">
                <div className="role-card-badge">
                  <TrendingUp size={20} className="gold-icon" />
                </div>
                <h3>{role.title}</h3>
                <p>{role.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Employer Request Form Section */}
      <section className="section section-dark" id="enquiry-form">
        <div className="container form-section-container">
          <div className="section-header-block text-center max-w-800">
            <div className="eyebrow">CORPORATE HIRING</div>
            <h2 className="section-title">Submit a Corporate Staffing Enquiry</h2>
            <div className="gold-line center-gold-line" />
            <p className="section-description">
              Describe your commercial vacancy, required experience, and timeline to begin candidate sourcing with our corporate consultants.
            </p>
          </div>

          <div className="max-w-900" style={{ margin: '0 auto' }}>
            <EmployerEnquiryForm />
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="section section-soft">
        <div className="container max-w-800">
          <div className="section-header-block text-center">
            <div className="eyebrow">CORPORATE FAQS</div>
            <h2 className="section-title">Corporate Hiring Questions</h2>
            <div className="gold-line center-gold-line" />
          </div>
          <Accordion items={corporateFaqs} />
        </div>
      </section>
    </div>
  );
};
