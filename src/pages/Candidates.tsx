import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  Briefcase, 
  FileText, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowRight,
  HelpCircle,
  Sparkles,
  Award,
  BookOpen
} from 'lucide-react';
import { Accordion } from '../components/common/Accordion';
import './Candidates.css';

export const Candidates: React.FC = () => {
  const candidateJourney = [
    {
      step: '01',
      title: 'Explore Opportunities',
      desc: 'Browse our vacancies across care homes, healthcare, and corporate sectors to find roles matching your experience.'
    },
    {
      step: '02',
      title: 'Review Requirements',
      desc: 'Carefully review essential qualifications, shift patterns, DBS requirements, and right-to-work criteria.'
    },
    {
      step: '03',
      title: 'Submit CV & Profile',
      desc: 'Upload your CV securely via our portal so our consultants can evaluate your profile against suitable openings.'
    },
    {
      step: '04',
      title: 'Pre-Screening Consultation',
      desc: 'If a vacancy matches your skills, a consultant will contact you to discuss the role and verify your documentation.'
    },
    {
      step: '05',
      title: 'Interviews & Placement',
      desc: 'We support you through employer interviews, document compliance checks, and onboarding coordination.'
    }
  ];

  const candidateFaqs = [
    {
      question: 'Is there any fee charged to candidates for recruitment services?',
      answer: 'No. In accordance with the UK Employment Agencies Act 1973 and Employment Agency Standards, recruitment agencies are strictly prohibited from charging work-seekers fees for finding work. Our service is completely free to all candidates.'
    },
    {
      question: 'Do you provide Certificate of Sponsorship (CoS) or visa sponsorship?',
      answer: 'LICHT Recruitment Services Limited is an employment agency and does not issue visas or sponsorship certificates. Candidates must have verified, valid Right to Work in the United Kingdom.'
    },
    {
      question: 'What happens after I upload my CV?',
      answer: 'Your CV is catalogued securely by our recruitment team. When vacancies matching your experience, location, and qualifications arise, our consultants will review your file and reach out directly to discuss potential opportunities.'
    },
    {
      question: 'How should I prepare my documentation for care or healthcare roles?',
      answer: 'Ensure you have up-to-date proof of address (within 3 months), valid photographic ID (passport or biometric residence permit), previous employer reference contacts, proof of qualifications (e.g. NVQ, Care Certificate), and any existing Enhanced DBS check registered with the DBS Update Service.'
    }
  ];

  return (
    <div className="candidates-page">
      {/* Hero */}
      <section className="candidates-hero">
        <div className="container text-center max-w-800">
          <div className="figma-hero-eyebrow center-eyebrow">
            <span className="figma-gold-dash" />
            <span>FOR CANDIDATES</span>
          </div>
          <h1 className="candidates-hero-title">
            Your next opportunity <br />
            <span className="hero-text-gold">starts here.</span>
          </h1>
          <p className="candidates-hero-lead">
            Explore available opportunities or share your CV so our team can consider your information for relevant roles across care homes, healthcare, and corporate environments.
          </p>
          <div className="hero-cta-group" style={{ justifyContent: 'center', marginTop: '2rem' }}>
            <Link to="/opportunities" className="btn-figma-primary">
              <span>View Opportunities</span>
              <ArrowRight size={17} />
            </Link>
            <Link to="/submit-cv" className="btn-figma-secondary">
              <span>Submit Your CV</span>
              <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>

      {/* 5-Step Candidate Journey */}
      <section className="section section-dark journey-section">
        <div className="container">
          <div className="section-header-block text-center max-w-800">
            <div className="eyebrow">STEP-BY-STEP GUIDE</div>
            <h2 className="section-title">The Candidate Journey</h2>
            <div className="gold-line center-gold-line" />
            <p className="section-description">
              A transparent, structured recruitment process designed to represent your capabilities respectfully.
            </p>
          </div>

          <div className="journey-grid">
            {candidateJourney.map((item, idx) => (
              <div key={idx} className="journey-card">
                <span className="journey-step-num">{item.step}</span>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="candidate-disclaimer-card">
            <ShieldCheck size={20} className="gold-icon" />
            <p>
              <strong>Important Notice:</strong> Submission of your CV does not guarantee employment, interviews, or placement. Hiring decisions and vacancy availability are determined solely by participating client organisations in accordance with verified candidate suitability and statutory UK requirements.
            </p>
          </div>
        </div>
      </section>

      {/* Candidate Guidance & Advice */}
      <section className="section section-soft guidance-section">
        <div className="container">
          <div className="section-header-block text-center max-w-800">
            <div className="eyebrow">PREPARATION & ADVICE</div>
            <h2 className="section-title">Essential Requirements for Work-Seekers</h2>
            <div className="gold-line center-gold-line" />
          </div>

          <div className="guidance-grid">
            <div className="guidance-card">
              <div className="guidance-icon-box">
                <FileText size={24} className="gold-icon" />
              </div>
              <h4>Clear, Up-to-Date CV</h4>
              <p>
                Include accurate dates of employment with no unexplained gaps, detailed duties in previous care or office roles, and contact details.
              </p>
            </div>

            <div className="guidance-card">
              <div className="guidance-icon-box">
                <ShieldCheck size={24} className="gold-icon" />
              </div>
              <h4>UK Right to Work</h4>
              <p>
                Provide acceptable documentation proving your eligibility to work in the UK (e.g. British passport, settled status share code, or valid BRP).
              </p>
            </div>

            <div className="guidance-card">
              <div className="guidance-icon-box">
                <Award size={24} className="gold-icon" />
              </div>
              <h4>DBS & Safeguarding</h4>
              <p>
                For care and healthcare positions, an Enhanced DBS certificate is mandatory. Registration on the DBS Update Service is highly advantageous.
              </p>
            </div>

            <div className="guidance-card">
              <div className="guidance-icon-box">
                <BookOpen size={24} className="gold-icon" />
              </div>
              <h4>Verified Qualifications</h4>
              <p>
                Have copies of training certificates ready, including Care Certificate, NVQ / RQF diplomas, first aid, moving and handling, or medication administration.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Candidate FAQs */}
      <section className="section section-dark faq-section">
        <div className="container max-w-800">
          <div className="section-header-block text-center">
            <div className="eyebrow">CANDIDATE QUESTIONS</div>
            <h2 className="section-title">Frequently Asked Candidate Questions</h2>
            <div className="gold-line center-gold-line" />
          </div>
          <Accordion items={candidateFaqs} />
        </div>
      </section>

      {/* Closing CTA */}
      <section className="section section-soft text-center">
        <div className="container max-w-800">
          <h2>Ready to Take the Next Step?</h2>
          <div className="gold-line center-gold-line" />
          <p className="lead-paragraph">
            Submit your CV today and allow LICHT Recruitment Services Limited to connect your qualifications with suitable healthcare, care home, or corporate vacancies.
          </p>
          <div className="closing-btn-group">
            <Link to="/submit-cv" className="btn btn-primary">
              <FileText size={16} />
              <span>Submit Your CV Now</span>
            </Link>
            <Link to="/opportunities" className="btn btn-secondary">
              <Briefcase size={16} />
              <span>Browse Active Vacancies</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
