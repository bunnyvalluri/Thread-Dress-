/**
 * THREAD & FORM — Real-Time Live Concierge Chatbot
 */
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

function handleChatSubmit(e) {
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

  setTimeout(() => {
    typing.remove();
    const lower = text.toLowerCase();
    let reply = "Thank you for reaching out! Our team is available 24/7 to assist with fabric choices, sizing and real-time orders.";
    for (const item of conciergeKnowledge) {
      if (item.keys.some(k => lower.includes(k))) {
        reply = item.answer;
        break;
      }
    }

    const botMsg = document.createElement("div");
    botMsg.className = "msg bot";
    botMsg.textContent = reply;
    msgs.appendChild(botMsg);
    msgs.scrollTop = msgs.scrollHeight;
  }, 700);
}
