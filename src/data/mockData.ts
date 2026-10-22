export interface Vacancy {
  id: string;
  title: string;
  sector: 'Care homes' | 'Healthcare' | 'Supported living' | 'Corporate';
  location: string;
  type: 'Temporary' | 'Permanent' | 'Full time' | 'Part time';
  shift: string;
  contract: string;
  workingPattern: string;
  pay: string;
  summary: string;
  roleMeaning: string;
  whatRoleInvolves: string[];
  whatYouBring: string[];
  beforeYouApply: string;
  salary?: string;
  postedDate?: string;
  description?: string;
  essentialRequirements?: string[];
  desirableRequirements?: string[];
  responsibilities?: string[];
  image?: string;
  isDemo?: boolean;
}

export const SAMPLE_VACANCIES: Vacancy[] = [
  {
    id: 'CA-101',
    title: 'Care Assistant',
    sector: 'Care homes',
    location: 'London',
    type: 'Temporary',
    contract: 'Temporary',
    shift: 'Day & night shifts',
    workingPattern: 'Day & night shifts',
    pay: 'Pay discussed on application',
    summary: 'Bring a compassionate approach to supporting residents with everyday care and wellbeing.',
    roleMeaning: 'As a Care Assistant, you would support residents with day-to-day care, comfort and wellbeing. This example role is suited to someone who brings a patient, respectful approach and enjoys working as part of a team.',
    whatRoleInvolves: [
      'Supporting personal care while respecting privacy, dignity and choice.',
      'Helping residents with meals, mobility and daily routines.',
      'Working with the care team and communicating changes in wellbeing.',
      'Following care plans, recording information and working within agreed procedures.'
    ],
    whatYouBring: [
      'A compassionate, dependable and respectful approach.',
      'Clear communication and the ability to work collaboratively.',
      'Relevant care experience; requirements are discussed for each placement.',
      'Willingness to complete role-relevant checks and provide documentation.'
    ],
    beforeYouApply: 'We would discuss your experience, availability and the requirements of the setting. Any offer or placement is subject to the relevant recruitment checks, including right-to-work checks and, where applicable, references and DBS requirements.',
    image: '/assets/care_home_sector.jpg',
    isDemo: true
  },
  {
    id: 'SW-102',
    title: 'Support Worker',
    sector: 'Supported living',
    location: 'Birmingham',
    type: 'Permanent',
    contract: 'Permanent',
    shift: 'Full time',
    workingPattern: 'Full time',
    pay: 'Pay discussed on application',
    summary: 'Support people to build independence and take an active part in their daily lives.',
    roleMeaning: 'As a Support Worker in supported living environments, you will empower individuals with learning disabilities or autism to develop life skills, achieve personal goals, and engage actively within their community.',
    whatRoleInvolves: [
      'Encouraging and assisting individuals with daily living tasks and community activities.',
      'Promoting independence, communication skills, and personal decision-making.',
      'Collaborating with families, healthcare practitioners, and support team coordinators.',
      'Maintaining accurate progress notes and adhering to personalised support guidelines.'
    ],
    whatYouBring: [
      'A patient, supportive attitude with strong interpersonal skills.',
      'Experience in supported living or social care environments.',
      'Reliable problem-solving skills and calm demeanour in changing situations.',
      'Commitment to mandatory training and compliance checks.'
    ],
    beforeYouApply: 'We discuss placement requirements and working hours prior to interviews. All appointments are subject to satisfactory references and Enhanced DBS clearance.',
    image: '/assets/care_home_sector.jpg',
    isDemo: true
  },
  {
    id: 'HC-103',
    title: 'Healthcare Assistant',
    sector: 'Healthcare',
    location: 'Manchester',
    type: 'Temporary',
    contract: 'Temporary',
    shift: 'Flexible shifts',
    workingPattern: 'Flexible shifts',
    pay: 'Pay discussed on application',
    summary: 'Contribute to a patient-centred team in a professional healthcare environment.',
    roleMeaning: 'In this Healthcare Assistant position, you will work alongside registered nursing personnel in clinical wards and medical settings, delivering attentive patient support and maintaining high standards of care hygiene.',
    whatRoleInvolves: [
      'Assisting patients with routine personal care and mobility support.',
      'Observing and accurately recording clinical vital signs under nurse supervision.',
      'Maintaining clean, sterilised and orderly clinical ward environments.',
      'Communicating sensitively with patients, relatives, and multidisciplinary healthcare teams.'
    ],
    whatYouBring: [
      'Care Certificate or proven healthcare experience in an NHS or clinical care setting.',
      'Clear understanding of infection control and patient confidentiality (Caldicott principles).',
      'Punctual, dependable approach to flexible shift patterns.',
      'Enhanced DBS check and verified professional references.'
    ],
    beforeYouApply: 'All candidates must hold valid UK right-to-work verification and complete our clinical compliance checks before assignment allocation.',
    image: '/assets/healthcare_sector.jpg',
    isDemo: true
  },
  {
    id: 'OA-104',
    title: 'Office Administrator',
    sector: 'Corporate',
    location: 'Bristol',
    type: 'Permanent',
    contract: 'Permanent',
    shift: 'Full time',
    workingPattern: 'Full time',
    pay: 'Pay discussed on application',
    summary: 'Keep a busy team organised with thoughtful administrative and operational support.',
    roleMeaning: 'As an Office Administrator, you will be the backbone of daily office operations, providing smooth clerical coordination, client visitor reception, and executive support across our corporate partner organization.',
    whatRoleInvolves: [
      'Coordinating executive diaries, client appointments, and meeting room logistics.',
      'Managing business email correspondence, telephone queries, and mail distribution.',
      'Maintaining accurate digital databases, spreadsheets, and document filing systems.',
      'Liaising with external suppliers, office contractors, and internal department heads.'
    ],
    whatYouBring: [
      'Solid administrative or customer service experience in a corporate office environment.',
      'Strong proficiency with Microsoft Office 365 (Word, Excel, Outlook, Teams).',
      'Professional telephone manner and articulate written communication.',
      'Meticulous attention to detail and sound time management capabilities.'
    ],
    beforeYouApply: 'Shortlisted candidates will be invited for an initial video or face-to-face consultation. Professional references covering the last 2 years will be required.',
    image: '/assets/corporate_sector.jpg',
    isDemo: true
  }
];

export const FREQUENTLY_ASKED_QUESTIONS = [
  {
    question: 'What recruitment services do you provide?',
    answer: 'LICHT supports recruitment across care homes, healthcare, supported living, and corporate environments. The precise service scope is agreed for each requirement.'
  },
  {
    question: 'How can an employer request support?',
    answer: 'Employers can submit a direct recruitment enquiry through our Request Staff form or Contact page, detailing vacancy requirements, location, and timelines so we can discuss the most appropriate support.'
  },
  {
    question: 'Can candidates submit their CVs?',
    answer: 'Yes, candidates can submit their CVs through our Find a Job or Send Your CV page for consideration against current and future matching vacancies across our client network.'
  },
  {
    question: 'How are candidates assessed?',
    answer: 'Candidates are screened based on skills, verified experience, eligibility to work, professional references, and sector-specific compliance standards such as Enhanced DBS checks.'
  },
  {
    question: 'Do you offer temporary, permanent or ongoing staffing support?',
    answer: 'We provide recruitment solutions tailored to employer requirements across permanent placements, temporary cover, and ongoing workforce arrangements.'
  }
];
