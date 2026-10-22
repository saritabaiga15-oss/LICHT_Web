import { UserProfile } from '../types/auth';

export const DEMO_USER_PROFILE: UserProfile = {
  id: 'cand-8821',
  fullName: 'Eleanor Vance',
  email: 'eleanor.vance@licht-talent.co.uk',
  phone: '+44 7700 900482',
  location: 'Kensington & Chelsea, London',
  postcode: 'SW7 2AZ',
  headline: 'Senior Healthcare Assistant & Lead Support Specialist',
  experienceLevel: '5+ years of experience',
  education: [
    {
      id: 'edu-1',
      qualification: 'NVQ Level 3 Diploma in Health & Social Care',
      fieldOfStudy: 'Adult Health & Clinical Care Practice',
      institution: 'City & Guilds London',
      graduationYear: '2019'
    },
    {
      id: 'edu-2',
      qualification: 'BTEC National Extended Diploma',
      fieldOfStudy: 'Applied Science & Healthcare Studies',
      institution: 'West London College',
      graduationYear: '2017'
    }
  ],
  targetSector: 'Care homes',
  availability: 'Immediately available',
  dbsStatus: 'Enhanced DBS on Update Service',
  bio: 'Dedicated Healthcare & Care Professional with over 6 years of experience supporting elderly residents and individuals with complex neurological and physical needs across Greater London. Certified in Medication Administration, Moving & Handling, and End-of-Life Care. Known for compassionate patient advocacy and reliable team leadership.',
  skills: [
    'Medication Administration (Level 3)',
    'Dementia & Alzheimer’s Care',
    'Moving & Handling (Hoist Certified)',
    'PEG Feeding & Stoma Care',
    'Care Plan Formulation',
    'Infection Prevention & Control',
    'Palliative & End-of-Life Support',
    'Multidisciplinary Communication'
  ],
  certifications: [
    'Care Certificate (Skills for Care UK)',
    'NVQ Level 3 in Health and Social Care',
    'Emergency First Aid at Work (HSE Approved)',
    'DBS Enhanced Certificate (Valid on Update Service)',
    'Safe Handling of Medicines Certificate'
  ],
  previousExperience: [
    {
      id: 'exp-1',
      jobTitle: 'Senior Care Assistant & Shift Lead',
      company: 'Kensington Manor Residential Care',
      location: 'London, UK',
      startDate: 'March 2022',
      endDate: 'Present',
      current: true,
      responsibilities: 'Led a dedicated day team of 8 care assistants across a 48-bed specialist dementia wing. Administered daily medication regimens, conducted risk assessments, liaised with district nurses and GPs, and facilitated person-centred care routines.'
    },
    {
      id: 'exp-2',
      jobTitle: 'Healthcare Assistant (HCA)',
      company: 'Chelsea & Westminster NHS Foundation Trust',
      location: 'London, UK',
      startDate: 'September 2019',
      endDate: 'February 2022',
      current: false,
      responsibilities: 'Provided acute inpatient care on elderly medical wards. Monitored vital signs, assisted with nutritional support and personal mobility, and meticulously documented patient progress on clinical electronic health records.'
    },
    {
      id: 'exp-3',
      jobTitle: 'Support Worker (Supported Living)',
      company: 'Dimensions UK Ltd',
      location: 'Hammersmith, London',
      startDate: 'July 2018',
      endDate: 'August 2019',
      current: false,
      responsibilities: 'Supported young adults with autism and moderate learning disabilities to maintain independence in communal residential housing. Supported community outings, budgeting, and routine daily life.'
    }
  ],
  savedCV: {
    fileName: 'Eleanor_Vance_Senior_Healthcare_CV_2026.pdf',
    fileSize: '428 KB',
    uploadedDate: '14 Oct 2026',
    fileUrl: '/assets/sample_candidate_cv.pdf'
  },
  appliedJobs: [
    {
      id: 'app-101',
      jobId: 'CA-101',
      jobTitle: 'Care Assistant',
      companyName: 'St. Jude Care Pavilion (London)',
      sector: 'Care homes',
      location: 'London',
      contractType: 'Temporary (Shift Rotas)',
      pay: '£14.50 – £16.00 / hr',
      appliedDate: '18 Oct 2026',
      status: 'Interview Scheduled',
      cvUsed: 'Eleanor_Vance_Senior_Healthcare_CV_2026.pdf',
      notes: 'Initial telephone screening passed. Competency interview scheduled with LICHT Placement Director.'
    },
    {
      id: 'app-102',
      jobId: 'SW-102',
      jobTitle: 'Support Worker',
      companyName: 'Sunrise Supported Living Community',
      sector: 'Supported living',
      location: 'Birmingham',
      contractType: 'Permanent',
      pay: '£26,500 – £28,000 / yr',
      appliedDate: '15 Oct 2026',
      status: 'Under Review',
      cvUsed: 'Eleanor_Vance_Senior_Healthcare_CV_2026.pdf',
      notes: 'Profile submitted to hiring manager. Client reviewing clinical references.'
    },
    {
      id: 'app-103',
      jobId: 'RN-103',
      jobTitle: 'Senior Clinical Lead / Staff Nurse',
      companyName: 'Barchester Healthcare Unit',
      sector: 'Healthcare',
      location: 'Manchester',
      contractType: 'Permanent',
      pay: '£36,000 – £42,000 / yr',
      appliedDate: '11 Oct 2026',
      status: 'Shortlisted',
      cvUsed: 'Eleanor_Vance_Senior_Healthcare_CV_2026.pdf',
      notes: 'Shortlisted for clinical panel interview.'
    }
  ],
  savedJobs: ['CA-101', 'SW-102']
};
