import React from 'react';
import './LegalPages.css';

export const CookiePolicy: React.FC = () => {
  return (
    <div className="legal-page">
      <section className="legal-hero">
        <div className="container text-center max-w-800">
          <div className="eyebrow">BROWSER STORAGE & COOKIES</div>
          <h1>Cookie Policy</h1>
          <div className="gold-line center-gold-line" />
          <p className="legal-lead">
            Last Updated: October 2026 | LICHT RECRUITMENT SERVICES LIMITED
          </p>
        </div>
      </section>

      <section className="section section-dark">
        <div className="container max-w-900 legal-body">
          <div className="legal-card">
            <h2>1. What Are Cookies?</h2>
            <p>
              Cookies are small text files placed on your computer or mobile device when you visit our website. They help us provide a seamless user experience, maintain navigation session states, and understand site traffic patterns.
            </p>
          </div>

          <div className="legal-card">
            <h2>2. Cookies We Deploy</h2>
            <ul>
              <li><strong>Strictly Necessary Cookies:</strong> These cookies are essential for you to navigate our website and use core features, such as secure form submission and portal navigation. These do not require consent under UK PECR rules.</li>
              <li><strong>Performance & Analytics Cookies:</strong> When enabled, these collect anonymous telemetry on which pages are visited most often, helping us improve site navigation and page loading speeds. No direct personal identifiers are stored.</li>
            </ul>
          </div>

          <div className="legal-card">
            <h2>3. Managing Your Cookie Preferences</h2>
            <p>
              You can set your browser to refuse all or some browser cookies, or to alert you when websites set or access cookies. Note that disabling essential cookies may impact the proper functioning of interactive forms.
            </p>
          </div>

          <div className="legal-card">
            <h2>4. Questions</h2>
            <p>
              If you have any questions regarding our cookie practices, please contact us at <a href="mailto:enquiries@lichtrecruitmentservices.com">enquiries@lichtrecruitmentservices.com</a>.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
