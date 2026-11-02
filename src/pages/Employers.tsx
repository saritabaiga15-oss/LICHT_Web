import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, CheckCircle, Info } from 'lucide-react';
import './Employers.css';

export const Employers: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: 'Alex Morgan',
    organisation: 'Example care organisation',
    email: 'alex@',
    phone: '',
    sector: 'Care homes',
    staffingType: 'Temporary cover',
    roleRequired: '',
    workLocation: 'London',
    numberOfPeople: '2',
    startDate: '',
    moreInfo: '',
    consent: true
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({
    email: 'Enter a valid email address.',
    roleRequired: 'Tell us which role you need to fill.'
  });
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Please enter your full name.';
    }
    if (!formData.organisation.trim()) {
      newErrors.organisation = 'Please enter your organisation name.';
    }
    if (!formData.email.trim() || !formData.email.includes('@') || !formData.email.includes('.')) {
      newErrors.email = 'Enter a valid email address.';
    }
    if (!formData.roleRequired.trim()) {
      newErrors.roleRequired = 'Tell us which role you need to fill.';
    }
    if (!formData.workLocation.trim()) {
      newErrors.workLocation = 'Please enter the work location.';
    }
    if (!formData.consent) {
      newErrors.consent = 'Please confirm you accept the privacy policy.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
    }
  };

  return (
    <div className="employers-page">
      {/* 1. Header & Hero */}
      <section className="employers-hero">
        <div className="container">
          <nav className="figma-breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span className="figma-breadcrumb-separator">/</span>
            <Link to="/employers">Employers</Link>
            <span className="figma-breadcrumb-separator">/</span>
            <span>Request staff</span>
          </nav>

          <div className="figma-eyebrow">Employers / Request staff</div>
          <h1 className="employers-hero__title">
            Your next great hire starts here.
          </h1>
          <p className="employers-hero__subtitle">
            Tell us about your staffing needs. We'll use your brief to start a focused conversation about the right support.
          </p>
        </div>
      </section>

      {/* 2. Main 2-Column Section */}
      <section className="employers-main-section">
        <div className="container employers-main-grid">
          {/* Left Column: Context, Image, Steps, Callout */}
          <div className="employers-left-col">
            <div className="figma-eyebrow">A partnership from the start</div>
            <h2 className="employers-section-title">
              Built around your people.
            </h2>
            <p className="employers-left-text">
              Whether you need cover for a shift or a permanent addition to your team, give us the details that matter.
            </p>

            <div className="employers-left-photo-wrap">
              <img 
                src="/assets/approach_discussion.jpg" 
                alt="Two professional colleagues in thoughtful recruitment review" 
                className="employers-left-photo"
              />
            </div>

            <div className="what-happens-next">
              <h3 className="what-happens-next__heading">What happens next</h3>
              <div className="what-happens-next__steps">
                <div className="whn-step">
                  <span className="whn-step__num">01</span>
                  <span className="whn-step__text">We review your requirements.</span>
                </div>
                <div className="whn-step">
                  <span className="whn-step__num">02</span>
                  <span className="whn-step__text">We clarify the role and your priorities.</span>
                </div>
                <div className="whn-step">
                  <span className="whn-step__num">03</span>
                  <span className="whn-step__text">We agree a suitable recruitment approach.</span>
                </div>
              </div>
            </div>

            <div className="employers-contact-callout">
              <div className="employers-contact-callout__icon">
                <Info size={20} color="#204836" />
              </div>
              <div>
                <h4 className="employers-contact-callout__title">Need to discuss your requirements first?</h4>
                <p className="employers-contact-callout__p">
                  Use the <Link to="/contact">contact form</Link> to ask a question before sending a staffing brief.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Request Staff Form Card */}
          <div className="employers-right-col">
            <div className="request-staff-card">
              <h2 className="request-staff-card__title">Request staff</h2>
              <p className="request-staff-card__sub">Fields marked * are required.</p>

              {/* Validation alert banner if errors present */}
              {Object.keys(errors).length > 0 && !submitted && (
                <div className="form-error-banner" role="alert">
                  <AlertCircle size={20} className="form-error-icon" />
                  <div>
                    <strong className="form-error-title">Please check the highlighted fields.</strong>
                    <p className="form-error-text">Enter a valid work email and tell us which role you need.</p>
                  </div>
                </div>
              )}

              {submitted ? (
                <div className="form-success-box">
                  <CheckCircle size={48} color="#204836" className="form-success-icon" />
                  <h3 className="form-success-title">Staffing Request Received</h3>
                  <p className="form-success-desc">
                    Thank you, {formData.fullName}. We have received your staffing brief for {formData.organisation}. A member of our recruitment team will be in touch promptly to discuss your requirements.
                  </p>
                  <button 
                    type="button" 
                    onClick={() => { setSubmitted(false); setErrors({}); }}
                    className="btn-pill-green"
                    style={{ marginTop: '20px' }}
                  >
                    Submit another request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="staff-request-form">
                  {/* SECTION 01 */}
                  <div className="form-section-label">01 / YOUR DETAILS</div>
                  
                  <div className="form-row-2col">
                    <div className="form-group">
                      <label htmlFor="fullName" className="form-label">
                        Full name *
                      </label>
                      <input 
                        type="text" 
                        id="fullName" 
                        className={`form-input ${errors.fullName ? 'form-input--error' : ''}`}
                        placeholder="Alex Morgan"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      />
                      {errors.fullName && <span className="field-error">{errors.fullName}</span>}
                    </div>

                    <div className="form-group">
                      <label htmlFor="organisation" className="form-label">
                        Organisation *
                      </label>
                      <input 
                        type="text" 
                        id="organisation" 
                        className={`form-input ${errors.organisation ? 'form-input--error' : ''}`}
                        placeholder="Example care organisation"
                        value={formData.organisation}
                        onChange={(e) => setFormData({ ...formData, organisation: e.target.value })}
                      />
                      {errors.organisation && <span className="field-error">{errors.organisation}</span>}
                    </div>
                  </div>

                  <div className="form-row-2col">
                    <div className="form-group">
                      <label htmlFor="email" className="form-label">
                        Work email *
                      </label>
                      <div className="input-with-icon">
                        <input 
                          type="email" 
                          autoComplete="email"
                          id="email" 
                          className={`form-input ${errors.email ? 'form-input--error' : ''}`}
                          placeholder="alex@"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                        {errors.email && <AlertCircle size={18} className="field-error-icon" />}
                      </div>
                      {errors.email && <span className="field-error">{errors.email}</span>}
                    </div>

                    <div className="form-group">
                      <label htmlFor="phone" className="form-label">
                        Phone number
                      </label>
                      <input 
                        type="tel" 
                        autoComplete="tel"
                        id="phone" 
                        className="form-input"
                        placeholder="Your contact number"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                  </div>

                  {/* SECTION 02 */}
                  <div className="form-section-label" style={{ marginTop: '28px' }}>
                    02 / YOUR STAFFING NEEDS
                  </div>

                  <div className="form-row-2col">
                    <div className="form-group">
                      <label htmlFor="sector" className="form-label">
                        Sector *
                      </label>
                      <select 
                        id="sector" 
                        className="form-select"
                        value={formData.sector}
                        onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                      >
                        <option value="Care homes">Care homes</option>
                        <option value="Healthcare">Healthcare</option>
                        <option value="Supported living">Supported living</option>
                        <option value="Corporate">Corporate organisations</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label htmlFor="staffingType" className="form-label">
                        Staffing type *
                      </label>
                      <select 
                        id="staffingType" 
                        className="form-select"
                        value={formData.staffingType}
                        onChange={(e) => setFormData({ ...formData, staffingType: e.target.value })}
                      >
                        <option value="Temporary cover">Temporary cover</option>
                        <option value="Permanent recruitment">Permanent recruitment</option>
                        <option value="Ongoing staffing">Ongoing staffing support</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="roleRequired" className="form-label">
                      Role required *
                    </label>
                    <div className="input-with-icon">
                      <input 
                        type="text" 
                        id="roleRequired" 
                        className={`form-input ${errors.roleRequired ? 'form-input--error' : ''}`}
                        placeholder="e.g. Care assistant"
                        value={formData.roleRequired}
                        onChange={(e) => setFormData({ ...formData, roleRequired: e.target.value })}
                      />
                      {errors.roleRequired && <AlertCircle size={18} className="field-error-icon" />}
                    </div>
                    {errors.roleRequired && <span className="field-error">{errors.roleRequired}</span>}
                  </div>

                  <div className="form-row-2col">
                    <div className="form-group">
                      <label htmlFor="workLocation" className="form-label">
                        Work location *
                      </label>
                      <input 
                        type="text" 
                        id="workLocation" 
                        className={`form-input ${errors.workLocation ? 'form-input--error' : ''}`}
                        placeholder="London"
                        value={formData.workLocation}
                        onChange={(e) => setFormData({ ...formData, workLocation: e.target.value })}
                      />
                      {errors.workLocation && <span className="field-error">{errors.workLocation}</span>}
                    </div>

                    <div className="form-group">
                      <label htmlFor="numberOfPeople" className="form-label">
                        Number of people
                      </label>
                      <select 
                        id="numberOfPeople" 
                        className="form-select"
                        value={formData.numberOfPeople}
                        onChange={(e) => setFormData({ ...formData, numberOfPeople: e.target.value })}
                      >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5+">5+</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="startDate" className="form-label">
                      Preferred start date
                    </label>
                    <input 
                      type="text" 
                      id="startDate" 
                      className="form-input"
                      placeholder="DD / MM / YYYY"
                      value={formData.startDate}
                      onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    />
                    <span className="field-helper">
                      Not sure yet? Leave this blank and we'll discuss timing.
                    </span>
                  </div>

                  <div className="form-group">
                    <label htmlFor="moreInfo" className="form-label">
                      Tell us more
                    </label>
                    <textarea 
                      id="moreInfo" 
                      className="form-textarea"
                      rows={4}
                      placeholder="Shift patterns, experience, setting-specific requirements or anything else we should know."
                      value={formData.moreInfo}
                      onChange={(e) => setFormData({ ...formData, moreInfo: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="checkbox-label">
                      <input 
                        type="checkbox" 
                        checked={formData.consent}
                        onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                      />
                      <span>
                        I have read the <Link to="/privacy-policy" target="_blank">privacy policy</Link> and understand how LICHT will use my information to respond to this request. *
                      </span>
                    </label>
                    {errors.consent && <span className="field-error">{errors.consent}</span>}
                  </div>

                  <div className="form-submit-row">
                    <button type="submit" className="btn-pill-green form-submit-btn">
                      Send staffing request <span className="arrow-up-right">↗</span>
                    </button>
                    <p className="form-disclaimer">
                      Submitting a request does not confirm availability or create a booking.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
