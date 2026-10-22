import { EmployerAccount, EmployerJobListing, TalentCandidate } from '../types/employer';

export const DEMO_EMPLOYER: EmployerAccount = {
  id: 'emp-001',
  contactName: 'Dr. Julian Thorne',
  roleTitle: 'Director of Clinical Operations',
  organisationName: 'St. Jude Care Pavilion',
  facilityType: 'Specialist Dementia & Residential Nursing Home',
  email: 'j.thorne@stjudecare.co.uk',
  phone: '+44 20 7946 0812',
  location: 'Kensington & Chelsea, London (W8 4QP)',
  cqcRating: 'Outstanding',
  activeListingsCount: 3,
  companyNumber: '10982341',
  cqcProviderId: '1-102938472',
  insurancePolicy: 'UK-AVIVA-MED-849201',
  registeredAddress: '14 St. Jude Gardens, Kensington, London W8 4QP',
  postcode: 'W8 4QP',
  website: 'https://www.stjudecare.co.uk',
  primarySector: 'Care homes',
  uploadedDocuments: [
    { id: 'doc-01', name: 'St_Jude_CQC_Registration_Certificate.pdf', type: 'CQC Registration', size: '2.4 MB', date: '04 Jan 2026', verified: true },
    { id: 'doc-02', name: 'Employers_Liability_Insurance_2026.pdf', type: 'Insurance Schedule', size: '1.9 MB', date: '12 Jan 2026', verified: true },
    { id: 'doc-03', name: 'Companies_House_Certificate_Of_Incorporation.pdf', type: 'Certificate of Incorporation', size: '1.1 MB', date: '04 Jan 2026', verified: true }
  ],
  registrationDate: '12 Jan 2026',
  verificationStatus: 'Verified'
};

export const INITIAL_ALL_EMPLOYERS: EmployerAccount[] = [
  DEMO_EMPLOYER,
  {
    id: 'emp-pending-01',
    contactName: 'Margaret Holloway',
    roleTitle: 'Registered Care Provider',
    organisationName: 'Apex Specialist Residential Group Ltd',
    facilityType: 'Specialist Dementia & Residential Nursing Home',
    email: 'm.holloway@apexresidential.co.uk',
    phone: '+44 20 8912 4001',
    location: 'Richmond upon Thames, London (TW9 1TY)',
    cqcRating: 'Good',
    activeListingsCount: 0,
    companyNumber: '11829471',
    cqcProviderId: '1-849201948',
    insurancePolicy: 'UK-HIS-774019',
    registeredAddress: '42 Richmond Hill, London TW9 1TY',
    postcode: 'TW9 1TY',
    website: 'https://www.apexresidential.co.uk',
    primarySector: 'Care homes',
    documentsVerified: false,
    verificationStatus: 'Pending',
    registrationDate: '20 Oct 2026',
    uploadedDocuments: [
      { id: 'doc-ap-1', name: 'Apex_CQC_Provider_Certificate.pdf', type: 'CQC Registration', size: '2.8 MB', date: 'Attached Today', verified: false },
      { id: 'doc-ap-2', name: 'Apex_Employers_Liability_Cover.pdf', type: 'Insurance Schedule', size: '1.6 MB', date: 'Attached Today', verified: false },
      { id: 'doc-ap-3', name: 'Apex_Companies_House_Incorp.pdf', type: 'Certificate of Incorporation', size: '1.4 MB', date: 'Attached Today', verified: false }
    ]
  }
];

export const INITIAL_EMPLOYER_JOBS: EmployerJobListing[] = [
  {
    id: 'emp-job-01',
    title: 'Senior Care Assistant (Dementia Unit)',
    sector: 'Care homes',
    location: 'Kensington, London (W8)',
    contractType: 'Permanent',
    payRate: '£15.20 – £16.50 / hr + shift enhancements',
    postedDate: '12 Oct 2026',
    status: 'Active',
    urgentCover: false,
    applicants: [
      {
        id: 'app-01',
        candidateName: 'Eleanor Vance',
        email: 'eleanor.vance@licht-talent.co.uk',
        phone: '+44 7700 900482',
        location: 'London (SW7 2AZ)',
        appliedDate: '14 Oct 2026',
        status: 'Interview Scheduled',
        dbsStatus: 'Enhanced DBS on Update Service (Clean)',
        experienceYears: 8,
        currentRole: 'Senior Care Assistant',
        cvFileName: 'Eleanor_Vance_Senior_Care_CV.pdf',
        matchScore: 98,
        coverNote: '8+ years extensive experience in specialist dementia care, NVQ Level 3 in Health & Social Care, and medication administration lead experience.',
        skills: ['Dementia Care', 'Medication Administration', 'Care Planning', 'End of Life Care', 'Safeguarding Level 3', 'Moving & Handling'],
        education: [
          'NVQ Level 3 Diploma in Health & Social Care – City & Guilds (Distinction)',
          'Care Certificate – Skills for Care UK',
          'Dementia Champion Certification – Alzheimer’s Society'
        ],
        certifications: [
          'Enhanced DBS on Update Service (Cert #0015948291)',
          'First Aid at Work & CPR (UK Resuscitation Council)',
          'Safe Handling of Medicines Level 3'
        ],
        workHistory: [
          {
            role: 'Senior Care Assistant',
            company: 'Meadowcroft Residential & Nursing Home',
            duration: '2022 – Present (4 yrs)',
            details: 'Lead medication administration for 28-bed high-dependency dementia unit. Supervise 6 care assistants on rotational shifts and formulate individualized person-centred care plans.'
          },
          {
            role: 'Care Assistant / Unit Carer',
            company: 'Sunrise Senior Living, Kensington',
            duration: '2018 – 2022 (4 yrs)',
            details: 'Delivered holistic daily care, assisted with mobility, nutrition, and personal hygiene. Mentored junior carers in safeguarding best practices.'
          }
        ],
        referencesAvailable: true
      },
      {
        id: 'app-02',
        candidateName: 'David Adebayo',
        email: 'd.adebayo@outlook.com',
        phone: '+44 7700 900311',
        location: 'Wembley, London (HA9)',
        appliedDate: '15 Oct 2026',
        status: 'Under Review',
        dbsStatus: 'Enhanced DBS Verified',
        experienceYears: 5,
        currentRole: 'Care Team Leader',
        cvFileName: 'David_Adebayo_Resume.pdf',
        matchScore: 91,
        coverNote: 'Lead night carer with strong safeguarding credentials and moving & handling trainer certification.',
        skills: ['Night Shift Leadership', 'Moving & Handling Trainer', 'Safeguarding Adults', 'Medication Rounds', 'Incident Reporting'],
        education: [
          'NVQ Level 3 in Adult Health & Social Care',
          'Level 2 Award in Safe Handling of Medication'
        ],
        certifications: [
          'Enhanced DBS on Update Service',
          'Train the Trainer: Moving & Positioning',
          'Basic Life Support & AED'
        ],
        workHistory: [
          {
            role: 'Night Shift Team Leader',
            company: 'Highfield House Care Home',
            duration: '2021 – Present (3 yrs)',
            details: 'Direct overnight care operations for 45 residents, conduct nightly safety audits, and coordinate rapid emergency triage.'
          }
        ],
        referencesAvailable: true
      },
      {
        id: 'app-03',
        candidateName: 'Chloe Bennett',
        email: 'c.bennett@carepro.org',
        phone: '+44 7700 900194',
        location: 'Hammersmith, London (W6)',
        appliedDate: '17 Oct 2026',
        status: 'Shortlisted',
        dbsStatus: 'Enhanced DBS Verified',
        experienceYears: 4,
        currentRole: 'Healthcare Assistant',
        cvFileName: 'Chloe_Bennett_CV.pdf',
        matchScore: 88,
        coverNote: 'Compassionate care practitioner with End of Life Care Level 3 certificate.',
        skills: ['Palliative Care', 'Personal Care', 'Infection Prevention', 'Record Keeping', 'Hydration & Nutrition'],
        education: ['NVQ Level 2 in Health & Social Care', 'Care Certificate (Skills for Care)'],
        certifications: ['Enhanced DBS Cleared', 'Infection Control Level 2'],
        workHistory: [
          {
            role: 'Healthcare Assistant',
            company: 'Riverside Nursing Centre',
            duration: '2022 – Present (2 yrs)',
            details: 'Provide person-centred palliative and residential support in a 40-bed facility.'
          }
        ],
        referencesAvailable: true
      }
    ]
  },
  {
    id: 'emp-job-02',
    title: 'Registered General Nurse (RGN - Band 5/6)',
    sector: 'Healthcare',
    location: 'Kensington, London (W8)',
    contractType: 'Full-time',
    payRate: '£28.00 – £34.50 / hr (Day & Night rotations)',
    postedDate: '10 Oct 2026',
    status: 'Active',
    urgentCover: true,
    applicants: [
      {
        id: 'app-04',
        candidateName: 'Kavita Patel',
        email: 'kavita.patel@nhs-talent.co.uk',
        phone: '+44 7700 900654',
        location: 'Fulham, London (SW6)',
        appliedDate: '13 Oct 2026',
        status: 'Interview Scheduled',
        dbsStatus: 'Enhanced DBS on Update Service',
        experienceYears: 7,
        currentRole: 'Staff Nurse (RGN)',
        cvFileName: 'Kavita_Patel_Nursing_CV.pdf',
        matchScore: 96,
        coverNote: 'Active NMC PIN (valid to 2028), complex wound care certified, catheterisation and syringe driver proficient.',
        skills: ['NMC Active Registration', 'IV Medication', 'Wound Care & Dressings', 'Catheter Care', 'Syringe Drivers', 'Clinical Governance'],
        education: [
          'BSc (Hons) Adult Nursing – King’s College London (First Class)',
          'Postgraduate Certificate in Tissue Viability'
        ],
        certifications: [
          'NMC PIN #15G0824E (Active & Verified)',
          'Immediate Life Support (ILS) – Resuscitation Council UK',
          'Venepuncture & Cannulation Lead'
        ],
        workHistory: [
          {
            role: 'Staff Nurse (RGN - Complex Care)',
            company: 'Chelsea & Westminster NHS Trust',
            duration: '2021 – Present (5 yrs)',
            details: 'Manage acute and rehabilitative patient caseloads, administer IV medications, and train student nurses.'
          }
        ],
        referencesAvailable: true
      },
      {
        id: 'app-05',
        candidateName: 'Liam O’Connor',
        email: 'liam.oconnor@agency-nurses.co.uk',
        phone: '+44 7700 900822',
        location: 'Battersea, London (SW11)',
        appliedDate: '16 Oct 2026',
        status: 'Under Review',
        dbsStatus: 'Enhanced DBS Verified',
        experienceYears: 6,
        currentRole: 'Clinical Ward Nurse',
        cvFileName: 'Liam_OConnor_RGN.pdf',
        matchScore: 89,
        coverNote: 'Acute care and step-down rehabilitation nursing background.',
        skills: ['Acute Assessment', 'Medication Safety', 'Patient Handover', 'Infection Control Lead'],
        education: ['BSc Adult Nursing – University of Manchester'],
        certifications: ['Active NMC PIN', 'Enhanced DBS Cleared', 'BLS & AED'],
        workHistory: [
          {
            role: 'Ward Nurse (RGN)',
            company: 'St Thomas’ Hospital',
            duration: '2020 – 2024 (4 yrs)',
            details: 'Staff nurse in surgical step-down ward with rotational night and weekend duties.'
          }
        ],
        referencesAvailable: true
      }
    ]
  },
  {
    id: 'emp-job-03',
    title: 'Healthcare Support Worker (Weekend Cover)',
    sector: 'Supported living',
    location: 'Chelsea, London (SW3)',
    contractType: 'Temporary cover',
    payRate: '£14.20 – £15.00 / hr',
    postedDate: '15 Oct 2026',
    status: 'Active',
    urgentCover: false,
    applicants: [
      {
        id: 'app-06',
        candidateName: 'Tariq Al-Mansoor',
        email: 'tariq.mansoor@gmail.com',
        phone: '+44 7700 900115',
        location: 'Camden, London (NW1)',
        appliedDate: '16 Oct 2026',
        status: 'Under Review',
        dbsStatus: 'Enhanced DBS on Update Service',
        experienceYears: 3,
        currentRole: 'Support Worker',
        cvFileName: 'Tariq_Support_CV.pdf',
        matchScore: 87,
        coverNote: 'Autism & Learning Disability specialist support worker with Positive Behaviour Support (PBS) training.',
        skills: ['PBS Training', 'Autism Support', 'Independent Living Assistance', 'Safeguarding Level 3'],
        education: ['Level 3 Health and Social Care Diploma', 'Care Certificate'],
        certifications: ['Enhanced DBS on Update Service', 'PMVA Certified (BILD ACT)'],
        workHistory: [
          {
            role: 'Supported Living Assistant',
            company: 'Camden Community Care',
            duration: '2023 – Present (2 yrs)',
            details: 'Provide high-quality community support to 4 young adults with autism spectrum conditions.'
          }
        ],
        referencesAvailable: true
      }
    ]
  }
];

export const TALENT_POOL: TalentCandidate[] = [
  {
    id: 'cand-001',
    name: 'Eleanor Vance',
    avatarInitials: 'EV',
    headline: 'Senior Healthcare Assistant • Dementia Care Lead',
    role: 'Senior Healthcare Assistant',
    sector: 'Care homes',
    location: 'London',
    postcode: 'SW7',
    experienceYears: 8,
    dbsStatus: 'Enhanced DBS (Update Service)',
    availability: 'Immediate (Flexible Shifts)',
    expectedRate: '£15.00 – £17.50 / hr',
    skills: ['Dementia Care', 'Medication Admin', 'Care Planning', 'End of Life', 'Moving & Handling', 'Safeguarding Level 3'],
    certifications: ['NVQ Level 3 Health & Social Care', 'First Aid at Work', 'Dementia Care Specialist Certificate'],
    verified: true,
    summary: 'Diligent senior care professional with 8+ years across residential nursing homes and complex dementia units. Expert in person-centred care planning and shift management.'
  },
  {
    id: 'cand-002',
    name: 'Sister Fiona MacLeod',
    avatarInitials: 'FM',
    headline: 'Registered General Nurse (RGN) • Band 6 Clinical Lead',
    role: 'Registered General Nurse (RGN)',
    sector: 'Healthcare',
    location: 'Central London',
    postcode: 'W1',
    experienceYears: 12,
    dbsStatus: 'Enhanced DBS (Update Service)',
    availability: 'Available in 1 week',
    expectedRate: '£30.00 – £36.00 / hr',
    skills: ['NMC Active PIN', 'IV Therapy', 'Wound Management', 'Clinical Governance', 'Syringe Drivers', 'Venepuncture'],
    certifications: ['BSc (Hons) Adult Nursing', 'NMC Registered PIN #09E0142E', 'Mentorship in Practice'],
    verified: true,
    summary: 'Clinical leader with over a decade of NHS hospital and private surgical/rehabilitation clinic experience. Uncompromised standard of clinical compliance and infection control.'
  },
  {
    id: 'cand-003',
    name: 'David Adebayo',
    avatarInitials: 'DA',
    headline: 'Care Team Leader • Moving & Handling Trainer',
    role: 'Senior Care Worker',
    sector: 'Care homes',
    location: 'London',
    postcode: 'HA9',
    experienceYears: 6,
    dbsStatus: 'Enhanced DBS (Update Service)',
    availability: 'Immediate',
    expectedRate: '£15.50 – £17.00 / hr',
    skills: ['Staff Supervision', 'Medication Rounds', 'CQC Audit Prep', 'Risk Assessment', 'Incident Reporting'],
    certifications: ['Level 3 Health & Social Care', 'Train the Trainer: Moving & Handling'],
    verified: true,
    summary: 'Dependable and energetic care supervisor with proven record in reducing medication errors to zero and leading shifts of 14 carers in 60-bed care home.'
  },
  {
    id: 'cand-004',
    name: 'Marcus Chen',
    avatarInitials: 'MC',
    headline: 'Autism & Learning Disability Support Specialist',
    role: 'Specialist Support Worker',
    sector: 'Supported living',
    location: 'East London / Essex border',
    postcode: 'E14',
    experienceYears: 5,
    dbsStatus: 'Enhanced DBS (Update Service)',
    availability: 'Immediate (Nights & Weekends)',
    expectedRate: '£14.50 – £16.50 / hr',
    skills: ['PBS (Positive Behaviour Support)', 'PMVA Trained', 'Supported Living', 'Makaton', 'Community Outings'],
    certifications: ['Care Certificate', 'PMVA Certified (BILD ACT compliant)', 'Safeguarding Adults Level 3'],
    verified: true,
    summary: 'Patient and empathetic support worker dedicated to empowering young adults with complex autism spectrum conditions to achieve independent living goals.'
  },
  {
    id: 'cand-005',
    name: 'Dr. Sarah Jenkins-Taylor',
    avatarInitials: 'SJ',
    headline: 'Care Home Registered Manager (CQC Outstanding)',
    role: 'Care Home Manager / Consultant',
    sector: 'Care homes',
    location: 'Surrey / Greater London',
    postcode: 'KT2',
    experienceYears: 15,
    dbsStatus: 'Enhanced DBS (Update Service)',
    availability: '1 month notice',
    expectedRate: '£55,000 – £65,000 / yr',
    skills: ['CQC KLOE Compliance', 'Turnaround Management', 'Budget Management', 'Staff Retention', 'P&L Ownership'],
    certifications: ['Level 5 Leadership for Health & Social Care', 'RMA (Registered Manager Award)'],
    verified: true,
    summary: 'Accomplished operational leader who has steered two residential homes from Requires Improvement to CQC Outstanding ratings.'
  },
  {
    id: 'cand-006',
    name: 'Amara Okafor',
    avatarInitials: 'AO',
    headline: 'Healthcare Assistant (HCA) • Complex Care & Tracheostomy',
    role: 'Complex Care Assistant',
    sector: 'Healthcare',
    location: 'South London',
    postcode: 'SE1',
    experienceYears: 4,
    dbsStatus: 'Enhanced DBS (Update Service)',
    availability: 'Immediate (Day Shifts)',
    expectedRate: '£14.00 – £16.00 / hr',
    skills: ['Tracheostomy Care', 'PEG Feeding', 'Bowel Management', 'Personal Care', 'Pressure Area Care'],
    certifications: ['Care Certificate', 'Clinical Skills in Complex Care (Level 3)', 'BLS CPR'],
    verified: true,
    summary: 'Specialized clinical carer delivering one-on-one complex paediatric and adult care in domestic and hospice environments.'
  }
];
