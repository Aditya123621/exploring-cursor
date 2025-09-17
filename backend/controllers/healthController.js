/**
 * Health Controller
 * Handles health check and system status endpoints
 */
class HealthController {
  /**
   * Basic health check
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  static async healthCheck(req, res) {
    try {
      res.status(200).json({
        success: true,
        message: 'Server is healthy',
        data: {
          status: 'ok',
          timestamp: new Date().toISOString(),
          uptime: process.uptime(),
          environment: process.env.NODE_ENV || 'development'
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Health check failed',
        error: error.message
      });
    }
  }

  /**
   * Detailed system status
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  static async systemStatus(req, res) {
    try {
      const memoryUsage = process.memoryUsage();
      
      res.status(200).json({
        success: true,
        message: 'System status retrieved successfully',
        data: {
          status: 'ok',
          timestamp: new Date().toISOString(),
          uptime: process.uptime(),
          environment: process.env.NODE_ENV || 'development',
          version: process.version,
          memory: {
            rss: `${Math.round(memoryUsage.rss / 1024 / 1024)} MB`,
            heapTotal: `${Math.round(memoryUsage.heapTotal / 1024 / 1024)} MB`,
            heapUsed: `${Math.round(memoryUsage.heapUsed / 1024 / 1024)} MB`,
            external: `${Math.round(memoryUsage.external / 1024 / 1024)} MB`
          },
          platform: process.platform,
          arch: process.arch
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to retrieve system status',
        
        error: error.message
      });
    }
  }
}

export default HealthController;
