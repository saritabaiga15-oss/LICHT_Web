import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';

import { Home } from './pages/Home';
import { About } from './pages/About';
import { Services } from './pages/Services';
import { CareRecruitment } from './pages/CareRecruitment';
import { HealthcareRecruitment } from './pages/HealthcareRecruitment';
import { CorporateRecruitment } from './pages/CorporateRecruitment';
import { Employers } from './pages/Employers';
import { Candidates } from './pages/Candidates';
import { Opportunities } from './pages/Opportunities';
import { SubmitCV } from './pages/SubmitCV';
import { Contact } from './pages/Contact';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { CookiePolicy } from './pages/CookiePolicy';
import { Terms } from './pages/Terms';
import { NotFound } from './pages/NotFound';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="site-wrapper">
        <Navbar />
        <main id="main-content" tabIndex={-1}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/care-homes" element={<CareRecruitment />} />
            <Route path="/services/healthcare" element={<HealthcareRecruitment />} />
            <Route path="/services/corporate" element={<CorporateRecruitment />} />
            <Route path="/employers" element={<Employers />} />
            <Route path="/candidates" element={<Candidates />} />
            <Route path="/opportunities" element={<Opportunities />} />
            <Route path="/submit-cv" element={<SubmitCV />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/cookie-policy" element={<CookiePolicy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
