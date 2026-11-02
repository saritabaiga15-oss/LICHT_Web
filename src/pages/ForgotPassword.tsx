import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  KeyRound,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  RefreshCw
} from 'lucide-react';
import { BrandLogo } from '../components/common/BrandLogo';
import { sendOtpEmail, verifyOtpCode, resetPasswordWithOtp } from '../services/api';
import './ForgotPassword.css';

export const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();

  // Step state: 1 = Email, 2 = OTP, 3 = New Password, 4 = Success
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form states
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // UI status
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [infoMessage, setInfoMessage] = useState<string | null>(null);
  const [resendCooldown, setResendCooldown] = useState(0);

  // References for 6 OTP input boxes
  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Timer countdown for resend
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const interval = setInterval(() => {
      setResendCooldown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [resendCooldown]);

  // STEP 1: Submit Email for OTP
  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setInfoMessage(null);

    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail || !cleanEmail.includes('@')) {
      setError('Please provide a valid registered email address.');
      return;
    }

    setIsLoading(true);
    try {
      const res = await sendOtpEmail(cleanEmail, 'forgot-password');
      setStep(2);
      setResendCooldown(60);
      setInfoMessage(
        res.message || `A 6-digit OTP verification code has been dispatched from info@lichtrecruitmentservices.com to ${cleanEmail}.`
      );
      // Auto focus first OTP input box on next tick
      setTimeout(() => otpInputRefs.current[0]?.focus(), 150);
    } catch (err: any) {
      setError(err?.message || 'Could not send verification OTP. Please verify your email.');
    } finally {
      setIsLoading(false);
    }
  };

  // STEP 2: Handle OTP input changes
  const handleOtpChange = (index: number, value: string) => {
    // Only allow numbers
    const cleanVal = value.replace(/\D/g, '');
    if (!cleanVal) {
      const nextOtp = [...otp];
      nextOtp[index] = '';
      setOtp(nextOtp);
      return;
    }

    // If user pasted a multi-digit string
    if (cleanVal.length > 1) {
      const digits = cleanVal.slice(0, 6).split('');
      const nextOtp = [...otp];
      digits.forEach((d, i) => {
        if (i < 6) nextOtp[i] = d;
      });
      setOtp(nextOtp);
      const nextFocus = Math.min(digits.length, 5);
      otpInputRefs.current[nextFocus]?.focus();
      return;
    }

    const nextOtp = [...otp];
    nextOtp[index] = cleanVal;
    setOtp(nextOtp);

    // Auto move to next input box
    if (cleanVal && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  // STEP 2: Verify OTP
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const fullOtp = otp.join('').trim();
    if (fullOtp.length !== 6) {
      setError('Please enter the complete 6-digit OTP code sent from info@lichtrecruitmentservices.com.');
      return;
    }

    setIsLoading(true);
    try {
      await verifyOtpCode(email.trim().toLowerCase(), fullOtp, 'forgot-password');
      setStep(3);
      setError(null);
      setInfoMessage('OTP verified successfully! Please enter your new password.');
    } catch (err: any) {
      setError(err?.message || 'Invalid or expired OTP code. Please check and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Resend OTP
  const handleResendOtp = async () => {
    if (resendCooldown > 0 || isLoading) return;
    setError(null);
    setIsLoading(true);
    try {
      const res = await sendOtpEmail(email.trim().toLowerCase(), 'forgot-password');
      setResendCooldown(60);
      setInfoMessage(
        res.message || `A fresh 6-digit OTP code has been dispatched from info@lichtrecruitmentservices.com.`
      );
      setOtp(['', '', '', '', '', '']);
      otpInputRefs.current[0]?.focus();
    } catch (err: any) {
      setError(err?.message || 'Failed to resend OTP. Please try again in a few moments.');
    } finally {
      setIsLoading(false);
    }
  };

  // STEP 3: Submit New Password
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (newPassword.length < 8 || !/[A-Za-z]/.test(newPassword) || !/\d/.test(newPassword)) {
      setError('Password must be at least 8 characters long and include at least one letter and one number.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('The passwords do not match. Please re-enter them carefully.');
      return;
    }

    setIsLoading(true);
    try {
      const fullOtp = otp.join('').trim();
      await resetPasswordWithOtp(email.trim().toLowerCase(), fullOtp, newPassword);
      setStep(4);
    } catch (err: any) {
      setError(err?.message || 'Could not update your password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="forgot-page">
      <div className="container forgot-container">
        {/* Left Side: Brand & Trust Panel */}
        <div className="forgot-intro-card">
          <div className="forgot-intro-top">
            <div className="forgot-intro-header">
              <BrandLogo variant="dark" />
              <div className="forgot-badge-pill">
                <KeyRound size={14} className="text-gold" />
                <span>Account Recovery</span>
              </div>
            </div>

            <h1 className="forgot-hero-title">
              Reset Your Password. <br />
              <span className="gold-accent-text">Verified via Official Email.</span>
            </h1>

            <p className="forgot-intro-desc">
              For your data protection and security under UK GDPR, account credentials can only be reset through an authenticated one-time passcode (OTP).
            </p>
          </div>

          <div className="forgot-perks-box">
            <div className="forgot-perk">
              <ShieldCheck size={18} className="forgot-perk-icon" />
              <div>
                <strong>Official Dispatch Address</strong>
                <p>Security passcodes are delivered exclusively from <code>info@lichtrecruitmentservices.com</code>.</p>
              </div>
            </div>

            <div className="forgot-perk">
              <CheckCircle2 size={18} className="forgot-perk-icon" />
              <div>
                <strong>Candidates & Employers</strong>
                <p>One unified portal to reset passwords for both candidate and employer accounts.</p>
              </div>
            </div>
          </div>

          <div className="forgot-trust-footer">
            <ShieldCheck size={16} />
            <span>LICHT Recruitment Services Limited · 256-Bit SSL Encryption</span>
          </div>
        </div>

        {/* Right Side: Step-by-Step Form Card */}
        <div className="forgot-form-card">
          {/* STEP 1: ENTER REGISTERED EMAIL */}
          {step === 1 && (
            <>
              <div className="forgot-form-header">
                <span className="forgot-step-indicator">Step 1 of 3</span>
                <h2 className="forgot-form-title">Forgot your password?</h2>
                <p className="forgot-form-subtitle">
                  Enter your registered email address and we will dispatch a 6-digit OTP code from <strong>info@lichtrecruitmentservices.com</strong>.
                </p>
              </div>

              {error && (
                <div className="forgot-alert-box forgot-alert-error" role="alert">
                  <AlertCircle size={18} />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleRequestOtp} className="forgot-form">
                <div className="form-field">
                  <label htmlFor="recovery-email" className="field-label">
                    Registered Email Address
                  </label>
                  <div className="input-with-icon">
                    <Mail size={18} className="field-icon" />
                    <input
                      id="recovery-email"
                      type="email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.co.uk"
                      className="auth-input"
                      required
                    />
                  </div>
                  <span className="field-hint">
                    Check your inbox and spam folder for an email from <code>info@lichtrecruitmentservices.com</code>.
                  </span>
                </div>

                <button
                  type="submit"
                  className="btn-pill-green forgot-submit-btn"
                  disabled={isLoading}
                >
                  {isLoading ? 'Dispatching OTP...' : 'Send 6-Digit OTP Code'} <ArrowRight size={18} />
                </button>
              </form>

              <div className="forgot-back-box">
                <Link to="/login" className="forgot-back-link">
                  <ArrowLeft size={16} /> Back to Candidate Sign In
                </Link>
                <Link to="/employer/login" className="forgot-back-link">
                  Employer Sign In ↗
                </Link>
              </div>
            </>
          )}

          {/* STEP 2: ENTER OTP CODE */}
          {step === 2 && (
            <>
              <div className="forgot-form-header">
                <span className="forgot-step-indicator">Step 2 of 3</span>
                <h2 className="forgot-form-title">Enter Verification Code</h2>
                <p className="forgot-form-subtitle">
                  We sent a 6-digit code from <strong>info@lichtrecruitmentservices.com</strong> to:
                  <br />
                  <span className="forgot-target-email">{email}</span>
                </p>
              </div>

              {infoMessage && (
                <div className="forgot-alert-box forgot-alert-info">
                  <CheckCircle2 size={18} />
                  <span>{infoMessage}</span>
                </div>
              )}

              {error && (
                <div className="forgot-alert-box forgot-alert-error" role="alert">
                  <AlertCircle size={18} />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleVerifyOtp} className="forgot-form">
                <div className="form-field">
                  <label className="field-label">6-Digit Verification Passcode (OTP)</label>
                  <div className="otp-digit-grid">
                    {otp.map((digit, idx) => (
                      <input
                        key={idx}
                        ref={(el) => (otpInputRefs.current[idx] = el)}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(idx, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                        className="otp-digit-box"
                        autoComplete="one-time-code"
                        aria-label={`Digit ${idx + 1}`}
                      />
                    ))}
                  </div>
                </div>

                <div className="otp-resend-row">
                  <span className="otp-resend-text">Didn't receive the email?</span>
                  <button
                    type="button"
                    onClick={handleResendOtp}
                    disabled={resendCooldown > 0 || isLoading}
                    className="otp-resend-btn"
                  >
                    <RefreshCw size={14} className={isLoading ? 'spin-icon' : ''} />
                    {resendCooldown > 0 ? `Resend OTP in ${resendCooldown}s` : 'Resend Code'}
                  </button>
                </div>

                <button
                  type="submit"
                  className="btn-pill-green forgot-submit-btn"
                  disabled={isLoading}
                >
                  {isLoading ? 'Verifying Code...' : 'Verify OTP & Proceed'} <ArrowRight size={18} />
                </button>
              </form>

              <div className="forgot-back-box">
                <button
                  type="button"
                  onClick={() => {
                    setStep(1);
                    setError(null);
                  }}
                  className="forgot-inline-btn"
                >
                  <ArrowLeft size={16} /> Change email address
                </button>
              </div>
            </>
          )}

          {/* STEP 3: CHOOSE NEW PASSWORD */}
          {step === 3 && (
            <>
              <div className="forgot-form-header">
                <span className="forgot-step-indicator">Step 3 of 3</span>
                <h2 className="forgot-form-title">Set New Password</h2>
                <p className="forgot-form-subtitle">
                  Create a secure password for your LICHT Recruitment profile.
                </p>
              </div>

              {error && (
                <div className="forgot-alert-box forgot-alert-error" role="alert">
                  <AlertCircle size={18} />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleResetPassword} className="forgot-form">
                <div className="form-field">
                  <label htmlFor="new-pwd" className="field-label">
                    New Password
                  </label>
                  <div className="input-with-icon">
                    <Lock size={18} className="field-icon" />
                    <input
                      id="new-pwd"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="new-password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="At least 8 characters"
                      className="auth-input"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="toggle-password-btn"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div className="form-field">
                  <label htmlFor="confirm-pwd" className="field-label">
                    Confirm New Password
                  </label>
                  <div className="input-with-icon">
                    <Lock size={18} className="field-icon" />
                    <input
                      id="confirm-pwd"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="new-password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm your new password"
                      className="auth-input"
                      required
                    />
                  </div>
                </div>

                <div className="password-rules-box">
                  <div className={`rule-item ${newPassword.length >= 8 ? 'rule-met' : ''}`}>
                    <CheckCircle2 size={14} /> At least 8 characters
                  </div>
                  <div className={`rule-item ${/[A-Za-z]/.test(newPassword) ? 'rule-met' : ''}`}>
                    <CheckCircle2 size={14} /> Contains at least one letter
                  </div>
                  <div className={`rule-item ${/\d/.test(newPassword) ? 'rule-met' : ''}`}>
                    <CheckCircle2 size={14} /> Contains at least one number
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn-pill-green forgot-submit-btn"
                  disabled={isLoading}
                >
                  {isLoading ? 'Updating Password...' : 'Save New Password & Sign In'} <ArrowRight size={18} />
                </button>
              </form>
            </>
          )}

          {/* STEP 4: SUCCESS CONFIRMATION */}
          {step === 4 && (
            <div className="forgot-success-pane">
              <div className="success-icon-badge">
                <CheckCircle2 size={44} className="text-gold" />
              </div>
              <h2 className="forgot-form-title">Password Reset Complete!</h2>
              <p className="forgot-form-subtitle">
                Your password has been successfully updated. You can now use your new credentials to access your LICHT account.
              </p>

              <div className="success-actions">
                <Link to="/login" className="btn-pill-green success-nav-btn">
                  Sign in as Candidate <ArrowRight size={18} />
                </Link>
                <Link to="/employer/login" className="btn-pill-outline success-nav-btn">
                  Sign in as Employer
                </Link>
              </div>

              <div className="forgot-support-footer">
                <span>Sender domain: <code>info@lichtrecruitmentservices.com</code></span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

