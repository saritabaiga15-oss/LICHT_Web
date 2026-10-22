import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Briefcase, 
  Lock, 
  Plus, 
  Trash2, 
  UploadCloud, 
  FileText, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  ShieldCheck, 
  AlertCircle,
  GraduationCap
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { ExperienceItem, ExperienceLevel, EducationItem } from '../types/auth';
import './SignUp.css';

export const SignUp: React.FC = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [error, setError] = useState<string | null>(null);

  // Step 1: Personal & Contact Details
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [postcode, setPostcode] = useState('');
  const [targetSector, setTargetSector] = useState<'Care homes' | 'Healthcare' | 'Supported living' | 'Corporate'>('Care homes');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Step 2: Previous Experience & Professional Profile
  const [experienceLevel, setExperienceLevel] = useState<ExperienceLevel>('3+ years of experience');
  const [educationList, setEducationList] = useState<Omit<EducationItem, 'id'>[]>([
    {
      qualification: 'NVQ / Diploma (Level 2 or 3 in Health & Social Care)',
      fieldOfStudy: 'Health & Social Care',
      institution: 'City & Guilds London',
      graduationYear: '2023'
    }
  ]);
  const [experiences, setExperiences] = useState<Omit<ExperienceItem, 'id'>[]>([
    {
      jobTitle: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      current: true,
      responsibilities: ''
    }
  ]);
  const [bio, setBio] = useState('');
  const [dbsStatus, setDbsStatus] = useState<'Enhanced DBS on Update Service' | 'Standard DBS' | 'In Progress' | 'Not Registered'>('Enhanced DBS on Update Service');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([
    'Care Certificate',
    'Moving & Handling',
    'Medication Administration'
  ]);

  // Step 3: CV Upload & Preferences
  const [availability, setAvailability] = useState<'Immediately available' | '1 week notice' | '2 weeks notice' | '1 month notice'>('Immediately available');
  const [cvFile, setCvFile] = useState<{ name: string; size: string } | null>({
    name: 'My_Candidate_CV.pdf',
    size: '412 KB'
  });
  const [privacyAgreed, setPrivacyAgreed] = useState(true);

  // Skill choices
  const availableSkillOptions = [
    'Care Certificate',
    'Moving & Handling',
    'Medication Administration',
    'Dementia & Alzheimer’s Care',
    'PEG Feeding & Stoma Care',
    'First Aid at Work',
    'Infection Prevention & Control',
    'End-of-Life Palliative Care',
    'Vital Signs Monitoring',
    'Autism & Learning Disabilities'
  ];

  const handleToggleSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter(s => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const handleAddExperience = () => {
    setExperiences([
      ...experiences,
      {
        jobTitle: '',
        company: '',
        location: '',
        startDate: '',
        endDate: '',
        current: false,
        responsibilities: ''
      }
    ]);
  };

  const handleRemoveExperience = (index: number) => {
    if (experiences.length > 1) {
      setExperiences(experiences.filter((_, i) => i !== index));
    }
  };

  const handleExperienceChange = (index: number, field: keyof Omit<ExperienceItem, 'id'>, value: any) => {
    const updated = [...experiences];
    updated[index] = { ...updated[index], [field]: value };
    setExperiences(updated);
  };

  const handleAddEducation = () => {
    setEducationList([
      ...educationList,
      {
        qualification: 'Bachelor\'s Degree (BSc Nursing / Healthcare)',
        fieldOfStudy: '',
        institution: '',
        graduationYear: ''
      }
    ]);
  };

  const handleRemoveEducation = (index: number) => {
    if (educationList.length > 1) {
      setEducationList(educationList.filter((_, i) => i !== index));
    }
  };

  const handleEducationChange = (index: number, field: keyof Omit<EducationItem, 'id'>, value: string) => {
    const updated = [...educationList];
    updated[index] = { ...updated[index], [field]: value };
    setEducationList(updated);
  };

  const handleFileDrop = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const sizeKb = Math.round(file.size / 1024);
      setCvFile({
        name: file.name,
        size: `${sizeKb} KB`
      });
    }
  };

  const handleStep1Next = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!fullName.trim() || !email.trim() || !phone.trim() || !location.trim()) {
      setError('Please fill in all personal contact fields.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setCurrentStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStep2Next = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const isStudentOrFresher = experienceLevel === 'Student' || experienceLevel === 'Fresher / Entry level';
    const firstExp = experiences[0];

    // For experienced candidates, require at least one previous role
    if (!isStudentOrFresher && (!firstExp.jobTitle.trim() || !firstExp.company.trim())) {
      setError('Please provide at least one recent or previous job title and employer name, or select Student / Fresher if you have no prior work history.');
      return;
    }

    setCurrentStep(3);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!privacyAgreed) {
      setError('Please acknowledge the UK GDPR data processing consent.');
      return;
    }

    // Format experiences with IDs (filtering out empty rows if student/fresher skipped it)
    const formattedExperiences: ExperienceItem[] = experiences
      .filter(exp => exp.jobTitle.trim() || exp.company.trim())
      .map((exp, idx) => ({
        ...exp,
        id: `exp-${Date.now()}-${idx}`
      }));

    // Format education items
    const formattedEducation: EducationItem[] = educationList.map((edu, idx) => ({
      ...edu,
      id: `edu-${Date.now()}-${idx}`
    }));

    // Register user profile
    signup({
      fullName,
      email,
      phone,
      location,
      postcode: postcode || 'London, UK',
      headline: `${experiences[0]?.jobTitle || (experienceLevel === 'Student' ? 'Healthcare Student' : 'Entry-level Healthcare Assistant')} · ${targetSector}`,
      experienceLevel,
      education: formattedEducation,
      targetSector,
      availability,
      dbsStatus,
      bio: bio.trim() || `${experienceLevel} candidate with a strong commitment to delivering quality patient and resident care in ${targetSector.toLowerCase()}. Committed to dignity, empathy, and professional compliance.`,
      skills: selectedSkills,
      certifications: [
        'Right to Work in UK Verified',
        dbsStatus,
        ...selectedSkills.slice(0, 2)
      ],
      previousExperience: formattedExperiences,
      savedCV: cvFile ? {
        fileName: cvFile.name,
        fileSize: cvFile.size,
        uploadedDate: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
      } : null
    });

    // Navigate to candidate profile
    navigate('/profile', { replace: true });
  };

  return (
    <div className="signup-page">
      <div className="container signup-container">
        {/* Progress Stepper */}
        <div className="signup-header">
          <div className="figma-eyebrow">
            Candidate Onboarding
          </div>
          <h1 className="signup-title">Create Your Candidate Profile</h1>
          <p className="signup-subtitle">
            Complete your profile once to apply for healthcare, care home, and supported living placements across the UK.
          </p>

          <div className="stepper-track">
            <div className={`step-node ${currentStep >= 1 ? 'step-node--active' : ''}`}>
              <div className="step-circle">{currentStep > 1 ? <CheckCircle2 size={16} /> : '1'}</div>
              <span className="step-label">Account details</span>
            </div>
            <div className={`step-line ${currentStep >= 2 ? 'step-line--active' : ''}`} />
            <div className={`step-node ${currentStep >= 2 ? 'step-node--active' : ''}`}>
              <div className="step-circle">{currentStep > 2 ? <CheckCircle2 size={16} /> : '2'}</div>
              <span className="step-label">Previous experience</span>
            </div>
            <div className={`step-line ${currentStep >= 3 ? 'step-line--active' : ''}`} />
            <div className={`step-node ${currentStep >= 3 ? 'step-node--active' : ''}`}>
              <div className="step-circle">3</div>
              <span className="step-label">CV & preferences</span>
            </div>
          </div>
        </div>

        {error && (
          <div className="signup-error-banner" role="alert">
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        <div className="signup-card">
          {/* ================= STEP 1: PERSONAL & CONTACT ================= */}
          {currentStep === 1 && (
            <form onSubmit={handleStep1Next} className="step-form">
              <div className="form-section-head">
                <h2 className="step-heading">Step 1: Personal & Contact Information</h2>
                <p className="step-lead">
                  Provide your primary contact details for interview coordination and registration with LICHT.
                </p>
              </div>

              <div className="form-grid-2">
                <div className="form-field">
                  <label htmlFor="reg-name" className="field-label">Full Name *</label>
                  <div className="input-with-icon">
                    <User size={18} className="field-icon" />
                    <input
                      id="reg-name"
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Sarah Jenkins"
                      className="auth-input"
                      required
                    />
                  </div>
                </div>

                <div className="form-field">
                  <label htmlFor="reg-email" className="field-label">Email Address *</label>
                  <div className="input-with-icon">
                    <Mail size={18} className="field-icon" />
                    <input
                      id="reg-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="sarah.jenkins@example.co.uk"
                      className="auth-input"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="form-grid-2">
                <div className="form-field">
                  <label htmlFor="reg-phone" className="field-label">Telephone Number *</label>
                  <div className="input-with-icon">
                    <Phone size={18} className="field-icon" />
                    <input
                      id="reg-phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+44 7700 900123"
                      className="auth-input"
                      required
                    />
                  </div>
                </div>

                <div className="form-field">
                  <label htmlFor="reg-sector" className="field-label">Target Recruitment Sector *</label>
                  <div className="input-with-icon">
                    <Briefcase size={18} className="field-icon" />
                    <select
                      id="reg-sector"
                      value={targetSector}
                      onChange={(e) => setTargetSector(e.target.value as any)}
                      className="auth-input auth-select"
                    >
                      <option value="Care homes">Care Homes & Residential</option>
                      <option value="Healthcare">Healthcare & Clinical Units</option>
                      <option value="Supported living">Supported Living</option>
                      <option value="Corporate">Corporate & Business Operations</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="form-grid-2">
                <div className="form-field">
                  <label htmlFor="reg-location" className="field-label">Current City / Borough *</label>
                  <div className="input-with-icon">
                    <MapPin size={18} className="field-icon" />
                    <input
                      id="reg-location"
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="e.g. Manchester or Camden, London"
                      className="auth-input"
                      required
                    />
                  </div>
                </div>

                <div className="form-field">
                  <label htmlFor="reg-postcode" className="field-label">Postcode</label>
                  <div className="input-with-icon">
                    <MapPin size={18} className="field-icon" />
                    <input
                      id="reg-postcode"
                      type="text"
                      value={postcode}
                      onChange={(e) => setPostcode(e.target.value)}
                      placeholder="e.g. M1 4BT"
                      className="auth-input"
                    />
                  </div>
                </div>
              </div>

              <div className="form-grid-2">
                <div className="form-field">
                  <label htmlFor="reg-password" className="field-label">Create Password *</label>
                  <div className="input-with-icon">
                    <Lock size={18} className="field-icon" />
                    <input
                      id="reg-password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Min. 6 characters"
                      className="auth-input"
                      required
                    />
                  </div>
                </div>

                <div className="form-field">
                  <label htmlFor="reg-confirm-password" className="field-label">Confirm Password *</label>
                  <div className="input-with-icon">
                    <Lock size={18} className="field-icon" />
                    <input
                      id="reg-confirm-password"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Re-enter password"
                      className="auth-input"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="form-action-bar">
                <Link to="/login" className="step-back-link">
                  Already have an account? Sign in
                </Link>
                <button type="submit" className="btn-pill-green step-next-btn">
                  Next: Previous Experience <ArrowRight size={18} />
                </button>
              </div>
            </form>
          )}

          {/* ================= STEP 2: PREVIOUS EXPERIENCE ================= */}
          {currentStep === 2 && (
            <form onSubmit={handleStep2Next} className="step-form">
              <div className="form-section-head">
                <h2 className="step-heading">Step 2: Experience & Educational Background</h2>
                <p className="step-lead">
                  Select your experience level, detail your qualifications, and share your employment or clinical placement history.
                </p>
              </div>

              {/* 1. EXPERIENCE LEVEL DROPDOWN */}
              <div className="signup-exp-level-card">
                <div className="form-field">
                  <label htmlFor="reg-experience-level" className="field-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Briefcase size={16} className="text-gold" />
                    Overall Experience Level *
                  </label>
                  <select
                    id="reg-experience-level"
                    value={experienceLevel}
                    onChange={(e) => setExperienceLevel(e.target.value as any)}
                    className="auth-select auth-select--lg"
                  >
                    <option value="Student">Student (Enrolled in Healthcare / Clinical / University studies)</option>
                    <option value="Fresher / Entry level">Fresher / Entry level (No prior professional experience)</option>
                    <option value="1+ years of experience">1+ years of experience</option>
                    <option value="3+ years of experience">3+ years of experience</option>
                    <option value="5+ years of experience">5+ years of experience</option>
                    <option value="10+ years of experience">10+ years of experience</option>
                  </select>
                  <div className="exp-level-tip">
                    {experienceLevel === 'Student' || experienceLevel === 'Fresher / Entry level' ? (
                      <span className="text-green-note">
                        ✓ <strong>Student / Fresher friendly:</strong> Prior employment below is optional. You can enter placements, volunteer work, or proceed with your educational background.
                      </span>
                    ) : (
                      <span>Select your cumulative career experience in care homes, hospitals, or supported living.</span>
                    )}
                  </div>
                </div>
              </div>

              {/* 2. EDUCATION BACKGROUND (NOT TOO HEAVILY DETAILED) */}
              <div className="signup-education-block">
                <div className="sec-subhead-row">
                  <div>
                    <h3 className="sec-subhead-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <GraduationCap size={18} className="text-gold" /> Educational Background & Qualifications
                    </h3>
                    <p className="sec-subhead-desc">
                      Add your degree, care certificate, or highest qualification (not heavily detailed).
                    </p>
                  </div>
                </div>

                <div className="education-cards-stack">
                  {educationList.map((edu, eduIdx) => (
                    <div key={eduIdx} className="education-card-item">
                      <div className="edu-card-top">
                        <span className="edu-badge">Qualification #{eduIdx + 1}</span>
                        {educationList.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveEducation(eduIdx)}
                            className="exp-remove-btn"
                            title="Remove this qualification"
                          >
                            <Trash2 size={15} /> Remove
                          </button>
                        )}
                      </div>

                      <div className="form-grid-2">
                        <div className="form-field">
                          <label className="field-label">Degree / Qualification *</label>
                          <select
                            value={edu.qualification}
                            onChange={(e) => handleEducationChange(eduIdx, 'qualification', e.target.value)}
                            className="auth-select"
                          >
                            <option value="NVQ / Diploma (Level 2 or 3 in Health & Social Care)">NVQ / Diploma (Level 2 or 3 in Health & Social Care)</option>
                            <option value="Bachelor's Degree (BSc Nursing / Healthcare)">Bachelor's Degree (BSc Nursing / Healthcare / Science)</option>
                            <option value="Care Certificate (Skills for Care UK)">Care Certificate (Skills for Care UK)</option>
                            <option value="Secondary School (GCSE / A-Levels)">Secondary School (GCSE / A-Levels)</option>
                            <option value="Student / In Progress Healthcare Degree">Student / In-Progress Healthcare Studies</option>
                            <option value="Master's Degree (MSc / Postgraduate)">Master's Degree (MSc / Postgraduate)</option>
                            <option value="Higher National Diploma (HND)">Diploma / Higher National Diploma (HND)</option>
                            <option value="Other Healthcare Accreditation">Other Healthcare Accreditation</option>
                          </select>
                        </div>

                        <div className="form-field">
                          <label className="field-label">Field of Study / Course Subject</label>
                          <input
                            type="text"
                            value={edu.fieldOfStudy}
                            onChange={(e) => handleEducationChange(eduIdx, 'fieldOfStudy', e.target.value)}
                            placeholder="e.g. Health & Social Care, Adult Nursing, Biology"
                            className="auth-input"
                            style={{ paddingLeft: '14px' }}
                          />
                        </div>
                      </div>

                      <div className="form-grid-2">
                        <div className="form-field">
                          <label className="field-label">College / University / Awarding Body</label>
                          <input
                            type="text"
                            value={edu.institution}
                            onChange={(e) => handleEducationChange(eduIdx, 'institution', e.target.value)}
                            placeholder="e.g. City & Guilds London, King's College London, NHS Academy"
                            className="auth-input"
                            style={{ paddingLeft: '14px' }}
                          />
                        </div>

                        <div className="form-field">
                          <label className="field-label">Year of Completion / Expected</label>
                          <input
                            type="text"
                            value={edu.graduationYear}
                            onChange={(e) => handleEducationChange(eduIdx, 'graduationYear', e.target.value)}
                            placeholder="e.g. 2024 or Expected 2026"
                            className="auth-input"
                            style={{ paddingLeft: '14px' }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={handleAddEducation}
                    className="add-exp-btn"
                    style={{ marginTop: '6px' }}
                  >
                    <Plus size={16} /> Add another qualification / degree
                  </button>
                </div>
              </div>

              {/* 3. PREVIOUS WORK HISTORY / CLINICAL PLACEMENTS */}
              <div className="sec-subhead-row" style={{ marginTop: '28px' }}>
                <div>
                  <h3 className="sec-subhead-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Briefcase size={18} className="text-gold" /> Previous Roles & Employment History
                  </h3>
                  <p className="sec-subhead-desc">
                    {experienceLevel === 'Student' || experienceLevel === 'Fresher / Entry level'
                      ? 'Optional: List any internships, clinical placements, or volunteer care roles.'
                      : 'Detail your most recent roles, care facilities, and key responsibilities.'}
                  </p>
                </div>
              </div>

              <div className="experiences-stack">
                {experiences.map((exp, index) => {
                  const isEntry = experienceLevel === 'Student' || experienceLevel === 'Fresher / Entry level';
                  return (
                    <div key={index} className="experience-card-item">
                      <div className="exp-card-header">
                        <div className="exp-badge">
                          Role #{index + 1} {isEntry ? '(Optional / Placement)' : ''}
                        </div>
                        {experiences.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveExperience(index)}
                            className="exp-remove-btn"
                            title="Remove this role"
                          >
                            <Trash2 size={16} /> Remove
                          </button>
                        )}
                      </div>

                      <div className="form-grid-2">
                        <div className="form-field">
                          <label className="field-label">
                            Job Title {isEntry ? '(Optional)' : '*'}
                          </label>
                          <input
                            type="text"
                            value={exp.jobTitle}
                            onChange={(e) => handleExperienceChange(index, 'jobTitle', e.target.value)}
                            placeholder={isEntry ? "e.g. Student Nurse Placement or Volunteer Carer" : "e.g. Care Assistant, Support Worker, Staff Nurse"}
                            className="auth-input"
                            style={{ paddingLeft: '14px' }}
                            required={!isEntry && index === 0}
                          />
                        </div>

                        <div className="form-field">
                          <label className="field-label">
                            Employer / Organisation {isEntry ? '(Optional)' : '*'}
                          </label>
                          <input
                            type="text"
                            value={exp.company}
                            onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
                            placeholder={isEntry ? "e.g. NHS Trust Hospital or Care Home" : "e.g. St. Luke’s Residential Home, NHS Foundation Trust"}
                            className="auth-input"
                            style={{ paddingLeft: '14px' }}
                            required={!isEntry && index === 0}
                          />
                        </div>
                      </div>

                      <div className="form-grid-3">
                        <div className="form-field">
                          <label className="field-label">Location</label>
                          <input
                            type="text"
                            value={exp.location}
                            onChange={(e) => handleExperienceChange(index, 'location', e.target.value)}
                            placeholder="e.g. London, UK"
                            className="auth-input"
                            style={{ paddingLeft: '14px' }}
                          />
                        </div>

                        <div className="form-field">
                          <label className="field-label">Start Date</label>
                          <input
                            type="text"
                            value={exp.startDate}
                            onChange={(e) => handleExperienceChange(index, 'startDate', e.target.value)}
                            placeholder="e.g. Jan 2022"
                            className="auth-input"
                            style={{ paddingLeft: '14px' }}
                          />
                        </div>

                        <div className="form-field">
                          <label className="field-label">End Date</label>
                          <input
                            type="text"
                            value={exp.current ? 'Present' : exp.endDate}
                            disabled={exp.current}
                            onChange={(e) => handleExperienceChange(index, 'endDate', e.target.value)}
                            placeholder="e.g. Aug 2024"
                            className="auth-input"
                            style={{ paddingLeft: '14px' }}
                          />
                          <label className="exp-current-checkbox">
                            <input
                              type="checkbox"
                              checked={exp.current}
                              onChange={(e) => handleExperienceChange(index, 'current', e.target.checked)}
                            />
                            <span>I currently work here</span>
                          </label>
                        </div>
                      </div>

                      <div className="form-field">
                        <label className="field-label">Key Responsibilities & Achievements</label>
                        <textarea
                          value={exp.responsibilities}
                          onChange={(e) => handleExperienceChange(index, 'responsibilities', e.target.value)}
                          placeholder="Briefly describe your day-to-day duties, resident care, medication handling, or team support..."
                          rows={3}
                          className="auth-textarea"
                        />
                      </div>
                    </div>
                  );
                })}

                <button
                  type="button"
                  onClick={handleAddExperience}
                  className="add-exp-btn"
                >
                  <Plus size={16} /> Add another previous role
                </button>
              </div>

              {/* Skills & DBS */}
              <div className="skills-dbs-section">
                <div className="form-field">
                  <label className="field-label">Select Your Relevant Skills & Certifications</label>
                  <div className="skills-chip-grid">
                    {availableSkillOptions.map((skill) => {
                      const isSelected = selectedSkills.includes(skill);
                      return (
                        <button
                          key={skill}
                          type="button"
                          onClick={() => handleToggleSkill(skill)}
                          className={`skill-chip ${isSelected ? 'skill-chip--selected' : ''}`}
                        >
                          {isSelected && <CheckCircle2 size={14} className="chip-check" />}
                          {skill}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="form-grid-2" style={{ marginTop: '20px' }}>
                  <div className="form-field">
                    <label className="field-label">UK DBS Clearance Status</label>
                    <select
                      value={dbsStatus}
                      onChange={(e) => setDbsStatus(e.target.value as any)}
                      className="auth-input auth-select"
                      style={{ paddingLeft: '14px' }}
                    >
                      <option value="Enhanced DBS on Update Service">Enhanced DBS on Update Service (Active)</option>
                      <option value="Standard DBS">Standard DBS Certificate</option>
                      <option value="In Progress">Application Currently in Progress</option>
                      <option value="Not Registered">Not Registered / Need LICHT Assistance</option>
                    </select>
                  </div>

                  <div className="form-field">
                    <label className="field-label">Short Professional Summary</label>
                    <textarea
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      placeholder="A short introductory statement for prospective healthcare employers..."
                      rows={2}
                      className="auth-textarea"
                    />
                  </div>
                </div>
              </div>

              <div className="form-action-bar">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="btn-pill-outline"
                >
                  <ArrowLeft size={18} /> Back to details
                </button>
                <button type="submit" className="btn-pill-green step-next-btn">
                  Next: CV & Finalize <ArrowRight size={18} />
                </button>
              </div>
            </form>
          )}

          {/* ================= STEP 3: CV UPLOAD & FINALIZE ================= */}
          {currentStep === 3 && (
            <form onSubmit={handleFinalSubmit} className="step-form">
              <div className="form-section-head">
                <h2 className="step-heading">Step 3: Saved CV & Availability</h2>
                <p className="step-lead">
                  Upload your CV document and state your shift availability so you can apply for vacancies in 1 click.
                </p>
              </div>

              {/* CV Upload Box */}
              <div className="cv-upload-card">
                <div className="cv-upload-icon-wrap">
                  <UploadCloud size={32} color="#a88538" />
                </div>
                <div className="cv-upload-info">
                  <h3 className="cv-upload-heading">Upload Your Saved CV / Resume</h3>
                  <p className="cv-upload-sub">
                    PDF, DOC, or DOCX up to 5MB. Your saved CV will be attached to your candidate profile.
                  </p>
                  
                  {cvFile && (
                    <div className="attached-cv-pill">
                      <FileText size={18} className="pill-file-icon" />
                      <div className="attached-cv-meta">
                        <span className="cv-name">{cvFile.name}</span>
                        <span className="cv-size">({cvFile.size})</span>
                      </div>
                      <span className="ready-badge">Ready for applications</span>
                    </div>
                  )}

                  <label className="cv-file-picker-btn">
                    <span>Browse or Replace Document</span>
                    <input 
                      type="file" 
                      accept=".pdf,.doc,.docx" 
                      onChange={handleFileDrop} 
                      style={{ display: 'none' }}
                    />
                  </label>
                </div>
              </div>

              {/* Availability */}
              <div className="form-field" style={{ marginTop: '24px' }}>
                <label className="field-label">When are you available to start?</label>
                <div className="availability-options-grid">
                  {[
                    { label: 'Immediately available', desc: 'Ready for emergency shifts & immediate starts' },
                    { label: '1 week notice', desc: 'Transitioning out of current rota' },
                    { label: '2 weeks notice', desc: 'Standard notice period' },
                    { label: '1 month notice', desc: 'Corporate or permanent contract notice' }
                  ].map((opt) => (
                    <label 
                      key={opt.label} 
                      className={`avail-option-card ${availability === opt.label ? 'avail-option-card--active' : ''}`}
                    >
                      <input
                        type="radio"
                        name="availability"
                        value={opt.label}
                        checked={availability === opt.label}
                        onChange={() => setAvailability(opt.label as any)}
                        style={{ display: 'none' }}
                      />
                      <span className="avail-radio-custom" />
                      <div>
                        <strong>{opt.label}</strong>
                        <p>{opt.desc}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* GDPR & Agreement */}
              <div className="gdpr-box">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={privacyAgreed}
                    onChange={(e) => setPrivacyAgreed(e.target.checked)}
                    required
                  />
                  <span>
                    I confirm that the information provided is accurate and agree to LICHT Recruitment Services Limited processing my CV and credentials in accordance with the <Link to="/privacy-policy" target="_blank" className="gold-link">Privacy Policy</Link> and UK employment regulations.
                  </span>
                </label>
              </div>

              <div className="form-action-bar">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="btn-pill-outline"
                >
                  <ArrowLeft size={18} /> Back to experience
                </button>
                <button type="submit" className="btn-pill-green step-next-btn">
                  Complete Registration & View Profile <CheckCircle2 size={18} />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
