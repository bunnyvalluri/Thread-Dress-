/**
 * THREAD & FORM — Server Entry Point
 * Orchestrates HTTP REST API & WebSocket Real-Time Telemetry
 */
const http = require('http');
const app = require('./app');
const config = require('./config');
const socketService = require('./services/socketService');

const server = http.createServer(app);

// Attach WebSocket Server
socketService.attach(server);

// Start Listening
const serverInstance = server.listen(config.port, config.host, () => {
  console.log(`
===========================================================
  THREAD & FORM — Production Real-Time Backend Engine
===========================================================
  Environment : ${config.env}
  REST API    : http://localhost:${config.port}${config.apiPrefix}
  WebSocket   : ws://localhost:${config.port}/ws
  Health      : http://localhost:${config.port}${config.apiPrefix}/health
  Storefront  : http://localhost:${config.port}
===========================================================
`);
});

// Graceful Shutdown
function shutdown(signal) {
  console.log(`\n[Process] Received ${signal}. Starting graceful shutdown...`);

  serverInstance.close(() => {
    console.log('[Process] HTTP and WebSocket servers closed.');
    process.exit(0);
  });

  // Force shutdown if connections do not terminate in 5 seconds
  setTimeout(() => {
    console.error('[Process] Forcing shutdown after timeout.');
    process.exit(1);
  }, 5000).unref();
}

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));

module.exports = serverInstance;
