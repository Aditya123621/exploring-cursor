import express from 'express';
import HealthController from '../controllers/healthController.js';

const router = express.Router();

/**
 * Health Routes
 * System health and status endpoints
 */

// GET /health - Basic health check
router.get('/', HealthController.healthCheck);

// GET /health/status - Detailed system status
router.get('/status', HealthController.systemStatus);

export default router;
