/**
 * THREAD & FORM — Real-Time Search, Category Filtering & Dynamic Sorting
 */
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
  activeCategory = cat;
  document.querySelectorAll("#filterChips .chip").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.cat === cat);
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
