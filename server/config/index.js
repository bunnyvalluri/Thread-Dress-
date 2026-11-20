/**
 * THREAD & FORM — Server Environment Configuration
 */
const path = require('path');

module.exports = {
  env: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT, 10) || 3000,
  host: process.env.HOST || '0.0.0.0',
  apiPrefix: '/api/v1',
  cors: {
    origin: process.env.CORS_ORIGIN || '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
  },
  thresholds: {
    freeShippingMinimum: 2500, // INR
    standardShippingFee: 150   // INR
  },
  paths: {
    root: path.resolve(__dirname, '../../'),
    dataDir: path.resolve(__dirname, '../data')
  }
};
