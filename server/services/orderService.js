/**
 * THREAD & FORM — Order Fulfillment & Tracking Service
 */
const store = require('../data/store');
const cartService = require('./cartService');
const socketService = require('./socketService');

class OrderService {
  createOrder(payload) {
    const { customer = {}, items = [], paymentMethod = 'UPI_DEMO' } = payload;

    // Validate cart items and inventory
    const cartAnalysis = cartService.validateAndCalculate(items);
    if (!cartAnalysis.isValid) {
      const err = new Error('Cart validation failed: ' + cartAnalysis.errors.join('; '));
      err.status = 400;
      err.details = cartAnalysis.errors;
      throw err;
    }

    if (!items.length) {
      const err = new Error('Cannot create an order with an empty bag.');
      err.status = 400;
      throw err;
    }

    // Deduct inventory atomically
    for (const item of items) {
      store.decrementStock(item.id, item.qty);
      const updated = store.getProductById(item.id);
      socketService.broadcastInventoryUpdate(item.id, updated.stock);
    }

    // Generate Order Record
    const orderId = 'TF-' + Math.floor(10000 + Math.random() * 90000);
    const order = {
      id: orderId,
      customer: {
        name: customer.name || 'Storefront Guest',
        email: customer.email || 'guest@threadandform.com',
        city: customer.city || 'Bengaluru'
      },
      items: cartAnalysis.items,
      pricing: {
        subtotal: cartAnalysis.subtotal,
        shipping: cartAnalysis.shipping,
        total: cartAnalysis.total
      },
      payment: {
        method: paymentMethod,
        status: 'PAID',
        transactionId: 'TXN-' + Date.now()
      },
      status: 'VERIFIED',
      currentStep: 1, // 1: Verified, 2: Packing, 3: In Transit, 4: Delivered
      timeline: [
        { step: 1, title: 'Order Received & Verified', timestamp: new Date().toISOString(), completed: true },
        { step: 2, title: 'Packed & Dispatched', timestamp: null, completed: false },
        { step: 3, title: 'Out for Priority Delivery', timestamp: null, completed: false },
        { step: 4, title: 'Delivered', timestamp: null, completed: false }
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    store.createOrder(order);

    // Broadcast social event
    const firstItem = cartAnalysis.items[0];
    socketService.broadcastSocialPurchase(
      order.customer.city,
      firstItem ? firstItem.name : 'Curated Essentials',
      'purchased'
    );

    // Schedule real-time automated fulfillment lifecycle progression
    this.scheduleFulfillmentLifecycle(orderId);

    return order;
  }

  getOrderById(id) {
    return store.getOrderById(id);
  }

  getAllOrders() {
    return store.getAllOrders();
  }

  scheduleFulfillmentLifecycle(orderId) {
    // Step 2: Packing (after 3.5s)
    setTimeout(() => {
      const order = store.getOrderById(orderId);
      if (!order) return;

      order.timeline[1].completed = true;
      order.timeline[1].timestamp = new Date().toISOString();
      const updated = store.updateOrderStatus(orderId, 'PACKED', 2, { timeline: order.timeline });
      socketService.notifyOrderProgress(orderId, updated);

      // Step 3: Courier in transit (after another 4s)
      setTimeout(() => {
        const o3 = store.getOrderById(orderId);
        if (!o3) return;

        o3.timeline[2].completed = true;
        o3.timeline[2].timestamp = new Date().toISOString();
        const u3 = store.updateOrderStatus(orderId, 'IN_TRANSIT', 3, { timeline: o3.timeline });
        socketService.notifyOrderProgress(orderId, u3);
      }, 4000);
    }, 3500);
  }
}

module.exports = new OrderService();
