import React, { useState } from 'react';
import { 
  Building2, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  ShieldCheck, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Briefcase,
  Users
} from 'lucide-react';
import './Forms.css';
import { submitEmployerStaffingForm } from '../../services/api';

interface FormData {
  organisationName: string;
  contactPerson: string;
  businessEmail: string;
  telephone: string;
  sector: string;
  jobTitle: string;
  numberOfVacancies: string;
  workLocation: string;
  recruitmentType: string;
  requiredExperience: string;
  expectedStartDate: string;
  additionalNotes: string;
  privacyConsent: boolean;
}

const initialData: FormData = {
  organisationName: '',
  contactPerson: '',
  businessEmail: '',
  telephone: '',
  sector: 'Care Homes',
  jobTitle: '',
  numberOfVacancies: '1',
  workLocation: '',
  recruitmentType: 'Permanent',
  requiredExperience: '',
  expectedStartDate: '',
  additionalNotes: '',
  privacyConsent: false
};

export const EmployerEnquiryForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>(initialData);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submissionSuccess, setSubmissionSuccess] = useState<string | null>(null);

  const validate = () => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (!formData.organisationName.trim()) {
      newErrors.organisationName = 'Please provide your organisation name';
    }
    if (!formData.contactPerson.trim()) {
      newErrors.contactPerson = 'Please provide a primary contact name';
    }
    if (!formData.businessEmail.trim()) {
      newErrors.businessEmail = 'Business email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.businessEmail)) {
      newErrors.businessEmail = 'Please provide a valid corporate email format';
    }
    if (!formData.telephone.trim()) {
      newErrors.telephone = 'Please provide a contact telephone number';
    }
    if (!formData.jobTitle.trim()) {
      newErrors.jobTitle = 'Please specify the vacancy or role required';
    }
    if (!formData.workLocation.trim()) {
      newErrors.workLocation = 'Please specify the workplace town, city, or postcode area';
    }
    if (!formData.privacyConsent) {
      newErrors.privacyConsent = 'You must acknowledge the recruitment privacy policy to proceed';
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

    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      setSubmitError(null);
      const res = await submitEmployerStaffingForm(formData);
      // Only the server-issued reference proves the enquiry was stored
      setSubmissionSuccess(res?.referenceCode || 'Submitted');
      setFormData(initialData);
    } catch (err: any) {
      setSubmitError(err?.message || 'We could not send your enquiry. Please try again, or call us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submissionSuccess) {
    return (
      <div className="form-success-card">
        <div className="success-icon-box">
          <CheckCircle2 size={44} className="gold-icon" />
        </div>
        <h3>Recruitment Enquiry Received</h3>
        <p className="success-ref">Reference Code: <strong>{submissionSuccess}</strong></p>
        <p className="success-message">
          Thank you. Your staffing requirements have been securely recorded by LICHT Recruitment Services Limited. A dedicated recruitment consultant will review your specifications and contact your organisation within normal business hours to discuss the recruitment approach.
        </p>
        <button 
          type="button" 
          className="btn btn-primary"
          onClick={() => setSubmissionSuccess(null)}
        >
          Submit Another Staffing Request
        </button>
      </div>
    );
  }

  return (
    <form className="recruitment-form" onSubmit={handleSubmit} noValidate>
      <div className="form-header-banner">
        <Building2 size={20} className="gold-icon" />
        <div>
          <h4>Employer Recruitment Enquiry</h4>
          <p>Complete this form to discuss your workforce requirements with our recruitment team.</p>
        </div>
      </div>

      <div className="form-grid-2">
        <div className="form-group">
          <label className="form-label" htmlFor="organisationName">
            Organisation / Company Name <span className="required">*</span>
          </label>
          <div className="input-with-icon">
            <Building2 size={16} className="input-icon" />
            <input
              type="text"
              id="organisationName"
              name="organisationName"
              className={`form-input ${errors.organisationName ? 'input-error' : ''}`}
              placeholder="e.g. St. Jude Care Home Ltd / Apex Logistics"
              value={formData.organisationName}
              onChange={handleChange}
            />
          </div>
          {errors.organisationName && <span className="form-error"><AlertCircle size={12} /> {errors.organisationName}</span>}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="contactPerson">
            Contact Person & Title <span className="required">*</span>
          </label>
          <div className="input-with-icon">
            <User size={16} className="input-icon" />
            <input
              type="text"
              id="contactPerson"
              name="contactPerson"
              className={`form-input ${errors.contactPerson ? 'input-error' : ''}`}
              placeholder="e.g. Eleanor Vance (Registered Care Manager)"
              value={formData.contactPerson}
              onChange={handleChange}
            />
          </div>
          {errors.contactPerson && <span className="form-error"><AlertCircle size={12} /> {errors.contactPerson}</span>}
        </div>
      </div>

      <div className="form-grid-2">
        <div className="form-group">
          <label className="form-label" htmlFor="businessEmail">
            Business Email Address <span className="required">*</span>
          </label>
          <div className="input-with-icon">
            <Mail size={16} className="input-icon" />
            <input
              type="email"
              autoComplete="email"
              id="businessEmail"
              name="businessEmail"
              className={`form-input ${errors.businessEmail ? 'input-error' : ''}`}
              placeholder="e.g. management@organisation.co.uk"
              value={formData.businessEmail}
              onChange={handleChange}
            />
          </div>
          {errors.businessEmail && <span className="form-error"><AlertCircle size={12} /> {errors.businessEmail}</span>}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="telephone">
            Contact Telephone <span className="required">*</span>
          </label>
          <div className="input-with-icon">
            <Phone size={16} className="input-icon" />
            <input
              type="tel"
              autoComplete="tel"
              id="telephone"
              name="telephone"
              className={`form-input ${errors.telephone ? 'input-error' : ''}`}
              placeholder="e.g. 020 7946 0912 or 07700 900123"
              value={formData.telephone}
              onChange={handleChange}
            />
          </div>
          {errors.telephone && <span className="form-error"><AlertCircle size={12} /> {errors.telephone}</span>}
        </div>
      </div>

      <div className="form-grid-3">
        <div className="form-group">
          <label className="form-label" htmlFor="sector">
            Recruitment Sector <span className="required">*</span>
          </label>
          <select
            id="sector"
            name="sector"
            className="form-select"
            value={formData.sector}
            onChange={handleChange}
          >
            <option value="Care Homes">Care Homes</option>
            <option value="Healthcare">Healthcare Providers</option>
            <option value="Corporate">Corporate / Commercial</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="jobTitle">
            Role / Vacancy Title <span className="required">*</span>
          </label>
          <div className="input-with-icon">
            <Briefcase size={16} className="input-icon" />
            <input
              type="text"
              id="jobTitle"
              name="jobTitle"
              className={`form-input ${errors.jobTitle ? 'input-error' : ''}`}
              placeholder="e.g. Senior Care Assistant / Office Admin"
              value={formData.jobTitle}
              onChange={handleChange}
            />
          </div>
          {errors.jobTitle && <span className="form-error"><AlertCircle size={12} /> {errors.jobTitle}</span>}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="numberOfVacancies">
            Number of Openings
          </label>
          <div className="input-with-icon">
            <Users size={16} className="input-icon" />
            <input
              type="number"
              id="numberOfVacancies"
              name="numberOfVacancies"
              min="1"
              max="50"
              className="form-input"
              value={formData.numberOfVacancies}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      <div className="form-grid-3">
        <div className="form-group">
          <label className="form-label" htmlFor="workLocation">
            Workplace Location <span className="required">*</span>
          </label>
          <div className="input-with-icon">
            <MapPin size={16} className="input-icon" />
            <input
              type="text"
              id="workLocation"
              name="workLocation"
              className={`form-input ${errors.workLocation ? 'input-error' : ''}`}
              placeholder="e.g. Croydon / Manchester / Hybrid"
              value={formData.workLocation}
              onChange={handleChange}
            />
          </div>
          {errors.workLocation && <span className="form-error"><AlertCircle size={12} /> {errors.workLocation}</span>}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="recruitmentType">
            Engagement Model
          </label>
          <select
            id="recruitmentType"
            name="recruitmentType"
            className="form-select"
            value={formData.recruitmentType}
            onChange={handleChange}
          >
            <option value="Permanent">Permanent Placement</option>
            <option value="Temporary">Temporary / Shift Cover</option>
            <option value="Contract">Fixed-Term Contract</option>
            <option value="Unsure">To Be Discussed</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="expectedStartDate">
            Target Start Date
          </label>
          <div className="input-with-icon">
            <Calendar size={16} className="input-icon" />
            <input
              type="text"
              id="expectedStartDate"
              name="expectedStartDate"
              className="form-input"
              placeholder="e.g. Immediate / Next Month"
              value={formData.expectedStartDate}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="requiredExperience">
          Essential Qualifications & Experience Criteria
        </label>
        <textarea
          id="requiredExperience"
          name="requiredExperience"
          rows={3}
          className="form-textarea"
          placeholder="e.g. Level 3 Health & Social Care required, medication handling experience, shift flexibility, minimum 1 year care home background..."
          value={formData.requiredExperience}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="additionalNotes">
          Additional Information or Scheduling Notes
        </label>
        <textarea
          id="additionalNotes"
          name="additionalNotes"
          rows={2}
          className="form-textarea"
          placeholder="Any specific shift patterns, working hours, salary bands, or preferred consultation times..."
          value={formData.additionalNotes}
          onChange={handleChange}
        />
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
            I acknowledge that information provided will be used by LICHT Recruitment Services Limited to respond to this recruitment enquiry in accordance with our <a href="/privacy-policy" target="_blank" rel="noreferrer">Privacy Policy</a>.
          </span>
        </label>
        {errors.privacyConsent && <span className="form-error"><AlertCircle size={12} /> {errors.privacyConsent}</span>}
      </div>

      {submitError && (
        <div className="form-error" role="alert" style={{ marginBottom: '12px' }}>
          {submitError}
        </div>
      )}
      <div className="form-submit-row">
        <button 
          type="submit" 
          className="btn btn-primary form-submit-btn" 
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 size={18} className="spinner" />
              <span>Transmitting Request...</span>
            </>
          ) : (
            <>
              <span>Submit Recruitment Enquiry</span>
              <Send size={16} />
            </>
          )}
        </button>
        <div className="form-privacy-note">
          <ShieldCheck size={14} className="gold-icon" />
          <span>Strictly confidential. No marketing spam. UK GDPR Compliant.</span>
        </div>
      </div>
    </form>
  );
};
