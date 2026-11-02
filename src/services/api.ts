/**
 * LICHT Recruitment Services - Production API Client
 * Connects React Frontend to Spring Boot REST Backend & Neon PostgreSQL
 */

export const API_BASE_URL = (import.meta as any).env?.VITE_API_BASE_URL || 'http://localhost:8080/api';

/**
 * Each role keeps its own session token so signing in or out of one portal never
 * leaks into another. Admin tokens live in sessionStorage (cleared when the tab closes).
 */
export type Role = 'candidate' | 'employer' | 'admin';

const TOKEN_KEYS: Record<Role, string> = {
  candidate: 'licht_candidate_token',
  employer: 'licht_employer_token',
  admin: 'licht_admin_token'
};

function tokenStore(role: Role): Storage {
  return role === 'admin' ? sessionStorage : localStorage;
}

export function getToken(role: Role): string | null {
  try {
    return tokenStore(role).getItem(TOKEN_KEYS[role]);
  } catch {
    return null;
  }
}

export function setToken(role: Role, token: string | null) {
  try {
    if (token) tokenStore(role).setItem(TOKEN_KEYS[role], token);
    else tokenStore(role).removeItem(TOKEN_KEYS[role]);
  } catch {
    // storage unavailable (private mode); session simply won't persist
  }
}

function authHeader(role: Role): Record<string, string> {
  const token = getToken(role);
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

async function handleResponse(res: Response) {
  const json = await res.json().catch(() => null);
  if (!res.ok) {
    const errorMsg = json?.message || `Request failed with status ${res.status}`;
    throw new ApiError(errorMsg, res.status);
  }
  return json;
}

/** Unwraps `{ success, data }` envelopes; list endpoints return bare arrays. */
function unwrap<T = any>(json: any): T {
  return json && typeof json === 'object' && 'success' in json && 'data' in json ? json.data : json;
}

async function request(role: Role | null, path: string, init: RequestInit = {}) {
  const headers: Record<string, string> = { ...(init.headers as Record<string, string> || {}) };
  if (init.body && !(init.body instanceof FormData)) headers['Content-Type'] = 'application/json';
  if (role) Object.assign(headers, authHeader(role));
  const res = await fetch(`${API_BASE_URL}${path}`, { ...init, headers });
  return handleResponse(res);
}

const json = (body: unknown) => JSON.stringify(body);

/** Downloads an authorised file (e.g. a CV) and hands it to the browser as a file save. */
export async function downloadFile(role: Role, path: string, fallbackName = 'document') {
  const res = await fetch(`${API_BASE_URL}${path}`, { headers: authHeader(role) });
  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new ApiError(body?.message || 'Could not download file.', res.status);
  }
  const disposition = res.headers.get('Content-Disposition') || '';
  const match = /filename="?([^";]+)"?/.exec(disposition);
  const blob = await res.blob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = match?.[1] || fallbackName;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
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
  return request(null, '/enquiries/contact', { method: 'POST', body: json(data) });
}

export async function submitEmployerStaffingForm(data: Record<string, any>) {
  return request(null, '/enquiries/employer', { method: 'POST', body: json(data) });
}

export async function submitCandidateCvDrop(formData: FormData) {
  return request(null, '/enquiries/cv-drop', { method: 'POST', body: formData });
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
  return request(null, `/jobs?${params.toString()}`);
}

export async function fetchJobById(id: string | number) {
  return request(null, `/jobs/${encodeURIComponent(String(id))}`);
}

export async function fetchFeaturedJobs() {
  return request(null, '/jobs/featured');
}

// -------------------------------------------------------------
// 3. CANDIDATE AUTH & PROFILE
// -------------------------------------------------------------
export async function candidateLogin(credentials: { email: string; password: string }) {
  return unwrap(await request(null, '/auth/candidate/login', { method: 'POST', body: json(credentials) }));
}

export async function candidateRegister(data: Record<string, any>) {
  return unwrap(await request(null, '/auth/candidate/register', { method: 'POST', body: json(data) }));
}

export async function fetchCandidateProfile() {
  return request('candidate', '/candidate/profile');
}

export async function updateCandidateProfile(data: Record<string, any>) {
  return unwrap(await request('candidate', '/candidate/profile', { method: 'PUT', body: json(data) }));
}

export async function uploadCandidateCv(file: File) {
  const fd = new FormData();
  fd.append('file', file);
  return unwrap(await request('candidate', '/candidate/upload-cv', { method: 'POST', body: fd }));
}

export async function downloadOwnCv(fileName?: string) {
  return downloadFile('candidate', '/candidate/cv', fileName);
}

export async function addCandidateExperience(data: Record<string, any>) {
  return unwrap(await request('candidate', '/candidate/experience', { method: 'POST', body: json(data) }));
}

export async function deleteCandidateExperience(id: string | number) {
  return unwrap(await request('candidate', `/candidate/experience/${id}`, { method: 'DELETE' }));
}

export async function addCandidateEducation(data: Record<string, any>) {
  return unwrap(await request('candidate', '/candidate/education', { method: 'POST', body: json(data) }));
}

export async function deleteCandidateEducation(id: string | number) {
  return unwrap(await request('candidate', `/candidate/education/${id}`, { method: 'DELETE' }));
}

export async function applyToJob(jobId: string | number, notes?: string) {
  return unwrap(await request('candidate', '/candidate/applications', { method: 'POST', body: json({ jobId, notes }) }));
}

export async function fetchCandidateApplications() {
  return request('candidate', '/candidate/applications');
}

export async function withdrawCandidateApplication(id: string | number) {
  return request('candidate', `/candidate/applications/${id}`, { method: 'DELETE' });
}

export async function saveJob(jobId: string | number) {
  return unwrap(await request('candidate', `/candidate/saved-jobs/${encodeURIComponent(String(jobId))}`, { method: 'POST' }));
}

export async function unsaveJob(jobId: string | number) {
  return unwrap(await request('candidate', `/candidate/saved-jobs/${encodeURIComponent(String(jobId))}`, { method: 'DELETE' }));
}

// -------------------------------------------------------------
// 4. EMPLOYER PORTAL
// -------------------------------------------------------------
export async function employerLogin(credentials: { email: string; password: string }) {
  return unwrap(await request(null, '/employer/login', { method: 'POST', body: json(credentials) }));
}

export async function employerRegister(data: Record<string, any>) {
  return unwrap(await request(null, '/employer/register', { method: 'POST', body: json(data) }));
}

/** Uploads a compliance document. `uploadToken` is the one-hour token returned at registration. */
export async function uploadEmployerDocument(file: File, docType: string, uploadToken?: string) {
  const fd = new FormData();
  fd.append('file', file);
  fd.append('docType', docType);
  const headers: Record<string, string> = uploadToken
    ? { Authorization: `Bearer ${uploadToken}` }
    : authHeader('employer');
  const res = await fetch(`${API_BASE_URL}/employer/documents`, { method: 'POST', body: fd, headers });
  return unwrap(await handleResponse(res));
}

export async function fetchEmployerDocuments() {
  return request('employer', '/employer/documents');
}

export async function downloadEmployerDocument(docId: string | number, fileName?: string) {
  return downloadFile('employer', `/employer/documents/${docId}/file`, fileName);
}

export async function fetchEmployerProfile() {
  return request('employer', '/employer/profile');
}

export async function updateEmployerProfileApi(data: Record<string, any>) {
  return unwrap(await request('employer', '/employer/profile', { method: 'PUT', body: json(data) }));
}

export async function fetchEmployerJobs() {
  return request('employer', '/employer/jobs');
}

export async function fetchEmployerApplications() {
  return request('employer', '/employer/applications');
}

export async function postNewJob(jobData: Record<string, any>) {
  return unwrap(await request('employer', '/employer/jobs', { method: 'POST', body: json(jobData) }));
}

export async function updateJobStatus(jobId: string | number, status: string) {
  return unwrap(await request('employer', `/employer/jobs/${jobId}/status`, { method: 'PATCH', body: json({ status }) }));
}

export async function fetchJobApplicants(jobId: string | number) {
  return request('employer', `/employer/jobs/${jobId}/applicants`);
}

export async function updateApplicantStatus(jobId: string | number, applicantId: string | number, status: string) {
  return unwrap(await request('employer', `/employer/jobs/${jobId}/applicants/${applicantId}`, { method: 'PATCH', body: json({ status }) }));
}

export async function downloadApplicantCv(jobId: string | number, applicantId: string | number, fileName?: string) {
  return downloadFile('employer', `/employer/jobs/${jobId}/applicants/${applicantId}/cv`, fileName);
}

export async function fetchTalentPool() {
  return request('employer', '/employer/talent-pool');
}

export async function saveTalentCandidate(id: string | number) {
  return unwrap(await request('employer', `/employer/talent-pool/${id}/save`, { method: 'POST' }));
}

export async function unsaveTalentCandidate(id: string | number) {
  return unwrap(await request('employer', `/employer/talent-pool/${id}/save`, { method: 'DELETE' }));
}

export async function requestTalentInterview(id: string | number, message: string) {
  return request('employer', `/employer/talent-pool/${id}/interview`, { method: 'POST', body: json({ message }) });
}

// -------------------------------------------------------------
// 5. ADMIN PORTAL
// -------------------------------------------------------------
export async function adminLogin(credentials: { email: string; password: string }) {
  return unwrap(await request(null, '/auth/admin/login', { method: 'POST', body: json(credentials) }));
}

export async function fetchAdminEmployers(status?: string) {
  const qs = status ? `?status=${encodeURIComponent(status)}` : '';
  return request('admin', `/admin/employers${qs}`);
}

export async function approveAdminEmployer(employerId: string | number) {
  return unwrap(await request('admin', `/admin/employers/${employerId}/approve`, { method: 'PATCH' }));
}

export async function rejectAdminEmployer(employerId: string | number, reason?: string) {
  return unwrap(await request('admin', `/admin/employers/${employerId}/reject`, { method: 'PATCH', body: json({ reason }) }));
}

export async function deleteAdminEmployer(employerId: string | number) {
  return request('admin', `/admin/employers/${employerId}`, { method: 'DELETE' });
}

export async function fetchAdminEmployerDocuments(employerId: string | number) {
  return request('admin', `/admin/employers/${employerId}/documents`);
}

export async function downloadAdminEmployerDocument(employerId: string | number, docId: string | number, fileName?: string) {
  return downloadFile('admin', `/admin/employers/${employerId}/documents/${docId}/file`, fileName);
}

export async function fetchAdminJobs() {
  return request('admin', '/admin/jobs');
}

export async function fetchAdminCandidates() {
  return request('admin', '/admin/candidates');
}

export async function downloadAdminCandidateCv(candidateId: string | number, fileName?: string) {
  return downloadFile('admin', `/admin/candidates/${candidateId}/cv`, fileName);
}

export async function updateCandidateCompliance(candidateId: string | number, checks: {
  dbsVerified?: boolean;
  rightToWorkVerified?: boolean;
  nmcPinVerified?: boolean;
}) {
  return unwrap(await request('admin', `/admin/candidates/${candidateId}/compliance`, { method: 'PATCH', body: json(checks) }));
}

export async function fetchAdminApplications() {
  return request('admin', '/admin/applications');
}

export async function updateAdminApplicationStatus(applicationId: string | number, status: string) {
  return unwrap(await request('admin', `/admin/applications/${applicationId}/status`, { method: 'PATCH', body: json({ status }) }));
}

export async function fetchAdminEnquiries(type?: string) {
  const qs = type ? `?type=${encodeURIComponent(type)}` : '';
  return request('admin', `/admin/enquiries${qs}`);
}

export async function downloadAdminEnquiryCv(enquiryId: string | number, fileName?: string) {
  return downloadFile('admin', `/admin/enquiries/${enquiryId}/cv`, fileName);
}
