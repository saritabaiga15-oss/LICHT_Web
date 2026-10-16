import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import './ServiceCard.css';

interface ServiceCardProps {
  title: string;
  tagline: string;
  description: string;
  imageSrc: string;
  icon: React.ReactNode;
  roles: string[];
  linkTo: string;
  ctaText: string;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  tagline,
  description,
  imageSrc,
  icon,
  roles,
  linkTo,
  ctaText
}) => {
  return (
    <article className="sector-service-card">
      <div className="service-card-media">
        <img src={imageSrc} alt={title} className="service-card-image" loading="lazy" />
        <div className="service-card-overlay" />
        <div className="service-card-icon-badge">
          {icon}
        </div>
      </div>

      <div className="service-card-body">
        <span className="service-card-tag">{tagline}</span>
        <h3 className="service-card-title">{title}</h3>
        <p className="service-card-description">{description}</p>

        <div className="service-card-roles">
          <span className="roles-heading">Supported Vacancies:</span>
          <ul className="roles-list">
            {roles.map((role, idx) => (
              <li key={idx} className="role-item">
                <Check size={14} className="role-check-icon" />
                <span>{role}</span>
              </li>
            ))}
          </ul>
        </div>

        <Link to={linkTo} className="btn btn-outline-gold service-card-cta">
          <span>{ctaText}</span>
          <ArrowRight size={15} />
        </Link>
      </div>
    </article>
  );
};
