import picuture from "../../public/WhatsApp Image 2026-01-07 at 11.05.58 PM.jpeg";

export const products = [
  {
    id: "af-500",
    brand: "Absolutely Not",
    brandType: "own",
    tag: "Our Brand",
    tagColor: "bg-sky-500",
    img: picuture,
    name: "Absolutely Not 500ml",
    des: "Aqua Forge's signature water bottle. Crisp, clean, and crafted for everyday hydration. BPA-free with a leak-proof lid.",
    size: "500ml",
    pricePerBottle: 360,
    bottlesPerCarton: 12,
    get pricePerCarton() {
      return this.pricePerBottle * this.bottlesPerCarton;
    }, // 14,400
    minCarton: 50,
    get price() {
      return this.pricePerCarton * this.minCarton;
    }, 
    rating: 4.9,
    reviews: 312,
    colors: ["#0ea5e9", "#1e293b", "#f1f5f9"],
    category: "Own Brand",
  },
  {
    id: "af-1500",
    brand: "Absolutely Not",
    brandType: "own",
    tag: "Our Brand",
    tagColor: "bg-sky-500",
    img: picuture,
    name: "Absolutely Not 1500ml",
    des: "The big one. Perfect for long days, gym sessions, and staying fully hydrated. Same premium quality, larger capacity.",
    size: "1500ml",
    pricePerBottle: 480,
    bottlesPerCarton: 6,
    get pricePerCarton() {
      return this.pricePerBottle * this.bottlesPerCarton;
    }, // 11,520
    minCarton: 50,
    get price() {
      return this.pricePerCarton * this.minCarton;
    },
    rating: 4.8,
    reviews: 189,
    colors: ["#0ea5e9", "#0369a1", "#f1f5f9"],
    category: "Own Brand",
  },

  // ── Custom Brand orders (for other brands) ──
  {
    id: "cb-500",
    brand: "Your Brand",
    brandType: "custom",
    tag: "Custom",
    tagColor: "bg-orange-500",
    img: picuture,
    name: "Custom Brand 500ml",
    des: "Launch your own water bottle brand. Your logo, your colors, your label — printed on our premium 500ml bottle. Min 50 cartons.",
    size: "500ml",
    pricePerBottle: 420,
    bottlesPerCarton: 40,
    get pricePerCarton() {
      return this.pricePerBottle * this.bottlesPerCarton;
    }, // 16,800
    minCarton: 50,
    get price() {
      return this.pricePerCarton * this.minCarton;
    },
    rating: 4.9,
    reviews: 94,
    colors: ["#f97316", "#0ea5e9", "#8b5cf6"],
    category: "Custom Brand",
  },
  {
    id: "cb-1500",
    brand: "Your Brand",
    brandType: "custom",
    tag: "Custom",
    tagColor: "bg-orange-500",
    img: picuture,
    name: "Custom Brand 1500ml",
    des: "Go big with your brand. 1500ml custom bottles with full branding — ideal for retail, corporate gifting, and events.",
    size: "1500ml",
    pricePerBottle: 540,
    bottlesPerCarton: 24,
    get pricePerCarton() {
      return this.pricePerBottle * this.bottlesPerCarton;
    }, // 12,960
    minCarton: 50,
    get price() {
      return this.pricePerCarton * this.minCarton;
    },
    rating: 4.8,
    reviews: 61,
    colors: ["#f97316", "#0ea5e9", "#8b5cf6"],
    category: "Custom Brand",
  },
];
