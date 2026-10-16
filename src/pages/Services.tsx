import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2, 
  HeartPulse, 
  Home as HomeIcon, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight,
  Clock,
  Briefcase,
  Users
} from 'lucide-react';
import { ServiceCard } from '../components/recruitment/ServiceCard';
import './Services.css';

export const Services: React.FC = () => {
  return (
    <div className="services-page">
      {/* Services Hero */}
      <section className="services-hero">
        <div className="container text-center max-w-800">
          <div className="figma-hero-eyebrow center-eyebrow">
            <span className="figma-gold-dash" />
            <span>RECRUITMENT SERVICES</span>
          </div>
          <h1 className="services-hero-title">
            Recruitment Solutions for <br />
            <span className="hero-text-gold">Different Workforce Needs</span>
          </h1>
          <p className="services-hero-lead">
            Different sectors require distinct recruitment approaches. LICHT Recruitment Services Limited provides tailored recruitment support across care homes, healthcare, and corporate environments.
          </p>
        </div>
      </section>

      {/* 3 Core Sectors In-depth */}
      <section className="section section-dark">
        <div className="container">
          <div className="sectors-grid">
            <ServiceCard 
              title="Care Home Recruitment"
              tagline="RESIDENTIAL & NURSING CARE"
              description="Sourcing vetted, compassionate care assistants, senior carers, and support staff for elderly and residential care providers."
              imageSrc="/assets/care_home_sector.jpg"
              icon={<HomeIcon size={24} />}
              roles={[
                'Care Assistants & Carers',
                'Senior Care Assistants',
                'Night Shift Care Workers',
                'Dementia Care Specialists'
              ]}
              linkTo="/services/care-homes"
              ctaText="Care Recruitment Details"
            />

            <ServiceCard 
              title="Healthcare Recruitment"
              tagline="HEALTHCARE FACILITIES"
              description="Clinical and non-clinical workforce solutions for healthcare providers requiring qualified, verified personnel."
              imageSrc="/assets/healthcare_sector.jpg"
              icon={<HeartPulse size={24} />}
              roles={[
                'Healthcare Support Workers',
                'Clinic & Ward Support Staff',
                'Nursing Professionals (Where Qualified)',
                'Medical Administrative Staff'
              ]}
              linkTo="/services/healthcare"
              ctaText="Healthcare Details"
            />

            <ServiceCard 
              title="Corporate Recruitment"
              tagline="BUSINESS OPERATIONS & SUPPORT"
              description="Connecting commercial organisations with skilled professionals across administration, operations, customer relations, and business support."
              imageSrc="/assets/corporate_sector.jpg"
              icon={<Building2 size={24} />}
              roles={[
                'Office & Facilities Managers',
                'Customer Experience Teams',
                'Operations Coordinators',
                'Executive Support Staff'
              ]}
              linkTo="/services/corporate"
              ctaText="Corporate Details"
            />
          </div>
        </div>
      </section>

      {/* Recruitment Engagement Models */}
      <section className="section section-soft models-section">
        <div className="container">
          <div className="section-header-block text-center max-w-800">
            <div className="eyebrow">FLEXIBLE ENGAGEMENT</div>
            <h2 className="section-title">Flexible Recruitment Models</h2>
            <div className="gold-line center-gold-line" />
            <p className="section-description">
              We structure our recruitment delivery models to match the operational cadence and headcount planning of your organisation.
            </p>
          </div>

          <div className="models-grid">
            <div className="model-card">
              <div className="model-icon">
                <Briefcase size={26} className="gold-icon" />
              </div>
              <h3>Permanent Placements</h3>
              <p>
                End-to-end recruitment for core headcount roles. We handle vacancy profiling, candidate sourcing, initial screening, interview coordination, and offer management.
              </p>
              <ul className="model-bullets">
                <li><CheckCircle2 size={14} className="gold-icon" /> Long-term stability & retention</li>
                <li><CheckCircle2 size={14} className="gold-icon" /> In-depth cultural alignment</li>
                <li><CheckCircle2 size={14} className="gold-icon" /> Agreed rebate / replacement terms</li>
              </ul>
            </div>

            <div className="model-card">
              <div className="model-icon">
                <Clock size={26} className="gold-icon" />
              </div>
              <h3>Temporary & Shift Cover</h3>
              <p>
                Responsive workforce supply for planned leaves, seasonal surges, or urgent shift requirements in residential care and healthcare environments.
              </p>
              <ul className="model-bullets">
                <li><CheckCircle2 size={14} className="gold-icon" /> Rapid deployment capability</li>
                <li><CheckCircle2 size={14} className="gold-icon" /> Fully pre-screened & DBS cleared</li>
                <li><CheckCircle2 size={14} className="gold-icon" /> Flexible rotas and coverage</li>
              </ul>
            </div>

            <div className="model-card">
              <div className="model-icon">
                <Users size={26} className="gold-icon" />
              </div>
              <h3>Fixed-Term Contracts</h3>
              <p>
                Interim recruitment for maternity covers, project launches, facility expansions, or transitional workforce restructuring.
              </p>
              <ul className="model-bullets">
                <li><CheckCircle2 size={14} className="gold-icon" /> Defined contract milestones</li>
                <li><CheckCircle2 size={14} className="gold-icon" /> Immediate operational impact</li>
                <li><CheckCircle2 size={14} className="gold-icon" /> Option to transition to permanent</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Employer Banner */}
      <section className="section section-dark text-center">
        <div className="container max-w-800">
          <h2>Looking to Discuss a Specific Vacancy?</h2>
          <div className="gold-line center-gold-line" />
          <p className="lead-paragraph">
            Submit your role requirements or contact a recruitment consultant directly to discuss terms of business, candidate availability, and scheduling.
          </p>
          <div className="closing-btn-group">
            <Link to="/employers" className="btn btn-primary">
              <span>Submit Employer Enquiry</span>
              <ArrowRight size={16} />
            </Link>
            <Link to="/contact" className="btn btn-secondary">
              <span>Contact Recruitment Team</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
