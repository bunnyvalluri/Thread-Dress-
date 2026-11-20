# THREAD & FORM — Enterprise Production Web Application

A professional, modular e-commerce web platform for apparel and natural textiles, engineered with scalable architecture, real-time reactive state synchronization, and clean component decoupling.

---

## 📁 Professional Repository Architecture

```text
code/
├── index.html                   # Primary production HTML entry point
├── package.json                 # Project manifest & npm scripts
├── README.md                    # System architecture & developer guide
├── sw.js                        # Progressive Web App (PWA) Service Worker
│
├── src/                         # Production Source Code
│   ├── assets/                  # Media & Static Brand Assets
│   │   ├── images/              # High-resolution product & campaign imagery
│   │   └── icons/               # User interface iconography & SVG assets
│   │
│   ├── styles/                  # Modular Stylesheets
│   │   ├── variables.css        # Design tokens, color palette, typography & reset
│   │   ├── layout.css           # Header, sticky nav, hero, story, grids & layout
│   │   ├── components.css       # Product cards, filter chips, drawer & modals
│   │   └── chat.css             # Real-time live concierge widget & animations
│   │
│   └── scripts/                 # Decoupled JavaScript Modules
│       ├── catalog.js           # Product catalog entity with specifications & stock
│       ├── cart.js              # Shopping bag logic & multi-tab BroadcastChannel sync
│       ├── search-filter.js     # Instant search debouncer, category filter & sorting
│       ├── order-tracker.js     # Real-time simulated 4-stage fulfillment pipeline
│       ├── social-proof.js      # Real-time activity stream & inventory fluctuation
│       ├── concierge.js         # Real-time customer support chat widget & knowledge base
│       └── app.js               # Central application coordinator & bootstrap
│
├── milestones/                  # Formally Documented Engineering Milestones
│   ├── milestone-01-concept.html               # Milestone 1: Brand Concept & Storytelling
│   ├── milestone-02-design-system.html         # Milestone 2: UI/UX Wireframes & Design System
│   ├── milestone-03-responsive-storefront.html # Milestone 3: Responsive Frontend Architecture
│   ├── milestone-04-interactive-engine.html    # Milestone 4: Interactive Commerce Engine
│   └── milestone-05-quality-assurance.html     # Milestone 5: Quality Assurance & Test Suite
│
└── archive/                     # Historical Artifacts
    └── legacy/                  # Archived working files
```

---

## ⚡ Technical Highlights

1. **Enterprise-Grade Folder Organization**:
   - `src/styles/`: Organized CSS with semantic variables, layout rules, components, and chat widget styling.
   - `src/scripts/`: Clean, modular JavaScript modules with zero monoliths.
   - `src/assets/images/`: 100% locally hosted assets to eliminate external network failure.
   - `milestones/`: Formally named project progression milestones for academic/client evaluation.

2. **Real-Time Client-Side Engine**:
   - **Cross-Tab Synchronization**: Powered by `BroadcastChannel('tf_realtime_sync')` and `localStorage` events.
   - **Live Stock Simulation**: Real-time stock counters and viewing telemetry.
   - **Real-Time Order Tracking**: Multi-step fulfillment pipeline with animated step progression.
   - **Conversational Concierge**: Interactive concierge widget with debounced typing latency.

---

## 🚀 Development & Serving

```bash
# Start local server with Python
python -m http.server 3000

# Or with Node.js
npx serve -l 3000 .
```

Access the application at [http://localhost:3000/](http://localhost:3000/)
