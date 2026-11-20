/**
 * THREAD & FORM — Product Controller
 */
const productService = require('../services/productService');
const socketService = require('../services/socketService');

module.exports = {
  getProducts(req, res, next) {
    try {
      const result = productService.getProducts(req.query);
      res.json({
        success: true,
        data: result.products,
        meta: result.meta
      });
    } catch (err) {
      next(err);
    }
  },

  getProductById(req, res, next) {
    try {
      const product = productService.getProductById(req.params.id);
      if (!product) {
        return res.status(404).json({
          success: false,
          error: { code: 'PRODUCT_NOT_FOUND', message: `Product #${req.params.id} does not exist.` }
        });
      }
      res.json({ success: true, data: product });
    } catch (err) {
      next(err);
    }
  },

  updateStock(req, res, next) {
    try {
      const updated = productService.updateStock(req.params.id, req.body.stock);
      if (!updated) {
        return res.status(404).json({
          success: false,
          error: { code: 'PRODUCT_NOT_FOUND', message: `Product #${req.params.id} not found.` }
        });
      }

      // Broadcast inventory change in real time via WebSockets
      socketService.broadcastInventoryUpdate(updated.id, updated.stock);

      res.json({
        success: true,
        data: updated,
        message: `Inventory for #${updated.id} successfully updated to ${updated.stock}.`
      });
    } catch (err) {
      next(err);
    }
  }
};
