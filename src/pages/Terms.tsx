import React from 'react';
import { Link } from 'react-router-dom';
import './LegalPages.css';

export const Terms: React.FC = () => {
  return (
    <div className="legal-page">
      <section className="legal-hero">
        <div className="container text-center max-w-800">
          <div className="eyebrow">TERMS OF USE</div>
          <h1>Terms & Conditions</h1>
          <div className="gold-line center-gold-line" />
          <p className="legal-lead">
            Last Updated: October 2026 | LICHT RECRUITMENT SERVICES LIMITED
          </p>
        </div>
      </section>

      <section className="section section-dark">
        <div className="container max-w-900 legal-body">
          <div className="legal-card">
            <h2>1. Agreement to Terms</h2>
            <p>
              By accessing and using this website, you agree to comply with and be bound by these Terms and Conditions. If you disagree with any portion of these terms, please refrain from using our web services.
            </p>
          </div>

          <div className="legal-card">
            <h2>2. Recruitment & Agency Services</h2>
            <p>
              LICHT RECRUITMENT SERVICES LIMITED acts as an employment agency and employment business in accordance with the Employment Agencies Act 1973 and the Conduct of Employment Agencies and Employment Businesses Regulations 2003 (as amended).
            </p>
            <ul>
              <li><strong>Candidate Submissions:</strong> Uploading a CV or expressing interest does not create an employment contract or guarantee interview opportunities or placement.</li>
              <li><strong>Employer Services:</strong> Client engagements, temporary worker supply, and permanent introductions are governed by separate, formal written Terms of Business executed prior to placement commencement.</li>
            </ul>
          </div>

          <div className="legal-card">
            <h2>3. Accuracy of Candidate and Client Information</h2>
            <p>
              Users agree that all information supplied via our forms (including employment histories, qualifications, and right-to-work representations) is truthful, accurate, and not misleading. We reserve the right to cease recruitment support if information provided is discovered to be fraudulent.
            </p>
          </div>

          <div className="legal-card">
            <h2>4. Intellectual Property</h2>
            <p>
              All trademarks, logos, content, visual assets, and text displayed on this website are the property of LICHT RECRUITMENT SERVICES LIMITED or its licensors and are protected under UK and international copyright laws.
            </p>
          </div>

          <div className="legal-card">
            <h2>5. Governing Law</h2>
            <p>
              These Terms and Conditions shall be governed by and construed in accordance with the laws of England and Wales. Any disputes arising shall be subject to the exclusive jurisdiction of the courts of England and Wales.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
