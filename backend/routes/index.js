import express from 'express';
import userRoutes from './userRoutes.js';
import healthRoutes from './healthRoutes.js';

const router = express.Router();

/**
 * Main Routes Configuration
 * Mount all route modules with their base paths
 */

// Health routes
router.use('/health', healthRoutes);

// User routes
router.use('/users', userRoutes);

// API info route
router.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to the API',
    data: {
      version: '1.0.0',
      endpoints: {
        health: '/health',
        users: '/users',
        documentation: 'See README.md for detailed API documentation'
      }
    }
  });
});

export default router;
