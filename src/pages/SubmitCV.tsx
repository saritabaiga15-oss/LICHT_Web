import React from 'react';
import { FileText, ShieldCheck, CheckCircle2, Lock } from 'lucide-react';
import { CandidateCVForm } from '../components/recruitment/CandidateCVForm';
import './SubmitCV.css';

export const SubmitCV: React.FC = () => {
  return (
    <div className="submit-cv-page">
      {/* Hero */}
      <section className="submit-cv-hero">
        <div className="container text-center max-w-800">
          <div className="figma-hero-eyebrow center-eyebrow">
            <span className="figma-gold-dash" />
            <span>DIRECT REGISTRATION</span>
          </div>
          <h1 className="submit-cv-hero-title">
            Submit Your CV for <br />
            <span className="hero-text-gold">Upcoming Opportunities</span>
          </h1>
          <p className="submit-cv-hero-lead">
            Upload your credentials to be considered by LICHT Recruitment Services Limited for relevant vacancies across UK care homes, healthcare units, and corporate partners.
          </p>
        </div>
      </section>

      {/* Main Form & Advice Layout */}
      <section className="section section-dark">
        <div className="container cv-layout">
          <div className="cv-form-col">
            <CandidateCVForm />
          </div>

          <div className="cv-guidance-col">
            <div className="cv-advice-box">
              <div className="advice-header">
                <CheckCircle2 size={22} className="gold-icon" />
                <h3>CV Preparation Advice</h3>
              </div>
              <ul className="advice-points">
                <li>
                  <strong>Contact Information:</strong> Ensure your telephone number and email address are current and accessible.
                </li>
                <li>
                  <strong>Employment History:</strong> Present chronological employment history with clear descriptions of your responsibilities.
                </li>
                <li>
                  <strong>Care & Clinical Certifications:</strong> Highlight any NVQs, Care Certificate, moving and handling, or medication administration certifications.
                </li>
                <li>
                  <strong>DBS Status:</strong> Note whether you possess an Enhanced DBS and whether you are registered on the DBS Update Service.
                </li>
              </ul>
            </div>

            <div className="cv-privacy-reassurance-box">
              <Lock size={22} className="gold-icon" />
              <h4>Confidentiality & Compliance</h4>
              <p>
                Your personal details, contact information, and CV are processed strictly under UK GDPR standards. We never disclose your profile to prospective employers without prior discussion and agreement.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
