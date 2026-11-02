import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Building2,
  Lock,
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Users,
  Briefcase,
  FileText,
  UploadCloud,
  Check,
  Award,
  MapPin,
  Phone,
  Globe,
  ArrowLeft
} from 'lucide-react';
import { useEmployer } from '../context/EmployerContext';
import { uploadEmployerDocument } from '../services/api';
import { EmployerSector, EmployerUploadedDoc } from '../types/employer';
import './EmployerLogin.css';

interface EmployerLoginProps {
  initialTab?: 'signin' | 'register';
}

export const EmployerLogin: React.FC<EmployerLoginProps> = ({ initialTab = 'signin' }) => {
  const { employerLogin, registerEmployer, isEmployerAuthenticated } = useEmployer();
  // Selected files are held here until the account exists and they can be uploaded
  const [regDocFiles, setRegDocFiles] = useState<Record<string, File>>({});
  const [regDocWarning, setRegDocWarning] = useState('');
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<'signin' | 'register'>(initialTab);

  // Sign In state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [loginPending, setLoginPending] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Registration Multi-Step State
  const [regStep, setRegStep] = useState<1 | 2 | 3>(1);
  const [regSubmitted, setRegSubmitted] = useState(false);
  const [regOrgName, setRegOrgName] = useState('');
  const [regCompanyNumber, setRegCompanyNumber] = useState('');
  const [regFacilityType, setRegFacilityType] = useState('Specialist Dementia & Residential Nursing Home');
  const [regPrimarySector, setRegPrimarySector] = useState<EmployerSector>('Care homes');
  const [regAddress, setRegAddress] = useState('');
  const [regPostcode, setRegPostcode] = useState('');
  const [regWebsite, setRegWebsite] = useState('');

  // Step 2
  const [regContactName, setRegContactName] = useState('');
  const [regRoleTitle, setRegRoleTitle] = useState('Registered Care Manager');
  const [regWorkEmail, setRegWorkEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');

  // Step 3 (Documentation & Compliance)
  const [regCqcId, setRegCqcId] = useState('');
  const [regCqcRating, setRegCqcRating] = useState<'Outstanding' | 'Good' | 'Requires Improvement' | 'Pending Inspection'>('Good');
  const [regInsurancePolicy, setRegInsurancePolicy] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [regComplianceDeclared, setRegComplianceDeclared] = useState(false);
  const [regUploadedDocs, setRegUploadedDocs] = useState<EmployerUploadedDoc[]>([]);
  const [regError, setRegError] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  // If already logged in, redirect to employer dashboard
  React.useEffect(() => {
    if (isEmployerAuthenticated) {
      navigate('/employer', { replace: true });
    }
  }, [isEmployerAuthenticated, navigate]);

  // Handle Sign In submission
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setLoginPending('');

    if (!email.trim() || !email.includes('@')) {
      setLoginError('Please enter a valid work email address.');
      return;
    }

    setIsLoggingIn(true);
    try {
      const result = await employerLogin(email, password);
      setIsLoggingIn(false);
      if (result.success) {
        navigate('/employer');
      } else if (result.status === 'PENDING') {
        setLoginPending(result.message || 'Your registration is pending admin verification.');
      } else {
        setLoginError(result.message || 'Invalid employer credentials.');
      }
    } catch (err: any) {
      setIsLoggingIn(false);
      setLoginError(err?.message || 'Login failed.');
    }
  };

  // Step 1 Validation
  const handleNextToStep2 = (e: React.FormEvent) => {
    e.preventDefault();
    setRegError('');
    if (!regOrgName.trim()) {
      setRegError('Please provide your registered Company / Organisation Name.');
      return;
    }
    if (!regAddress.trim() || !regPostcode.trim()) {
      setRegError('Please specify the facility registered address and UK postcode.');
      return;
    }
    setRegStep(2);
  };

  // Step 2 Validation
  const handleNextToStep3 = (e: React.FormEvent) => {
    e.preventDefault();
    setRegError('');
    if (!regContactName.trim()) {
      setRegError('Please provide the full name of the key contact person.');
      return;
    }
    if (!regWorkEmail.trim() || !regWorkEmail.includes('@')) {
      setRegError('Please enter a valid work email address.');
      return;
    }
    if (!regPhone.trim()) {
      setRegError('Please provide a direct telephone number.');
      return;
    }
    setRegStep(3);
  };

  // File upload handler
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, docType: string) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
      setRegError('Each document must be 10MB or smaller.');
      return;
    }
    if (!/\.(pdf|docx?|jpe?g|png)$/i.test(file.name)) {
      setRegError('Documents must be PDF, DOC, DOCX, JPG or PNG files.');
      return;
    }
    setRegError('');
    const newDoc: EmployerUploadedDoc = {
      id: `doc-${Date.now()}`,
      name: file.name,
      type: docType,
      size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
      date: 'Attached Today',
      verified: false
    };
    setRegUploadedDocs(prev => {
      const filtered = prev.filter(d => d.type !== docType);
      return [...filtered, newDoc];
    });
    setRegDocFiles(prev => ({ ...prev, [newDoc.id]: file }));
  };

  const removeDoc = (docId: string) => {
    setRegUploadedDocs(prev => prev.filter(d => d.id !== docId));
    setRegDocFiles(prev => {
      const next = { ...prev };
      delete next[docId];
      return next;
    });
  };

  // Step 3 (Final Registration)
  const handleCompleteRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegError('');

    if (!regPassword || regPassword.length < 8 || !/[A-Za-z]/.test(regPassword) || !/\d/.test(regPassword)) {
      setRegError('Password must be at least 8 characters and include a letter and a number.');
      return;
    }
    if (regPassword !== regConfirmPassword) {
      setRegError('Passwords do not match.');
      return;
    }
    if (!regComplianceDeclared) {
      setRegError('You must confirm the CQC and UK employment compliance declaration.');
      return;
    }

    setIsRegistering(true);
    try {
      const result = await registerEmployer({
        organisationName: regOrgName.trim(),
        companyNumber: regCompanyNumber.trim() || undefined,
        facilityType: regFacilityType,
        primarySector: regPrimarySector,
        registeredAddress: regAddress.trim(),
        postcode: regPostcode.trim().toUpperCase(),
        location: `${regAddress.trim()}, ${regPostcode.trim().toUpperCase()}`,
        website: regWebsite.trim() || undefined,
        contactName: regContactName.trim(),
        roleTitle: regRoleTitle.trim(),
        email: regWorkEmail.trim(),
        phone: regPhone.trim(),
        cqcProviderId: regCqcId.trim() || undefined,
        cqcRating: regCqcRating,
        insurancePolicy: regInsurancePolicy.trim() || undefined
      }, regPassword);

      // Upload the chosen compliance documents with the one-time registration token
      const failed: string[] = [];
      for (const doc of regUploadedDocs) {
        const file = regDocFiles[doc.id];
        if (!file) continue;
        try {
          await uploadEmployerDocument(file, doc.type, result.documentUploadToken);
        } catch (uploadErr: any) {
          failed.push(`${doc.name} (${uploadErr?.message || 'upload failed'})`);
        }
      }
      setRegDocWarning(failed.length
        ? `Some documents could not be uploaded: ${failed.join('; ')}. Our compliance team will contact you to collect them.`
        : '');

      setIsRegistering(false);
      setRegSubmitted(true);
    } catch (err: any) {
      setIsRegistering(false);
      setRegError(err?.message || 'Registration failed. An account with this email may already exist.');
    }
  };


  return (
    <div className="emp-login-page">
      <div className="container emp-login-container">
        {/* Left Column: B2B Brand Pitch */}
        <div className="emp-login-intro">
          <div className="emp-badge">
            <Building2 size={15} />
            <span>Healthcare Provider & Employer Portal</span>
          </div>

          <h1 className="emp-login-title">
            Hire top-tier healthcare professionals with LICHT.
          </h1>

          <div className="emp-login-perks">
            <div className="emp-perk-item">
              <div className="emp-perk-icon">
                <ShieldCheck size={18} />
              </div>
              <div>
                <strong>CQC & NMC Compliant</strong>
                <p>DBS-cleared candidates with verified right-to-work documentation.</p>
              </div>
            </div>

            <div className="emp-perk-item">
              <div className="emp-perk-icon">
                <Users size={18} />
              </div>
              <div>
                <strong>Pre-Screened Talent Pool</strong>
                <p>Nurses, senior carers & healthcare assistants across the UK.</p>
              </div>
            </div>

            <div className="emp-perk-item">
              <div className="emp-perk-icon">
                <Briefcase size={18} />
              </div>
              <div>
                <strong>Full CV Dossier Access</strong>
                <p>Review work history, certifications & schedule interviews.</p>
              </div>
            </div>
          </div>

          {/* Quick toggle to candidate login */}
          <div className="emp-switch-box">
            <span>Looking for healthcare vacancies instead?</span>
            <Link to="/login" className="emp-switch-link">
              Candidate Login ↗
            </Link>
          </div>
        </div>

        {/* Right Column: Portal Card with Tabs */}
        <div className="emp-login-card-wrap">
          <div className="emp-login-card">
            {/* Tab Header */}
            <div className="emp-auth-tabs">
              <button
                type="button"
                className={`emp-auth-tab ${activeTab === 'signin' ? 'emp-auth-tab--active' : ''}`}
                onClick={() => { setActiveTab('signin'); setLoginError(''); }}
              >
                Sign In to Portal
              </button>
              <button
                type="button"
                className={`emp-auth-tab ${activeTab === 'register' ? 'emp-auth-tab--active' : ''}`}
                onClick={() => { setActiveTab('register'); setRegError(''); }}
              >
                Register Your Company
              </button>
            </div>

            {/* TAB 1: SIGN IN */}
            {activeTab === 'signin' && (
              <div className="emp-auth-pane">
                <div className="emp-card-header">
                  <h2 className="emp-card-title">Sign in to your account</h2>
                  <p className="emp-card-subtitle">
                    Access your organisation dashboard, vacancies, and candidate pipeline.
                  </p>
                </div>

                {loginError && (
                  <div className="emp-error-box" role="alert">
                    <span>{loginError}</span>
                  </div>
                )}

                {loginPending && (
                  <div className="emp-pending-box" role="status">
                    <span>⏳ {loginPending}</span>
                  </div>
                )}

                <form onSubmit={handleSignIn} className="emp-form" noValidate>
                  <div className="emp-input-group">
                    <label htmlFor="emp-email" className="emp-label">Work Email Address</label>
                    <div className="emp-input-wrap">
                      <Mail size={18} className="emp-input-icon" />
                      <input
                        id="emp-email"
                        type="email"
                        autoComplete="email"
                        className="emp-input"
                        placeholder="director@healthcare-group.co.uk"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="emp-input-group">
                    <div className="emp-label-row">
                      <label htmlFor="emp-pwd" className="emp-label">Password</label>
                      <Link to="/contact" className="emp-forgot-link" title="Contact our team to reset your password">
                        Forgot password?
                      </Link>
                    </div>
                    <div className="emp-input-wrap">
                      <Lock size={18} className="emp-input-icon" />
                      <input
                        id="emp-pwd"
                        type={showPassword ? 'text' : 'password'}
                        autoComplete="current-password"
                        className="emp-input"
                        placeholder="••••••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <button
                        type="button"
                        className="emp-eye-btn"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn-pill-green emp-submit-btn"
                    disabled={isLoggingIn}
                  >
                    {isLoggingIn ? 'Signing in...' : 'Sign In to Portal'}
                    <ArrowRight size={16} />
                  </button>
                </form>

                <div className="emp-card-footer">
                  <p>
                    Need to register a new healthcare facility?{' '}
                    <button
                      type="button"
                      onClick={() => setActiveTab('register')}
                      className="emp-link-btn"
                    >
                      Register your company here ↗
                    </button>
                  </p>
                </div>
              </div>
            )}

            {/* TAB 2: REGISTER YOUR COMPANY (MULTI-STEP ONBOARDING) */}
            {activeTab === 'register' && (
              <div className="emp-auth-pane">
                <div className="emp-card-header">
                  <h2 className="emp-card-title">Register Your Healthcare Company</h2>
                  <p className="emp-card-subtitle">
                    Create an employer profile to recruit verified nurses, care leads, and support staff.
                  </p>
                </div>

                {/* Stepper Indicator */}
                <div className="emp-stepper">
                  <div className={`emp-step-node ${regStep >= 1 ? 'emp-step-node--active' : ''}`}>
                    <span className="emp-step-num">1</span>
                    <span className="emp-step-name">Organisation</span>
                  </div>
                  <div className={`emp-step-line ${regStep >= 2 ? 'emp-step-line--active' : ''}`} />
                  <div className={`emp-step-node ${regStep >= 2 ? 'emp-step-node--active' : ''}`}>
                    <span className="emp-step-num">2</span>
                    <span className="emp-step-name">Contact</span>
                  </div>
                  <div className={`emp-step-line ${regStep === 3 ? 'emp-step-line--active' : ''}`} />
                  <div className={`emp-step-node ${regStep === 3 ? 'emp-step-node--active' : ''}`}>
                    <span className="emp-step-num">3</span>
                    <span className="emp-step-name">Documents</span>
                  </div>
                </div>

                {regError && (
                  <div className="emp-error-box" role="alert">
                    <span>{regError}</span>
                  </div>
                )}

                {/* STEP 1: ORGANISATION DETAILS */}
                {regStep === 1 && (
                  <form onSubmit={handleNextToStep2} className="emp-form" noValidate>
                    <div className="emp-input-group">
                      <label htmlFor="reg-org" className="emp-label">Organisation / Care Home Name *</label>
                      <div className="emp-input-wrap">
                        <Building2 size={18} className="emp-input-icon" />
                        <input
                          id="reg-org"
                          type="text"
                          className="emp-input"
                          placeholder="e.g. St. Jude Healthcare Pavilion Ltd"
                          value={regOrgName}
                          onChange={(e) => setRegOrgName(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="emp-input-row-2">
                      <div className="emp-input-group">
                        <label htmlFor="reg-comp-num" className="emp-label">Company Registration No.</label>
                        <input
                          id="reg-comp-num"
                          type="text"
                          className="emp-input"
                          placeholder="e.g. 10982341"
                          value={regCompanyNumber}
                          onChange={(e) => setRegCompanyNumber(e.target.value)}
                        />
                      </div>

                      <div className="emp-input-group">
                        <label htmlFor="reg-sector" className="emp-label">Primary Sector *</label>
                        <select
                          id="reg-sector"
                          className="emp-select"
                          value={regPrimarySector}
                          onChange={(e) => setRegPrimarySector(e.target.value as EmployerSector)}
                        >
                          <option value="Care homes">Care Homes & Nursing Units</option>
                          <option value="Healthcare">Healthcare & Private Clinics</option>
                          <option value="Supported living">Supported Living & Complex Care</option>
                          <option value="Corporate">Corporate & Occupational Health</option>
                        </select>
                      </div>
                    </div>

                    <div className="emp-input-group">
                      <label htmlFor="reg-facility-type" className="emp-label">Facility / Provider Classification *</label>
                      <select
                        id="reg-facility-type"
                        className="emp-select"
                        value={regFacilityType}
                        onChange={(e) => setRegFacilityType(e.target.value)}
                      >
                        <option value="Specialist Dementia & Residential Nursing Home">Specialist Dementia & Residential Nursing Home</option>
                        <option value="Acute Hospital & Surgical Facility">Acute Hospital & Surgical Facility</option>
                        <option value="Supported Living & Learning Disability Centre">Supported Living & Learning Disability Centre</option>
                        <option value="NHS Healthcare Trust / Clinic">NHS Healthcare Trust / Clinic</option>
                        <option value="Domiciliary Care Agency">Domiciliary Care Agency</option>
                        <option value="Palliative & Hospice Care Centre">Palliative & Hospice Care Centre</option>
                      </select>
                    </div>

                    <div className="emp-input-row-2">
                      <div className="emp-input-group">
                        <label htmlFor="reg-address" className="emp-label">Registered Facility Address *</label>
                        <div className="emp-input-wrap">
                          <MapPin size={18} className="emp-input-icon" />
                          <input
                            id="reg-address"
                            type="text"
                            className="emp-input"
                            placeholder="e.g. 14 High Street, Kensington"
                            value={regAddress}
                            onChange={(e) => setRegAddress(e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <div className="emp-input-group">
                        <label htmlFor="reg-postcode" className="emp-label">UK Postcode *</label>
                        <input
                          id="reg-postcode"
                          type="text"
                          className="emp-input"
                          placeholder="e.g. W8 4QP"
                          value={regPostcode}
                          onChange={(e) => setRegPostcode(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="emp-input-group">
                      <label htmlFor="reg-website" className="emp-label">Company Website (Optional)</label>
                      <div className="emp-input-wrap">
                        <Globe size={18} className="emp-input-icon" />
                        <input
                          id="reg-website"
                          type="url"
                          className="emp-input"
                          placeholder="https://www.carehome.co.uk"
                          value={regWebsite}
                          onChange={(e) => setRegWebsite(e.target.value)}
                        />
                      </div>
                    </div>

                    <button type="submit" className="btn-pill-green emp-submit-btn">
                      Continue to Step 2: Key Contact <ArrowRight size={16} />
                    </button>
                  </form>
                )}

                {/* STEP 2: OPERATIONAL CONTACT */}
                {regStep === 2 && (
                  <form onSubmit={handleNextToStep3} className="emp-form" noValidate>
                    <div className="emp-input-group">
                      <label htmlFor="reg-contact" className="emp-label">Key Contact Full Name *</label>
                      <div className="emp-input-wrap">
                        <Users size={18} className="emp-input-icon" />
                        <input
                          id="reg-contact"
                          type="text"
                          className="emp-input"
                          placeholder="e.g. Dr. Julian Thorne"
                          value={regContactName}
                          onChange={(e) => setRegContactName(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="emp-input-group">
                      <label htmlFor="reg-role" className="emp-label">Your Role / Job Title *</label>
                      <div className="emp-input-wrap">
                        <Briefcase size={18} className="emp-input-icon" />
                        <input
                          id="reg-role"
                          type="text"
                          className="emp-input"
                          placeholder="e.g. Director of Clinical Operations / Registered Manager"
                          value={regRoleTitle}
                          onChange={(e) => setRegRoleTitle(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="emp-input-row-2">
                      <div className="emp-input-group">
                        <label htmlFor="reg-work-email" className="emp-label">Official Work Email *</label>
                        <div className="emp-input-wrap">
                          <Mail size={18} className="emp-input-icon" />
                          <input
                            id="reg-work-email"
                            type="email"
                            autoComplete="email"
                            className="emp-input"
                            placeholder="j.thorne@carehome.co.uk"
                            value={regWorkEmail}
                            onChange={(e) => setRegWorkEmail(e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <div className="emp-input-group">
                        <label htmlFor="reg-phone" className="emp-label">Contact Telephone *</label>
                        <div className="emp-input-wrap">
                          <Phone size={18} className="emp-input-icon" />
                          <input
                            id="reg-phone"
                            type="tel"
                            autoComplete="tel"
                            className="emp-input"
                            placeholder="+44 20 7946 0812"
                            value={regPhone}
                            onChange={(e) => setRegPhone(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="emp-btn-flex-row">
                      <button
                        type="button"
                        className="btn-pill-outline emp-back-btn"
                        onClick={() => setRegStep(1)}
                      >
                        <ArrowLeft size={16} /> Back
                      </button>
                      <button type="submit" className="btn-pill-green emp-submit-btn" style={{ flex: 1 }}>
                        Continue to Step 3: Documentation <ArrowRight size={16} />
                      </button>
                    </div>
                  </form>
                )}

                {/* STEP 3: DOCUMENTATION & SECURITY */}
                {regStep === 3 && (
                  <form onSubmit={handleCompleteRegistration} className="emp-form" noValidate>
                    <div className="emp-input-row-2">
                      <div className="emp-input-group">
                        <label htmlFor="reg-cqc" className="emp-label">CQC / Regulatory Provider ID</label>
                        <input
                          id="reg-cqc"
                          type="text"
                          className="emp-input"
                          placeholder="e.g. 1-102938472"
                          value={regCqcId}
                          onChange={(e) => setRegCqcId(e.target.value)}
                        />
                      </div>

                      <div className="emp-input-group">
                        <label htmlFor="reg-cqc-rating" className="emp-label">Current CQC Rating</label>
                        <select
                          id="reg-cqc-rating"
                          className="emp-select"
                          value={regCqcRating}
                          onChange={(e) => setRegCqcRating(e.target.value as any)}
                        >
                          <option value="Outstanding">Outstanding</option>
                          <option value="Good">Good</option>
                          <option value="Requires Improvement">Requires Improvement</option>
                          <option value="Pending Inspection">Pending Inspection</option>
                        </select>
                      </div>
                    </div>

                    <div className="emp-input-group">
                      <label htmlFor="reg-insurance" className="emp-label">Employers' Liability Insurance (ELI) Policy</label>
                      <input
                        id="reg-insurance"
                        type="text"
                        className="emp-input"
                        placeholder="e.g. UK-AVIVA-MED-849201"
                        value={regInsurancePolicy}
                        onChange={(e) => setRegInsurancePolicy(e.target.value)}
                      />
                    </div>

                    {/* Document Upload Section */}
                    <div className="emp-doc-upload-box">
                      <div className="emp-doc-upload-header">
                        <UploadCloud size={18} className="text-gold" />
                        <div>
                          <strong>Company Verification Documents</strong>
                          <p>Upload required compliance documents for admin review.</p>
                        </div>
                      </div>

                      <div className="emp-doc-upload-slots">
                        {[
                          { type: 'CQC Registration', label: 'CQC / Care Inspectorate Certificate', accept: '.pdf,.jpg,.png' },
                          { type: 'Insurance Schedule', label: 'Employers\' Liability Insurance', accept: '.pdf,.jpg,.png' },
                          { type: 'Certificate of Incorporation', label: 'Companies House Certificate', accept: '.pdf,.jpg,.png' },
                          { type: 'Other', label: 'Additional Document (optional)', accept: '.pdf,.jpg,.png,.doc,.docx' }
                        ].map((slot) => {
                          const attached = regUploadedDocs.find(d => d.type === slot.type);
                          return (
                            <div key={slot.type} className="emp-doc-slot">
                              <div className="emp-doc-slot-info">
                                <FileText size={14} className="text-gold" />
                                <span className="emp-doc-slot-label">{slot.label}</span>
                              </div>
                              {attached ? (
                                <div className="emp-doc-pill">
                                  <Check size={13} className="text-green" />
                                  <span className="emp-doc-name">{attached.name}</span>
                                  <button
                                    type="button"
                                    className="emp-doc-remove"
                                    onClick={() => removeDoc(attached.id)}
                                    aria-label="Remove document"
                                  >✕</button>
                                </div>
                              ) : (
                                <label className="emp-upload-btn">
                                  <UploadCloud size={14} /> Choose File
                                  <input
                                    type="file"
                                    accept={slot.accept}
                                    style={{ display: 'none' }}
                                    onChange={(e) => handleFileUpload(e, slot.type)}
                                  />
                                </label>
                              )}
                            </div>
                          );
                        })}
                      </div>

                      {regUploadedDocs.length > 0 && (
                        <p className="emp-doc-note">
                          <CheckCircle2 size={13} className="text-green" /> {regUploadedDocs.length} document(s) attached — will be reviewed by LICHT admin.
                        </p>
                      )}
                    </div>

                    <div className="emp-input-row-2">
                      <div className="emp-input-group">
                        <label htmlFor="reg-pwd" className="emp-label">Create Portal Password *</label>
                        <div className="emp-input-wrap">
                          <Lock size={18} className="emp-input-icon" />
                          <input
                            id="reg-pwd"
                            type="password"
                            autoComplete="new-password"
                            className="emp-input"
                            placeholder="Min. 8 characters, letters + numbers"
                            value={regPassword}
                            onChange={(e) => setRegPassword(e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <div className="emp-input-group">
                        <label htmlFor="reg-confirm-pwd" className="emp-label">Confirm Password *</label>
                        <div className="emp-input-wrap">
                          <Lock size={18} className="emp-input-icon" />
                          <input
                            id="reg-confirm-pwd"
                            type="password"
                            autoComplete="new-password"
                            className="emp-input"
                            placeholder="Repeat password"
                            value={regConfirmPassword}
                            onChange={(e) => setRegConfirmPassword(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="emp-checkbox-group">
                      <label className="emp-checkbox-label">
                        <input
                          type="checkbox"
                          checked={regComplianceDeclared}
                          onChange={(e) => setRegComplianceDeclared(e.target.checked)}
                          required
                        />
                        <span>
                          I confirm this healthcare provider operates under UK CQC/Care Inspectorate standards and complies with UK Right-to-Work, GDPR, and Safer Recruitment guidelines.
                        </span>
                      </label>
                    </div>

                    <div className="emp-btn-flex-row">
                      <button
                        type="button"
                        className="btn-pill-outline emp-back-btn"
                        onClick={() => setRegStep(2)}
                      >
                        <ArrowLeft size={16} /> Back
                      </button>
                      <button
                        type="submit"
                        className="btn-pill-green emp-submit-btn"
                        style={{ flex: 1 }}
                        disabled={isRegistering}
                      >
                        {isRegistering ? 'Submitting for Review...' : 'Submit for Admin Verification'}
                        <ArrowRight size={16} />
                      </button>
                    </div>
                  </form>
                )}

                {/* Registration Submitted Confirmation */}
                {activeTab === 'register' && regSubmitted && (
                  <div className="emp-submitted-confirmation">
                    <div className="emp-submitted-icon">
                      <CheckCircle2 size={48} />
                    </div>
                    <h3>Application Sent for Verification</h3>
                    <p>
                      Thank you, <strong>{regContactName || regOrgName}</strong>. Your company registration for <strong>{regOrgName}</strong> has been submitted to the LICHT Admin Compliance Desk.
                    </p>
                    <p className="emp-submitted-sub">
                      Our team will review your details and documents and verify your organisation. We'll contact you at <strong>{regWorkEmail}</strong> once your account is approved — you can then sign in. This typically takes 1–2 business days.
                    </p>
                    {regDocWarning && (
                      <div className="emp-error-box" role="alert">
                        <span>{regDocWarning}</span>
                      </div>
                    )}
                    <div className="emp-submitted-actions">
                      <button
                        type="button"
                        className="btn-pill-green"
                        onClick={() => { setActiveTab('signin'); setRegSubmitted(false); }}
                      >
                        Back to Sign In <ArrowRight size={16} />
                      </button>
                    </div>
                  </div>
                )}

                <div className="emp-card-footer">
                  <p>
                    Already have an employer account?{' '}
                    <button
                      type="button"
                      onClick={() => setActiveTab('signin')}
                      className="emp-link-btn"
                    >
                      Sign in here ↗
                    </button>
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default EmployerLogin;
