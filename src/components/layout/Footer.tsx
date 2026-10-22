import React from 'react';
import { Link } from 'react-router-dom';
import { BrandLogo } from '../common/BrandLogo';
import './Footer.css';

export const Footer: React.FC = () => {
  return (
    <footer className="global-footer" role="contentinfo">
      <div className="container">
        {/* Top 4-column layout */}
        <div className="global-footer__top">
          {/* Brand Info */}
          <div className="global-footer__brand">
            <Link to="/" aria-label="LICHT Recruitment Services Limited">
              <BrandLogo variant="light" />
            </Link>
            <p className="global-footer__slogan">
              Reliable People. Professional Recruitment.
            </p>
            <p className="global-footer__tagline">
              People-first recruitment for care, healthcare, supported living and corporate teams.
            </p>
          </div>

          {/* For employers */}
          <div className="global-footer__col">
            <h4 className="global-footer__heading">For employers</h4>
            <ul className="global-footer__list" role="list">
              <li><Link to="/services">Our services</Link></li>
              <li><Link to="/services">Sectors we support</Link></li>
              <li><Link to="/employers">Request staff</Link></li>
            </ul>
          </div>

          {/* For candidates */}
          <div className="global-footer__col">
            <h4 className="global-footer__heading">For candidates</h4>
            <ul className="global-footer__list" role="list">
              <li><Link to="/opportunities">Browse jobs</Link></li>
              <li><Link to="/candidates">How to apply</Link></li>
              <li><Link to="/submit-cv">Send your CV</Link></li>
            </ul>
          </div>

          {/* LICHT */}
          <div className="global-footer__col">
            <h4 className="global-footer__heading">LICHT</h4>
            <ul className="global-footer__list" role="list">
              <li><Link to="/about">About us</Link></li>
              <li><Link to="/about">Our approach</Link></li>
              <li><Link to="/contact">Contact us</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom divider and legal row */}
        <div className="global-footer__bottom">
          <p className="global-footer__copyright">
            &copy; 2026 LICHT RECRUITMENT SERVICES LIMITED
          </p>
          <div className="global-footer__legal-links">
            <Link to="/privacy-policy">Privacy policy</Link>
            <Link to="/cookie-policy">Cookie preferences</Link>
            <Link to="/terms">Accessibility</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
