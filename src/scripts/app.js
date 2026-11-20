/**
 * THREAD & FORM — Central Application Bootstrap & Quick View Logic
 */
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

function toggleStudioView() {
  const panel = document.getElementById("studioPanel");
  if (!panel) return;
  panel.classList.toggle("show");
  if (panel.classList.contains("show")) {
    panel.scrollIntoView({ behavior: "smooth" });
  }
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

// Close mobile nav on escape or click outside
document.addEventListener("click", (e) => {
  const btn = document.getElementById("mobileMenuBtn");
  const nav = document.getElementById("mobileNav");
  if (nav && nav.classList.contains("open") && btn && !btn.contains(e.target) && !nav.contains(e.target)) {
    toggleMobileMenu(false);
  }
});

// Global Initialization
window.addEventListener("DOMContentLoaded", () => {
  loadCart();
  applySortAndFilter();
  runLiveTicker();

  const searchInput = document.getElementById("liveSearchInput");
  if (searchInput) {
    searchInput.addEventListener("input", applySortAndFilter);
  }
});
