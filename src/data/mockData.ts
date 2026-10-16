export interface Vacancy {
  id: string;
  title: string;
  sector: 'Care Homes' | 'Healthcare' | 'Corporate';
  location: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Permanent';
  salary: string;
  postedDate: string;
  description: string;
  essentialRequirements: string[];
  desirableRequirements: string[];
  responsibilities: string[];
  isDemo?: boolean;
}

export const SAMPLE_VACANCIES: Vacancy[] = [
  {
    id: 'licht-vac-01',
    title: 'Senior Care Assistant',
    sector: 'Care Homes',
    location: 'Greater London / Surrey',
    type: 'Full-time',
    salary: '£26,000 - £29,500 per annum (Subject to confirmation)',
    postedDate: '14 Oct 2026',
    description: 'Supporting care home residents with personal care, medication administration support under supervision, and leading junior care staff during shift handovers.',
    essentialRequirements: [
      'NVQ / RQF Level 3 in Health and Social Care (or working towards)',
      'Minimum 12 months proven experience within a residential or nursing care home',
      'Enhanced DBS check clearance (or eligibility to obtain)',
      'Compassionate, communicative and reliable professional conduct'
    ],
    desirableRequirements: [
      'Medication administration training certification',
      'Experience mentoring new care assistants'
    ],
    responsibilities: [
      'Provide compassionate person-centred support to residents',
      'Maintain clear daily care records and handover notes',
      'Support care coordinators with shift coordination'
    ],
    isDemo: true
  },
  {
    id: 'licht-vac-02',
    title: 'Healthcare Support Worker',
    sector: 'Healthcare',
    location: 'Birmingham & West Midlands',
    type: 'Full-time',
    salary: '£12.80 - £14.20 per hour (Indicative rate)',
    postedDate: '12 Oct 2026',
    description: 'Providing essential healthcare support in clinical day centres and rehabilitation units in accordance with agreed employer standards.',
    essentialRequirements: [
      'Care Certificate or equivalent health and social care qualification',
      'Knowledge of infection control, moving and handling protocols',
      'Satisfactory professional references covering minimum 2 years',
      'Right to work in the United Kingdom'
    ],
    desirableRequirements: [
      'Phlebotomy or basic clinical observation skills',
      'Flexible availability for rotational rotas'
    ],
    responsibilities: [
      'Assist multidisciplinary teams with routine patient care',
      'Accurately monitor and log patient vital signs',
      'Maintain hygienic, safe healthcare environments'
    ],
    isDemo: true
  },
  {
    id: 'licht-vac-03',
    title: 'Corporate Operations Administrator',
    sector: 'Corporate',
    location: 'Central London (Hybrid)',
    type: 'Permanent',
    salary: '£28,000 - £33,000 per annum (Indicative)',
    postedDate: '10 Oct 2026',
    description: 'Managing office workflow, supplier coordination, client scheduling, and documentation processing for a professional corporate organisation.',
    essentialRequirements: [
      'Prior office administration or operations support experience',
      'Proficiency in MS Office 365, database entry, and diary management',
      'Strong written and verbal communication in business English',
      'Excellent organisational and prioritisation capabilities'
    ],
    desirableRequirements: [
      'Experience in HR coordination or recruitment administration',
      'Educated to degree level or equivalent professional qualification'
    ],
    responsibilities: [
      'Coordinate executive meetings and client correspondence',
      'Maintain compliant digital records and operational reports',
      'Act as a welcoming first point of contact for corporate enquiries'
    ],
    isDemo: true
  },
  {
    id: 'licht-vac-04',
    title: 'Residential Care Assistant',
    sector: 'Care Homes',
    location: 'Manchester & Greater Manchester',
    type: 'Full-time',
    salary: '£23,500 - £25,000 per annum',
    postedDate: '08 Oct 2026',
    description: 'Delivering hands-on daily living support, dignity, and companionship to elderly residents in a well-regarded care home setting.',
    essentialRequirements: [
      'Genuine passion for elder care and supporting vulnerable adults',
      'Valid UK Right to Work and Enhanced DBS eligibility',
      'Willingness to undertake statutory care training and qualifications'
    ],
    desirableRequirements: [
      'Previous care home or domiciliary care experience',
      'Driver with valid clean UK driving licence'
    ],
    responsibilities: [
      'Support residents with mobility, meals, and social activities',
      'Report any health changes promptly to the duty nurse or manager',
      'Promote resident independence, choice, and dignity'
    ],
    isDemo: true
  },
  {
    id: 'licht-vac-05',
    title: 'Customer Service & Client Support Specialist',
    sector: 'Corporate',
    location: 'Leeds / Remote Hybrid',
    type: 'Full-time',
    salary: '£25,000 - £28,000 per annum',
    postedDate: '05 Oct 2026',
    description: 'Handling client accounts, inbound business enquiries, service delivery coordination, and issue resolution for enterprise clients.',
    essentialRequirements: [
      '2+ years in customer service, business client support, or account coordination',
      'Confident telephone manner and clear business email writing skills',
      'Ability to thrive in a structured, fast-paced team environment'
    ],
    desirableRequirements: [
      'CRM software experience (Salesforce, HubSpot, or Zendesk)',
      'Conflict resolution and complaint handling certifications'
    ],
    responsibilities: [
      'Promptly resolve incoming corporate client enquiries',
      'Collaborate with account directors to uphold service level agreements',
      'Prepare weekly client service activity reports'
    ],
    isDemo: true
  }
];

export const FREQUENTLY_ASKED_QUESTIONS = [
  {
    question: 'What recruitment services do you provide?',
    answer: 'LICHT supports recruitment across care homes, healthcare and corporate environments. The precise service scope is agreed for each requirement.'
  },
  {
    question: 'How can an employer request support?',
    answer: 'Employers can submit a direct recruitment enquiry through our Employers portal or Contact page, detailing vacancy requirements, location and timelines so we can discuss the most appropriate support.'
  },
  {
    question: 'Can candidates submit their CVs?',
    answer: 'Yes, candidates can submit their CVs through our Submit Your CV page for consideration against current and future matching vacancies across our client network.'
  },
  {
    question: 'How are candidates assessed?',
    answer: 'Candidates are screened based on skills, verified experience, eligibility to work, professional references, and sector-specific compliance standards such as Enhanced DBS checks.'
  },
  {
    question: 'Do you offer temporary, permanent or remote recruitment?',
    answer: 'We provide recruitment solutions tailored to employer requirements across permanent, temporary, and agreed placement models.'
  }
];

export const RECRUITMENT_PROCESS_STEPS = [
  {
    step: '01',
    title: 'Discuss Your Requirements',
    description: 'We explore your staffing needs, vacancy specifics, essential qualifications, shift patterns, culture fit, and target timeline.'
  },
  {
    step: '02',
    title: 'Agree Recruitment Approach',
    description: 'We confirm the scope of service, role profile, candidate screening criteria, terms of business, and agreed communication milestones.'
  },
  {
    step: '03',
    title: 'Identify & Screen Candidates',
    description: 'We match candidates against verified criteria, evaluate relevant experience, review references, and present qualified profiles.'
  },
  {
    step: '04',
    title: 'Coordinate & Support Placement',
    description: 'We schedule interviews, facilitate two-way feedback, and assist through offer management and placement onboarding.'
  }
];
