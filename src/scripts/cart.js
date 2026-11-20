/**
 * THREAD & FORM — Real-Time Shopping Bag & Multi-Tab Synchronization
 */
const SYNC_CHANNEL = typeof BroadcastChannel !== 'undefined' ? new BroadcastChannel('tf_realtime_sync') : null;
let cart = [];

function loadCart() {
  try {
    const stored = localStorage.getItem("tf_unified_cart");
    cart = stored ? JSON.parse(stored) : [];
  } catch (e) {
    cart = [];
  }
  renderCartUI();
}

function saveCart(broadcast = true) {
  try {
    localStorage.setItem("tf_unified_cart", JSON.stringify(cart));
  } catch(e) {}
  renderCartUI();
  if (broadcast && SYNC_CHANNEL) {
    SYNC_CHANNEL.postMessage({ type: "CART_UPDATED", cart });
  }
}

// Multi-tab real-time sync listeners
if (SYNC_CHANNEL) {
  SYNC_CHANNEL.onmessage = (event) => {
    if (event.data?.type === "CART_UPDATED") {
      cart = event.data.cart;
      renderCartUI();
      if (typeof showSocialNotification === 'function') {
        showSocialNotification("⚡ Cart synchronized in real time with another tab.");
      }
    }
  };
}

window.addEventListener("storage", (e) => {
  if (e.key === "tf_unified_cart") {
    try {
      cart = JSON.parse(e.newValue || "[]");
      renderCartUI();
    } catch(err) {}
  }
});

function renderCartUI() {
  const badge = document.getElementById("cartBadge");
  const countText = document.getElementById("drawerCountText");
  const container = document.getElementById("cartItemsContainer");
  const subtotalEl = document.getElementById("drawerSubtotal");
  const shippingEl = document.getElementById("drawerShipping");
  const totalEl = document.getElementById("drawerTotal");
  const fillBar = document.getElementById("shippingBarFill");
  const statusText = document.getElementById("shippingStatusText");
  const percentText = document.getElementById("shippingPercentText");

  if (!badge || !container) return;

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  badge.textContent = totalItems;
  if (countText) countText.textContent = `(${totalItems} ${totalItems === 1 ? 'item' : 'items'})`;

  badge.classList.add("bump");
  setTimeout(() => badge.classList.remove("bump"), 300);

  const subtotal = cart.reduce((sum, item) => {
    const p = catalog.find(x => x.id === item.id);
    return sum + (p ? p.price * item.qty : 0);
  }, 0);

  const threshold = 2500;
  const freeShipping = subtotal >= threshold && subtotal > 0;
  const shippingCost = (subtotal === 0 || freeShipping) ? 0 : 150;
  const finalTotal = subtotal + shippingCost;

  if (subtotalEl) subtotalEl.textContent = money(subtotal);
  if (shippingEl) shippingEl.textContent = freeShipping ? "FREE" : (subtotal === 0 ? "₹0" : "₹150");
  if (totalEl) totalEl.textContent = money(finalTotal);

  if (fillBar && percentText && statusText) {
    const progress = Math.min(100, Math.round((subtotal / threshold) * 100));
    fillBar.style.width = progress + "%";
    percentText.textContent = progress + "%";

    if (freeShipping) {
      statusText.textContent = "🎉 You have unlocked Free Delivery!";
    } else if (subtotal > 0) {
      statusText.textContent = `Add ${money(threshold - subtotal)} more for Free Delivery`;
    } else {
      statusText.textContent = "Add ₹2,500 for Free Delivery";
    }
  }

  if (!cart.length) {
    container.innerHTML = `
      <div style="text-align:center; padding:48px 12px; color:var(--muted)">
        <div style="font-size:36px; margin-bottom:12px;">🛍️</div>
        <strong style="display:block; font-size:15px; color:var(--ink); margin-bottom:6px;">Your bag is empty</strong>
        <p style="font-size:13px; margin-bottom:18px;">Discover our natural everyday fabrics and add your favorite essentials.</p>
        <button class="btn-primary" onclick="toggleCartDrawer(false)">Start Browsing</button>
      </div>
    `;
    return;
  }

  container.innerHTML = cart.map(item => {
    const p = catalog.find(x => x.id === item.id);
    if (!p) return "";
    return `
      <div class="cart-item">
        <div class="cart-item-thumb">
          <img src="${p.image}" alt="${p.name}">
        </div>
        <div>
          <div class="cart-item-title">${p.name}</div>
          <div class="cart-item-meta">Size: <strong>${item.size}</strong> · ${money(p.price)}</div>
          <div class="qty-counter">
            <button class="qty-btn" onclick="updateQty(${p.id}, '${item.size}', -1)">−</button>
            <span class="qty-val">${item.qty}</span>
            <button class="qty-btn" onclick="updateQty(${p.id}, '${item.size}', 1)">+</button>
          </div>
        </div>
        <div class="cart-item-price">
          <span class="cart-item-total">${money(p.price * item.qty)}</span>
          <button class="item-remove" onclick="removeCartItem(${p.id}, '${item.size}')">Remove</button>
        </div>
      </div>
    `;
  }).join("");
}

function toggleCartDrawer(open) {
  const drawer = document.getElementById("cartDrawer");
  const overlay = document.getElementById("cartOverlay");
  if (drawer && overlay) {
    drawer.classList.toggle("open", open);
    overlay.classList.toggle("open", open);
  }
}

function quickAddToCart(productId) {
  addItemToCart(productId, "M", 1);
  const p = catalog.find(x => x.id === productId);
  if (typeof showSocialNotification === 'function') {
    showSocialNotification(`🛒 Added <strong>${p.name}</strong> to your bag.`);
  }
}

function addItemToCart(productId, size, qty = 1) {
  const existing = cart.find(x => x.id === productId && x.size === size);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ id: productId, size, qty });
  }
  saveCart();
}

function updateQty(productId, size, delta) {
  const item = cart.find(x => x.id === productId && x.size === size);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    cart = cart.filter(x => x !== item);
  }
  saveCart();
}

function removeCartItem(productId, size) {
  cart = cart.filter(x => !(x.id === productId && x.size === size));
  saveCart();
}

function clearCart() {
  if (!cart.length) return;
  if (confirm("Clear all items from your bag?")) {
    cart = [];
    saveCart();
  }
}
