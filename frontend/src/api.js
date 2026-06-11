const BASE_URL = 'http://127.0.0.1:8000/api';

async function request(path, options = {}) {
  const token = localStorage.getItem('access');
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${BASE_URL}${path}`, { ...options, headers });
  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.detail || JSON.stringify(data) || 'Request failed');
  }

  return data;
}

export function register({ username, email, password }) {
  return request('/auth/register/', {
    method: 'POST',
    body: JSON.stringify({ username, email, password }),
  });
}

export function login({ username, password }) {
  return request('/auth/login/', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
  });
}

export function getJobApplications() {
  return request('/job-applications/');
}
