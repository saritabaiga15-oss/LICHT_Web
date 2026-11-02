import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Lock, CheckCircle2 } from 'lucide-react';
import './LegalPages.css';

export const PrivacyPolicy: React.FC = () => {
  return (
    <div className="legal-page">
      <section className="legal-hero">
        <div className="container text-center max-w-800">
          <div className="eyebrow">DATA PROTECTION & UK GDPR</div>
          <h1>Privacy Policy & Candidate Notice</h1>
          <div className="gold-line center-gold-line" />
          <p className="legal-lead">
            Last Updated: October 2026 | LICHT RECRUITMENT SERVICES LIMITED
          </p>
        </div>
      </section>

      <section className="section section-dark">
        <div className="container max-w-900 legal-body">
          <div className="legal-card">
            <h2>1. Introduction & Data Controller</h2>
            <p>
              LICHT RECRUITMENT SERVICES LIMITED ("we", "us", or "our") is dedicated to safeguarding the privacy and personal data of our website visitors, clients, and prospective candidates. This Privacy Policy details how we collect, process, store, and protect your information in full accordance with the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018.
            </p>
          </div>

          <div className="legal-card">
            <h2>2. Information We Collect</h2>
            <p>Depending on whether you engage with us as an employer or a work-seeking candidate, we may collect:</p>
            <ul>
              <li><strong>Candidate Data:</strong> Full name, contact telephone, email address, postal location, employment history, CV documents, qualifications, training certificates, references, and right-to-work declarations.</li>
              <li><strong>Employer & Client Data:</strong> Organisation name, registered address, representative contact details, vacancy specifications, hiring timelines, and commercial correspondence.</li>
              <li><strong>Technical Browsing Data:</strong> IP addresses, browser types, device information, and anonymous session telemetry to maintain site security.</li>
            </ul>
          </div>

          <div className="legal-card">
            <h2>3. Lawful Bases for Processing</h2>
            <p>We process your personal data under the following legal bases recognized under UK GDPR:</p>
            <ul>
              <li><strong>Legitimate Interests:</strong> To deliver recruitment consultancy, evaluate candidate suitability for genuine vacancies, and assist employers with workforce planning.</li>
              <li><strong>Contractual Performance:</strong> To take necessary steps at your request prior to entering into a placement agreement or client terms of business.</li>
              <li><strong>Legal Obligation:</strong> To comply with UK employment laws, Conduct of Employment Agencies and Employment Businesses Regulations 2003, and statutory safeguarding obligations.</li>
              <li><strong>Consent:</strong> Where explicitly provided for specific communications.</li>
            </ul>
          </div>

          <div className="legal-card">
            <h2>4. Candidate CV & Profile Sharing</h2>
            <p>
              Candidate CVs and personal profiles are treated with strict confidentiality. We will never disclose, distribute, or present candidate documents to any third-party employer without prior discussion and agreement with the candidate.
            </p>
          </div>

          <div className="legal-card">
            <h2>5. Data Retention & Storage</h2>
            <p>
              We retain candidate records and client communications only for as long as necessary to fulfil recruitment purposes or to comply with statutory statutory audit requirements under UK employment agency regulations. Candidate data is stored securely and never sold to third parties.
            </p>
          </div>

          <div className="legal-card">
            <h2>6. Your Data Subject Rights</h2>
            <p>Under UK data protection legislation, you possess distinct rights regarding your data:</p>
            <ul>
              <li>The right to be informed about how your data is used.</li>
              <li>The right of access to a copy of information held about you.</li>
              <li>The right to rectification of inaccurate or incomplete records.</li>
              <li>The right to erasure ("right to be forgotten") where retention is no longer legally mandated.</li>
              <li>The right to restrict or object to processing.</li>
            </ul>
            <p>
              To exercise any of these rights, please contact our Data Protection desk via <a href="mailto:enquiries@lichtrecruitmentservices.com">enquiries@lichtrecruitmentservices.com</a>.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
