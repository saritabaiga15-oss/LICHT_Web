import { Link } from 'react-router-dom';
import './Footer.css';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="figma-footer" role="contentinfo">
      <div className="container">
        {/* Main Footer Grid */}
        <div className="figma-footer-grid">
          {/* Brand Column */}
          <div className="figma-footer-brand-col">
            <Link to="/" className="figma-footer-logo-link" aria-label="LICHT Recruitment Services – Home">
              <div className="figma-footer-badge">
                <span>L</span>
              </div>
              <div className="figma-footer-logo-text">
                <span className="figma-footer-title">LICHT</span>
                <span className="figma-footer-sub">RECRUITMENT SERVICES</span>
              </div>
            </Link>

            <p className="figma-footer-desc">
              Professional recruitment support for care homes, healthcare providers and corporate organisations.
            </p>

            <p className="figma-footer-note">
              Contact details and registered company information will be published once verified.
            </p>
          </div>

          {/* Company Column */}
          <div className="figma-footer-col">
            <h4 className="figma-footer-heading">Company</h4>
            <ul className="figma-footer-links" role="list">
              <li><Link to="/about">About us</Link></li>
              <li><Link to="/employers">Employers</Link></li>
              <li><Link to="/candidates">Candidates</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          {/* Services Column */}
          <div className="figma-footer-col">
            <h4 className="figma-footer-heading">Services</h4>
            <ul className="figma-footer-links" role="list">
              <li><Link to="/services/care-homes">Care home recruitment</Link></li>
              <li><Link to="/services/healthcare">Healthcare recruitment</Link></li>
              <li><Link to="/services/corporate">Corporate recruitment</Link></li>
            </ul>
          </div>

          {/* Information Column */}
          <div className="figma-footer-col">
            <h4 className="figma-footer-heading">Information</h4>
            <ul className="figma-footer-links" role="list">
              <li><Link to="/opportunities">Opportunities</Link></li>
              <li><Link to="/submit-cv">Submit your CV</Link></li>
              <li><Link to="/privacy-policy">Privacy policy</Link></li>
              <li><Link to="/cookie-policy">Cookie policy</Link></li>
              <li><Link to="/terms">Terms</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="figma-footer-bottom">
          <p className="figma-footer-copyright">
            &copy; {year} LICHT Recruitment Services Limited.
          </p>
          <p className="figma-footer-tagline">
            Reliable People. Professional Recruitment.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
