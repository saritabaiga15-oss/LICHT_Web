import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  ArrowUpRight,
  HeartHandshake, 
  Stethoscope, 
  Building2, 
  ClipboardCheck, 
  Search, 
  MessageSquare, 
  Users
} from 'lucide-react';
import { Accordion } from '../components/common/Accordion';
import { FREQUENTLY_ASKED_QUESTIONS } from '../data/mockData';
import './Home.css';

export const Home: React.FC = () => {
  return (
    <div className="home-page">
      {/* 1. Hero Section (Figma Screenshot 1) */}
      <section className="figma-hero-section">
        <div className="container figma-hero-container">
          <div className="figma-hero-left">
            <div className="figma-hero-eyebrow">
              <span className="figma-gold-dash" />
              <span>RECRUITMENT SOLUTIONS</span>
            </div>

            <h1 className="figma-hero-headline">
              Reliable People.<br />
              <span className="hero-text-gold">Professional<br />Recruitment.</span>
            </h1>

            <p className="figma-hero-subheading">
              LICHT Recruitment Services Limited helps care homes, healthcare providers and corporate organisations connect with suitable people for their workforce needs.
            </p>

            <div className="figma-hero-cta-group">
              <Link to="/employers" className="btn-figma-primary">
                <span>Request Recruitment Support</span>
                <ArrowRight size={17} />
              </Link>

              <Link to="/services" className="btn-figma-secondary">
                <span>Explore Our Services</span>
                <ArrowRight size={17} />
              </Link>
            </div>
          </div>

          <div className="figma-hero-right">
            <div className="figma-hero-image-wrapper">
              <div className="figma-hero-gold-accent" />
              <img 
                src="/assets/hero_recruitment.jpg" 
                alt="LICHT Professional Recruitment Consultation" 
                className="figma-hero-image"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Our Approach Section (Figma Screenshot 2) */}
      <section className="figma-approach-section">
        <div className="container figma-approach-container">
          <div className="figma-approach-left">
            <div className="figma-teal-eyebrow">
              <span className="figma-teal-dash" />
              <span>OUR APPROACH</span>
            </div>
          </div>

          <div className="figma-approach-right">
            <h2 className="figma-approach-title">
              Recruitment built around<br />people and business needs.
            </h2>
            <p className="figma-approach-p">
              Successful recruitment requires more than filling a vacancy. It involves understanding the role, the organisation and the qualities needed for a suitable match.
            </p>
            <p className="figma-approach-p">
              We aim to support that process through clear communication, role-focused candidate identification and a professional approach to recruitment.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Sector-Focused Recruitment (Figma Screenshot 3) */}
      <section className="figma-sectors-section" id="sectors">
        <div className="container">
          <div className="figma-sectors-header">
            <h2 className="figma-sectors-title">
              Sector-focused recruitment for<br />the roles that matter.
            </h2>
            <p className="figma-sectors-subtitle">
              Explore a service built around the needs of your sector.
            </p>
          </div>

          <div className="figma-sectors-grid">
            {/* Card 01 - Care Home */}
            <div className="figma-sector-card">
              <div className="figma-sector-card-top">
                <div className="figma-sector-icon-box">
                  <HeartHandshake size={22} />
                </div>
                <span className="figma-sector-number">01</span>
              </div>
              <h3 className="figma-sector-name">Care Home Recruitment</h3>
              <p className="figma-sector-desc">
                Recruitment support for care providers seeking suitable candidates for care-related roles.
              </p>
              <Link to="/services/care-homes" className="figma-sector-link">
                <span>Explore this service</span>
                <ArrowUpRight size={17} />
              </Link>
            </div>

            {/* Card 02 - Healthcare */}
            <div className="figma-sector-card">
              <div className="figma-sector-card-top">
                <div className="figma-sector-icon-box">
                  <Stethoscope size={22} />
                </div>
                <span className="figma-sector-number">02</span>
              </div>
              <h3 className="figma-sector-name">Healthcare Recruitment</h3>
              <p className="figma-sector-desc">
                Support for healthcare organisations with appropriate clinical and non-clinical workforce requirements.
              </p>
              <Link to="/services/healthcare" className="figma-sector-link">
                <span>Explore this service</span>
                <ArrowUpRight size={17} />
              </Link>
            </div>

            {/* Card 03 - Corporate */}
            <div className="figma-sector-card">
              <div className="figma-sector-card-top">
                <div className="figma-sector-icon-box">
                  <Building2 size={22} />
                </div>
                <span className="figma-sector-number">03</span>
              </div>
              <h3 className="figma-sector-name">Corporate Recruitment</h3>
              <p className="figma-sector-desc">
                Support across administration, business support, customer service, operations and agreed functions.
              </p>
              <Link to="/services/corporate" className="figma-sector-link">
                <span>Explore this service</span>
                <ArrowUpRight size={17} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Why LICHT Section (Figma Screenshot 4) */}
      <section className="figma-why-section">
        <div className="container">
          <div className="figma-why-header">
            <div className="figma-teal-eyebrow text-center">
              <span className="figma-teal-dash" />
              <span>WHY LICHT</span>
            </div>
            <h2 className="figma-why-title">
              A professional approach to<br />recruitment.
            </h2>
            <p className="figma-why-subtitle">
              These principles guide the service we aim to provide to every employer and candidate.
            </p>
          </div>

          <div className="figma-why-grid">
            <div className="figma-why-item">
              <div className="figma-why-icon-wrap">
                <ClipboardCheck size={28} />
              </div>
              <h4>Understanding Your Requirements</h4>
              <p>
                We begin by clarifying the vacancy, essential criteria, and preferred candidate qualities.
              </p>
            </div>

            <div className="figma-why-item">
              <div className="figma-why-icon-wrap">
                <Search size={28} />
              </div>
              <h4>Role-Focused Candidate Search</h4>
              <p>
                We identify candidates whose experience and stated suitability align with the specific role.
              </p>
            </div>

            <div className="figma-why-item">
              <div className="figma-why-icon-wrap">
                <MessageSquare size={28} />
              </div>
              <h4>Clear Communication</h4>
              <p>
                We aim to maintain professional communication throughout the agreed recruitment process.
              </p>
            </div>

            <div className="figma-why-item">
              <div className="figma-why-icon-wrap">
                <Users size={28} />
              </div>
              <h4>A People-Centred Approach</h4>
              <p>
                We treat candidates and employers respectfully while keeping the requirements of the role central.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. How It Works Section (Figma Screenshot 5) */}
      <section className="figma-process-section">
        <div className="container">
          <div className="figma-process-header">
            <div className="figma-hero-eyebrow">
              <span className="figma-gold-dash" />
              <span>HOW IT WORKS</span>
            </div>
            <h2 className="figma-process-title">
              A clear path from requirement to<br />next steps.
            </h2>
            <p className="figma-process-subtitle">
              A considered four-stage approach, adapted to the role and organisation.
            </p>
          </div>

          <div className="figma-process-grid">
            <div className="figma-process-col">
              <span className="figma-process-num">01</span>
              <h4>Discuss Your Requirements</h4>
              <p>
                Share the role, recruitment objectives, location, timeline and candidate profile required.
              </p>
            </div>

            <div className="figma-process-col">
              <span className="figma-process-num">02</span>
              <h4>Agree the Approach</h4>
              <p>
                Confirm service scope, responsibilities, terms and the search timeline.
              </p>
            </div>

            <div className="figma-process-col">
              <span className="figma-process-num">03</span>
              <h4>Identify Candidates</h4>
              <p>
                Search for relevant candidates and assess suitability against agreed criteria.
              </p>
            </div>

            <div className="figma-process-col">
              <span className="figma-process-num">04</span>
              <h4>Coordinate Next Steps</h4>
              <p>
                Support communication, interviews and other agreed recruitment activities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. For Candidates Section (Figma Screenshot) */}
      <section className="figma-candidates-section">
        <div className="container figma-candidates-grid">
          <div className="figma-candidates-image-col">
            <img 
              src="/assets/healthcare_sector.jpg" 
              alt="Healthcare professionals supported by LICHT Recruitment" 
              className="figma-candidates-image"
            />
          </div>

          <div className="figma-candidates-text-col">
            <div className="figma-teal-eyebrow">
              <span className="figma-teal-dash" />
              <span>FOR CANDIDATES</span>
            </div>

            <h2 className="figma-candidates-title">
              Your next opportunity<br />starts here.
            </h2>

            <p className="figma-candidates-desc">
              Explore available opportunities or share your CV so our team can consider your information for relevant roles, subject to suitable vacancies and applicable requirements.
            </p>

            <div className="figma-candidates-actions">
              <Link to="/opportunities" className="btn-figma-primary">
                <span>View Opportunities</span>
                <ArrowRight size={17} />
              </Link>

              <Link to="/submit-cv" className="btn-figma-white">
                <span>Submit Your CV</span>
                <ArrowRight size={17} />
              </Link>
            </div>

            <p className="figma-candidates-footnote">
              Submitting your CV does not guarantee an interview or placement. See our{' '}
              <Link to="/privacy-policy" className="figma-text-link">privacy policy</Link>.
            </p>
          </div>
        </div>
      </section>

      {/* 7. Looking for the Right People Banner (Figma Screenshot) */}
      <section className="figma-callout-banner">
        <div className="container figma-callout-container">
          <div className="figma-callout-left">
            <h2 className="figma-callout-title">Looking for the right people?</h2>
            <p className="figma-callout-desc">
              Tell us about your recruitment needs and discuss how LICHT may be able to support your organisation.
            </p>
          </div>
          <div className="figma-callout-right">
            <Link to="/employers" className="btn-figma-primary figma-callout-btn">
              <span>Discuss Your Recruitment Needs</span>
              <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>

      {/* 8. FAQs Section (Figma Screenshot) */}
      <section className="figma-faq-section">
        <div className="container figma-faq-grid">
          <div className="figma-faq-left">
            <div className="figma-teal-eyebrow">
              <span className="figma-teal-dash" />
              <span>FAQS</span>
            </div>
            <h2 className="figma-faq-title">
              Questions,<br />answered clearly.
            </h2>
            <p className="figma-faq-subtitle">
              Straightforward information for employers and candidates.
            </p>
          </div>

          <div className="figma-faq-right">
            <Accordion items={FREQUENTLY_ASKED_QUESTIONS} />
          </div>
        </div>
      </section>

      {/* 9. Let's Start a Conversation Section (Figma Screenshot) */}
      <section className="figma-get-started-section">
        <div className="container text-center max-w-800">
          <div className="figma-teal-eyebrow center-eyebrow">
            <span className="figma-teal-dash" />
            <span>GET STARTED</span>
          </div>

          <h2 className="figma-get-started-title">
            Let's start a conversation.
          </h2>

          <p className="figma-get-started-desc">
            Whether you are planning your next hire or exploring opportunities, take the next step with LICHT.
          </p>

          <div className="figma-get-started-actions">
            <Link to="/contact" className="btn-figma-primary">
              <span>Contact Our Team</span>
              <ArrowRight size={17} />
            </Link>

            <Link to="/opportunities" className="btn-figma-white">
              <span>Explore Opportunities</span>
              <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
