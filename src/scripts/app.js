/**
 * THREAD & FORM — Unified Production Application Engine
 * Architecture: Vanilla JS · Real-Time Multi-Tab Synchronization · Event-Driven
 */

/* ==========================================================================
   1. PRODUCT CATALOG DATA ENTITY
   ========================================================================== */
const catalog = [
  {
    id: 1,
    name: "Linen Everyday Shirt",
    category: "Women",
    price: 1890,
    tag: "BESTSELLER",
    stock: 5,
    image: "src/assets/images/linen-shirt.jpg",
    desc: "Relaxed-fit pure linen shirt engineered for cool everyday layering."
  },
  {
    id: 2,
    name: "Classic Cotton Tee",
    category: "Men",
    price: 890,
    tag: "ESSENTIAL",
    stock: 14,
    image: "src/assets/images/cotton-tee.jpg",
    desc: "Heavyweight organic combed cotton with double-needle ribbed collar."
  },
  {
    id: 3,
    name: "Textured Cushion Cover",
    category: "Home",
    price: 650,
    tag: "HOME ESSENTIAL",
    stock: 8,
    image: "src/assets/images/cushion-cover.jpg",
    desc: "Tactile slub weave with hidden brass zipper for calm living spaces."
  },
  {
    id: 4,
    name: "Relaxed Sand Trousers",
    category: "Women",
    price: 2190,
    tag: "NEW ARRIVAL",
    stock: 3,
    image: "src/assets/images/sand-trousers.jpg",
    desc: "Pleated wide-leg trouser with elasticated rear waistband and natural drape."
  },
  {
    id: 5,
    name: "Oxford Casual Shirt",
    category: "Men",
    price: 1690,
    tag: "EVERYDAY",
    stock: 9,
    image: "src/assets/images/oxford-shirt.jpg",
    desc: "Structured pinpoint Oxford cotton with button-down collar."
  },
  {
    id: 6,
    name: "Woven Table Runner",
    category: "Home",
    price: 990,
    tag: "HANDWOVEN",
    stock: 6,
    image: "src/assets/images/table-runner.jpg",
    desc: "Handloom textured table runner finished with natural fringed edges."
  },
  {
    id: 7,
    name: "Soft Knit Olive Layer",
    category: "Women",
    price: 1490,
    tag: "POPULAR",
    stock: 4,
    image: "src/assets/images/knit-layer.jpg",
    desc: "Feather-light fine knit spun from breathable combed cotton yarns."
  },
  {
    id: 8,
    name: "Weekend Cotton Shorts",
    category: "Men",
    price: 1190,
    tag: "SLOW LIVING",
    stock: 12,
    image: "src/assets/images/cotton-shorts.jpg",
    desc: "Drawstring twill shorts tailored for leisurely weekends and travel."
  },
  {
    id: 9,
    name: "Relaxed Cotton Overshirt",
    category: "Women",
    price: 1899,
    tag: "SIGNATURE",
    stock: 2,
    image: "src/assets/images/cotton-overshirt.jpg",
    desc: "Utility pockets and soft sand-tone washed twill for trans-seasonal style."
  },
  {
    id: 10,
    name: "Minimalist Linen Tunic",
    category: "Women",
    price: 2299,
    tag: "TIMELESS",
    stock: 7,
    image: "src/assets/images/linen-tunic.jpg",
    desc: "High-grade French flax tunic with relaxed raglan sleeve cut."
  },
  {
    id: 11,
    name: "Raw Organic Throw Blanket",
    category: "Home",
    price: 1790,
    tag: "ARTISAN",
    stock: 6,
    image: "src/assets/images/throw-blanket.jpg",
    desc: "Undyed biological cotton woven with waffle texture for warmth."
  },
  {
    id: 12,
    name: "Daily Linen Overshirt",
    category: "Men",
    price: 2290,
    tag: "PREMIUM",
    stock: 4,
    image: "src/assets/images/daily-overshirt.jpg",
    desc: "Crisp yet breathable linen layer with horn buttons and chest pockets."
  },
  {
    id: 13,
    name: "Structured Linen Blazer",
    category: "Women",
    price: 3490,
    tag: "EDITORIAL",
    stock: 3,
    image: "src/assets/images/linen-blazer.jpg",
    desc: "Tailored unlined summer blazer woven from raw Normandy flax linen."
  },
  {
    id: 14,
    name: "Wide-Leg Linen Culottes",
    category: "Women",
    price: 2190,
    tag: "ORGANIC",
    stock: 6,
    image: "src/assets/images/linen-culottes.jpg",
    desc: "Airy cropped wide trousers in breathable natural oat linen with deep pockets."
  },
  {
    id: 15,
    name: "Draped Silk-Cotton Maxi Dress",
    category: "Women",
    price: 3890,
    tag: "LIMITED RUN",
    stock: 2,
    image: "src/assets/images/silk-dress.jpg",
    desc: "Fluid tiered ankle-length dress woven from organic cotton and mulberry silk."
  },
  {
    id: 16,
    name: "Band-Collar Linen Kurta Shirt",
    category: "Men",
    price: 1990,
    tag: "ARTISAN",
    stock: 8,
    image: "src/assets/images/kurta-shirt.jpg",
    desc: "Contemporary mandarin-collar shirt in breathable washed natural linen."
  },
  {
    id: 17,
    name: "Tailored Pleated Chinos",
    category: "Men",
    price: 2490,
    tag: "NEW ARRIVAL",
    stock: 5,
    image: "src/assets/images/pleated-chinos.jpg",
    desc: "Relaxed-tapered organic twill trousers with double front pleats."
  },
  {
    id: 18,
    name: "Waffle Knit Crewneck",
    category: "Men",
    price: 1890,
    tag: "WARM LAYER",
    stock: 7,
    image: "src/assets/images/waffle-crewneck.jpg",
    desc: "Midweight textured honeycomb knit spun from pure combed organic cotton."
  },
  {
    id: 19,
    name: "Indigo Selvedge Chambray Shirt",
    category: "Men",
    price: 2190,
    tag: "SLOW LIVING",
    stock: 4,
    image: "src/assets/images/chambray-shirt.jpg",
    desc: "Vintage-loomed indigo chambray with contrast bone buttons and chest pocket."
  },
  {
    id: 20,
    name: "Washed Linen Duvet Set",
    category: "Home",
    price: 4290,
    tag: "LUXURY SLEEP",
    stock: 3,
    image: "src/assets/images/duvet-set.jpg",
    desc: "Breathable stone-washed European flax bedding set for temperate year-round rest."
  },
  {
    id: 21,
    name: "Hand-Spun Cotton Bath Towels",
    category: "Home",
    price: 1290,
    tag: "ECO ESSENTIAL",
    stock: 11,
    image: "src/assets/images/bath-towels.jpg",
    desc: "Ultra-absorbent plush waffle weave bath sheet in unbleached ecru."
  },
  {
    id: 22,
    name: "Stoneware Ceramic Incense Vessel",
    category: "Home",
    price: 850,
    tag: "STUDIO CRAFT",
    stock: 9,
    image: "src/assets/images/ceramic-vessel.jpg",
    desc: "Wheel-thrown speckled clay vessel with matte botanical wood-ash glaze."
  },
  {
    id: 23,
    name: "Botanical Dyed Linen Napkins",
    category: "Home",
    price: 1150,
    tag: "HANDMADE",
    stock: 6,
    image: "src/assets/images/linen-napkins.jpg",
    desc: "Set of 4 earthy marigold and indigo hand-dyed table napkins with frayed selvedge."
  },
  {
    id: 24,
    name: "Hand-Knotted Jute Floor Runner",
    category: "Home",
    price: 2790,
    tag: "NATURAL FIBER",
    stock: 5,
    image: "src/assets/images/jute-runner.jpg",
    desc: "Heavyweight braided golden jute runner for textured hallway warmth and durability."
  }
];

function updateCatalogCounts() {
  const allCount = catalog.length;
  const womenCount = catalog.filter(p => p.category === "Women").length;
  const menCount = catalog.filter(p => p.category === "Men").length;
  const homeCount = catalog.filter(p => p.category === "Home").length;

  const cAll = document.getElementById("chipCountAll");
  const cWomen = document.getElementById("chipCountWomen");
  const cMen = document.getElementById("chipCountMen");
  const cHome = document.getElementById("chipCountHome");
  if (cAll) cAll.textContent = allCount;
  if (cWomen) cWomen.textContent = womenCount;
  if (cMen) cMen.textContent = menCount;
  if (cHome) cHome.textContent = homeCount;

  const mAll = document.getElementById("mobileCountAll");
  const mWomen = document.getElementById("mobileCountWomen");
  const mMen = document.getElementById("mobileCountMen");
  const mHome = document.getElementById("mobileCountHome");
  if (mAll) mAll.textContent = `${allCount} pieces`;
  if (mWomen) mWomen.textContent = `${womenCount} pieces`;
  if (mMen) mMen.textContent = `${menCount} pieces`;
  if (mHome) mHome.textContent = `${homeCount} pieces`;
}

const money = (n) => "₹" + Number(n).toLocaleString("en-IN");

/* ==========================================================================
   2. REAL-TIME SHOPPING BAG & MULTI-TAB SYNCHRONIZATION
   ========================================================================== */
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

if (SYNC_CHANNEL) {
  SYNC_CHANNEL.onmessage = (event) => {
    if (event.data?.type === "CART_UPDATED") {
      cart = event.data.cart;
      renderCartUI();
      if (typeof showSocialNotification === 'function') {
        showSocialNotification("⚡ Bag synchronized in real time across browser tabs.");
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
  if (typeof showSocialNotification === 'function' && p) {
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

/* ==========================================================================
   3. CATALOG SEARCH, CATEGORY FILTERING & SORTING
   ========================================================================== */
let activeCategory = "All";

function renderCatalog(products) {
  const grid = document.getElementById("productGrid");
  const countLabel = document.getElementById("productCount");
  if (!grid || !countLabel) return;

  countLabel.textContent = `${products.length} ${products.length === 1 ? 'piece' : 'pieces'} available`;

  if (!products.length) {
    grid.innerHTML = `
      <div style="grid-column:1/-1; text-align:center; padding:60px 20px; background:#fff; border-radius:12px; border:1px dashed var(--line);">
        <div style="font-size:32px; margin-bottom:12px;">🔍</div>
        <h3 style="font-family:var(--serif); margin-bottom:6px;">No products match your criteria</h3>
        <p style="color:var(--muted); font-size:13px; margin-bottom:16px;">Try adjusting your search query or switching categories.</p>
        <button class="btn-primary" onclick="resetFilters()">Reset All Filters</button>
      </div>
    `;
    return;
  }

  grid.innerHTML = products.map(p => {
    const isLow = p.stock <= 4;
    return `
      <article class="product-card" data-id="${p.id}">
        <div class="card-media" onclick="openProductModal(${p.id})" style="cursor:pointer;" title="Tap to view details">
          <span class="card-tag">${p.tag}</span>
          <span class="stock-badge ${isLow ? 'low' : ''}">
            ${isLow ? '⚠️ Only ' + p.stock + ' left' : '● ' + p.stock + ' in stock'}
          </span>
          <img src="${p.image}" alt="${p.name}" loading="lazy" onerror="this.onerror=null; this.parentElement.style.background='#d8deda';">
        </div>
        <div class="card-body">
          <div class="card-category">${p.category}</div>
          <h3 class="card-title" onclick="openProductModal(${p.id})" style="cursor:pointer;">${p.name}</h3>
          <p class="card-desc">${p.desc}</p>
          <div class="card-foot">
            <span class="card-price">${money(p.price)}</span>
            <div class="card-actions">
              <button class="btn-quick-view" onclick="openProductModal(${p.id})" aria-label="View details for ${p.name}">Details</button>
              <button class="btn-quick-add" onclick="quickAddToCart(${p.id})" aria-label="Add ${p.name} to bag">+ Bag</button>
            </div>
          </div>
        </div>
      </article>
    `;
  }).join("");
}

function applySortAndFilter() {
  const searchInput = document.getElementById("liveSearchInput");
  const sortSelect = document.getElementById("sortSelect");
  if (!searchInput || !sortSelect) return;

  const searchVal = searchInput.value.trim().toLowerCase();
  const sortVal = sortSelect.value;

  let list = catalog.filter(p => {
    const matchesCategory = (activeCategory === "All" || p.category === activeCategory);
    const textTarget = (p.name + " " + p.category + " " + p.desc + " " + p.tag).toLowerCase();
    const matchesSearch = textTarget.includes(searchVal);
    return matchesCategory && matchesSearch;
  });

  if (sortVal === "low") list.sort((a,b) => a.price - b.price);
  else if (sortVal === "high") list.sort((a,b) => b.price - a.price);
  else if (sortVal === "name") list.sort((a,b) => a.name.localeCompare(b.name));
  else if (sortVal === "stock") list.sort((a,b) => a.stock - b.stock);

  renderCatalog(list);
}

function filterCategory(cat) {
  if (cat === "Story") {
    document.querySelectorAll(".main-nav a").forEach(link => {
      link.classList.toggle("active", link.dataset.nav === "Story");
    });
    return;
  }

  activeCategory = cat;

  // Sync Desktop Filter Chips
  document.querySelectorAll("#filterChips .chip").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.cat === cat);
  });

  // Sync Desktop Header Nav Links
  document.querySelectorAll(".main-nav a").forEach(link => {
    link.classList.toggle("active", link.dataset.nav === cat);
  });

  applySortAndFilter();
}

function resetFilters() {
  const searchInput = document.getElementById("liveSearchInput");
  const sortSelect = document.getElementById("sortSelect");
  if (searchInput) searchInput.value = "";
  if (sortSelect) sortSelect.value = "featured";
  filterCategory("All");
}

/* ==========================================================================
   4. ROTATING TOP ANNOUNCEMENT TICKER & SOCIAL PROOF
   ========================================================================== */
const rotatingAnnouncements = [
  "⚡ Complimentary shipping across India on orders over ₹2,500",
  "⚡ Someone in Bengaluru just purchased Linen Everyday Shirt",
  "⚡ 100% French Flax Linen & Combed Organic Cotton",
  "⚡ Someone in Mumbai added Relaxed Sand Trousers to bag",
  "⚡ Someone in Jaipur ordered Structured Linen Blazer",
  "⚡ Hassle-free 14-day exchange and return policy",
  "⚡ Someone in Kolkata added Washed Linen Duvet Set to bag",
  "⚡ Someone in New Delhi purchased Textured Cushion Cover",
  "⚡ Someone in Hyderabad purchased Band-Collar Linen Kurta Shirt",
  "⚡ Someone in Kochi ordered Hand-Knotted Jute Floor Runner",
  "⚡ Real-time multi-tab bag synchronization active"
];

const socialEvents = [
  { city: "Bengaluru", action: "purchased", item: "Linen Everyday Shirt", icon: "👗" },
  { city: "Mumbai", action: "added to bag", item: "Relaxed Sand Trousers", icon: "👖" },
  { city: "New Delhi", action: "purchased", item: "Textured Cushion Cover", icon: "🛋️" },
  { city: "Hyderabad", action: "reviewed ★★★★★", item: "Oxford Casual Shirt", icon: "⭐" },
  { city: "Chennai", action: "purchased", item: "Raw Organic Throw Blanket", icon: "✨" },
  { city: "Pune", action: "added to bag", item: "Classic Cotton Tee", icon: "👕" },
  { city: "Jaipur", action: "purchased", item: "Structured Linen Blazer", icon: "🧥" },
  { city: "Kolkata", action: "added to bag", item: "Washed Linen Duvet Set", icon: "🛏️" },
  { city: "Ahmedabad", action: "reviewed ★★★★★", item: "Band-Collar Linen Kurta Shirt", icon: "⭐" },
  { city: "Kochi", action: "purchased", item: "Hand-Knotted Jute Floor Runner", icon: "🏡" },
  { city: "Chandigarh", action: "purchased", item: "Draped Silk-Cotton Maxi Dress", icon: "👗" },
  { city: "Goa", action: "added to bag", item: "Botanical Dyed Linen Napkins", icon: "✨" }
];

function showSocialNotification(htmlContent) {
  const stream = document.getElementById("activityStream");
  if (!stream) return;

  const toast = document.createElement("div");
  toast.className = "activity-toast";
  toast.innerHTML = `
    <div class="activity-avatar">⚡</div>
    <div>${htmlContent}</div>
  `;
  stream.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = "fadeOutToast 0.4s ease forwards";
    setTimeout(() => toast.remove(), 400);
  }, 4200);
}

function runLiveTicker() {
  const ticker = document.getElementById("topTickerText");
  if (!ticker) return;

  let currentIdx = 0;
  ticker.innerHTML = `<span class="ticker-item active">${rotatingAnnouncements[0]}</span>`;

  setInterval(() => {
    currentIdx = (currentIdx + 1) % rotatingAnnouncements.length;
    const nextText = rotatingAnnouncements[currentIdx];

    const currentItem = ticker.querySelector(".ticker-item.active");
    const nextItem = document.createElement("span");
    nextItem.className = "ticker-item";
    nextItem.textContent = nextText;
    ticker.appendChild(nextItem);

    requestAnimationFrame(() => {
      if (currentItem) {
        currentItem.classList.remove("active");
        currentItem.classList.add("exit");
      }
      nextItem.classList.add("active");
    });

    setTimeout(() => {
      if (currentItem && currentItem.parentNode) {
        currentItem.remove();
      }
    }, 500);

    if (Math.random() > 0.5) {
      const ev = socialEvents[Math.floor(Math.random() * socialEvents.length)];
      showSocialNotification(`Someone in <strong>${ev.city}</strong> just ${ev.action} <strong>${ev.item}</strong>.`);
    }

    if (typeof catalog !== 'undefined' && catalog.length && Math.random() > 0.6) {
      const randomP = catalog[Math.floor(Math.random() * catalog.length)];
      randomP.stock = Math.max(1, randomP.stock + (Math.random() > 0.5 ? 1 : -1));
      if (typeof applySortAndFilter === 'function') {
        applySortAndFilter();
      }
    }
  }, 3800);
}

/* ==========================================================================
   5. REAL-TIME ORDER FULFILLMENT TRACKER & WEBSOCKET ENGINE
   ========================================================================== */
let wsClient = null;

function connectRealtimeTelemetry() {
  if (typeof WebSocket === 'undefined' || location.protocol === 'file:') return;
  try {
    const protocol = location.protocol === 'https:' ? 'wss:' : 'ws:';
    const wsUrl = `${protocol}//${location.host}/ws`;
    wsClient = new WebSocket(wsUrl);

    wsClient.onmessage = (event) => {
      try {
        const msg = JSON.parse(event.data);
        if (msg.type === 'INVENTORY_UPDATED') {
          const product = catalog.find(p => p.id === msg.productId);
          if (product) {
            product.stock = msg.stock;
            applySortAndFilter();
          }
        } else if (msg.type === 'SOCIAL_EVENT' && msg.event) {
          showSocialNotification(`Someone in <strong>${msg.event.city}</strong> just ${msg.event.action} <strong>${msg.event.item}</strong>.`);
        } else if (msg.type === 'ORDER_STATUS_UPDATED' && msg.order) {
          updateOrderTrackerUI(msg.order);
        }
      } catch (err) {}
    };

    wsClient.onclose = () => {
      setTimeout(connectRealtimeTelemetry, 5000);
    };
  } catch (err) {}
}

function updateOrderTrackerUI(order) {
  const orderIdEl = document.getElementById("trackerOrderId");
  if (orderIdEl) orderIdEl.textContent = `Order #${order.id}`;

  const s1 = document.getElementById("step1");
  const s2 = document.getElementById("step2");
  const s3 = document.getElementById("step3");
  const s4 = document.getElementById("step4");
  const time2 = document.getElementById("time2");

  if (!s1 || !s2 || !s3 || !s4) return;

  if (order.currentStep >= 1) s1.className = "timeline-step completed";
  if (order.currentStep >= 2) {
    s2.className = "timeline-step completed";
    if (time2) time2.textContent = "Dispatched via Priority Courier";
  } else if (order.currentStep === 1) {
    s2.className = "timeline-step active";
  }
  if (order.currentStep >= 3) s3.className = "timeline-step active";
  if (order.currentStep >= 4) s4.className = "timeline-step completed";
}

function initiateCheckout() {
  if (!cart.length) {
    alert("Your bag is currently empty. Please add items to proceed.");
    return;
  }
  toggleCartDrawer(false);
  triggerSimulatedOrder();
}

async function triggerSimulatedOrder() {
  const currentItems = [...cart];
  cart = [];
  saveCart();

  const orderIdFallback = "TF-" + Math.floor(10000 + Math.random() * 90000);
  const orderIdEl = document.getElementById("trackerOrderId");
  if (orderIdEl) orderIdEl.textContent = `Order #${orderIdFallback}`;

  const s1 = document.getElementById("step1");
  const s2 = document.getElementById("step2");
  const s3 = document.getElementById("step3");
  const s4 = document.getElementById("step4");
  const time2 = document.getElementById("time2");

  if (s1 && s2 && s3 && s4) {
    s1.className = "timeline-step completed";
    s2.className = "timeline-step active";
    s3.className = "timeline-step";
    s4.className = "timeline-step";
    if (time2) time2.textContent = "In progress (Simulating real-time dispatch)...";
  }

  toggleOrderModal(true);

  // Attempt backend API order submission
  try {
    const res = await fetch('/api/v1/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        customer: { name: 'Storefront Guest', city: 'Bengaluru' },
        items: currentItems.length ? currentItems : [{ id: 1, qty: 1, size: 'M' }]
      })
    });

    if (res.ok) {
      const data = await res.json();
      const realOrder = data.data;
      if (orderIdEl) orderIdEl.textContent = `Order #${realOrder.id}`;

      // Subscribe to real-time WebSocket fulfillment lifecycle
      if (wsClient && wsClient.readyState === WebSocket.OPEN) {
        wsClient.send(JSON.stringify({ type: 'SUBSCRIBE_ORDER', orderId: realOrder.id }));
      }
      return;
    }
  } catch (e) {
    // Graceful offline fallback
  }

  // Client-side fallback simulation if backend is not reachable
  setTimeout(() => {
    if (s2 && s3) {
      s2.className = "timeline-step completed";
      s3.className = "timeline-step active";
    }
    if (typeof showSocialNotification === 'function') {
      showSocialNotification(`📦 Order ${orderIdFallback}: Packed and handed to Priority Courier.`);
    }
  }, 4000);
}

function toggleOrderModal(show) {
  const modal = document.getElementById("orderModal");
  if (modal) modal.classList.toggle("open", show);
}

function closeOrderModal(e) {
  if (e.target.id === "orderModal") toggleOrderModal(false);
}

/* ==========================================================================
   6. LIVE CONCIERGE ASSISTANT
   ========================================================================== */
const conciergeKnowledge = [
  { keys: ["size", "fit", "sizing", "measurement"], answer: "Our garments have a relaxed, true-to-size cut. If you prefer a tailored fit, we recommend ordering one size down!" },
  { keys: ["shipping", "delivery", "track", "courier"], answer: "We offer complimentary express shipping across India on orders over ₹2,500. Standard delivery takes 2–4 business days." },
  { keys: ["fabric", "linen", "cotton", "material", "wash"], answer: "All textiles are made from 100% natural fibers (French flax linen and combed long-staple cotton). Machine wash cold on a gentle cycle." },
  { keys: ["return", "refund", "exchange"], answer: "We offer a hassle-free 14-day exchange and return policy on all unworn items with tags intact." },
  { keys: ["order", "checkout", "buy", "pay"], answer: "You can click 'Quick Demo Checkout' or 'Proceed to Live Checkout' to test our simulated real-time order tracking pipeline!" }
];

function toggleChat() {
  const box = document.getElementById("chatBox");
  if (box) box.classList.toggle("open");
}

async function handleChatSubmit(e) {
  e.preventDefault();
  const input = document.getElementById("chatInput");
  const msgs = document.getElementById("chatMessages");
  if (!input || !msgs) return;

  const text = input.value.trim();
  if (!text) return;

  const userMsg = document.createElement("div");
  userMsg.className = "msg user";
  userMsg.textContent = text;
  msgs.appendChild(userMsg);
  input.value = "";
  msgs.scrollTop = msgs.scrollHeight;

  const typing = document.createElement("div");
  typing.className = "msg typing";
  typing.textContent = "THREAD & FORM Concierge is typing...";
  msgs.appendChild(typing);
  msgs.scrollTop = msgs.scrollHeight;

  let replyText = null;

  // Attempt backend API Concierge call
  try {
    const res = await fetch('/api/v1/concierge/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: text })
    });
    if (res.ok) {
      const data = await res.json();
      if (data.data?.reply) replyText = data.data.reply;
    }
  } catch (err) {
    // Fallback to client heuristic
  }

  if (!replyText) {
    const lower = text.toLowerCase();
    replyText = "Thank you for reaching out! Our team is available 24/7 to assist with fabric choices, sizing and real-time orders.";
    for (const item of conciergeKnowledge) {
      if (item.keys.some(k => lower.includes(k))) {
        replyText = item.answer;
        break;
      }
    }
  }

  setTimeout(() => {
    typing.remove();
    const botMsg = document.createElement("div");
    botMsg.className = "msg bot";
    botMsg.textContent = replyText;
    msgs.appendChild(botMsg);
    msgs.scrollTop = msgs.scrollHeight;
  }, 400);
}

/* ==========================================================================
   7. QUICK VIEW MODAL & APPLICATION BOOTSTRAP
   ========================================================================== */
let activeModalProduct = null;
let selectedSize = "M";

function openProductModal(productId) {
  const p = catalog.find(x => x.id === productId);
  if (!p) return;
  activeModalProduct = p;
  selectedSize = "M";

  const imgEl = document.getElementById("modalImg");
  const catEl = document.getElementById("modalCategory");
  const titleEl = document.getElementById("modalTitle");
  const priceEl = document.getElementById("modalPrice");
  const btnPriceEl = document.getElementById("modalBtnPrice");
  const descEl = document.getElementById("modalDesc");
  const liveCountEl = document.getElementById("modalLiveCount");

  if (imgEl) imgEl.src = p.image;
  if (catEl) catEl.textContent = `${p.category} · ${p.tag}`;
  if (titleEl) titleEl.textContent = p.name;
  if (priceEl) priceEl.textContent = money(p.price);
  if (btnPriceEl) btnPriceEl.textContent = money(p.price);
  if (descEl) descEl.textContent = p.desc;

  const viewers = Math.floor(Math.random() * 5) + 2;
  if (liveCountEl) {
    liveCountEl.textContent = `${viewers} shoppers viewing this right now (Only ${p.stock} left)`;
  }

  document.querySelectorAll("#sizeButtons .size-btn").forEach(btn => {
    btn.classList.toggle("active", btn.textContent === "M");
  });

  toggleProductModal(true);
}

function selectModalSize(size, btn) {
  selectedSize = size;
  document.querySelectorAll("#sizeButtons .size-btn").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
}

function addCurrentModalToCart() {
  if (!activeModalProduct) return;
  addItemToCart(activeModalProduct.id, selectedSize, 1);
  toggleProductModal(false);
  toggleCartDrawer(true);
  if (typeof showSocialNotification === 'function') {
    showSocialNotification(`Added <strong>${activeModalProduct.name} (${selectedSize})</strong> to your bag.`);
  }
}

function toggleProductModal(show) {
  const modal = document.getElementById("productModal");
  if (modal) modal.classList.toggle("open", show);
}

function closeProductModal(e) {
  if (e.target.id === "productModal") toggleProductModal(false);
}

function toggleMobileMenu(forceState) {
  const btn = document.getElementById("mobileMenuBtn");
  const nav = document.getElementById("mobileNav");
  if (!btn || !nav) return;

  const isOpen = typeof forceState === 'boolean' ? forceState : !nav.classList.contains("open");
  nav.classList.toggle("open", isOpen);
  btn.classList.toggle("open", isOpen);
  btn.setAttribute("aria-expanded", String(isOpen));
}

document.addEventListener("click", (e) => {
  const btn = document.getElementById("mobileMenuBtn");
  const nav = document.getElementById("mobileNav");
  if (nav && nav.classList.contains("open") && btn && !btn.contains(e.target) && !nav.contains(e.target)) {
    toggleMobileMenu(false);
  }
});

// Global Initialization
window.addEventListener("DOMContentLoaded", async () => {
  updateCatalogCounts();
  loadCart();
  applySortAndFilter();
  runLiveTicker();
  connectRealtimeTelemetry();

  // Hydrate live inventory from backend API if available
  if (location.protocol !== 'file:') {
    try {
      const res = await fetch('/api/v1/products');
      if (res.ok) {
        const payload = await res.json();
        if (payload.data && Array.isArray(payload.data)) {
          payload.data.forEach(serverProduct => {
            const local = catalog.find(p => p.id === serverProduct.id);
            if (local) local.stock = serverProduct.stock;
          });
          applySortAndFilter();
          updateCatalogCounts();
        }
      }
    } catch (e) {
      // Running offline or static server
    }
  }

  const searchInput = document.getElementById("liveSearchInput");
  if (searchInput) {
    searchInput.addEventListener("input", applySortAndFilter);
  }
});
