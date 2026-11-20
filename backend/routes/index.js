/**
 * THREAD & FORM — API V1 Main Router
 */
const express = require('express');
const router = express.Router();

const productRoutes = require('./productRoutes');
const orderRoutes = require('./orderRoutes');
const cartRoutes = require('./cartRoutes');
const conciergeRoutes = require('./conciergeRoutes');
const { getHealth } = require('../controllers/healthController');

// Health Check
router.get('/health', getHealth);

// Sub-routers
router.use('/products', productRoutes);
router.use('/orders', orderRoutes);
router.use('/cart', cartRoutes);
router.use('/concierge', conciergeRoutes);

module.exports = router;
