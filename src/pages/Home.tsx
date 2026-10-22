import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  ArrowUpRight, 
  HeartHandshake, 
  Stethoscope, 
  Building2,
  Sparkles
} from 'lucide-react';
import './Home.css';

export const Home: React.FC = () => {
  return (
    <div className="home-view">
      {/* 1. ARCHITECTURAL HERO SECTION */}
      <section className="home-hero">
        <div className="container">
          <div className="home-hero__header">
            <div className="figma-eyebrow">People first, possibilities ahead.</div>
            <h1 className="home-hero__title">
              The right people.<br />
              <span className="hero-title-accent">A brighter way forward.</span>
            </h1>
            <p className="home-hero__subtitle">
              <strong>Reliable People. Professional Recruitment.</strong><br />
              Connecting organisations with dependable talent, and people with opportunities that matter.
            </p>

            <div className="home-hero__actions">
              <Link to="/employers" className="btn-pill-green">
                I'm looking for staff <span className="arrow-up-right">↗</span>
              </Link>
              <Link to="/opportunities" className="btn-pill-outline">
                I'm looking for work <span className="arrow-up-right">↗</span>
              </Link>
            </div>
          </div>

          {/* 3-Column Hero Visual Grid */}
          <div className="home-hero__grid">
            {/* Col 1: Care resident & assistant photo */}
            <div className="hero-card hero-card--photo">
              <img 
                src="/assets/hero_care_companion.jpg" 
                alt="Compassionate care assistant supporting resident" 
                className="hero-card__img"
              />
              <div className="hero-card__photo-overlay">
                <span className="hero-card__photo-tag">Care & Compassion</span>
              </div>
            </div>

            {/* Col 2: Dark green card */}
            <div className="hero-card hero-card--green">
              <div className="hero-card__icon-wrap">
                <Users size={26} strokeWidth={1.8} />
              </div>
              <div className="hero-card__badge-eyebrow">FOR ORGANISATIONS</div>
              <h2 className="hero-card__green-title">
                Your team. Our priority.
              </h2>
              <p className="hero-card__green-desc">
                Thoughtful recruitment for the people your organisation depends on.
              </p>
              <div className="hero-card__btn-wrap">
                <Link to="/employers" className="btn-pill-white">
                  Find your next hire <span className="arrow-up-right">↗</span>
                </Link>
              </div>
            </div>

            {/* Col 3: Office photo + Your next chapter card */}
            <div className="hero-card hero-card--split">
              <div className="hero-card__split-photo">
                <img 
                  src="/assets/hero_office_work.jpg" 
                  alt="Professional candidate in modern office" 
                  className="hero-card__img"
                />
              </div>
              <div className="hero-card__split-info">
                <h3 className="hero-card__split-title">Your next chapter.</h3>
                <p className="hero-card__split-desc">
                  Find a role where you can make a difference.
                </p>
                <Link to="/opportunities" className="hero-card__link">
                  Browse opportunities <span className="arrow-up-right">↗</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Sectors quick row */}
          <div className="home-hero__sectors-row">
            <Link to="/services" className="hero-sector-tag">Care homes</Link>
            <span className="hero-sector-dot">·</span>
            <Link to="/services" className="hero-sector-tag">Healthcare</Link>
            <span className="hero-sector-dot">·</span>
            <Link to="/services" className="hero-sector-tag">Supported living</Link>
            <span className="hero-sector-dot">·</span>
            <Link to="/services" className="hero-sector-tag">Corporate organisations</Link>
          </div>
        </div>
      </section>

      {/* 2. EDITORIAL ARCHITECTURAL BENTO SECTION (OURA & CO. VIBE) */}
      <section className="editorial-bento-section">
        <div className="container">
          <div className="editorial-bento-grid">
            {/* Left Column: Big Brand Heading, Manifesto & Photo */}
            <div className="editorial-bento-left">
              <h2 className="editorial-brand-title">LICHT &amp; CO.,</h2>
              <p className="editorial-manifesto">
                We believe recruitment is more than just filling rotas — it's about creating partnerships that inspire, support with dignity, and reflect the people who live, work, and thrive within them.
              </p>

              <div className="editorial-photo-box">
                <img 
                  src="/assets/approach_discussion.jpg" 
                  alt="Thoughtful recruitment consultation at LICHT" 
                  className="editorial-photo-img"
                />
                <div className="editorial-photo-caption">
                  <span>Considered placement · Everyday dignity</span>
                </div>
              </div>
            </div>

            {/* Right Column: 4-Grid Hairline Box */}
            <div className="editorial-bento-right">
              <div className="bento-matrix">
                {/* Cell 1 */}
                <div className="bento-cell">
                  <p className="bento-cell-label">
                    years into reimagining workforce reliability and specialist matching.
                  </p>
                  <span className="bento-cell-number">10+</span>
                </div>

                {/* Cell 2 */}
                <div className="bento-cell">
                  <p className="bento-cell-label">
                    core specialist sectors across care, healthcare &amp; corporate.
                  </p>
                  <span className="bento-cell-number">4</span>
                </div>

                {/* Cell 3 */}
                <div className="bento-cell">
                  <p className="bento-cell-label">
                    vetted candidates and dependable placements across the UK.
                  </p>
                  <span className="bento-cell-number">2.5k</span>
                </div>

                {/* Cell 4: High-Contrast Forest Green Cell */}
                <div className="bento-cell bento-cell--dark">
                  <p className="bento-cell-quote">
                    Recruitment isn't just what you see — it's how the right person lives and works with you.
                  </p>
                  <Link to="/services" className="bento-cell-cta">
                    <span>Learn more</span>
                    <span className="arrow-up-right">↗</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SPECIALIST UNDERSTANDING SECTION */}
      <section className="home-specialist">
        <div className="container">
          <div className="home-specialist__header">
            <div className="home-specialist__title-col">
              <div className="figma-eyebrow">Where we make a difference</div>
              <h2 className="home-section-title">
                Specialist understanding.<br />
                Human connections.
              </h2>
            </div>
            <div className="home-specialist__desc-col">
              <p className="home-specialist__lead">
                Different settings. Different responsibilities. The same need for people you can rely on. We start by understanding yours.
              </p>
              <Link to="/services" className="home-inline-link">
                Explore our services & sectors <span className="arrow-up-right">↗</span>
              </Link>
            </div>
          </div>

          {/* 3 Sector Cards */}
          <div className="home-sectors-grid">
            {/* Card 1 */}
            <div className="sector-feature-card">
              <div className="sector-card-top-row">
                <div className="sector-feature-card__icon">
                  <HeartHandshake size={22} color="#204836" strokeWidth={1.8} />
                </div>
                <span className="sector-card-index">01</span>
              </div>
              <h3 className="sector-feature-card__title">Care & supported living</h3>
              <p className="sector-feature-card__desc">
                People who bring patience, compassion and consistency to everyday care.
              </p>
              <div className="sector-feature-card__tags">
                Care assistants · Support workers
              </div>
            </div>

            {/* Card 2 */}
            <div className="sector-feature-card">
              <div className="sector-card-top-row">
                <div className="sector-feature-card__icon">
                  <Stethoscope size={22} color="#204836" strokeWidth={1.8} />
                </div>
                <span className="sector-card-index">02</span>
              </div>
              <h3 className="sector-feature-card__title">Healthcare</h3>
              <p className="sector-feature-card__desc">
                Professional recruitment for patient-focused teams and clinical environments.
              </p>
              <div className="sector-feature-card__tags">
                Healthcare assistants · Nursing roles
              </div>
            </div>

            {/* Card 3 */}
            <div className="sector-feature-card">
              <div className="sector-card-top-row">
                <div className="sector-feature-card__icon">
                  <Building2 size={22} color="#204836" strokeWidth={1.8} />
                </div>
                <span className="sector-card-index">03</span>
              </div>
              <h3 className="sector-feature-card__title">Corporate & business</h3>
              <p className="sector-feature-card__desc">
                Dependable talent that helps your organisation move forward with confidence.
              </p>
              <div className="sector-feature-card__tags">
                Administration · Operations · Business support
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. THE LICHT APPROACH SECTION */}
      <section className="home-approach">
        <div className="container">
          <div className="home-approach__grid">
            {/* Photo Left */}
            <div className="home-approach__photo-wrap">
              <img 
                src="/assets/care_home_sector.jpg" 
                alt="Compassionate health and care professional" 
                className="home-approach__photo"
              />
            </div>

            {/* Content Right */}
            <div className="home-approach__content">
              <div className="figma-eyebrow">The LICHT approach</div>
              <h2 className="home-section-title">
                Recruitment with care.<br />
                From the first conversation.
              </h2>
              <p className="home-approach__p">
                Good recruitment is more than filling a vacancy. It is understanding the people, responsibilities and expectations behind it.
              </p>

              <div className="home-approach__steps">
                <div className="approach-step">
                  <div className="approach-step__number">01</div>
                  <div className="approach-step__body">
                    <h4 className="approach-step__title">Listen first</h4>
                    <p className="approach-step__desc">
                      We take time to understand your needs, experience and priorities.
                    </p>
                  </div>
                </div>

                <div className="approach-step">
                  <div className="approach-step__number">02</div>
                  <div className="approach-step__number--accent">02</div>
                  <div className="approach-step__body">
                    <h4 className="approach-step__title">Match thoughtfully</h4>
                    <p className="approach-step__desc">
                      We consider skills, suitability and the needs of the setting.
                    </p>
                  </div>
                </div>

                <div className="approach-step">
                  <div className="approach-step__number">03</div>
                  <div className="approach-step__body">
                    <h4 className="approach-step__title">Support the next step</h4>
                    <p className="approach-step__desc">
                      Clear communication, considered checks and practical guidance.
                    </p>
                  </div>
                </div>
              </div>

              <div className="home-approach__cta">
                <Link to="/about" className="home-inline-link">
                  Get to know LICHT <span className="arrow-up-right">↗</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. DARK NAVY CANDIDATE BANNER */}
      <section className="home-navy-banner">
        <div className="container home-navy-banner__container">
          <div className="home-navy-banner__left">
            <div className="figma-eyebrow figma-eyebrow--white">
              For people ready for what's next
            </div>
            <h2 className="home-navy-banner__title">
              Your skills deserve<br />
              a place to shine.
            </h2>
            <p className="home-navy-banner__subtitle">
              Whether you are exploring your first role or taking your next step, start a conversation with us.
            </p>
          </div>

          <div className="home-navy-banner__right">
            <Link to="/opportunities" className="btn-pill-white">
              Find your next role <span className="arrow-up-right">↗</span>
            </Link>
            <p className="home-navy-banner__note">
              Care, healthcare and corporate opportunities
            </p>
          </div>
        </div>
      </section>

      {/* 6. CALL TO ACTION SECTION */}
      <section className="figma-cta-section">
        <div className="container">
          <h2 className="figma-cta-headline">Let's find your way forward.</h2>
          <p className="figma-cta-subhead">
            A staffing requirement. A career move. It starts with a conversation.
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
