export interface Vacancy {
  /** Public reference used in URLs (job code, or the numeric id when a job has no code) */
  id: string;
  /** Numeric database id, present for live vacancies */
  dbId?: string;
  companyName?: string;
  urgentCover?: boolean;
  title: string;
  sector: string;
  location: string;
  type: string;
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

const str = (v: unknown) => (v === null || v === undefined ? '' : String(v));

const SECTOR_IMAGES: Record<string, string> = {
  'care homes': '/assets/care_home_sector.jpg',
  'supported living': '/assets/care_home_sector.jpg',
  healthcare: '/assets/healthcare_sector.jpg',
  corporate: '/assets/corporate_sector.jpg'
};

/** Converts a backend Job entity into the null-safe Vacancy shape used by the job board. */
export function mapJobToVacancy(job: any): Vacancy {
  const sector = str(job.sector);
  return {
    id: str(job.code) || str(job.id),
    dbId: str(job.id),
    companyName: str(job.companyName),
    urgentCover: Boolean(job.urgentCover),
    title: str(job.title),
    sector,
    location: str(job.location),
    type: str(job.type) || str(job.contract),
    shift: str(job.shift),
    contract: str(job.contract) || str(job.type),
    workingPattern: str(job.workingPattern) || str(job.shift),
    pay: str(job.pay) || 'Pay discussed on application',
    summary: str(job.summary),
    roleMeaning: str(job.roleMeaning),
    whatRoleInvolves: Array.isArray(job.whatRoleInvolves) ? job.whatRoleInvolves.map(str) : [],
    whatYouBring: Array.isArray(job.whatYouBring) ? job.whatYouBring.map(str) : [],
    beforeYouApply: str(job.beforeYouApply),
    postedDate: str(job.postedDate),
    image: str(job.image) || SECTOR_IMAGES[sector.toLowerCase()] || '/assets/hero_recruitment.jpg'
  };
}

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
