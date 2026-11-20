/**
 * THREAD & FORM — Order Routes
 */
const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { validateOrderPayload } = require('../middleware/validate');

router.post('/', validateOrderPayload, orderController.createOrder);
router.get('/:id', orderController.getOrderById);
router.get('/', orderController.getAllOrders);

module.exports = router;
