/**
 * Global error handling middleware
 * This should be the last middleware in the chain
 */
const errorHandler = (error, req, res, next) => {
  console.error('Unhandled error:', error);
  
  // Default error response
  let statusCode = error.statusCode || 500;
  let message = error.message || 'Internal server error';
  
  // Handle specific error types
  if (error.name === 'ValidationError') {
    statusCode = 400;
    message = 'Validation failed';
  }
  
  if (error.name === 'CastError') {
    statusCode = 400;
    message = 'Invalid data format';
  }
  
  // Send error response
  res.status(statusCode).json({
    success: false,
    error: {
      message,
      ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
    }
  });
};

export default errorHandler;
