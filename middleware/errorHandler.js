const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  let errorMessage = error.message || 'Server Error';
  let statusCode = error.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    error: errorMessage,
  });
};

module.exports = errorHandler;
