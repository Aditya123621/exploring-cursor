export const PORT = process.env.PORT || 3001;
export const NODE_ENV = process.env.NODE_ENV || 'development';

// CORS configuration
export const CORS_OPTIONS = {
  origin: process.env.FRONTEND_URL || '*',
  credentials: true,
  optionsSuccessStatus: 200
};

// Server configuration
export const SERVER_CONFIG = {
  trustProxy: true,
  jsonLimit: '10mb',
  urlencodedLimit: '10mb'
};
