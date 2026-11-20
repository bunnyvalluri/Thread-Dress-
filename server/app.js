/**
 * THREAD & FORM — Express Application Factory
 */
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');

const config = require('./config');
const apiRoutes = require('./routes');
const requestLogger = require('./middleware/requestLogger');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Security Middleware
app.use(helmet({
  contentSecurityPolicy: false, // Allows inline scripts/styles for local storefront assets
  crossOriginEmbedderPolicy: false
}));

// CORS Middleware
app.use(cors(config.cors));

// Request Parsers
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// Logging
app.use(requestLogger);

// Mount API Endpoints
app.use(config.apiPrefix, apiRoutes);

// Static Asset Serving (Frontend Storefront)
const rootDir = config.paths.root;
app.use(express.static(rootDir, {
  index: 'index.html',
  maxAge: '1h'
}));
app.use('/public', express.static(path.join(rootDir, 'public')));
app.use('/src', express.static(path.join(rootDir, 'src')));

// API 404 Handler
app.use(config.apiPrefix, (req, res) => {
  res.status(404).json({
    success: false,
    error: {
      code: 'ROUTE_NOT_FOUND',
      message: `The requested endpoint ${req.method} ${req.originalUrl} does not exist.`
    }
  });
});

// Fallback to index.html for SPA client navigation
app.use((req, res) => {
  res.sendFile(path.join(rootDir, 'index.html'));
});

// Centralized Error Handler
app.use(errorHandler);

module.exports = app;
