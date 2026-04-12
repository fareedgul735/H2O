import { useState } from "react";
import { ShoppingCart, Eye, X, Star, Droplets, Plus, Minus, Palette } from "lucide-react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/CartSlice";
import { Link } from "react-router-dom";

const allProducts = [
  // ── Absolutely Not (Aqua Forge own brand) ──
  {
    id: "af-500",
    brandType: "own",
    category: "Own Brand",
    tag: "Our Brand",
    tagColor: "bg-sky-500",
    img: "https://placehold.co/300x300/e0f2fe/0ea5e9?text=Absolutely+Not",
    name: "Absolutely Not 500ml",
    des: "Aqua Forge's signature bottle. Crisp, clean, BPA-free with leak-proof lid. Perfect for daily hydration.",
    size: "500ml",
    pricePerBottle: 360,
    bottlesPerCarton: 40,
    pricePerCarton: 14400,
    minCarton: 50,
    rating: 4.9,
    reviews: 312,
    colors: ["#0ea5e9", "#1e293b", "#f1f5f9"],
  },
  {
    id: "af-1500",
    brandType: "own",
    category: "Own Brand",
    tag: "Our Brand",
    tagColor: "bg-sky-500",
    img: "https://placehold.co/300x300/bae6fd/0284c7?text=Absolutely+Not",
    name: "Absolutely Not 1500ml",
    des: "The big one. Extra capacity for gym, travel and long days. Same premium Absolutely Not quality.",
    size: "1500ml",
    pricePerBottle: 480,
    bottlesPerCarton: 24,
    pricePerCarton: 11520,
    minCarton: 50,
    rating: 4.8,
    reviews: 189,
    colors: ["#0ea5e9", "#0369a1", "#e0f2fe"],
  },

  // ── Client Brands ──
  {
    id: "client-001",
    brandType: "client",
    category: "Client Brand",
    tag: "Client Brand",
    tagColor: "bg-violet-500",
    img: "https://placehold.co/300x300/ede9fe/8b5cf6?text=HydraX",
    name: "HydraX 500ml",
    des: "Custom branded bottle for HydraX — a Karachi-based fitness brand. Bold identity, clean label.",
    size: "500ml",
    pricePerBottle: 420,
    bottlesPerCarton: 40,
    pricePerCarton: 16800,
    minCarton: 50,
    rating: 4.8,
    reviews: 42,
    colors: ["#8b5cf6", "#6d28d9", "#f1f5f9"],
  },
  {
    id: "client-002",
    brandType: "client",
    category: "Client Brand",
    tag: "Client Brand",
    tagColor: "bg-emerald-500",
    img: "https://placehold.co/300x300/d1fae5/10b981?text=PureFlow",
    name: "PureFlow 1500ml",
    des: "Premium hydration brand for corporate offices. 1500ml with a minimal, professional finish.",
    size: "1500ml",
    pricePerBottle: 540,
    bottlesPerCarton: 24,
    pricePerCarton: 12960,
    minCarton: 50,
    rating: 4.7,
    reviews: 29,
    colors: ["#10b981", "#065f46", "#f0fdf4"],
  },
  {
    id: "client-003",
    brandType: "client",
    category: "Client Brand",
    tag: "Client Brand",
    tagColor: "bg-rose-500",
    img: "https://placehold.co/300x300/ffe4e6/be123c?text=AquaLux",
    name: "AquaLux 500ml",
    des: "Luxury matte finish bottle for AquaLux — crafted for premium gifting and high-end events.",
    size: "500ml",
    pricePerBottle: 460,
    bottlesPerCarton: 40,
    pricePerCarton: 18400,
    minCarton: 50,
    rating: 4.9,
    reviews: 18,
    colors: ["#be123c", "#1e293b", "#fdf2f8"],
  },
  {
    id: "client-004",
    brandType: "client",
    category: "Client Brand",
    tag: "Client Brand",
    tagColor: "bg-amber-500",
    img: "https://placehold.co/300x300/fef3c7/d97706?text=ZenDrop",
    name: "ZenDrop 1500ml",
    des: "Earthy wellness bottle for ZenDrop — mindful hydration brand with an organic identity.",
    size: "1500ml",
    pricePerBottle: 510,
    bottlesPerCarton: 24,
    pricePerCarton: 12240,
    minCarton: 50,
    rating: 4.6,
    reviews: 33,
    colors: ["#d97706", "#92400e", "#fffbeb"],
  },
];

const categories = ["All", "Own Brand", "Client Brand"];

const SmallCard = ({ product, onView, onAdd }) => {
  const [cartons, setCartons] = useState(product.minCarton);
  const total = product.pricePerCarton * cartons;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:border-sky-200 hover:shadow-sm transition-all duration-200 flex flex-col group">
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <img
          src={product.img}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {product.tag && (
          <span className={`absolute top-2 left-2 ${product.tagColor} text-white text-[10px] font-bold px-2 py-0.5 rounded-full`}>
            {product.tag}
          </span>
        )}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <button
            onClick={() => onView(product)}
            className="w-8 h-8 bg-white rounded-xl flex items-center justify-center shadow-sm hover:bg-sky-50 transition active:scale-95"
          >
            <Eye className="w-3.5 h-3.5 text-gray-700" />
          </button>
        </div>
      </div>

      <div className="p-3 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-1 mb-1">
          <h3 className="text-xs font-semibold text-gray-800 leading-tight">{product.name}</h3>
          <span className="text-[10px] text-gray-400 bg-gray-50 border border-gray-100 rounded-lg px-1.5 py-0.5 flex-shrink-0">
            {product.size}
          </span>
        </div>

        <div className="flex items-center gap-1 mb-2">
          <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
          <span className="text-[11px] font-semibold text-gray-600">{product.rating}</span>
          <span className="text-[11px] text-gray-400">({product.reviews})</span>
          <div className="flex gap-0.5 ml-auto">
            {product.colors?.slice(0, 3).map((c) => (
              <span key={c} className="w-2 h-2 rounded-full ring-1 ring-gray-200" style={{ backgroundColor: c }} />
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between bg-gray-50 rounded-xl px-2.5 py-2 mb-2">
          <button
            onClick={() => setCartons((p) => Math.max(product.minCarton, p - 1))}
            className="w-5 h-5 rounded-lg bg-white border border-gray-200 flex items-center justify-center hover:border-sky-300 transition active:scale-95"
          >
            <Minus className="w-2.5 h-2.5 text-gray-500" />
          </button>
          <div className="text-center">
            <p className="text-xs font-bold text-gray-800">
              {cartons} <span className="font-normal text-gray-400">cartons</span>
            </p>
            <p className="text-[10px] text-sky-600 font-semibold">Rs. {total.toLocaleString()}</p>
          </div>
          <button
            onClick={() => setCartons((p) => p + 1)}
            className="w-5 h-5 rounded-lg bg-white border border-gray-200 flex items-center justify-center hover:border-sky-300 transition active:scale-95"
          >
            <Plus className="w-2.5 h-2.5 text-gray-500" />
          </button>
        </div>

        <p className="text-[10px] text-gray-400 mb-2">
          Rs. {product.pricePerCarton.toLocaleString()}/carton · Min {product.minCarton}
        </p>

        <button
          onClick={() => onAdd({ ...product, cartons, price: product.pricePerCarton })}
          className="w-full flex items-center justify-center gap-1.5 bg-sky-500 hover:bg-sky-600 active:scale-95 text-white py-2 rounded-xl text-[11px] font-semibold transition-all duration-200 mt-auto"
        >
          <ShoppingCart className="w-3 h-3" />
          Add · Rs. {total.toLocaleString()}
        </button>
      </div>
    </div>
  );
};

const QuickView = ({ product, onClose, onAdd }) => {
  const [cartons, setCartons] = useState(product.minCarton);
  const total = product.pricePerCarton * cartons;

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-50 flex items-center justify-center px-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-lg shadow-xl overflow-hidden flex flex-col sm:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sm:w-2/5 bg-gray-50 aspect-square sm:aspect-auto flex-shrink-0">
          <img src={product.img} alt={product.name} className="w-full h-full object-cover" />
        </div>
        <div className="flex-1 p-5 flex flex-col">
          <div className="flex items-start justify-between mb-2">
            <div>
              <p className="text-[10px] text-gray-400 uppercase tracking-widest font-medium mb-0.5">
                {product.category}
              </p>
              <h2 className="text-base font-bold text-gray-900">{product.name}</h2>
            </div>
            <button
              onClick={onClose}
              className="w-7 h-7 rounded-lg hover:bg-gray-100 flex items-center justify-center transition"
            >
              <X className="w-4 h-4 text-gray-500" />
            </button>
          </div>

          <div className="flex items-center gap-1 mb-3">
            <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
            <span className="text-xs font-semibold text-gray-700">{product.rating}</span>
            <span className="text-xs text-gray-400">({product.reviews})</span>
          </div>

          <p className="text-xs text-gray-500 leading-relaxed mb-4 flex-1">{product.des}</p>

          <div className="bg-gray-50 rounded-xl p-3 mb-4 space-y-2">
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <p className="text-gray-400">Size</p>
                <p className="font-semibold text-gray-800">{product.size}</p>
              </div>
              <div>
                <p className="text-gray-400">Per carton</p>
                <p className="font-semibold text-gray-800">{product.bottlesPerCarton} bottles</p>
              </div>
              <div>
                <p className="text-gray-400">Price/carton</p>
                <p className="font-semibold text-gray-800">Rs. {product.pricePerCarton.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-gray-400">Min. order</p>
                <p className="font-semibold text-gray-800">{product.minCarton} cartons</p>
              </div>
            </div>

            <div className="h-px bg-gray-200" />

            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">Cartons</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCartons((p) => Math.max(product.minCarton, p - 1))}
                  className="w-6 h-6 rounded-lg bg-white border border-gray-200 flex items-center justify-center hover:border-sky-300 transition"
                >
                  <Minus className="w-3 h-3 text-gray-500" />
                </button>
                <span className="text-sm font-bold w-6 text-center">{cartons}</span>
                <button
                  onClick={() => setCartons((p) => p + 1)}
                  className="w-6 h-6 rounded-lg bg-white border border-gray-200 flex items-center justify-center hover:border-sky-300 transition"
                >
                  <Plus className="w-3 h-3 text-gray-500" />
                </button>
              </div>
            </div>

            <div className="flex justify-between">
              <span className="text-xs text-gray-400">Total</span>
              <span className="text-sm font-bold text-sky-600">Rs. {total.toLocaleString()}</span>
            </div>
          </div>

          <button
            onClick={() => { onAdd({ ...product, cartons, price: product.pricePerCarton }); onClose(); }}
            className="w-full flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-600 active:scale-95 text-white py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
          >
            <ShoppingCart className="w-4 h-4" />
            Add {cartons} Cartons · Rs. {total.toLocaleString()}
          </button>
        </div>
      </div>
    </div>
  );
};

const SectionLabel = ({ color, title, sub }) => (
  <div className="flex items-center gap-2 mb-5">
    <div className={`w-1 h-5 ${color} rounded-full`} />
    <h2 className="text-sm font-bold text-gray-800">{title}</h2>
    {sub && (
      <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{sub}</span>
    )}
  </div>
);

const Products = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const dispatch = useDispatch();

  const handleAdd = (p) => dispatch(addToCart({ ...p, cartons: p.cartons }));

  const ownList = allProducts.filter((p) => p.brandType === "own");
  const clientList = allProducts.filter((p) => p.brandType === "client");

  const showOwn = activeCategory === "All" || activeCategory === "Own Brand";
  const showClient = activeCategory === "All" || activeCategory === "Client Brand";

  return (
    <div className="bg-gray-50 min-h-screen">

      <div className="bg-white border-b border-gray-100 py-10 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-2 mb-2">
            <Droplets className="w-4 h-4 text-sky-500" />
            <span className="text-xs font-semibold text-sky-500 uppercase tracking-widest">Products</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Our Bottles</h1>
          <p className="text-gray-400 text-sm mb-6">
            Absolutely Not (our brand) · Custom client brands · Min 50 cartons
          </p>
          <div className="flex gap-2 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-sky-500 text-white"
                    : "bg-gray-50 border border-gray-200 text-gray-500 hover:border-sky-300 hover:text-sky-500"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8 space-y-10">

        {showOwn && (
          <div>
            <SectionLabel color="bg-sky-500" title="Absolutely Not" sub="by Aqua Forge" />
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {ownList.map((p) => (
                <SmallCard key={p.id} product={p} onView={setSelectedProduct} onAdd={handleAdd} />
              ))}
            </div>
          </div>
        )}

        {showClient && (
          <div>
            <SectionLabel color="bg-orange-400" title="Custom Brand Orders" sub="Client examples" />
            <div className="bg-orange-50 border border-orange-100 rounded-2xl p-4 mb-5 flex items-start gap-3">
              <Palette className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-gray-600 leading-relaxed">
                Want your brand here? Order 50+ cartons with your logo and label.{" "}
                <Link to="/contact" className="text-sky-500 font-semibold hover:underline">
                  Contact us →
                </Link>
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {clientList.map((p) => (
                <SmallCard key={p.id} product={p} onView={setSelectedProduct} onAdd={handleAdd} />
              ))}
            </div>
          </div>
        )}
      </div>

      {selectedProduct && (
        <QuickView
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAdd={handleAdd}
        />
      )}
    </div>
  );
};

export default Products;