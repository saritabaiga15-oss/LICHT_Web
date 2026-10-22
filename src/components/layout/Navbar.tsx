import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Building2 } from 'lucide-react';
import { BrandLogo } from '../common/BrandLogo';
import { useAuth } from '../../context/AuthContext';
import { useEmployer } from '../../context/EmployerContext';
import './Navbar.css';

export const Navbar: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const { employer, isEmployerAuthenticated } = useEmployer();
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const isFindAJobActive = 
    location.pathname.startsWith('/opportunities') || 
    location.pathname.startsWith('/candidates');

  const isServicesActive = location.pathname.startsWith('/services');
  const isEmployersActive = 
    location.pathname.startsWith('/employer') || 
    location.pathname.startsWith('/employers');
  const isAboutActive = location.pathname.startsWith('/about');
  const isContactActive = location.pathname.startsWith('/contact');

  return (
    <header className="site-header" role="banner">
      <div className="container site-header__container">
        {/* Brand / Logo */}
        <Link to="/" className="site-header__brand" aria-label="LICHT Recruitment Services Limited">
          <BrandLogo variant="dark" />
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="site-header__nav" aria-label="Main Navigation">
          <ul className="site-header__links" role="list">
            <li>
              <NavLink 
                to="/services" 
                className={({ isActive }) => `nav-item ${isActive || isServicesActive ? 'nav-item--active' : ''}`}
              >
                Services & sectors
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/opportunities" 
                className={`nav-item ${isFindAJobActive ? 'nav-item--active' : ''}`}
              >
                Find a job
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/about" 
                className={({ isActive }) => `nav-item ${isActive || isAboutActive ? 'nav-item--active' : ''}`}
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/contact" 
                className={({ isActive }) => `nav-item ${isActive || isContactActive ? 'nav-item--active' : ''}`}
              >
                Contact
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* Header Right Action */}
        <div className="site-header__actions">
          {/* Employers / Post Job Button */}
          <Link 
            to={isEmployerAuthenticated ? "/employer" : "/employer/login"} 
            className={`btn-navbar-employer ${isEmployersActive ? 'btn-navbar-employer--active' : ''}`}
            title="Post a job or hire healthcare staff"
          >
            <Building2 size={15} />
            <span>Employers / Post Job</span>
          </Link>

          {isEmployerAuthenticated && employer ? (
            <Link to="/employer" className="header-profile-pill header-profile-pill--employer" title="View Employer Portal">
              <span className="header-avatar-circle" style={{ background: '#0a222c' }}>
                <Building2 size={14} />
              </span>
              <span className="header-user-name">{employer.organisationName.split(' ')[0]}</span>
              <span className="header-profile-badge">Portal ↗</span>
            </Link>
          ) : isAuthenticated && user ? (
            <Link to="/profile" className="header-profile-pill" title="View your candidate profile & applications">
              <span className="header-avatar-circle">
                {user.fullName.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </span>
              <span className="header-user-name">{user.fullName.split(' ')[0]}</span>
              <span className="header-profile-badge">Profile ↗</span>
            </Link>
          ) : (
            <Link to="/login" className="btn-pill-green header-cta-btn">
              Log in
            </Link>
          )}

          {/* Mobile hamburger toggle */}
          <button 
            type="button" 
            className="mobile-nav-toggle" 
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Backdrop & Sheet */}
      {mobileOpen && (
        <>
          <div 
            className="mobile-drawer-overlay" 
            onClick={() => setMobileOpen(false)} 
            aria-hidden="true" 
          />
          <div className="mobile-drawer" role="dialog" aria-modal="true">
            <div className="mobile-drawer__links">
              <Link to="/opportunities" className={`mobile-nav-link ${isFindAJobActive ? 'active' : ''}`}>
                <span>Find a Job / Vacancies</span>
                <span className="mobile-nav-pill">Browse</span>
              </Link>
              <Link to="/employer" className={`mobile-nav-link ${isEmployersActive ? 'active' : ''}`}>
                <span>Employers & Staffing</span>
                <span className="mobile-nav-pill gold">Hire Staff</span>
              </Link>
              <Link to="/services" className={`mobile-nav-link ${isServicesActive ? 'active' : ''}`}>
                <span>Services & Sectors</span>
              </Link>
              <Link to="/about" className={`mobile-nav-link ${isAboutActive ? 'active' : ''}`}>
                <span>About LICHT</span>
              </Link>
              <Link to="/contact" className={`mobile-nav-link ${isContactActive ? 'active' : ''}`}>
                <span>Contact & Placement Desk</span>
              </Link>

              <div className="mobile-drawer__cta">
                {isEmployerAuthenticated && employer ? (
                  <div className="mobile-logged-box">
                    <span className="mobile-logged-tag">Logged in as Employer</span>
                    <strong className="mobile-logged-title">{employer.organisationName}</strong>
                    <Link to="/employer" className="btn-pill-green mobile-full-btn">
                      Access Employer Dashboard ↗
                    </Link>
                  </div>
                ) : isAuthenticated && user ? (
                  <div className="mobile-logged-box">
                    <span className="mobile-logged-tag">Logged in as Candidate</span>
                    <strong className="mobile-logged-title">{user.fullName}</strong>
                    <Link to="/profile" className="btn-pill-green mobile-full-btn">
                      My Profile & Applications ({user.appliedJobs?.length || 0}) ↗
                    </Link>
                  </div>
                ) : (
                  <div className="mobile-auth-actions">
                    <Link to="/login" className="btn-pill-green mobile-full-btn">
                      Candidate Sign In / Register
                    </Link>
                    <Link to="/employer/login" className="btn-pill-outline mobile-full-btn">
                      <Building2 size={16} /> Employer Portal Access ↗
                    </Link>
                  </div>
                )}

                <div className="mobile-drawer-admin-link">
                  <Link to="/admin">
                    Admin Compliance Desk ↗
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
};
export default Navbar;
