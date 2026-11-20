/**
 * THREAD & FORM — Product Business Logic Service
 */
const store = require('../data/store');

class ProductService {
  getProducts(query = {}) {
    let products = [...store.getAllProducts()];

    // Filter: Category
    if (query.category && query.category !== 'All') {
      products = products.filter(p => p.category.toLowerCase() === query.category.toLowerCase());
    }

    // Filter: Search query (name, category, desc, tag)
    if (query.search) {
      const q = query.search.trim().toLowerCase();
      products = products.filter(p => {
        const target = `${p.name} ${p.category} ${p.desc} ${p.tag}`.toLowerCase();
        return target.includes(q);
      });
    }

    // Filter: Tag
    if (query.tag) {
      products = products.filter(p => p.tag.toLowerCase() === query.tag.toLowerCase());
    }

    // Filter: Price range
    if (query.minPrice) {
      const min = parseFloat(query.minPrice);
      if (!isNaN(min)) products = products.filter(p => p.price >= min);
    }
    if (query.maxPrice) {
      const max = parseFloat(query.maxPrice);
      if (!isNaN(max)) products = products.filter(p => p.price <= max);
    }

    // Sorting
    const sort = query.sort || 'featured';
    switch (sort) {
      case 'low':
        products.sort((a, b) => a.price - b.price);
        break;
      case 'high':
        products.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        products.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'stock':
        products.sort((a, b) => a.stock - b.stock);
        break;
      default:
        // Featured keeps natural order
        break;
    }

    // Pagination
    const total = products.length;
    const page = Math.max(1, parseInt(query.page, 10) || 1);
    const limit = query.limit ? Math.max(1, parseInt(query.limit, 10)) : total;
    const startIndex = (page - 1) * limit;
    const paginated = products.slice(startIndex, startIndex + limit);

    return {
      products: paginated,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        categories: {
          all: store.getAllProducts().length,
          women: store.getAllProducts().filter(p => p.category === 'Women').length,
          men: store.getAllProducts().filter(p => p.category === 'Men').length,
          home: store.getAllProducts().filter(p => p.category === 'Home').length
        }
      }
    };
  }

  getProductById(id) {
    const product = store.getProductById(id);
    if (!product) return null;

    const viewers = store.getViewers(id);
    return {
      ...product,
      viewers,
      inStock: product.stock > 0,
      isLowStock: product.stock > 0 && product.stock <= 4
    };
  }

  updateStock(id, newStock) {
    return store.updateProductStock(id, newStock);
  }

  decrementStock(id, qty = 1) {
    return store.decrementStock(id, qty);
  }
}

module.exports = new ProductService();
