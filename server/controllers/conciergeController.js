/**
 * THREAD & FORM — Concierge Controller
 */
const conciergeService = require('../services/conciergeService');

module.exports = {
  chat(req, res, next) {
    try {
      const { message, history } = req.body;
      const response = conciergeService.ask(message, history);
      res.json({
        success: true,
        data: response
      });
    } catch (err) {
      next(err);
    }
  }
};
