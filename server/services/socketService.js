/**
 * THREAD & FORM — WebSocket Telemetry & Real-Time Broadcast Service
 */
const { WebSocketServer, WebSocket } = require('ws');

class SocketService {
  constructor() {
    this.wss = null;
    this.clients = new Set();
    this.orderSubscribers = new Map(); // orderId -> Set of ws clients
  }

  attach(server) {
    this.wss = new WebSocketServer({ server, path: '/ws' });

    this.wss.on('connection', (ws, req) => {
      this.clients.add(ws);
      const ip = req.socket.remoteAddress;

      // Welcome handshake
      this.send(ws, {
        type: 'CONNECTED',
        message: 'Connected to THREAD & FORM Real-Time Telemetry Engine',
        clientCount: this.clients.size,
        timestamp: new Date().toISOString()
      });

      ws.on('message', (raw) => {
        try {
          const data = JSON.parse(raw);
          this.handleClientMessage(ws, data);
        } catch (e) {
          this.send(ws, { type: 'ERROR', message: 'Malformed JSON payload' });
        }
      });

      ws.on('close', () => {
        this.clients.delete(ws);
        // Clean up order subscriptions
        for (const [orderId, subs] of this.orderSubscribers.entries()) {
          subs.delete(ws);
          if (subs.size === 0) {
            this.orderSubscribers.delete(orderId);
          }
        }
      });

      ws.on('error', (err) => {
        console.error('[WebSocket] Client error:', err.message);
      });
    });

    console.log('[WebSocket] Real-time engine attached to /ws');
  }

  handleClientMessage(ws, data) {
    switch (data.type) {
      case 'SUBSCRIBE_ORDER':
        if (data.orderId) {
          if (!this.orderSubscribers.has(data.orderId)) {
            this.orderSubscribers.set(data.orderId, new Set());
          }
          this.orderSubscribers.get(data.orderId).add(ws);
          this.send(ws, { type: 'ORDER_SUBSCRIBED', orderId: data.orderId });
        }
        break;

      case 'PING':
        this.send(ws, { type: 'PONG', timestamp: Date.now() });
        break;

      default:
        break;
    }
  }

  send(ws, payload) {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(payload));
    }
  }

  broadcast(payload) {
    const message = JSON.stringify(payload);
    for (const client of this.clients) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    }
  }

  broadcastInventoryUpdate(productId, stock) {
    this.broadcast({
      type: 'INVENTORY_UPDATED',
      productId: Number(productId),
      stock,
      timestamp: new Date().toISOString()
    });
  }

  broadcastSocialPurchase(city, item, action = 'purchased') {
    this.broadcast({
      type: 'SOCIAL_EVENT',
      event: { city, item, action, timestamp: new Date().toISOString() }
    });
  }

  notifyOrderProgress(orderId, orderState) {
    const payload = JSON.stringify({
      type: 'ORDER_STATUS_UPDATED',
      order: orderState
    });

    // Notify specific order subscribers
    const subs = this.orderSubscribers.get(orderId);
    if (subs) {
      for (const client of subs) {
        if (client.readyState === WebSocket.OPEN) {
          client.send(payload);
        }
      }
    }

    // Also notify any client that requested this order
    this.broadcast({
      type: 'LIVE_FULFILLMENT_TICK',
      orderId,
      status: orderState.status,
      currentStep: orderState.currentStep
    });
  }

  getClientCount() {
    return this.clients.size;
  }
}

module.exports = new SocketService();
