/**
 * THREAD & FORM — System Telemetry & Health Controller
 */
const store = require('../data/store');
const socketService = require('../services/socketService');

module.exports = {
  getHealth(req, res) {
    const memory = process.memoryUsage();
    res.json({
      status: 'UP',
      service: 'THREAD & FORM Production Backend Engine',
      version: '2.0.0',
      timestamp: new Date().toISOString(),
      uptimeSeconds: Math.floor(process.uptime()),
      system: {
        nodeVersion: process.version,
        platform: process.platform,
        memory: {
          rssMb: Math.round(memory.rss / 1024 / 1024),
          heapUsedMb: Math.round(memory.heapUsed / 1024 / 1024),
          heapTotalMb: Math.round(memory.heapTotal / 1024 / 1024)
        }
      },
      telemetry: {
        connectedClients: socketService.getClientCount(),
        totalCatalogItems: store.getAllProducts().length,
        totalOrdersCount: store.getAllOrders().length
      }
    });
  }
};
