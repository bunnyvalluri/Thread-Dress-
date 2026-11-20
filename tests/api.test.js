/**
 * THREAD & FORM — End-to-End API & Integration Test Suite
 * Executed via Node's native test runner (node --test)
 */
const { test, describe, before, after } = require('node:test');
const assert = require('node:assert/strict');
const http = require('http');
const app = require('../server/app');

let server;
let baseUrl;

before(async () => {
  await new Promise((resolve) => {
    server = http.createServer(app).listen(0, '127.0.0.1', () => {
      const port = server.address().port;
      baseUrl = `http://127.0.0.1:${port}/api/v1`;
      resolve();
    });
  });
});

after(async () => {
  await new Promise((resolve) => server.close(resolve));
});

describe('1. Health & Telemetry API', () => {
  test('GET /health returns 200 and system status', async () => {
    const res = await fetch(`${baseUrl}/health`);
    assert.equal(res.status, 200);

    const body = await res.json();
    assert.equal(body.status, 'UP');
    assert.equal(body.service, 'THREAD & FORM Production Backend Engine');
    assert.ok(body.telemetry.totalCatalogItems >= 24);
  });
});

describe('2. Products Catalog API', () => {
  test('GET /products returns list of 24 products', async () => {
    const res = await fetch(`${baseUrl}/products`);
    assert.equal(res.status, 200);

    const body = await res.json();
    assert.equal(body.success, true);
    assert.equal(body.data.length, 24);
    assert.equal(body.meta.categories.all, 24);
    assert.equal(body.meta.categories.women, 8);
    assert.equal(body.meta.categories.men, 8);
    assert.equal(body.meta.categories.home, 8);
  });

  test('GET /products?category=Women filters correctly', async () => {
    const res = await fetch(`${baseUrl}/products?category=Women`);
    const body = await res.json();

    assert.equal(res.status, 200);
    assert.equal(body.data.length, 8);
    body.data.forEach(p => assert.equal(p.category, 'Women'));
  });

  test('GET /products?search=linen matches search term', async () => {
    const res = await fetch(`${baseUrl}/products?search=linen`);
    const body = await res.json();

    assert.equal(res.status, 200);
    assert.ok(body.data.length > 0);
  });

  test('GET /products/:id returns single product with active viewers', async () => {
    const res = await fetch(`${baseUrl}/products/1`);
    const body = await res.json();

    assert.equal(res.status, 200);
    assert.equal(body.data.id, 1);
    assert.equal(body.data.name, 'Linen Everyday Shirt');
    assert.ok(typeof body.data.viewers === 'number');
  });

  test('GET /products/99999 returns 404', async () => {
    const res = await fetch(`${baseUrl}/products/99999`);
    const body = await res.json();

    assert.equal(res.status, 404);
    assert.equal(body.success, false);
    assert.equal(body.error.code, 'PRODUCT_NOT_FOUND');
  });
});

describe('3. Cart Validation API', () => {
  test('POST /cart/validate calculates totals and free shipping threshold', async () => {
    const payload = {
      items: [
        { id: 1, qty: 1, size: 'M' }, // ₹1,890
        { id: 2, qty: 1, size: 'L' }  // ₹890 => subtotal ₹2,780 (Free shipping unlocked!)
      ]
    };

    const res = await fetch(`${baseUrl}/cart/validate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const body = await res.json();
    assert.equal(res.status, 200);
    assert.equal(body.data.subtotal, 2780);
    assert.equal(body.data.freeShippingUnlocked, true);
    assert.equal(body.data.shipping, 0);
    assert.equal(body.data.total, 2780);
  });
});

describe('4. Orders & Real-Time Tracking API', () => {
  let createdOrderId = null;

  test('POST /orders creates an order and returns 201', async () => {
    const payload = {
      customer: {
        name: 'Rahul Test',
        email: 'rahul@test.com',
        city: 'Bengaluru'
      },
      items: [
        { id: 1, qty: 1, size: 'M' }
      ]
    };

    const res = await fetch(`${baseUrl}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const body = await res.json();
    assert.equal(res.status, 201);
    assert.equal(body.success, true);
    assert.ok(body.data.id.startsWith('TF-'));
    assert.equal(body.data.status, 'VERIFIED');
    assert.equal(body.data.currentStep, 1);

    createdOrderId = body.data.id;
  });

  test('GET /orders/:id retrieves created order status', async () => {
    assert.ok(createdOrderId, 'Order must be created first');

    const res = await fetch(`${baseUrl}/orders/${createdOrderId}`);
    const body = await res.json();

    assert.equal(res.status, 200);
    assert.equal(body.data.id, createdOrderId);
    assert.equal(body.data.customer.city, 'Bengaluru');
  });

  test('POST /orders with invalid payload returns 400', async () => {
    const res = await fetch(`${baseUrl}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: [] })
    });

    const body = await res.json();
    assert.equal(res.status, 400);
    assert.equal(body.success, false);
  });
});

describe('5. Concierge Heuristic API', () => {
  test('POST /concierge/chat returns answers for sizing inquiries', async () => {
    const res = await fetch(`${baseUrl}/concierge/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: 'What size should I choose?' })
    });

    const body = await res.json();
    assert.equal(res.status, 200);
    assert.ok(body.data.reply.includes('relaxed'));
  });

  test('POST /concierge/chat returns developer attribution for portfolio queries', async () => {
    const res = await fetch(`${baseUrl}/concierge/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: 'Who built this site?' })
    });

    const body = await res.json();
    assert.equal(res.status, 200);
    assert.ok(body.data.reply.includes('VALLURI RAHUL'));
  });
});
