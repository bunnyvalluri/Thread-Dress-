/**
 * THREAD & FORM — Shopping Cart Service
 */
const store = require('../data/store');
const config = require('../config');

class CartService {
  validateAndCalculate(items = []) {
    let subtotal = 0;
    const validatedItems = [];
    const errors = [];

    for (const item of items) {
      const product = store.getProductById(item.id);
      if (!product) {
        errors.push(`Product with ID ${item.id} not found in catalog.`);
        continue;
      }

      const qty = parseInt(item.qty, 10) || 1;
      const size = item.size || 'M';

      if (product.stock < qty) {
        errors.push(`Insufficient stock for "${product.name}". Available: ${product.stock}, requested: ${qty}.`);
      }

      const lineTotal = product.price * qty;
      subtotal += lineTotal;

      validatedItems.push({
        id: product.id,
        name: product.name,
        price: product.price,
        size,
        qty,
        lineTotal,
        image: product.image,
        category: product.category,
        availableStock: product.stock
      });
    }

    const freeShippingUnlocked = subtotal >= config.thresholds.freeShippingMinimum && subtotal > 0;
    const shipping = (subtotal === 0 || freeShippingUnlocked) ? 0 : config.thresholds.standardShippingFee;
    const total = subtotal + shipping;
    const amountNeededForFreeShipping = Math.max(0, config.thresholds.freeShippingMinimum - subtotal);

    return {
      items: validatedItems,
      subtotal,
      shipping,
      freeShippingUnlocked,
      amountNeededForFreeShipping,
      total,
      itemCount: validatedItems.reduce((acc, i) => acc + i.qty, 0),
      isValid: errors.length === 0,
      errors
    };
  }
}

module.exports = new CartService();
