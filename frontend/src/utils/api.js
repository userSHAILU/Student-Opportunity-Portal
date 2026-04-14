import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

// Helper to add auth token to requests
const getHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

// Auth APIs
export const loginAPI = (email, password) =>
  axios.post(`${API_URL}/auth/login`, { email, password });

export const registerAPI = (name, email, password, role, department) =>
  axios.post(`${API_URL}/auth/register`, {
    name,
    email,
    password,
    role,
    department,
  });

// Certificate APIs
export const uploadCertificateAPI = (data) =>
  axios.post(`${API_URL}/certificates`, data, {
    headers: { ...getHeaders(), 'Content-Type': 'multipart/form-data' },
  });

export const getMyCertificatesAPI = () =>
  axios.get(`${API_URL}/certificates/my`, { headers: getHeaders() });

export const deleteCertificateAPI = (id) =>
  axios.delete(`${API_URL}/certificates/${id}`, { headers: getHeaders() });

// Opportunity APIs
export const createOpportunityAPI = (data) =>
  axios.post(`${API_URL}/opportunities`, data, { headers: getHeaders() });

export const getApprovedOpportunitiesAPI = () =>
  axios.get(`${API_URL}/opportunities/approved`, { headers: getHeaders() });

export const getPendingOpportunitiesAPI = () =>
  axios.get(`${API_URL}/opportunities/pending`, { headers: getHeaders() });

export const approveOpportunityAPI = (id) =>
  axios.put(`${API_URL}/opportunities/${id}/approve`, {}, { headers: getHeaders() });

export const rejectOpportunityAPI = (id, reason) =>
  axios.put(
    `${API_URL}/opportunities/${id}/reject`,
    { reason },
    { headers: getHeaders() }
  );

export const bookmarkOpportunityAPI = (id) =>
  axios.put(`${API_URL}/opportunities/${id}/bookmark`, {}, { headers: getHeaders() });

export const likeOpportunityAPI = (id) =>
  axios.put(`${API_URL}/opportunities/${id}/like`, {}, { headers: getHeaders() });

// Analytics APIs
export const getSkillDistributionAPI = () =>
  axios.get(`${API_URL}/analytics/skills`, { headers: getHeaders() });

export const getDepartmentInsightsAPI = (department) =>
  axios.get(`${API_URL}/analytics/departments`, {
    headers: getHeaders(),
    params: { department },
  });

export const getSkillGapAnalysisAPI = (department) =>
  axios.get(`${API_URL}/analytics/gaps`, {
    headers: getHeaders(),
    params: { department },
  });

// Comment APIs
export const createCommentAPI = (message, replyTo = null) =>
  axios.post(
    `${API_URL}/comments`,
    { message, replyTo },
    { headers: getHeaders() }
  );

export const replyToCommentAPI = (commentId, message) =>
  axios.post(`${API_URL}/comments/${commentId}/reply`, { message }, { headers: getHeaders() });

export const getTPCommentsAPI = () =>
  axios.get(`${API_URL}/comments`, { headers: getHeaders() });

// Training APIs
export const createTrainingAPI = (data) =>
  axios.post(`${API_URL}/trainings`, data, { headers: getHeaders() });

export const getTrainingsAPI = (department) =>
  axios.get(`${API_URL}/trainings`, {
    headers: getHeaders(),
    params: { department },
  });

export const registerTrainingAPI = (trainingId) =>
  axios.post(`${API_URL}/trainings/${trainingId}/register`, {}, { headers: getHeaders() });
