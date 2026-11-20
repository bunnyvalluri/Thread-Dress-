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
    const now = new Date();
    const estDelivery = new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000);
    const estFormatted = estDelivery.toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' });
    const timeFormatted = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });

    const order = {
      id: orderId,
      customer: {
        name: customer.name || 'Storefront Guest',
        email: customer.email || 'guest@threadandform.com',
        phone: customer.phone || '+91 98765 43210',
        address: customer.address || 'Flat 402, Natural Living Apts',
        city: customer.city || 'Bengaluru',
        pincode: customer.pincode || '560001'
      },
      courier: {
        carrier: 'BlueDart Express Priority Air',
        awb: 'BD-' + Math.floor(10000000 + Math.random() * 90000000),
        hub: 'Bengaluru E-City Fulfillment Centre',
        destination: `${customer.city || 'Bengaluru'}, PIN ${customer.pincode || '560001'}`,
        estimatedDelivery: estFormatted
      },
      items: cartAnalysis.items,
      pricing: {
        subtotal: cartAnalysis.subtotal,
        shipping: cartAnalysis.shipping,
        total: cartAnalysis.total
      },
      payment: {
        method: paymentMethod || 'Instant UPI (HDFC/ICICI)',
        status: 'PAID',
        transactionId: 'TXN-' + Date.now()
      },
      status: 'VERIFIED',
      currentStep: 1, // 1: Verified, 2: Packing, 3: In Transit, 4: Delivered
      timeline: [
        {
          step: 1,
          title: 'Order Confirmed & Payment Verified',
          desc: `Payment authorized via ${paymentMethod || 'Instant UPI'}. Atelier verification complete.`,
          time: `Today, ${timeFormatted}`,
          completed: true
        },
        {
          step: 2,
          title: 'Warehouse Sorting & Eco-Packaging',
          desc: 'Allocated from Bengaluru Atelier. Hand-wrapped in 100% recyclable organic dust-bag.',
          time: 'In progress...',
          completed: false
        },
        {
          step: 3,
          title: 'Handed to Express Courier',
          desc: 'BlueDart Priority Air Tracking assigned and scanned at outbound dock.',
          time: 'Estimated today',
          completed: false
        },
        {
          step: 4,
          title: 'Out for Final Delivery',
          desc: `Arriving at ${customer.city || 'Bengaluru'} destination with contact-free delivery.`,
          time: `Estimated ${estFormatted}`,
          completed: false
        }
      ],
      createdAt: now.toISOString(),
      updatedAt: now.toISOString()
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

      const packTime = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
      order.timeline[1].completed = true;
      order.timeline[1].time = `Completed at ${packTime}`;
      const updated = store.updateOrderStatus(orderId, 'PACKED', 2, { timeline: order.timeline });
      socketService.notifyOrderProgress(orderId, updated);

      // Step 3: Express Courier Handover (after another 4s)
      setTimeout(() => {
        const o3 = store.getOrderById(orderId);
        if (!o3) return;

        const shipTime = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
        o3.timeline[2].completed = true;
        o3.timeline[2].time = `Dispatched at ${shipTime}`;
        const u3 = store.updateOrderStatus(orderId, 'IN_TRANSIT', 3, { timeline: o3.timeline });
        socketService.notifyOrderProgress(orderId, u3);

        // Step 4: Final Delivery Simulated Milestone (after another 4.5s)
        setTimeout(() => {
          const o4 = store.getOrderById(orderId);
          if (!o4) return;

          const delTime = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
          o4.timeline[3].completed = true;
          o4.timeline[3].time = `Delivered at ${delTime}`;
          const u4 = store.updateOrderStatus(orderId, 'DELIVERED', 4, { timeline: o4.timeline });
          socketService.notifyOrderProgress(orderId, u4);
        }, 4500);
      }, 4000);
    }, 3500);
  }
}

module.exports = new OrderService();
