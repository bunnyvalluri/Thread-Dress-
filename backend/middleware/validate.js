/**
 * THREAD & FORM — Payload Validation Middleware
 */
module.exports = {
  validateOrderPayload(req, res, next) {
    const { items } = req.body;
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Order must contain a non-empty "items" array.'
        }
      });
    }

    for (const item of items) {
      if (!item.id || typeof item.id !== 'number') {
        return res.status(400).json({
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Each item must have a valid numeric "id".'
          }
        });
      }
      if (item.qty && (typeof item.qty !== 'number' || item.qty <= 0)) {
        return res.status(400).json({
          success: false,
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Item quantity must be a positive integer.'
          }
        });
      }
    }

    next();
  },

  validateStockUpdate(req, res, next) {
    const { stock } = req.body;
    if (stock === undefined || typeof stock !== 'number' || stock < 0) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: '"stock" must be a non-negative number.'
        }
      });
    }
    next();
  }
};
