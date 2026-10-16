import React from 'react';
import { Link } from 'react-router-dom';
import { 
  HeartPulse, 
  ShieldCheck, 
  CheckCircle2, 
  Users, 
  FileCheck, 
  ArrowRight,
  Stethoscope,
  Activity
} from 'lucide-react';
import { EmployerEnquiryForm } from '../components/recruitment/EmployerEnquiryForm';
import { Accordion } from '../components/common/Accordion';
import './SectorPages.css';

export const HealthcareRecruitment: React.FC = () => {
  const healthcareRoles = [
    {
      title: 'Healthcare Support Workers',
      description: 'Support staff providing patient care assistance, mobility aid, hygiene management, and monitoring within clinical and rehabilitation settings.'
    },
    {
      title: 'Clinical Support Assistants',
      description: 'Assistants trained in supporting nurses, sanitisation standards, patient observation logging, and outpatient procedure facilitation.'
    },
    {
      title: 'Nursing Staff (Where Appropriately Qualified)',
      description: 'Registered and qualified nurses placed in accordance with verified professional registration (NMC), right-to-work, and clinical competencies.'
    },
    {
      title: 'Healthcare Ward & Clinic Administrators',
      description: 'Medical receptionists and healthcare coordinators ensuring accurate patient records, clinic scheduling, and compliance data maintenance.'
    }
  ];

  const healthcareFaqs = [
    {
      question: 'How do you verify professional registrations for healthcare personnel?',
      answer: 'Where clinical roles require registration (such as the Nursing and Midwifery Council - NMC), we verify active PIN status, qualifications, and fitness to practise on official professional registers.'
    },
    {
      question: 'Do you provide temporary or permanent healthcare staff?',
      answer: 'We provide both permanent staffing for clinical units and agreed contract / shift placements, subject to specific client arrangements and compliance verifications.'
    },
    {
      question: 'What documentation is provided to healthcare clients before placement?',
      answer: 'Clients receive a comprehensive candidate compliance passport including identity verification, Right to Work status, Enhanced DBS certification, occupational health declarations, and certified qualification records.'
    }
  ];

  return (
    <div className="sector-page healthcare-sector-page">
      {/* Sector Hero */}
      <section className="sector-hero">
        <div className="container sector-hero-container">
          <div className="sector-hero-text">
            <div className="figma-hero-eyebrow">
              <span className="figma-gold-dash" />
              <span>HEALTHCARE PROVIDERS</span>
            </div>
            <h1>
              Healthcare Recruitment with <br />
              <span className="hero-text-gold">Professional Standards</span>
            </h1>
            <p className="sector-hero-lead">
              Recruitment support for healthcare organisations seeking candidates for appropriate clinical and non-clinical workforce requirements.
            </p>
            <div className="hero-cta-group">
              <a href="#enquiry-form" className="btn btn-primary">
                <Users size={16} />
                <span>Request Healthcare Staffing</span>
              </a>
              <Link to="/opportunities" className="btn btn-secondary">
                <span>View Healthcare Roles</span>
              </Link>
            </div>
          </div>

          <div className="sector-hero-media">
            <div className="sector-hero-image-frame">
              <img 
                src="/assets/healthcare_sector.jpg" 
                alt="Professional Healthcare Team in UK Hospital Setting" 
                className="sector-hero-img"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Clinical & Non-Clinical Quality Standards */}
      <section className="section section-dark">
        <div className="container">
          <div className="section-header-block text-center max-w-800">
            <div className="eyebrow">RIGOROUS VERIFICATION</div>
            <h2 className="section-title">Verified Standards for Clinical & Support Roles</h2>
            <div className="gold-line center-gold-line" />
            <p className="section-description">
              Quality healthcare delivery depends on verified competence, ethical integrity, and compliant documentation.
            </p>
          </div>

          <div className="standards-grid">
            <div className="standard-card">
              <CheckCircle2 size={24} className="gold-icon" />
              <h4>Role-Specific Qualifications</h4>
              <p>Validation of nursing credentials, Care Certificates, NVQ degrees, and mandatory clinical training.</p>
            </div>

            <div className="standard-card">
              <CheckCircle2 size={24} className="gold-icon" />
              <h4>Professional Registration Verification</h4>
              <p>Direct checking of regulatory registrations (such as NMC registers) where the position demands statutory registration.</p>
            </div>

            <div className="standard-card">
              <CheckCircle2 size={24} className="gold-icon" />
              <h4>Statutory Pre-Employment Checks</h4>
              <p>Full UK Right to Work verification, Enhanced DBS, identity proof, and employment history tracking.</p>
            </div>

            <div className="standard-card">
              <CheckCircle2 size={24} className="gold-icon" />
              <h4>Occupational Health Suitability</h4>
              <p>Immunisation history, fitness to practise declarations, and infection prevention compliance.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Roles Supported */}
      <section className="section section-soft">
        <div className="container">
          <div className="section-header-block text-center max-w-800">
            <div className="eyebrow">HEALTHCARE ROLES</div>
            <h2 className="section-title">Positions We Support Across Healthcare</h2>
            <div className="gold-line center-gold-line" />
          </div>

          <div className="roles-detailed-grid">
            {healthcareRoles.map((role, idx) => (
              <div key={idx} className="role-detailed-card">
                <div className="role-card-badge">
                  <Activity size={20} className="gold-icon" />
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
            <div className="eyebrow">HEALTHCARE STAFFING ENQUIRY</div>
            <h2 className="section-title">Discuss Your Healthcare Staffing Needs</h2>
            <div className="gold-line center-gold-line" />
            <p className="section-description">
              Provide your healthcare organisation details and vacancy specifications below to consult with our healthcare recruitment team.
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
            <div className="eyebrow">HEALTHCARE FAQS</div>
            <h2 className="section-title">Healthcare Recruitment Questions</h2>
            <div className="gold-line center-gold-line" />
          </div>
          <Accordion items={healthcareFaqs} />
        </div>
      </section>
    </div>
  );
};
