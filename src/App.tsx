import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { MobileBottomNav } from './components/layout/MobileBottomNav';

import { Home } from './pages/Home';
import { About } from './pages/About';
import { Services } from './pages/Services';
import { CareRecruitment } from './pages/CareRecruitment';
import { HealthcareRecruitment } from './pages/HealthcareRecruitment';
import { CorporateRecruitment } from './pages/CorporateRecruitment';
import { Employers } from './pages/Employers';
import { Candidates } from './pages/Candidates';
import { Opportunities } from './pages/Opportunities';
import { OpportunityDetail } from './pages/OpportunityDetail';
import { SubmitCV } from './pages/SubmitCV';
import { Contact } from './pages/Contact';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { CookiePolicy } from './pages/CookiePolicy';
import { Terms } from './pages/Terms';
import { NotFound } from './pages/NotFound';
import { Login } from './pages/Login';
import { SignUp } from './pages/SignUp';
import { Profile } from './pages/Profile';
import { EmployerLanding } from './pages/EmployerLanding';
import { EmployerLogin } from './pages/EmployerLogin';
import { AdminPortal } from './pages/AdminPortal';
import { AuthProvider } from './context/AuthContext';
import { EmployerProvider } from './context/EmployerContext';
import { ErrorBoundary } from './components/common/ErrorBoundary';

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const AppShell: React.FC = () => {
  const { pathname } = useLocation();
  const isAdmin = pathname.startsWith('/admin');

  return (
    <div className="site-wrapper">
      {!isAdmin && <Navbar />}
      <main id="main-content" tabIndex={-1}>
        <ErrorBoundary resetKey={pathname}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/care-homes" element={<CareRecruitment />} />
          <Route path="/services/healthcare" element={<HealthcareRecruitment />} />
          <Route path="/services/corporate" element={<CorporateRecruitment />} />
          <Route path="/employer" element={<EmployerLanding />} />
          <Route path="/employers" element={<EmployerLanding />} />
          <Route path="/employer/login" element={<EmployerLogin />} />
          <Route path="/employers/login" element={<EmployerLogin />} />
          <Route path="/employer/signup" element={<EmployerLogin initialTab="register" />} />
          <Route path="/employer/register" element={<EmployerLogin initialTab="register" />} />
          <Route path="/employers/register" element={<EmployerLogin initialTab="register" />} />
          <Route path="/employer/request-staff" element={<EmployerLanding />} />
          <Route path="/employers/request-staff" element={<EmployerLanding />} />
          <Route path="/candidates" element={<Candidates />} />
          <Route path="/opportunities" element={<Opportunities />} />
          <Route path="/opportunities/:id" element={<OpportunityDetail />} />
          <Route path="/submit-cv" element={<SubmitCV />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin" element={<AdminPortal />} />
          <Route path="/admin/*" element={<AdminPortal />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/cookie-policy" element={<CookiePolicy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        </ErrorBoundary>
      </main>
      {!isAdmin && <Footer />}
      {!isAdmin && <MobileBottomNav />}
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <EmployerProvider>
        <BrowserRouter>
          <ScrollToTop />
          <AppShell />
        </BrowserRouter>
      </EmployerProvider>
    </AuthProvider>
  );
};

export default App;
