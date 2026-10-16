import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  UploadCloud, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  ShieldCheck, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Briefcase,
  X,
  Send,
  Info
} from 'lucide-react';
import './Forms.css';

interface CandidateData {
  fullName: string;
  email: string;
  telephone: string;
  preferredSector: string;
  targetRole: string;
  preferredLocation: string;
  message: string;
  privacyConsent: boolean;
}

export const CandidateCVForm: React.FC = () => {
  const [searchParams] = useSearchParams();
  const prefillRole = searchParams.get('role') || '';

  const [formData, setFormData] = useState<CandidateData>({
    fullName: '',
    email: '',
    telephone: '',
    preferredSector: 'Care Homes',
    targetRole: prefillRole,
    preferredLocation: '',
    message: '',
    privacyConsent: false
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof CandidateData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (prefillRole) {
      setFormData(prev => ({ ...prev, targetRole: prefillRole }));
    }
  }, [prefillRole]);

  const validateFile = (file: File) => {
    const validTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!validTypes.includes(file.type) && !/\.(pdf|doc|docx)$/i.test(file.name)) {
      setFileError('Invalid file format. Please upload your CV as a PDF, DOC, or DOCX document.');
      return false;
    }

    if (file.size > maxSize) {
      setFileError('File exceeds 5MB limit. Please provide an optimised document.');
      return false;
    }

    setFileError(null);
    return true;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (validateFile(file)) {
        setSelectedFile(file);
      } else {
        setSelectedFile(null);
      }
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (validateFile(file)) {
        setSelectedFile(file);
      } else {
        setSelectedFile(null);
      }
    }
  };

  const validate = () => {
    const newErrors: Partial<Record<keyof CandidateData, string>> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full legal name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please provide a valid email format';
    }
    if (!formData.telephone.trim()) {
      newErrors.telephone = 'Contact telephone is required';
    }
    if (!formData.targetRole.trim()) {
      newErrors.targetRole = 'Please indicate your target role or area of interest';
    }
    if (!selectedFile) {
      setFileError('Please attach your CV document (PDF, DOC, or DOCX up to 5MB)');
    }
    if (!formData.privacyConsent) {
      newErrors.privacyConsent = 'You must acknowledge the candidate privacy policy to submit';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0 && selectedFile !== null;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }

    if (errors[name as keyof CandidateData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const refNumber = `LICHT-CAN-${Math.floor(10000 + Math.random() * 90000)}`;
      setIsSubmitting(false);
      setSubmissionSuccess(refNumber);
    }, 1200);
  };

  if (submissionSuccess) {
    return (
      <div className="form-success-card">
        <div className="success-icon-box">
          <CheckCircle2 size={44} className="gold-icon" />
        </div>
        <h3>CV Submitted Successfully</h3>
        <p className="success-ref">Candidate Reference: <strong>{submissionSuccess}</strong></p>
        <p className="success-message">
          Thank you, <strong>{formData.fullName}</strong>. Your profile and CV have been securely received by LICHT Recruitment Services Limited. Our recruitment consultants review incoming candidate submissions against active and prospective opportunities matching your experience and sector preferences.
        </p>
        <div className="success-notice">
          <Info size={15} className="gold-icon" />
          <span>
            Please note: Submission of your CV does not guarantee job placement or an interview. If a suitable vacancy aligns with your skills and right-to-work requirements, a consultant will get in touch with you directly.
          </span>
        </div>
        <button 
          type="button" 
          className="btn btn-primary"
          onClick={() => {
            setSubmissionSuccess(null);
            setSelectedFile(null);
            setFormData({
              fullName: '',
              email: '',
              telephone: '',
              preferredSector: 'Care Homes',
              targetRole: '',
              preferredLocation: '',
              message: '',
              privacyConsent: false
            });
          }}
        >
          Submit Another Profile / CV
        </button>
      </div>
    );
  }

  return (
    <form className="recruitment-form candidate-cv-form" onSubmit={handleSubmit} noValidate>
      <div className="form-header-banner">
        <FileText size={20} className="gold-icon" />
        <div>
          <h4>Candidate CV & Registration Submission</h4>
          <p>Share your professional credentials for consideration across suitable vacancies.</p>
        </div>
      </div>

      <div className="form-grid-2">
        <div className="form-group">
          <label className="form-label" htmlFor="fullName">
            Full Name <span className="required">*</span>
          </label>
          <div className="input-with-icon">
            <User size={16} className="input-icon" />
            <input
              type="text"
              id="fullName"
              name="fullName"
              className={`form-input ${errors.fullName ? 'input-error' : ''}`}
              placeholder="e.g. Sarah Jenkins"
              value={formData.fullName}
              onChange={handleChange}
            />
          </div>
          {errors.fullName && <span className="form-error"><AlertCircle size={12} /> {errors.fullName}</span>}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="email">
            Email Address <span className="required">*</span>
          </label>
          <div className="input-with-icon">
            <Mail size={16} className="input-icon" />
            <input
              type="email"
              id="email"
              name="email"
              className={`form-input ${errors.email ? 'input-error' : ''}`}
              placeholder="e.g. s.jenkins@example.com"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          {errors.email && <span className="form-error"><AlertCircle size={12} /> {errors.email}</span>}
        </div>
      </div>

      <div className="form-grid-2">
        <div className="form-group">
          <label className="form-label" htmlFor="telephone">
            Contact Telephone <span className="required">*</span>
          </label>
          <div className="input-with-icon">
            <Phone size={16} className="input-icon" />
            <input
              type="tel"
              id="telephone"
              name="telephone"
              className={`form-input ${errors.telephone ? 'input-error' : ''}`}
              placeholder="e.g. 07700 900456"
              value={formData.telephone}
              onChange={handleChange}
            />
          </div>
          {errors.telephone && <span className="form-error"><AlertCircle size={12} /> {errors.telephone}</span>}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="preferredLocation">
            Preferred Location / Commutable Radius
          </label>
          <div className="input-with-icon">
            <MapPin size={16} className="input-icon" />
            <input
              type="text"
              id="preferredLocation"
              name="preferredLocation"
              className="form-input"
              placeholder="e.g. London / Manchester / Within 15 miles"
              value={formData.preferredLocation}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      <div className="form-grid-2">
        <div className="form-group">
          <label className="form-label" htmlFor="preferredSector">
            Target Sector <span className="required">*</span>
          </label>
          <select
            id="preferredSector"
            name="preferredSector"
            className="form-select"
            value={formData.preferredSector}
            onChange={handleChange}
          >
            <option value="Care Homes">Care Homes (Care Assistant, Senior, Support Worker)</option>
            <option value="Healthcare">Healthcare Providers (Clinical & Support Staff)</option>
            <option value="Corporate">Corporate (Admin, Customer Service, Operations)</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="targetRole">
            Target Role / Job Title <span className="required">*</span>
          </label>
          <div className="input-with-icon">
            <Briefcase size={16} className="input-icon" />
            <input
              type="text"
              id="targetRole"
              name="targetRole"
              className={`form-input ${errors.targetRole ? 'input-error' : ''}`}
              placeholder="e.g. Senior Care Assistant / Office Administrator"
              value={formData.targetRole}
              onChange={handleChange}
            />
          </div>
          {errors.targetRole && <span className="form-error"><AlertCircle size={12} /> {errors.targetRole}</span>}
        </div>
      </div>

      {/* CV Drag & Drop File Upload */}
      <div className="form-group">
        <label className="form-label">
          Upload Your CV Document <span className="required">*</span>
        </label>
        
        {!selectedFile ? (
          <div 
            className={`file-upload-zone ${isDragging ? 'dragging' : ''} ${fileError ? 'zone-error' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <UploadCloud size={36} className="gold-icon upload-cloud-icon" />
            <p className="upload-main-text">
              Drag and drop your CV file here, or <span className="upload-browse">browse from your device</span>
            </p>
            <p className="upload-sub-text">
              Accepted formats: PDF, DOC, DOCX (Maximum file size: 5MB)
            </p>
            <input
              type="file"
              id="cvFile"
              name="cvFile"
              className="file-hidden-input"
              accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              onChange={handleFileChange}
            />
          </div>
        ) : (
          <div className="selected-file-card">
            <div className="file-info-col">
              <FileText size={28} className="gold-icon" />
              <div>
                <span className="file-name">{selectedFile.name}</span>
                <span className="file-size">{(selectedFile.size / 1024).toFixed(1)} KB</span>
              </div>
            </div>
            <button 
              type="button" 
              className="remove-file-btn"
              onClick={() => setSelectedFile(null)}
              aria-label="Remove attached CV"
            >
              <X size={18} />
              <span>Remove</span>
            </button>
          </div>
        )}
        {fileError && <span className="form-error"><AlertCircle size={12} /> {fileError}</span>}
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="message">
          Summary of Experience & Availability (Optional)
        </label>
        <textarea
          id="message"
          name="message"
          rows={3}
          className="form-textarea"
          placeholder="Briefly state your qualifications, notice period, shift preferences, or key certifications (e.g. NVQ Level 3, Care Certificate, Enhanced DBS status)..."
          value={formData.message}
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
            I agree that my CV and details may be processed by LICHT Recruitment Services Limited for recruitment purposes in accordance with the <a href="/privacy-policy" target="_blank" rel="noreferrer">Candidate Privacy Notice</a>.
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
              <span>Uploading & Registering...</span>
            </>
          ) : (
            <>
              <span>Submit CV to Recruitment Team</span>
              <Send size={16} />
            </>
          )}
        </button>
        <div className="form-privacy-note">
          <ShieldCheck size={14} className="gold-icon" />
          <span>Encrypted transmission. Strictly confidential. UK GDPR Compliant.</span>
        </div>
      </div>
    </form>
  );
};
