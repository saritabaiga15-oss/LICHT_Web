import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { BrandLogo } from '../components/common/BrandLogo';
import './Login.css';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as any)?.from?.pathname || '/profile';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim()) {
      setError('Please provide your registered email address.');
      return;
    }
    if (!password) {
      setError('Please enter your password.');
      return;
    }

    setIsLoading(true);
    try {
      const res = await login(email, password);
      if (res.success) {
        navigate(from, { replace: true });
      } else {
        setError(res.message || 'Invalid email or password.');
      }
    } catch (err: any) {
      setError(err?.message || 'Login failed. Please verify your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="container auth-container">
        {/* Left / Top Editorial Banner */}
        <div className="auth-intro-card">
          {/* On phones the intro splits around the form: this part above it... */}
          <div className="auth-intro-top">
          <div className="auth-intro-header">
            <BrandLogo variant="dark" />
            <div className="auth-badge-pill">
              <span className="auth-status-dot" />
              <span>Candidate Portal</span>
            </div>
          </div>

          <h1 className="auth-hero-title">
            Your career in care. <br />
            <span className="gold-accent-text">Organised in one place.</span>
          </h1>

          <p className="auth-intro-desc">
            Sign in to track real-time applications across NHS trusts, care homes, and supported living providers. Manage your saved CV and update your shift availability with LICHT.
          </p>
          </div>

          {/* ...and the benefits below it */}
          <div className="auth-intro-bottom">
          <div className="auth-perks-list">
            <div className="auth-perk-item">
              <CheckCircle2 size={18} className="auth-perk-icon" />
              <div>
                <strong>Application Status Tracking</strong>
                <p>View which employers have reviewed your credentials or scheduled interviews.</p>
              </div>
            </div>
            <div className="auth-perk-item">
              <CheckCircle2 size={18} className="auth-perk-icon" />
              <div>
                <strong>Saved CV & Verified Credentials</strong>
                <p>Apply for specialist roles in 1 click using your uploaded CV & DBS status.</p>
              </div>
            </div>
            <div className="auth-perk-item">
              <CheckCircle2 size={18} className="auth-perk-icon" />
              <div>
                <strong>Dedicated Placement Advisor</strong>
                <p>Receive direct communications and shift rotas tailored to your experience.</p>
              </div>
            </div>
          </div>

          <div className="auth-trust-footer">
            <ShieldCheck size={16} />
            <span>UK GDPR Compliant · Strict candidate confidentiality guaranteed</span>
          </div>
          </div>
        </div>

        {/* Right Form Card */}
        <div className="auth-form-card">
          <div className="auth-form-header">
            <h2 className="auth-form-title">Sign in to your account</h2>
            <p className="auth-form-subtitle">
              Enter your credentials to access your candidate profile.
            </p>
          </div>

          {error && (
            <div className="auth-error-banner" role="alert">
              <AlertCircle size={18} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-field">
              <label htmlFor="login-email" className="field-label">
                Email address
              </label>
              <div className="input-with-icon">
                <Mail size={18} className="field-icon" />
                <input
                  id="login-email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.co.uk"
                  className="auth-input"
                  required
                />
              </div>
            </div>

            <div className="form-field">
              <div className="field-label-row">
                <label htmlFor="login-password" className="field-label">
                  Password
                </label>
                <Link to="/contact" className="forgot-link" title="Contact our team to reset your password">
                  Forgot password?
                </Link>
              </div>
              <div className="input-with-icon">
                <Lock size={18} className="field-icon" />
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
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

            <div className="auth-options-row">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span>Keep me signed in</span>
              </label>
            </div>

            <button
              type="submit"
              className="btn-pill-green auth-submit-btn"
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign in to profile'} <ArrowRight size={18} />
            </button>
          </form>

          <div className="auth-switch-box">
            <span>New to LICHT Recruitment?</span>
            <Link to="/signup" className="auth-switch-link">
              Create a candidate profile ↗
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
