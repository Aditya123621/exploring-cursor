import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

// Import configuration
import { PORT, SERVER_CONFIG } from './config/server.js';

// Import middleware
import { corsMiddleware, errorHandler, notFound, requestLogger } from './middleware/index.js';

// Import routes
import routes from './routes/index.js';

const app = express();

// Trust proxy for deployment environments
if (SERVER_CONFIG.trustProxy) {
  app.set('trust proxy', 1);
}

// Apply middleware
app.use(requestLogger);
app.use(corsMiddleware);
app.use(express.json({ limit: SERVER_CONFIG.jsonLimit }));
app.use(express.urlencoded({ extended: true, limit: SERVER_CONFIG.urlencodedLimit }));

// Mount API routes
app.use('/api', routes);

// Legacy routes for backward compatibility (optional)
app.use('/', routes);

// 404 handler (must be after all routes)
app.use(notFound);

// Global error handler (must be last)
app.use(errorHandler);

// Start server
const server = app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`🔗 API base: http://localhost:${PORT}/api`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('👋 SIGTERM received. Shutting down gracefully...');
  server.close(() => {
    console.log('✅ Process terminated');
  });
});

process.on('SIGINT', () => {
  console.log('👋 SIGINT received. Shutting down gracefully...');
  server.close(() => {
    console.log('✅ Process terminated');
  });
});

export default app;
