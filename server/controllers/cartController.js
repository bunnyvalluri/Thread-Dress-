/**
 * THREAD & FORM — Cart Controller
 */
const cartService = require('../services/cartService');

module.exports = {
  validateCart(req, res, next) {
    try {
      const items = req.body.items || [];
      const analysis = cartService.validateAndCalculate(items);
      res.json({
        success: true,
        data: analysis
      });
    } catch (err) {
      next(err);
    }
  }
};
