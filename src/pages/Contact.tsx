import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  ShieldCheck, 
  MessageSquare,
  Building2,
  Users
} from 'lucide-react';
import './Contact.css';

interface ContactFormData {
  fullName: string;
  email: string;
  telephone: string;
  enquiryType: 'Employer Staffing' | 'Candidate Query' | 'General Enquiry';
  subject: string;
  message: string;
  privacyConsent: boolean;
}

const initialContactData: ContactFormData = {
  fullName: '',
  email: '',
  telephone: '',
  enquiryType: 'Employer Staffing',
  subject: '',
  message: '',
  privacyConsent: false
};

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>(initialContactData);
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  const validate = () => {
    const newErrors: Partial<Record<keyof ContactFormData, string>> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Please enter your full name';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Please provide your email address';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.subject.trim()) {
      newErrors.subject = 'Please enter an enquiry subject';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Please provide details of your enquiry';
    }
    if (!formData.privacyConsent) {
      newErrors.privacyConsent = 'You must acknowledge our privacy notice to proceed';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }

    if (errors[name as keyof ContactFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const refCode = `LICHT-MSG-${Math.floor(10000 + Math.random() * 90000)}`;
      setIsSubmitting(false);
      setSubmittedRef(refCode);
      setFormData(initialContactData);
    }, 1100);
  };

  return (
    <div className="contact-page">
      {/* Hero */}
      <section className="contact-hero">
        <div className="container text-center max-w-800">
          <div className="figma-hero-eyebrow center-eyebrow">
            <span className="figma-gold-dash" />
            <span>CONTACT US</span>
          </div>
          <h1 className="contact-hero-title">
            Let's start a <br />
            <span className="hero-text-gold">conversation.</span>
          </h1>
          <p className="contact-hero-lead">
            We welcome enquiries from care home owners, healthcare staffing coordinators, corporate employers, and prospective candidates throughout the UK.
          </p>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="section section-dark contact-main-section">
        <div className="container contact-grid">
          {/* Left Column: Form */}
          <div className="contact-form-column">
            {submittedRef ? (
              <div className="form-success-card">
                <div className="success-icon-box">
                  <CheckCircle2 size={44} className="gold-icon" />
                </div>
                <h3>Enquiry Successfully Received</h3>
                <p className="success-ref">Message Reference: <strong>{submittedRef}</strong></p>
                <p className="success-message">
                  Thank you for getting in touch. Your message has been routed to our recruitment consultancy team. We endeavour to respond to all enquiries within one business day.
                </p>
                <button 
                  type="button" 
                  className="btn btn-primary"
                  onClick={() => setSubmittedRef(null)}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form className="recruitment-form" onSubmit={handleSubmit} noValidate>
                <div className="form-header-banner">
                  <MessageSquare size={20} className="gold-icon" />
                  <div>
                    <h4>Send a Message to Our Consultants</h4>
                    <p>Select your enquiry category and complete the details below.</p>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="enquiryType">
                    Enquiry Type <span className="required">*</span>
                  </label>
                  <select
                    id="enquiryType"
                    name="enquiryType"
                    className="form-select"
                    value={formData.enquiryType}
                    onChange={handleChange}
                  >
                    <option value="Employer Staffing">Employer Staffing Enquiry (Care Homes, Healthcare, Corporate)</option>
                    <option value="Candidate Query">Candidate Career / CV Query</option>
                    <option value="General Enquiry">General Business Enquiry</option>
                  </select>
                </div>

                <div className="form-grid-2">
                  <div className="form-group">
                    <label className="form-label" htmlFor="fullName">
                      Your Full Name <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      className={`form-input ${errors.fullName ? 'input-error' : ''}`}
                      placeholder="e.g. David Morrison"
                      value={formData.fullName}
                      onChange={handleChange}
                    />
                    {errors.fullName && <span className="form-error"><AlertCircle size={12} /> {errors.fullName}</span>}
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="email">
                      Email Address <span className="required">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className={`form-input ${errors.email ? 'input-error' : ''}`}
                      placeholder="e.g. d.morrison@example.com"
                      value={formData.email}
                      onChange={handleChange}
                    />
                    {errors.email && <span className="form-error"><AlertCircle size={12} /> {errors.email}</span>}
                  </div>
                </div>

                <div className="form-grid-2">
                  <div className="form-group">
                    <label className="form-label" htmlFor="telephone">
                      Telephone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      id="telephone"
                      name="telephone"
                      className="form-input"
                      placeholder="e.g. 020 7946 0192"
                      value={formData.telephone}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="subject">
                      Subject / Role Title <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      className={`form-input ${errors.subject ? 'input-error' : ''}`}
                      placeholder="e.g. Staffing Cover Enquiry / Candidate Query"
                      value={formData.subject}
                      onChange={handleChange}
                    />
                    {errors.subject && <span className="form-error"><AlertCircle size={12} /> {errors.subject}</span>}
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="message">
                    Your Message <span className="required">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className={`form-textarea ${errors.message ? 'input-error' : ''}`}
                    placeholder="Provide details about your requirements, vacancy timeline, or enquiry..."
                    value={formData.message}
                    onChange={handleChange}
                  />
                  {errors.message && <span className="form-error"><AlertCircle size={12} /> {errors.message}</span>}
                </div>

                <div className="form-consent-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="privacyConsent"
                      checked={formData.privacyConsent}
                      onChange={handleChange}
                    />
                    <span>
                      I agree that LICHT Recruitment Services Limited may process this information to reply to my query in accordance with the <a href="/privacy-policy" target="_blank" rel="noreferrer">Privacy Policy</a>.
                    </span>
                  </label>
                  {errors.privacyConsent && <span className="form-error"><AlertCircle size={12} /> {errors.privacyConsent}</span>}
                </div>

                <div className="form-submit-row">
                  <button 
                    type="submit" 
                    className="btn btn-primary form-submit-btn" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={18} className="spinner" />
                        <span>Sending Message...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Message</span>
                        <Send size={16} />
                      </>
                    )}
                  </button>
                  <div className="form-privacy-note">
                    <ShieldCheck size={14} className="gold-icon" />
                    <span>No marketing spam. UK GDPR Protected.</span>
                  </div>
                </div>
              </form>
            )}
          </div>

          {/* Right Column: Contact Details & Operating Hours */}
          <div className="contact-details-column">
            <div className="contact-info-card">
              <h3>Direct Channels</h3>
              <p>Speak or correspond directly with our recruitment desk.</p>

              <div className="info-item">
                <div className="info-icon">
                  <Mail size={18} className="gold-icon" />
                </div>
                <div>
                  <span className="info-label">Email Enquiries</span>
                  <a href="mailto:enquiries@lichtrecruitment.co.uk" className="info-val info-link">
                    enquiries@lichtrecruitment.co.uk
                  </a>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">
                  <Clock size={18} className="gold-icon" />
                </div>
                <div>
                  <span className="info-label">Operating Hours</span>
                  <span className="info-val">Monday – Friday: 9:00 AM – 5:30 PM (GMT)</span>
                  <span className="info-sub">Excluding UK Bank Holidays</span>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">
                  <MapPin size={18} className="gold-icon" />
                </div>
                <div>
                  <span className="info-label">Geographic Coverage</span>
                  <span className="info-val">United Kingdom</span>
                  <span className="info-sub">Supporting clients across England, Wales & Scotland</span>
                </div>
              </div>
            </div>

            <div className="contact-info-card alternative-actions-card">
              <h3>Fast-Track Portals</h3>
              <p>Depending on your goal, you may prefer our dedicated portals:</p>
              
              <div className="action-buttons-stack">
                <a href="/employers" className="portal-btn">
                  <Building2 size={18} className="gold-icon" />
                  <div>
                    <span className="p-title">Employer Recruitment Portal</span>
                    <span className="p-desc">Submit comprehensive role specifications</span>
                  </div>
                </a>

                <a href="/submit-cv" className="portal-btn">
                  <Users size={18} className="gold-icon" />
                  <div>
                    <span className="p-title">Submit Candidate CV</span>
                    <span className="p-desc">Upload documents for candidate registration</span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
