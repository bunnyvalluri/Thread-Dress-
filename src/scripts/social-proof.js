/**
 * THREAD & FORM — Real-Time Social Proof & Live Ticker Engine
 */
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
  let idx = 0;
  setInterval(() => {
    const ev = socialEvents[idx % socialEvents.length];
    idx++;

    const ticker = document.getElementById("topTickerText");
    if (ticker) {
      ticker.textContent = `⚡ Someone in ${ev.city} just ${ev.action} "${ev.item}" · Real-time live sync`;
    }

    if (Math.random() > 0.35) {
      showSocialNotification(`Someone in <strong>${ev.city}</strong> just ${ev.action} <strong>${ev.item}</strong>.`);
    }

    // Dynamic stock fluctuation
    const randomP = catalog[Math.floor(Math.random() * catalog.length)];
    if (Math.random() > 0.6) {
      randomP.stock = Math.max(1, randomP.stock + (Math.random() > 0.5 ? 1 : -1));
      if (typeof applySortAndFilter === 'function') {
        applySortAndFilter();
      }
    }
  }, 7000);
}
