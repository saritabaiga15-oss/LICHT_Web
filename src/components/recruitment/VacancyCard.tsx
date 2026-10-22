import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPin, 
  Briefcase, 
  Calendar, 
  ChevronRight, 
  CheckCircle2, 
  ArrowRight,
  Sparkles,
  X
} from 'lucide-react';
import { Vacancy } from '../../data/mockData';
import './VacancyCard.css';

interface VacancyCardProps {
  vacancy: Vacancy;
  onSelectRole?: (title: string) => void;
}

export const VacancyCard: React.FC<VacancyCardProps> = ({ vacancy, onSelectRole }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const getSectorBadgeClass = (sector: string) => {
    switch (sector) {
      case 'Care Homes': return 'badge-care';
      case 'Healthcare': return 'badge-health';
      default: return 'badge-corp';
    }
  };

  return (
    <>
      <div className="vacancy-card">
        <div className="vacancy-header">
          <div className="vacancy-meta-tags">
            <span className={`sector-tag ${getSectorBadgeClass(vacancy.sector)}`}>
              {vacancy.sector}
            </span>
            <span className="type-tag">{vacancy.type}</span>
            {vacancy.isDemo && (
              <span className="demo-notice-tag">Sample Role</span>
            )}
          </div>
          {vacancy.postedDate && (
            <span className="posted-date">
              <Calendar size={13} />
              <span>Posted: {vacancy.postedDate}</span>
            </span>
          )}
        </div>

        <h3 className="vacancy-title">{vacancy.title}</h3>

        <div className="vacancy-details-row">
          <div className="detail-item">
            <MapPin size={15} className="gold-icon" />
            <span>{vacancy.location}</span>
          </div>
          <div className="detail-item">
            <Briefcase size={15} className="gold-icon" />
            <span>{vacancy.salary || vacancy.pay}</span>
          </div>
        </div>

        <p className="vacancy-desc-snippet">{vacancy.description || vacancy.summary}</p>

        {vacancy.essentialRequirements && vacancy.essentialRequirements.length > 0 && (
          <div className="vacancy-essential-preview">
            <span className="preview-label">Key Requirements:</span>
            <ul className="preview-list">
              {vacancy.essentialRequirements.slice(0, 2).map((req: string, idx: number) => (
                <li key={idx}>
                  <CheckCircle2 size={13} className="gold-icon" />
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="vacancy-actions">
          <button 
            type="button" 
            className="btn btn-secondary vacancy-view-btn"
            onClick={() => setModalOpen(true)}
          >
            <span>View Full Specification</span>
            <ChevronRight size={15} />
          </button>

          <Link 
            to={`/submit-cv?role=${encodeURIComponent(vacancy.title)}`}
            className="btn btn-primary vacancy-apply-btn"
            onClick={() => onSelectRole && onSelectRole(vacancy.title)}
          >
            <span>Express Interest</span>
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>

      {/* Role Specification Modal */}
      {modalOpen && (
        <div className="vacancy-modal-backdrop" onClick={() => setModalOpen(false)}>
          <div className="vacancy-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <span className={`sector-tag ${getSectorBadgeClass(vacancy.sector)}`}>
                  {vacancy.sector}
                </span>
                <h3 className="modal-title">{vacancy.title}</h3>
                <div className="modal-meta">
                  <span><MapPin size={14} className="gold-icon" /> {vacancy.location}</span>
                  <span><Briefcase size={14} className="gold-icon" /> {vacancy.salary || vacancy.pay}</span>
                  <span><Calendar size={14} className="gold-icon" /> {vacancy.type || vacancy.contract}</span>
                </div>
              </div>
              <button 
                type="button" 
                className="modal-close" 
                onClick={() => setModalOpen(false)}
                aria-label="Close modal"
              >
                <X size={22} />
              </button>
            </div>

            <div className="modal-body">
              <div className="modal-section">
                <h4>Role Summary</h4>
                <p>{vacancy.description || vacancy.summary || vacancy.roleMeaning}</p>
              </div>

              {vacancy.responsibilities && vacancy.responsibilities.length > 0 && (
                <div className="modal-section">
                  <h4>Primary Responsibilities</h4>
                  <ul>
                    {vacancy.responsibilities.map((resp: string, i: number) => (
                      <li key={i}>{resp}</li>
                    ))}
                  </ul>
                </div>
              )}

              {vacancy.essentialRequirements && vacancy.essentialRequirements.length > 0 && (
                <div className="modal-section">
                  <h4>Essential Criteria</h4>
                  <ul>
                    {vacancy.essentialRequirements.map((req: string, i: number) => (
                      <li key={i}>{req}</li>
                    ))}
                  </ul>
                </div>
              )}

              {vacancy.desirableRequirements && vacancy.desirableRequirements.length > 0 && (
                <div className="modal-section">
                  <h4>Desirable Criteria</h4>
                  <ul>
                    {vacancy.desirableRequirements.map((des: string, i: number) => (
                      <li key={i}>{des}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="modal-compliance-note">
                <Sparkles size={16} className="gold-icon" />
                <p>
                  <strong>Compliance Note:</strong> Applications for this position are subject to satisfactory verification of Right to Work in the UK, identity authentication, and relevant background checks (such as Enhanced DBS where applicable).
                </p>
              </div>
            </div>

            <div className="modal-footer">
              <button 
                type="button" 
                className="btn btn-secondary" 
                onClick={() => setModalOpen(false)}
              >
                Close
              </button>
              <Link 
                to={`/submit-cv?role=${encodeURIComponent(vacancy.title)}`}
                className="btn btn-primary"
                onClick={() => {
                  setModalOpen(false);
                  if (onSelectRole) onSelectRole(vacancy.title);
                }}
              >
                <span>Apply with CV</span>
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
