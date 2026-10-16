import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Briefcase, Mail } from 'lucide-react';
import './NotFound.css';

export const NotFound: React.FC = () => {
  return (
    <div className="not-found-page">
      <div className="container text-center max-w-800 not-found-card">
        <span className="not-found-num">404</span>
        <h1 className="not-found-title">Page Not Found</h1>
        <div className="gold-line center-gold-line" />
        <p className="not-found-desc">
          The recruitment page or resource you are looking for may have been moved, renamed, or is temporarily unavailable.
        </p>

        <div className="not-found-actions">
          <Link to="/" className="btn btn-primary">
            <Home size={16} />
            <span>Return to Homepage</span>
          </Link>
          <Link to="/opportunities" className="btn btn-secondary">
            <Briefcase size={16} />
            <span>Search Opportunities</span>
          </Link>
          <Link to="/contact" className="btn btn-outline-gold">
            <Mail size={16} />
            <span>Contact Support</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
