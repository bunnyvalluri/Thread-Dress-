/**
 * THREAD & FORM — Order Controller
 */
const orderService = require('../services/orderService');

module.exports = {
  createOrder(req, res, next) {
    try {
      const order = orderService.createOrder(req.body);
      res.status(201).json({
        success: true,
        data: order,
        message: 'Order created successfully and fulfillment pipeline initiated.'
      });
    } catch (err) {
      next(err);
    }
  },

  getOrderById(req, res, next) {
    try {
      const order = orderService.getOrderById(req.params.id);
      if (!order) {
        return res.status(404).json({
          success: false,
          error: { code: 'ORDER_NOT_FOUND', message: `Order #${req.params.id} does not exist.` }
        });
      }
      res.json({ success: true, data: order });
    } catch (err) {
      next(err);
    }
  },

  getAllOrders(req, res, next) {
    try {
      const orders = orderService.getAllOrders();
      res.json({ success: true, count: orders.length, data: orders });
    } catch (err) {
      next(err);
    }
  }
};
