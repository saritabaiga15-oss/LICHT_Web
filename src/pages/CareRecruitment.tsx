import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Home as HomeIcon, 
  ShieldCheck, 
  CheckCircle2, 
  Users, 
  HeartHandshake, 
  FileCheck, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { EmployerEnquiryForm } from '../components/recruitment/EmployerEnquiryForm';
import { Accordion } from '../components/common/Accordion';
import './SectorPages.css';

export const CareRecruitment: React.FC = () => {
  const careRoles = [
    {
      title: 'Care Assistants & Carers',
      description: 'Dedicated professionals providing hands-on daily living support, personal care, and emotional companionship to care home residents.'
    },
    {
      title: 'Senior Care Assistants',
      description: 'Experienced senior carers capable of shift management, administering prescribed medication under supervision, and mentoring junior team members.'
    },
    {
      title: 'Support Workers',
      description: 'Patient and encouraging support staff assisting individuals with learning difficulties, physical disabilities, or complex support needs.'
    },
    {
      title: 'Night Shift Care Workers',
      description: 'Reliable, attentive personnel ensuring resident safety, dignity, and responsive care throughout overnight shift cycles.'
    }
  ];

  const careFaqs = [
    {
      question: 'What safeguarding checks are carried out on care home candidates?',
      answer: 'All care candidates are subjected to identity verification, enhanced DBS checks (with adult barred list checks where appropriate), proof of UK Right to Work, and verified employment references covering previous care environments.'
    },
    {
      question: 'How quickly can LICHT supply care home personnel?',
      answer: 'We maintain an active registry of pre-screened care workers for ongoing rotas and planned staffing covers. For permanent vacancies, we present candidate shortlists typically within agreed consultancy timelines.'
    },
    {
      question: 'Do your candidates have statutory care training?',
      answer: 'Yes. Candidates submitted for care roles hold either the Care Certificate, relevant NVQ / RQF qualifications, or up-to-date mandatory training covering infection prevention, safeguarding, moving and handling, and basic life support.'
    }
  ];

  return (
    <div className="sector-page care-sector-page">
      {/* Sector Hero */}
      <section className="sector-hero">
        <div className="container sector-hero-container">
          <div className="sector-hero-text">
            <div className="figma-hero-eyebrow">
              <span className="figma-gold-dash" />
              <span>CARE HOME RECRUITMENT</span>
            </div>
            <h1>
              Recruitment Support for <br />
              <span className="hero-text-gold">Care Homes</span>
            </h1>
            <p className="sector-hero-lead">
              Connect your care home with candidates whose experience, availability, and compassionate suitability align with your staffing requirements.
            </p>
            <div className="hero-cta-group">
              <a href="#enquiry-form" className="btn btn-primary">
                <Users size={16} />
                <span>Request Care Staffing</span>
              </a>
              <Link to="/opportunities" className="btn btn-secondary">
                <span>View Care Vacancies</span>
              </Link>
            </div>
          </div>

          <div className="sector-hero-media">
            <div className="sector-hero-image-frame">
              <img 
                src="/assets/care_home_sector.jpg" 
                alt="Compassionate Senior Care in a UK Care Home" 
                className="sector-hero-img"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Common Employer Requirements & Compliance */}
      <section className="section section-dark">
        <div className="container">
          <div className="section-header-block text-center max-w-800">
            <div className="eyebrow">STANDARDS OF CARE</div>
            <h2 className="section-title">Strict Compliance & Vetting for Care Providers</h2>
            <div className="gold-line center-gold-line" />
            <p className="section-description">
              Residential care demands the highest duty of care. We ensure every candidate presented meets essential operational criteria.
            </p>
          </div>

          <div className="standards-grid">
            <div className="standard-card">
              <CheckCircle2 size={24} className="gold-icon" />
              <h4>Relevant Care Experience</h4>
              <p>Practical background within residential or nursing care homes, supporting resident routines and dignity.</p>
            </div>

            <div className="standard-card">
              <CheckCircle2 size={24} className="gold-icon" />
              <h4>Safeguarding & Enhanced DBS</h4>
              <p>Rigorous background verification, police checks, and barring lists to safeguard vulnerable adults.</p>
            </div>

            <div className="standard-card">
              <CheckCircle2 size={24} className="gold-icon" />
              <h4>Verified References</h4>
              <p>Satisfactory employment references covering past supervisory feedback, conduct, and reliability.</p>
            </div>

            <div className="standard-card">
              <CheckCircle2 size={24} className="gold-icon" />
              <h4>Communication & Demeanour</h4>
              <p>Warm, empathetic communication skills essential for resident comfort and collaborative team rotas.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Roles Supported */}
      <section className="section section-soft">
        <div className="container">
          <div className="section-header-block text-center max-w-800">
            <div className="eyebrow">CARE ROLES</div>
            <h2 className="section-title">Positions We Support Across Care Homes</h2>
            <div className="gold-line center-gold-line" />
          </div>

          <div className="roles-detailed-grid">
            {careRoles.map((role, idx) => (
              <div key={idx} className="role-detailed-card">
                <div className="role-card-badge">
                  <HeartHandshake size={20} className="gold-icon" />
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
            <div className="eyebrow">GET IN TOUCH</div>
            <h2 className="section-title">Submit a Care Home Recruitment Enquiry</h2>
            <div className="gold-line center-gold-line" />
            <p className="section-description">
              Tell us about your home’s staffing needs, shift coverage, or permanent vacancies. Our care recruitment specialists will respond promptly.
            </p>
          </div>

          <div className="max-w-900" style={{ margin: '0 auto' }}>
            <EmployerEnquiryForm />
          </div>
        </div>
      </section>

      {/* Sector FAQs */}
      <section className="section section-soft">
        <div className="container max-w-800">
          <div className="section-header-block text-center">
            <div className="eyebrow">CARE FAQS</div>
            <h2 className="section-title">Care Recruitment Questions</h2>
            <div className="gold-line center-gold-line" />
          </div>
          <Accordion items={careFaqs} />
        </div>
      </section>
    </div>
  );
};
