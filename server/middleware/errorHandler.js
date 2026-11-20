/**
 * THREAD & FORM — Centralized RFC-7807 Compliant Error Handler
 */
module.exports = function errorHandler(err, req, res, next) {
  const status = err.status || err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  if (status >= 500) {
    console.error('[Error]', err);
  }

  res.status(status).json({
    success: false,
    error: {
      code: err.code || (status === 404 ? 'NOT_FOUND' : 'SERVER_ERROR'),
      message,
      details: err.details || null,
      timestamp: new Date().toISOString(),
      path: req.originalUrl
    }
  });
};
