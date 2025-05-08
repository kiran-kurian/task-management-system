// Get the base URL from environment variables with HTTPS fallback for production
const getBaseUrl = () => {
  const envUrl = process.env.NEXT_PUBLIC_API_URL;
  if (envUrl) return envUrl;
  
  // In production, default to HTTPS
  if (process.env.NODE_ENV === 'production') {
    return 'https://your-api-domain.com'; // Replace with your actual production API domain
  }
  
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