import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Search, Users } from 'lucide-react';
import './Services.css';

export const Services: React.FC = () => {
  return (
    <div className="services-page">
      {/* 1. Header & Hero */}
      <section className="services-hero">
        <div className="container">
          <nav className="figma-breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span className="figma-breadcrumb-separator">/</span>
            <span>Services & sectors</span>
          </nav>

          <div className="figma-eyebrow">Services & sectors</div>
          <h1 className="services-hero__title">
            People who fit. Support that lasts.
          </h1>
          <p className="services-hero__subtitle">
            Recruitment shaped around your setting, your responsibilities and the people you serve.
          </p>
        </div>
      </section>

      {/* 2. Our Sector Focus */}
      <section className="services-sector-focus">
        <div className="container">
          <div className="services-focus-grid">
            {/* Left Column: Heading + Photo */}
            <div className="services-focus-left">
              <div className="figma-eyebrow">Our sector focus</div>
              <h2 className="services-section-title">
                An understanding of your world.
              </h2>
              <p className="services-focus-desc">
                We bring a considered approach to every brief, from an individual care role to an essential business appointment.
              </p>
              <div className="services-focus-photo-wrap">
                <img 
                  src="/assets/healthcare_sector.jpg" 
                  alt="Dedicated healthcare team in hospital corridor" 
                  className="services-focus-photo"
                />
              </div>
            </div>

            {/* Right Column: 4 Sectors Interactive List */}
            <div className="services-focus-right">
              <div className="sector-row-card">
                <div className="sector-row-card__num">01</div>
                <div className="sector-row-card__main">
                  <div className="sector-row-card__header">
                    <h3 className="sector-row-card__title">Care homes</h3>
                    <span className="arrow-up-right sector-row-arrow">↗</span>
                  </div>
                  <p className="sector-row-card__desc">
                    Consistent support for residential and nursing settings.
                  </p>
                  <div className="sector-row-card__tags">
                    Care assistants · Senior carers · Domestic support
                  </div>
                </div>
              </div>

              <div className="sector-row-card">
                <div className="sector-row-card__num">02</div>
                <div className="sector-row-card__main">
                  <div className="sector-row-card__header">
                    <h3 className="sector-row-card__title">Healthcare providers</h3>
                    <span className="arrow-up-right sector-row-arrow">↗</span>
                  </div>
                  <p className="sector-row-card__desc">
                    People who understand professional, patient-centred environments.
                  </p>
                  <div className="sector-row-card__tags">
                    Healthcare assistants · Registered nurses · Clinical support
                  </div>
                </div>
              </div>

              <div className="sector-row-card">
                <div className="sector-row-card__num">03</div>
                <div className="sector-row-card__main">
                  <div className="sector-row-card__header">
                    <h3 className="sector-row-card__title">Supported living</h3>
                    <span className="arrow-up-right sector-row-arrow">↗</span>
                  </div>
                  <p className="sector-row-card__desc">
                    Thoughtful matching around independence and individual needs.
                  </p>
                  <div className="sector-row-card__tags">
                    Support workers · Team leaders · Service support
                  </div>
                </div>
              </div>

              <div className="sector-row-card">
                <div className="sector-row-card__num">04</div>
                <div className="sector-row-card__main">
                  <div className="sector-row-card__header">
                    <h3 className="sector-row-card__title">Corporate organisations</h3>
                    <span className="arrow-up-right sector-row-arrow">↗</span>
                  </div>
                  <p className="sector-row-card__desc">
                    Practical recruitment for the teams behind your business.
                  </p>
                  <div className="sector-row-card__tags">
                    Administration · Reception · Operations · Business support
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. The Right Arrangement */}
      <section className="services-arrangements">
        <div className="container">
          <div className="figma-eyebrow">The right arrangement</div>
          <h2 className="services-section-title services-arrangements__heading">
            Flexible needs. Considered solutions.
          </h2>

          <div className="arrangements-grid">
            {/* Card 1: Temporary staffing */}
            <div className="arrangement-card">
              <div className="arrangement-card__icon">
                <Clock size={24} color="#204836" strokeWidth={1.8} />
              </div>
              <h3 className="arrangement-card__title">Temporary staffing</h3>
              <p className="arrangement-card__desc">
                Support for changing needs, planned absences and short-term requirements.
              </p>
              <Link to="/employers" className="btn-pill-outline arrangement-card__btn">
                Discuss cover <span className="arrow-up-right">↗</span>
              </Link>
            </div>

            {/* Card 2: Permanent recruitment */}
            <div className="arrangement-card">
              <div className="arrangement-card__icon">
                <Search size={24} color="#204836" strokeWidth={1.8} />
              </div>
              <h3 className="arrangement-card__title">Permanent recruitment</h3>
              <p className="arrangement-card__desc">
                Find people ready to become part of your organisation for the long term.
              </p>
              <Link to="/employers" className="btn-pill-outline arrangement-card__btn">
                Discuss a vacancy <span className="arrow-up-right">↗</span>
              </Link>
            </div>

            {/* Card 3: Ongoing staffing support */}
            <div className="arrangement-card">
              <div className="arrangement-card__icon">
                <Users size={24} color="#204836" strokeWidth={1.8} />
              </div>
              <h3 className="arrangement-card__title">Ongoing staffing support</h3>
              <p className="arrangement-card__desc">
                A conversational approach for recurring or evolving workforce needs.
              </p>
              <Link to="/employers" className="btn-pill-outline arrangement-card__btn">
                Plan your staffing <span className="arrow-up-right">↗</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. A Responsible Approach */}
      <section className="services-responsible">
        <div className="container">
          <div className="services-responsible-grid">
            <div className="services-responsible-left">
              <div className="figma-eyebrow">A responsible approach</div>
              <h2 className="services-section-title">
                Careful matching.<br />Clear expectations.
              </h2>
            </div>
            <div className="services-responsible-right">
              <p className="services-responsible-text">
                Role requirements and relevant checks should be clear from the start. We discuss experience, documentation and setting-specific needs as part of the recruitment conversation.
              </p>
              <Link to="/contact" className="home-inline-link">
                Ask us about the recruitment process for your service.
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Bottom Call to Action */}
      <section className="figma-cta-section">
        <div className="container">
          <h2 className="figma-cta-headline">Tell us who you're looking for.</h2>
          <p className="figma-cta-subhead">
            Share your role, your setting and the support you need.
          </p>
          <div className="figma-cta-btn-row">
            <Link to="/employers" className="btn-pill-green">
              Request staff <span className="arrow-up-right">↗</span>
            </Link>
            <Link to="/opportunities" className="btn-pill-outline">
              Explore opportunities <span className="arrow-up-right">↗</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
