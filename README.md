# LICHT RECRUITMENT SERVICES LIMITED
### Professional Recruitment Solutions for Care Homes, Healthcare and Corporate Clients
**Reliable People. Professional Recruitment.**

---

## 1. Project Overview

This repository contains the official corporate recruitment web application for **LICHT RECRUITMENT SERVICES LIMITED**. 

The platform connects care home providers, healthcare institutions, and corporate organisations with pre-screened, verified professionals across England, Wales, and the wider United Kingdom.

### Visual Design & Colour Reference
Crafted in accordance with the official LICHT brand guidelines:
- **Deep Teal (`#002F3A`)**: Primary background, navigation bar, hero sections, and dark accents.
- **Royal Gold (`#F5B82E`)**: Action buttons, active badges, icons, decorative lines, and focus rings.
- **Pure White (`#FFFFFF`)**: Headings on dark backgrounds, cards, typography, and contrast elements.
- **Soft Teal (`#064653`)**: Secondary elevated surfaces, interactive cards, and subtle backgrounds.

---

## 2. Technology Stack

- **Framework**: React 18 with TypeScript
- **Bundler & Dev Server**: Vite 5
- **Client Routing**: React Router DOM 6
- **Icons**: Lucide React
- **Typography**: Google Fonts (Manrope for geometric headings, Inter for high-legibility body)
- **Styling**: Vanilla CSS Design System with CSS Custom Properties (tokens), Flexbox & CSS Grid

---

## 3. Website Architecture & Routes

| Route | Page / Feature | Purpose |
|---|---|---|
| `/` | **Home** | Brand hero, sector cards, process steps, candidate CTA, FAQs, closing consultation |
| `/about` | **About Us** | Mission, vision, core values, pre-screening compliance standards |
| `/services` | **Recruitment Services** | Permanent, temporary/shift cover, and fixed-term contract models |
| `/services/care-homes` | **Care Home Recruitment** | Sector landing page for residential care staffing & enquiry form |
| `/services/healthcare` | **Healthcare Recruitment** | Sector landing page for clinical and healthcare support staffing |
| `/services/corporate` | **Corporate Recruitment** | Sector landing page for business operations and administration staffing |
| `/employers` | **Employer Portal** | Conversion-focused staffing request form with reference code generation |
| `/candidates` | **Candidate Portal** | 5-step candidate journey, preparation advice, statutory rights |
| `/opportunities` | **Opportunities Board** | Filterable vacancies by sector, job type, and location with detail modal |
| `/submit-cv` | **Submit Your CV** | Drag & Drop CV upload with file validation (.pdf, .doc, .docx < 5MB) |
| `/contact` | **Contact Us** | Direct contact desk, operating hours, and multi-category enquiry form |
| `/privacy-policy` | **Privacy Policy** | Full UK GDPR & Data Protection Act 2018 candidate notice |
| `/cookie-policy` | **Cookie Policy** | PECR cookie compliance and browser management |
| `/terms` | **Terms & Conditions** | Employment Agencies Act 1973 terms and conditions |

---

## 4. Installation & Local Development

### Prerequisites
- Node.js (version 18 or higher)
- npm or yarn

### Installation Steps

```bash
# Navigate to project folder
cd d:\LICHT_Web

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be accessible locally at `http://localhost:5173/`.

---

## 5. Build & Production Deployment

To generate an optimised production bundle:

```bash
npm run build
```

The production output will be generated inside the `dist/` directory.

### Preview Production Build Locally
```bash
npm run preview
```

### Deployment Configuration
The build is static and can be deployed to any modern web hosting service:
- **Vercel / Netlify / Cloudflare Pages / AWS S3 + CloudFront**
- Configure single-page application (SPA) rewrites to redirect all routes to `/index.html`.

---

## 6. Form Handling & Backend Integration

The frontend forms (`EmployerEnquiryForm`, `CandidateCVForm`, and `ContactForm`) feature comprehensive client-side validation, error handling, loading states, and unique reference code generation (`LICHT-EMP-XXXXX`, `LICHT-CAN-XXXXX`).

To connect to your live recruitment CRM or backend API:
1. Update endpoint URLs in `src/components/recruitment/` or configure an environment variable `VITE_API_BASE_URL`.
2. Secure CV file uploads to your cloud storage bucket (AWS S3, Google Cloud Storage, or Azure Blob) using pre-signed upload URLs.
3. Keep all private API keys on the server side in compliance with security guidelines.

---

## 7. Compliance & Legal Standards

- **UK GDPR & Data Protection Act 2018**: Candidate data processed strictly for recruitment purposes.
- **Employment Agencies Act 1973 & EAS Regulations**: No fees charged to work-seekers; clear terms of engagement for employers.
- **Accessibility**: Semantic HTML5, accessible form labels, keyboard navigation, visible focus indicators, and WCAG 2.2 AA contrast adherence.

---

© 2026 LICHT RECRUITMENT SERVICES LIMITED. All rights reserved.
