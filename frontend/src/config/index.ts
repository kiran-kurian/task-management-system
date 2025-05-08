export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export const ENDPOINTS = {
  AUTH: {
    LOGIN: `${API_BASE_URL}/auth/login`,
    REGISTER: `${API_BASE_URL}/auth/register`,
    ROLE: `${API_BASE_URL}/auth/role`,
  },
  TASKS: {
    BASE: `${API_BASE_URL}/tasks`,
    BYID: (id: number) => `${API_BASE_URL}/tasks/${id}`,
  },
  NOTIFICATIONS: {
    BASE: `${API_BASE_URL}/notifications`,
    READ: (id: number) => `${API_BASE_URL}/notifications/${id}/read`,
  },
  USERS: {
    BASE: `${API_BASE_URL}/users`,
  },
}; 