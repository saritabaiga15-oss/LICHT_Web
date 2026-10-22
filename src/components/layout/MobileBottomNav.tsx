import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  Home, 
  Briefcase, 
  Building2, 
  Layers, 
  User, 
  Sparkles 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useEmployer } from '../../context/EmployerContext';
import './MobileBottomNav.css';

export const MobileBottomNav: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  const { isEmployerAuthenticated, employer } = useEmployer();
  const location = useLocation();

  const isOpportunitiesActive = 
    location.pathname.startsWith('/opportunities') || 
    location.pathname.startsWith('/candidates');

  const isEmployersActive = 
    location.pathname.startsWith('/employer') || 
    location.pathname.startsWith('/employers');

  const isServicesActive = location.pathname.startsWith('/services');

  const isProfileActive = 
    location.pathname.startsWith('/profile') || 
    location.pathname === '/login' || 
    location.pathname === '/signup';

  return (
    <nav className="mobile-bottom-nav" aria-label="Mobile Bottom Navigation">
      <div className="mobile-bottom-nav__inner">
        <NavLink 
          to="/" 
          className={({ isActive }) => 
            `mobile-nav-btn ${isActive ? 'mobile-nav-btn--active' : ''}`
          }
          end
        >
          <Home size={20} className="mobile-nav-icon" />
          <span className="mobile-nav-label">Home</span>
        </NavLink>

        <NavLink 
          to="/opportunities" 
          className={`mobile-nav-btn ${isOpportunitiesActive ? 'mobile-nav-btn--active' : ''}`}
        >
          <Briefcase size={20} className="mobile-nav-icon" />
          <span className="mobile-nav-label">Find Jobs</span>
        </NavLink>

        <NavLink 
          to={isEmployerAuthenticated ? "/employer" : "/employer"} 
          className={`mobile-nav-btn mobile-nav-btn--employer ${isEmployersActive ? 'mobile-nav-btn--active' : ''}`}
        >
          <div className="mobile-nav-icon-wrap">
            <Building2 size={20} className="mobile-nav-icon" />
          </div>
          <span className="mobile-nav-label">Employers</span>
        </NavLink>

        <NavLink 
          to="/services" 
          className={`mobile-nav-btn ${isServicesActive ? 'mobile-nav-btn--active' : ''}`}
        >
          <Layers size={20} className="mobile-nav-icon" />
          <span className="mobile-nav-label">Services</span>
        </NavLink>

        <NavLink 
          to={
            isEmployerAuthenticated 
              ? "/employer" 
              : isAuthenticated 
                ? "/profile" 
                : "/login"
          } 
          className={`mobile-nav-btn ${isProfileActive ? 'mobile-nav-btn--active' : ''}`}
        >
          {isEmployerAuthenticated && employer ? (
            <div className="mobile-avatar-indicator employer">
              <Building2 size={12} />
            </div>
          ) : isAuthenticated && user ? (
            <div className="mobile-avatar-indicator candidate">
              {user.fullName ? user.fullName[0] : 'U'}
            </div>
          ) : (
            <User size={20} className="mobile-nav-icon" />
          )}
          <span className="mobile-nav-label">
            {isEmployerAuthenticated 
              ? 'Portal' 
              : isAuthenticated 
                ? 'Profile' 
                : 'Sign In'}
          </span>
        </NavLink>
      </div>
    </nav>
  );
};

export default MobileBottomNav;
