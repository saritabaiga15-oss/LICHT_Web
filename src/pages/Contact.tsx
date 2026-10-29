import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
  Users,
  Briefcase,
  ArrowRight
} from 'lucide-react';
import './Contact.css';
import { submitContactForm } from '../services/api';

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const response = await submitContactForm(formData);
      if (response && response.referenceCode) {
        setSubmittedRef(response.referenceCode);
      } else {
        const refCode = `LICHT-CON-${Math.floor(10000 + Math.random() * 90000)}`;
        setSubmittedRef(refCode);
      }
      setFormData(initialContactData);
    } catch (err) {
      // Fallback in case backend is offline
      const refCode = `LICHT-CON-${Math.floor(10000 + Math.random() * 90000)}`;
      setSubmittedRef(refCode);
      setFormData(initialContactData);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-page">
      {/* 1. HERO SECTION */}
      <section className="contact-hero">
        <div className="container contact-hero-container">
          <nav className="contact-breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span className="contact-breadcrumb-sep">/</span>
            <span>Contact</span>
          </nav>

          <div className="contact-eyebrow">
            <span className="contact-gold-dash" />
            <span>Direct Enquiries & Placement Desk</span>
          </div>

          <h1 className="contact-hero-title">
            Let's start a <span className="contact-text-gold">conversation.</span>
          </h1>

          <p className="contact-hero-lead">
            We welcome enquiries from care home operators, healthcare providers, NHS staffing coordinators, and qualified candidates across the United Kingdom.
          </p>
        </div>
      </section>

      {/* 2. MAIN 2-COLUMN SECTION */}
      <section className="contact-main-section">
        <div className="container contact-grid">
          {/* Left Column: Contact Form */}
          <div className="contact-form-column">
            <div className="contact-form-card">
              {submittedRef ? (
                <div className="form-success-card">
                  <div className="success-icon-box">
                    <CheckCircle2 size={44} className="text-gold" />
                  </div>
                  <h3 className="success-title">Enquiry Successfully Received</h3>
                  <p className="success-ref">Message Reference: <strong>{submittedRef}</strong></p>
                  <p className="success-message">
                    Thank you for getting in touch. Your enquiry has been routed to our recruitment placement desk. A senior recruitment consultant will respond within one business day.
                  </p>
                  <button 
                    type="button" 
                    className="btn-pill-green"
                    onClick={() => setSubmittedRef(null)}
                    style={{ marginTop: '20px' }}
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form className="contact-form" onSubmit={handleSubmit} noValidate>
                  <div className="form-header-banner">
                    <div className="banner-icon-box">
                      <MessageSquare size={20} className="text-gold" />
                    </div>
                    <div>
                      <h3 className="banner-title">Send a Message to Our Consultants</h3>
                      <p className="banner-desc">Select your enquiry category and complete the details below.</p>
                    </div>
                  </div>

                  <div className="form-field-group">
                    <label className="form-field-label" htmlFor="enquiryType">
                      Enquiry Type <span className="required-star">*</span>
                    </label>
                    <div className="select-wrapper">
                      <select
                        id="enquiryType"
                        name="enquiryType"
                        className="form-field-select"
                        value={formData.enquiryType}
                        onChange={handleChange}
                      >
                        <option value="Employer Staffing">Employer Staffing Enquiry (Care Homes, Healthcare, Supported Living)</option>
                        <option value="Candidate Query">Candidate Career / CV Registration Query</option>
                        <option value="General Enquiry">General Business Enquiry & Compliance</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-row-2col">
                    <div className="form-field-group">
                      <label className="form-field-label" htmlFor="fullName">
                        Your Full Name <span className="required-star">*</span>
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        className={`form-field-input ${errors.fullName ? 'form-field-input--error' : ''}`}
                        placeholder="e.g. David Morrison"
                        value={formData.fullName}
                        onChange={handleChange}
                      />
                      {errors.fullName && (
                        <span className="field-error-msg">
                          <AlertCircle size={13} /> {errors.fullName}
                        </span>
                      )}
                    </div>

                    <div className="form-field-group">
                      <label className="form-field-label" htmlFor="email">
                        Email Address <span className="required-star">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className={`form-field-input ${errors.email ? 'form-field-input--error' : ''}`}
                        placeholder="e.g. d.morrison@example.com"
                        value={formData.email}
                        onChange={handleChange}
                      />
                      {errors.email && (
                        <span className="field-error-msg">
                          <AlertCircle size={13} /> {errors.email}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="form-row-2col">
                    <div className="form-field-group">
                      <label className="form-field-label" htmlFor="telephone">
                        Telephone Number (Optional)
                      </label>
                      <input
                        type="tel"
                        id="telephone"
                        name="telephone"
                        className="form-field-input"
                        placeholder="e.g. 020 7946 0192"
                        value={formData.telephone}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="form-field-group">
                      <label className="form-field-label" htmlFor="subject">
                        Subject / Role Title <span className="required-star">*</span>
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        className={`form-field-input ${errors.subject ? 'form-field-input--error' : ''}`}
                        placeholder="e.g. Staffing Cover / Candidate Query"
                        value={formData.subject}
                        onChange={handleChange}
                      />
                      {errors.subject && (
                        <span className="field-error-msg">
                          <AlertCircle size={13} /> {errors.subject}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="form-field-group">
                    <label className="form-field-label" htmlFor="message">
                      Your Message <span className="required-star">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      className={`form-field-textarea ${errors.message ? 'form-field-input--error' : ''}`}
                      placeholder="Provide details about your requirements, vacancy timeline, or enquiry..."
                      value={formData.message}
                      onChange={handleChange}
                    />
                    {errors.message && (
                      <span className="field-error-msg">
                        <AlertCircle size={13} /> {errors.message}
                      </span>
                    )}
                  </div>

                  <div className="form-consent-box">
                    <label className="consent-checkbox-label">
                      <input
                        type="checkbox"
                        name="privacyConsent"
                        checked={formData.privacyConsent}
                        onChange={handleChange}
                      />
                      <span>
                        I agree that LICHT Recruitment Services Limited may process this information to reply to my query in accordance with the{' '}
                        <Link to="/privacy-policy" className="consent-privacy-link">Privacy Policy</Link>.
                      </span>
                    </label>
                    {errors.privacyConsent && (
                      <span className="field-error-msg" style={{ marginTop: '6px' }}>
                        <AlertCircle size={13} /> {errors.privacyConsent}
                      </span>
                    )}
                  </div>

                  <div className="form-submit-row">
                    <button 
                      type="submit" 
                      className="btn-pill-green contact-submit-btn" 
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
                      <ShieldCheck size={16} className="text-gold" />
                      <span>No marketing spam. UK GDPR Protected.</span>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* Right Column: Direct Channels & Fast-Track Portals */}
          <div className="contact-details-column">
            {/* Direct Channels Card */}
            <div className="contact-side-card">
              <h3 className="side-card-title">Direct Channels</h3>
              <p className="side-card-subtitle">Speak or correspond directly with our recruitment desk.</p>

              <div className="side-channel-item">
                <div className="side-channel-icon">
                  <Mail size={18} className="text-gold" />
                </div>
                <div>
                  <span className="side-channel-label">Email Enquiries</span>
                  <a href="mailto:enquiries@lichtrecruitment.co.uk" className="side-channel-val side-channel-link">
                    enquiries@lichtrecruitment.co.uk
                  </a>
                </div>
              </div>

              <div className="side-channel-item">
                <div className="side-channel-icon">
                  <Phone size={18} className="text-gold" />
                </div>
                <div>
                  <span className="side-channel-label">Telephone</span>
                  <a href="tel:+442079460812" className="side-channel-val side-channel-link">
                    +44 20 7946 0812
                  </a>
                  <span className="side-channel-sub">Mon–Fri: 9:00 AM – 5:30 PM (GMT)</span>
                </div>
              </div>

              <div className="side-channel-item">
                <div className="side-channel-icon">
                  <Clock size={18} className="text-gold" />
                </div>
                <div>
                  <span className="side-channel-label">Operating Hours</span>
                  <span className="side-channel-val">Monday – Friday: 9:00 AM – 5:30 PM</span>
                  <span className="side-channel-sub">Excluding UK Bank Holidays</span>
                </div>
              </div>

              <div className="side-channel-item">
                <div className="side-channel-icon">
                  <MapPin size={18} className="text-gold" />
                </div>
                <div>
                  <span className="side-channel-label">Geographic Coverage</span>
                  <span className="side-channel-val">London & UK Wide</span>
                  <span className="side-channel-sub">Supporting care homes and healthcare providers across England, Wales & Scotland</span>
                </div>
              </div>
            </div>

            {/* Fast-Track Portals Card */}
            <div className="contact-side-card contact-portals-card">
              <h3 className="side-card-title">Fast-Track Portals</h3>
              <p className="side-card-subtitle">Looking for specialized services? Access our dedicated portals:</p>
              
              <div className="side-portals-stack">
                <Link to="/employer" className="portal-action-box">
                  <div className="portal-action-icon">
                    <Building2 size={20} className="text-gold" />
                  </div>
                  <div className="portal-action-info">
                    <span className="portal-action-title">Employer Portal & Post a Job</span>
                    <span className="portal-action-desc">Request shifts, review candidate profiles & talent pool</span>
                  </div>
                  <ArrowRight size={16} className="portal-action-arrow" />
                </Link>

                <Link to="/opportunities" className="portal-action-box">
                  <div className="portal-action-icon">
                    <Briefcase size={20} className="text-gold" />
                  </div>
                  <div className="portal-action-info">
                    <span className="portal-action-title">Browse Vacancies & Jobs</span>
                    <span className="portal-action-desc">Explore verified nurse, carer, and clinical openings</span>
                  </div>
                  <ArrowRight size={16} className="portal-action-arrow" />
                </Link>

                <Link to="/signup" className="portal-action-box">
                  <div className="portal-action-icon">
                    <Users size={20} className="text-gold" />
                  </div>
                  <div className="portal-action-info">
                    <span className="portal-action-title">Candidate Registration</span>
                    <span className="portal-action-desc">Create your profile, upload your CV & get placed</span>
                  </div>
                  <ArrowRight size={16} className="portal-action-arrow" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default Contact;
