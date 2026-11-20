/**
 * THREAD & FORM — Real-Time Order Fulfillment Tracking Engine
 */
function initiateCheckout() {
  if (!cart.length) {
    alert("Your bag is currently empty. Please add items to proceed.");
    return;
  }
  toggleCartDrawer(false);
  triggerSimulatedOrder();
}

function triggerSimulatedOrder() {
  const orderId = "TF-" + Math.floor(10000 + Math.random() * 90000);
  const orderIdEl = document.getElementById("trackerOrderId");
  if (orderIdEl) orderIdEl.textContent = `Order #${orderId}`;

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

  // Real-time step advancement
  setTimeout(() => {
    if (s2 && s3) {
      s2.className = "timeline-step completed";
      s3.className = "timeline-step active";
    }
    if (typeof showSocialNotification === 'function') {
      showSocialNotification(`📦 Order ${orderId}: Packed and handed to Priority Courier.`);
    }
  }, 4000);

  // Clear cart upon successful order
  cart = [];
  saveCart();
}

function toggleOrderModal(show) {
  const modal = document.getElementById("orderModal");
  if (modal) modal.classList.toggle("open", show);
}

function closeOrderModal(e) {
  if (e.target.id === "orderModal") toggleOrderModal(false);
}
