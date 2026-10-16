import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, X, ArrowRight } from 'lucide-react';
import './Navbar.css';

const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'About us', path: '/about' },
  {
    label: 'Services',
    path: '/services',
    children: [
      { label: 'Care Home Recruitment', path: '/services/care-homes' },
      { label: 'Healthcare Recruitment', path: '/services/healthcare' },
      { label: 'Corporate Recruitment', path: '/services/corporate' },
    ],
  },
  { label: 'Employers', path: '/employers' },
  { label: 'Candidates', path: '/candidates' },
  { label: 'Opportunities', path: '/opportunities' },
  { label: 'Contact', path: '/contact' },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
    setServicesOpen(false);
  }, [location.pathname]);

  // Detect scroll position for dynamic glassmorphic opacity
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    if (!servicesOpen) return;
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.nav-item-dropdown')) setServicesOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [servicesOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''} ${mobileOpen ? 'navbar--open' : ''}`} role="banner">
        <nav className="navbar__inner container" aria-label="Main navigation">
          {/* Original Authentic Recruitment Logo */}
          <Link to="/" className="navbar__brand" aria-label="LICHT Recruitment Services – Home">
            <img 
              src="/assets/recruitment_logo.png" 
              alt="LICHT Recruitment Services Limited – Reliable People. Professional Recruitment." 
              className="navbar__logo-img"
            />
          </Link>

          {/* Desktop Nav */}
          <ul className="navbar__links" role="list">
            {NAV_LINKS.map((link) =>
              link.children ? (
                <li key={link.label} className="nav-item nav-item-dropdown">
                  <button
                    className={`nav-link nav-link-btn ${location.pathname.startsWith('/services') ? 'active' : ''}`}
                    onClick={() => setServicesOpen((p) => !p)}
                    aria-expanded={servicesOpen}
                    aria-haspopup="true"
                  >
                    <span>{link.label}</span>
                    <ChevronDown
                      size={15}
                      className={`nav-chevron ${servicesOpen ? 'rotated' : ''}`}
                      aria-hidden="true"
                    />
                    {location.pathname.startsWith('/services') && (
                      <span className="nav-active-indicator" />
                    )}
                  </button>
                  {servicesOpen && (
                    <div className="dropdown" role="menu">
                      {link.children.map((child) => (
                        <NavLink
                          key={child.path}
                          to={child.path}
                          className="dropdown__item"
                          role="menuitem"
                          onClick={() => setServicesOpen(false)}
                        >
                          {child.label}
                        </NavLink>
                      ))}
                    </div>
                  )}
                </li>
              ) : (
                <li key={link.label} className="nav-item">
                  <NavLink
                    to={link.path}
                    end={link.path === '/'}
                    className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                  >
                    <span>{link.label}</span>
                    {((link.path === '/' && location.pathname === '/') || 
                      (link.path !== '/' && location.pathname.startsWith(link.path))) && (
                      <span className="nav-active-indicator" />
                    )}
                  </NavLink>
                </li>
              )
            )}
          </ul>

          {/* Single Figma CTA Button: Request support -> */}
          <div className="navbar__actions">
            <Link to="/employers" className="navbar__btn-cta">
              <span>Request support</span>
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            className="navbar__hamburger"
            onClick={() => setMobileOpen((p) => !p)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        id="mobile-menu"
        className={`mobile-menu ${mobileOpen ? 'mobile-menu--open' : ''}`}
        aria-hidden={!mobileOpen}
      >
        <div className="mobile-menu__inner">
          <nav aria-label="Mobile navigation">
            <div className="mobile-menu__header">
              <Link to="/" onClick={() => setMobileOpen(false)}>
                <img 
                  src="/assets/recruitment_logo.png" 
                  alt="LICHT Recruitment Services Limited" 
                  className="navbar__logo-img"
                  style={{ height: '44px', width: 'auto' }}
                />
              </Link>
            </div>
            <ul className="mobile-menu__links" role="list">
              {NAV_LINKS.map((link) =>
                link.children ? (
                  <li key={link.label}>
                    <button
                      className="mobile-nav-link mobile-nav-link-btn"
                      onClick={() => setServicesOpen((p) => !p)}
                      aria-expanded={servicesOpen}
                    >
                      {link.label}
                      <ChevronDown
                        size={16}
                        className={`nav-chevron ${servicesOpen ? 'rotated' : ''}`}
                        aria-hidden="true"
                      />
                    </button>
                    {servicesOpen && (
                      <ul className="mobile-submenu" role="list">
                        {link.children.map((child) => (
                          <li key={child.path}>
                            <NavLink
                              to={child.path}
                              className={({ isActive }) =>
                                `mobile-sub-link ${isActive ? 'active' : ''}`
                              }
                            >
                              {child.label}
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ) : (
                  <li key={link.label}>
                    <NavLink
                      to={link.path}
                      end={link.path === '/'}
                      className={({ isActive }) =>
                        `mobile-nav-link ${isActive ? 'active' : ''}`
                      }
                    >
                      {link.label}
                    </NavLink>
                  </li>
                )
              )}
            </ul>

            <div className="mobile-menu__actions">
              <Link to="/employers" className="navbar__btn-cta" style={{ justifyContent: 'center', width: '100%' }}>
                <span>Request support</span>
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </nav>
        </div>
      </div>

      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="mobile-backdrop"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}

export default Navbar;
