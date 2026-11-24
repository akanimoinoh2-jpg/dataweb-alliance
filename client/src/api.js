const API = import.meta.env.VITE_API_URL || '';

function authHeaders() {
  const token = localStorage.getItem('dwa_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function request(path, options = {}) {
  const res = await fetch(`${API}/api${path}`, {
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    ...options
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || 'Request failed');
  return data;
}

export const api = {
  getProjects: () => request('/projects'),
  getServices: () => request('/services'),
  sendMessage: (body) => request('/messages', { method: 'POST', body: JSON.stringify(body) }),
  login: (username, password) =>
    request('/auth/login', { method: 'POST', body: JSON.stringify({ username, password }) }),
  getMessages: () => request('/messages'),
  markRead: (id) => request(`/messages/${id}/read`, { method: 'PATCH' }),
  deleteMessage: (id) => request(`/messages/${id}`, { method: 'DELETE' }),
  saveProject: (p) =>
    p.id
      ? request(`/projects/${p.id}`, { method: 'PUT', body: JSON.stringify(p) })
      : request('/projects', { method: 'POST', body: JSON.stringify(p) }),
  deleteProject: (id) => request(`/projects/${id}`, { method: 'DELETE' }),
  saveService: (s) =>
    s.id
      ? request(`/services/${s.id}`, { method: 'PUT', body: JSON.stringify(s) })
      : request('/services', { method: 'POST', body: JSON.stringify(s) }),
  deleteService: (id) => request(`/services/${id}`, { method: 'DELETE' }),
  changePassword: (currentPassword, newPassword) =>
    request('/auth/change-password', {
      method: 'POST',
      body: JSON.stringify({ currentPassword, newPassword })
    })
};
