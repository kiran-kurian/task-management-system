export const CONFIG = {
  CORS: {
    ORIGIN: process.env.FRONTEND_URL || 'http://localhost:3000',
    METHODS: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    CREDENTIALS: true,
  },
  PORT: process.env.PORT || 4000,
  DATABASE_URL: process.env.DATABASE_URL,
  JWT: {
    SECRET: process.env.JWT_SECRET,
    EXPIRES_IN: process.env.JWT_EXPIRES_IN || '24h',
  },
}; 