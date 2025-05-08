// Get the base URL from environment variables
const getBaseUrl = () => {
  // In production, use the environment variable
  const envUrl = process.env.NEXT_PUBLIC_API_URL;
  if (envUrl) return envUrl;
  
  // In development, use localhost
  return 'http://localhost:4000';
};

export const API_BASE_URL = getBaseUrl();

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