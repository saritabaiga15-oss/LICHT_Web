/**
 * LICHT Recruitment Services - Production API Client
 * Connects React Frontend to Spring Boot REST Backend & Neon PostgreSQL
 */

export const API_BASE_URL = (import.meta as any).env?.VITE_API_BASE_URL || 'http://localhost:8080/api';

function getAuthHeader(): Record<string, string> {
  const token = localStorage.getItem('licht_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function handleResponse(res: Response) {
  const json = await res.json().catch(() => null);
  if (!res.ok) {
    const errorMsg = json?.message || `Request failed with status ${res.status}`;
    throw new Error(errorMsg);
  }
  return json;
}

// -------------------------------------------------------------
// 1. PUBLIC ENQUIRIES & FORMS
// -------------------------------------------------------------
export async function submitContactForm(data: {
  fullName: string;
  email: string;
  telephone: string;
  enquiryType: string;
  subject: string;
  message: string;
  privacyConsent: boolean;
}) {
  const res = await fetch(`${API_BASE_URL}/enquiries/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return handleResponse(res);
}

export async function submitEmployerStaffingForm(data: Record<string, any>) {
  const res = await fetch(`${API_BASE_URL}/enquiries/employer`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return handleResponse(res);
}

export async function submitCandidateCvDrop(formData: FormData) {
  const res = await fetch(`${API_BASE_URL}/enquiries/cv-drop`, {
    method: 'POST',
    body: formData
  });
  return handleResponse(res);
}

// -------------------------------------------------------------
// 2. OPPORTUNITIES & JOBS
// -------------------------------------------------------------
export async function fetchJobs(filters?: {
  sector?: string;
  type?: string;
  location?: string;
  search?: string;
}) {
  const params = new URLSearchParams();
  if (filters?.sector && filters.sector !== 'All') params.append('sector', filters.sector);
  if (filters?.type && filters.type !== 'All') params.append('type', filters.type);
  if (filters?.location) params.append('location', filters.location);
  if (filters?.search) params.append('search', filters.search);

  const res = await fetch(`${API_BASE_URL}/jobs?${params.toString()}`);
  return handleResponse(res);
}

export async function fetchJobById(id: string | number) {
  const res = await fetch(`${API_BASE_URL}/jobs/${id}`);
  return handleResponse(res);
}

export async function fetchFeaturedJobs() {
  const res = await fetch(`${API_BASE_URL}/jobs/featured`);
  return handleResponse(res);
}

// -------------------------------------------------------------
// 3. CANDIDATE AUTH & PROFILE
// -------------------------------------------------------------
export async function candidateLogin(credentials: { email: string; password?: string }) {
  const res = await fetch(`${API_BASE_URL}/auth/candidate/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials)
  });
  return handleResponse(res);
}

export async function candidateRegister(data: Record<string, any>) {
  const res = await fetch(`${API_BASE_URL}/auth/candidate/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return handleResponse(res);
}

export async function fetchCandidateProfile() {
  const res = await fetch(`${API_BASE_URL}/candidate/profile`, {
    headers: { ...getAuthHeader() }
  });
  return handleResponse(res);
}

export async function updateCandidateProfile(data: Record<string, any>) {
  const res = await fetch(`${API_BASE_URL}/candidate/profile`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
    body: JSON.stringify(data)
  });
  return handleResponse(res);
}

export async function applyToJob(jobId: string | number, notes?: string) {
  const res = await fetch(`${API_BASE_URL}/candidate/applications`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
    body: JSON.stringify({ jobId, notes })
  });
  return handleResponse(res);
}

export async function fetchCandidateApplications() {
  const res = await fetch(`${API_BASE_URL}/candidate/applications`, {
    headers: { ...getAuthHeader() }
  });
  return handleResponse(res);
}

export async function withdrawCandidateApplication(id: string | number) {
  const res = await fetch(`${API_BASE_URL}/candidate/applications/${id}`, {
    method: 'DELETE',
    headers: { ...getAuthHeader() }
  });
  return handleResponse(res);
}

export async function saveJob(jobId: string | number) {
  const res = await fetch(`${API_BASE_URL}/candidate/saved-jobs/${jobId}`, {
    method: 'POST',
    headers: { ...getAuthHeader() }
  });
  return handleResponse(res);
}

export async function unsaveJob(jobId: string | number) {
  const res = await fetch(`${API_BASE_URL}/candidate/saved-jobs/${jobId}`, {
    method: 'DELETE',
    headers: { ...getAuthHeader() }
  });
  return handleResponse(res);
}

// -------------------------------------------------------------
// 4. EMPLOYER PORTAL
// -------------------------------------------------------------
export async function employerLogin(credentials: { email: string; password?: string }) {
  const res = await fetch(`${API_BASE_URL}/employer/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials)
  });
  return handleResponse(res);
}

export async function employerRegister(data: Record<string, any>) {
  const res = await fetch(`${API_BASE_URL}/employer/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return handleResponse(res);
}

export async function fetchEmployerJobs() {
  const res = await fetch(`${API_BASE_URL}/employer/jobs`, {
    headers: { ...getAuthHeader() }
  });
  return handleResponse(res);
}

export async function postNewJob(jobData: Record<string, any>) {
  const res = await fetch(`${API_BASE_URL}/employer/jobs`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
    body: JSON.stringify(jobData)
  });
  return handleResponse(res);
}

export async function updateJobStatus(jobId: string | number, status: string) {
  const res = await fetch(`${API_BASE_URL}/employer/jobs/${jobId}/status`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
    body: JSON.stringify({ status })
  });
  return handleResponse(res);
}

export async function fetchJobApplicants(jobId: string | number) {
  const res = await fetch(`${API_BASE_URL}/employer/jobs/${jobId}/applicants`, {
    headers: { ...getAuthHeader() }
  });
  return handleResponse(res);
}

export async function updateApplicantStatus(jobId: string | number, applicantId: string | number, status: string) {
  const res = await fetch(`${API_BASE_URL}/employer/jobs/${jobId}/applicants/${applicantId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
    body: JSON.stringify({ status })
  });
  return handleResponse(res);
}

// -------------------------------------------------------------
// 5. ADMIN PORTAL
// -------------------------------------------------------------
export async function adminLogin(credentials: { email: string; password?: string }) {
  const res = await fetch(`${API_BASE_URL}/auth/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials)
  });
  return handleResponse(res);
}

export async function fetchAdminEmployers(status?: string) {
  const url = status ? `${API_BASE_URL}/admin/employers?status=${status}` : `${API_BASE_URL}/admin/employers`;
  const res = await fetch(url, { headers: { ...getAuthHeader() } });
  return handleResponse(res);
}

export async function approveAdminEmployer(employerId: string | number) {
  const res = await fetch(`${API_BASE_URL}/admin/employers/${employerId}/approve`, {
    method: 'PATCH',
    headers: { ...getAuthHeader() }
  });
  return handleResponse(res);
}

export async function rejectAdminEmployer(employerId: string | number, reason?: string) {
  const res = await fetch(`${API_BASE_URL}/admin/employers/${employerId}/reject`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
    body: JSON.stringify({ reason })
  });
  return handleResponse(res);
}

export async function fetchAdminCandidates() {
  const res = await fetch(`${API_BASE_URL}/admin/candidates`, {
    headers: { ...getAuthHeader() }
  });
  return handleResponse(res);
}

export async function updateCandidateCompliance(candidateId: string | number, checks: {
  dbsVerified?: boolean;
  rightToWorkVerified?: boolean;
  nmcPinVerified?: boolean;
}) {
  const res = await fetch(`${API_BASE_URL}/admin/candidates/${candidateId}/compliance`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
    body: JSON.stringify(checks)
  });
  return handleResponse(res);
}

export async function fetchAdminApplications() {
  const res = await fetch(`${API_BASE_URL}/admin/applications`, {
    headers: { ...getAuthHeader() }
  });
  return handleResponse(res);
}
