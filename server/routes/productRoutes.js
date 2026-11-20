/**
 * THREAD & FORM — Product Routes
 */
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { validateStockUpdate } = require('../middleware/validate');

router.get('/', productController.getProducts);
router.get('/:id', productController.getProductById);
router.patch('/:id/stock', validateStockUpdate, productController.updateStock);

module.exports = router;
