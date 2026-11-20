/**
 * THREAD & FORM — Product Catalog Data Entity
 */
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
  }
];

const money = (n) => "₹" + Number(n).toLocaleString("en-IN");
