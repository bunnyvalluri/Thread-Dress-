/**
 * THREAD & FORM — Real-Time Social Proof & Rotating Live Announcement Engine
 */
const rotatingAnnouncements = [
  "⚡ Complimentary shipping across India on orders over ₹2,500",
  "⚡ Someone in Bengaluru just purchased Linen Everyday Shirt",
  "⚡ 100% French Flax Linen & Combed Organic Cotton",
  "⚡ Someone in Mumbai added Relaxed Sand Trousers to bag",
  "⚡ Hassle-free 14-day exchange and return policy",
  "⚡ Someone in New Delhi purchased Textured Cushion Cover",
  "⚡ Real-time multi-tab bag synchronization active"
];

const socialEvents = [
  { city: "Bengaluru", action: "purchased", item: "Linen Everyday Shirt", icon: "👗" },
  { city: "Mumbai", action: "added to bag", item: "Relaxed Sand Trousers", icon: "👖" },
  { city: "New Delhi", action: "purchased", item: "Textured Cushion Cover", icon: "🛋️" },
  { city: "Hyderabad", action: "reviewed ★★★★★", item: "Oxford Casual Shirt", icon: "⭐" },
  { city: "Chennai", action: "purchased", item: "Raw Organic Throw Blanket", icon: "✨" },
  { city: "Pune", action: "added to bag", item: "Classic Cotton Tee", icon: "👕" }
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

  // Initialize with the first announcement
  ticker.innerHTML = `<span class="ticker-item active">${rotatingAnnouncements[0]}</span>`;

  // Rotate messages smoothly every 3.8 seconds
  setInterval(() => {
    currentIdx = (currentIdx + 1) % rotatingAnnouncements.length;
    const nextText = rotatingAnnouncements[currentIdx];

    const currentItem = ticker.querySelector(".ticker-item.active");
    const nextItem = document.createElement("span");
    nextItem.className = "ticker-item";
    nextItem.textContent = nextText;
    ticker.appendChild(nextItem);

    // Smooth transition
    requestAnimationFrame(() => {
      if (currentItem) {
        currentItem.classList.remove("active");
        currentItem.classList.add("exit");
      }
      nextItem.classList.add("active");
    });

    // Cleanup old item after transition completes
    setTimeout(() => {
      if (currentItem && currentItem.parentNode) {
        currentItem.remove();
      }
    }, 500);

    // Occasional social toast trigger
    if (Math.random() > 0.5) {
      const ev = socialEvents[Math.floor(Math.random() * socialEvents.length)];
      showSocialNotification(`Someone in <strong>${ev.city}</strong> just ${ev.action} <strong>${ev.item}</strong>.`);
    }

    // Dynamic stock fluctuation
    if (typeof catalog !== 'undefined' && catalog.length && Math.random() > 0.6) {
      const randomP = catalog[Math.floor(Math.random() * catalog.length)];
      randomP.stock = Math.max(1, randomP.stock + (Math.random() > 0.5 ? 1 : -1));
      if (typeof applySortAndFilter === 'function') {
        applySortAndFilter();
      }
    }
  }, 3800);
}
