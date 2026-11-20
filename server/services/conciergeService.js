/**
 * THREAD & FORM — AI & Heuristic Concierge Service
 */
class ConciergeService {
  constructor() {
    this.knowledge = [
      {
        keys: ['size', 'sizing', 'fit', 'measurement', 'chart', 'loose', 'tight', 'dimension'],
        answer: 'Our garments are tailored with an intentional, relaxed drape. If you prefer a tailored, closer silhouette, we advise ordering one size down. Every item page contains exact garment dimensions!'
      },
      {
        keys: ['shipping', 'delivery', 'courier', 'track', 'time', 'dispatch', 'fast', 'express'],
        answer: 'We provide complimentary express delivery across India on all orders exceeding ₹2,500. Standard metro delivery takes 2–3 business days with real-time live SMS and WebSocket tracking.'
      },
      {
        keys: ['fabric', 'linen', 'cotton', 'care', 'wash', 'clean', 'iron', 'shrink', 'organic'],
        answer: 'All THREAD & FORM textiles are woven from 100% natural fibers (certified French flax linen and combed organic cotton). Machine wash cold on a gentle cycle and line dry in the shade to preserve natural yarn texture.'
      },
      {
        keys: ['return', 'exchange', 'refund', 'policy', 'replace', 'tag'],
        answer: 'Enjoy our stress-free 14-day exchange and return policy. Items must be unworn, unwashed, and in their original packaging with atelier tags intact.'
      },
      {
        keys: ['order', 'checkout', 'pay', 'upi', 'payment', 'card', 'cod'],
        answer: 'You can test our seamless instant checkout demo using UPI, Card, or NetBanking. Once placed, your order is tracked via our real-time 4-stage fulfillment pipeline!'
      },
      {
        keys: ['who', 'rahul', 'creator', 'author', 'developer', 'engineer', 'built'],
        answer: 'THREAD & FORM was designed and engineered by VALLURI RAHUL as a full-stack, real-time responsive e-commerce architecture. You can explore his portfolio at https://valluri-rahul-portfolio.vercel.app/!'
      }
    ];
  }

  ask(message = '', history = []) {
    const text = (message || '').trim().toLowerCase();
    if (!text) {
      return {
        reply: 'Hello! I am your THREAD & FORM Concierge. How may I assist you with sizing, natural fabrics, or tracking today?'
      };
    }

    for (const item of this.knowledge) {
      if (item.keys.some(k => text.includes(k))) {
        return { reply: item.answer, matchedCategory: item.keys[0] };
      }
    }

    return {
      reply: 'Thank you for reaching out! Our atelier team is online 24/7. Could you please specify whether your question concerns fabric composition, sizing recommendation, or order dispatch?',
      matchedCategory: 'general'
    };
  }
}

module.exports = new ConciergeService();
