/**
 * 404 Not Found middleware
 * Handles requests to non-existent routes
 */
const notFound = (req, res) => {
  res.status(404).json({
    success: false,
    error: {
      message: 'Route not found',
      details: `Cannot ${req.method} ${req.originalUrl}`
    }
  });
};

export default notFound;
