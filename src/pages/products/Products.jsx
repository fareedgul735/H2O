import { useState } from "react";
import { ShoppingCart, SlidersHorizontal, X, Star, Droplets } from "lucide-react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/CartSlice";

const categories = ["All", "Classic", "Sport", "Premium", "Eco", "Custom"];

const products = [
  {
    id: 1,
    name: "AquaSlim Pro",
    category: "Classic",
    price: 1200,
    minCarton: 1,
    size: "500ml",
    rating: 4.8,
    reviews: 124,
    tag: "Best Seller",
    tagColor: "bg-sky-500",
    colors: ["#0ea5e9", "#1e293b", "#f1f5f9"],
    img: "https://placehold.co/300x300/e0f2fe/0ea5e9?text=AquaSlim",
    desc: "Sleek everyday bottle with leak-proof lid and ergonomic grip.",
  },
  {
    id: 2,
    name: "HydroMax Sport",
    category: "Sport",
    price: 1800,
    minCarton: 1,
    size: "750ml",
    rating: 4.9,
    reviews: 89,
    tag: "New",
    tagColor: "bg-emerald-500",
    colors: ["#10b981", "#0ea5e9", "#f59e0b"],
    img: "https://placehold.co/300x300/d1fae5/10b981?text=HydroMax",
    desc: "Built for athletes. Double-wall insulated, keeps cold 24hrs.",
  },
  {
    id: 3,
    name: "PureElite Glass",
    category: "Premium",
    price: 2800,
    minCarton: 1,
    size: "600ml",
    rating: 5.0,
    reviews: 52,
    tag: "Premium",
    tagColor: "bg-violet-500",
    colors: ["#8b5cf6", "#ec4899", "#1e293b"],
    img: "https://placehold.co/300x300/ede9fe/8b5cf6?text=PureElite",
    desc: "Borosilicate glass with bamboo lid. Pure taste, zero plastic.",
  },
  {
    id: 4,
    name: "EcoWave Bottle",
    category: "Eco",
    price: 950,
    minCarton: 1,
    size: "500ml",
    rating: 4.7,
    reviews: 210,
    tag: "Eco Pick",
    tagColor: "bg-green-500",
    colors: ["#22c55e", "#84cc16", "#f1f5f9"],
    img: "https://placehold.co/300x300/dcfce7/22c55e?text=EcoWave",
    desc: "100% recycled materials. Lightweight, planet-friendly design.",
  },
  {
    id: 5,
    name: "FrostVault XL",
    category: "Sport",
    price: 2200,
    minCarton: 1,
    size: "1000ml",
    rating: 4.6,
    reviews: 67,
    tag: null,
    tagColor: "",
    colors: ["#0284c7", "#475569", "#f8fafc"],
    img: "https://placehold.co/300x300/e0f2fe/0284c7?text=FrostVault",
    desc: "Extra-large insulated bottle for long hikes and gym sessions.",
  },
  {
    id: 6,
    name: "BrandForge Custom",
    category: "Custom",
    price: 1500,
    minCarton: 50,
    size: "600ml",
    rating: 4.9,
    reviews: 38,
    tag: "Custom",
    tagColor: "bg-orange-500",
    colors: ["#f97316", "#0ea5e9", "#8b5cf6"],
    img: "https://placehold.co/300x300/ffedd5/f97316?text=BrandForge",
    desc: "Your logo, your colors — minimum 50 units. Perfect for brands.",
  },
  {
    id: 7,
    name: "NanoSip Compact",
    category: "Classic",
    price: 750,
    minCarton: 1,
    size: "350ml",
    rating: 4.5,
    reviews: 155,
    tag: null,
    tagColor: "",
    colors: ["#f472b6", "#fb923c", "#a3e635"],
    img: "https://placehold.co/300x300/fce7f3/f472b6?text=NanoSip",
    desc: "Compact and portable. Fits any bag, perfect for kids and school.",
  },
  {
    id: 8,
    name: "LuxDrop Matte",
    category: "Premium",
    price: 3200,
    minCarton: 1,
    size: "500ml",
    rating: 4.8,
    reviews: 29,
    tag: "Limited",
    tagColor: "bg-rose-500",
    colors: ["#1e293b", "#be123c", "#d97706"],
    img: "https://placehold.co/300x300/ffe4e6/be123c?text=LuxDrop",
    desc: "Matte finish stainless steel with magnetic lid. Pure luxury.",
  },
];

const sortOptions = ["Featured", "Price: Low to High", "Price: High to Low", "Top Rated"];

const Products = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("Featured");
  const [showFilter, setShowFilter] = useState(false);
  const [added, setAdded] = useState({});
  const dispatch = useDispatch();

  const handleAdd = (product) => {
    dispatch(addToCart({ ...product, cartons: product.minCarton }));
    setAdded((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => setAdded((prev) => ({ ...prev, [product.id]: false })), 1500);
  };

  let filtered = activeCategory === "All"
    ? products
    : products.filter((p) => p.category === activeCategory);

  if (sortBy === "Price: Low to High") filtered = [...filtered].sort((a, b) => a.price - b.price);
  else if (sortBy === "Price: High to Low") filtered = [...filtered].sort((a, b) => b.price - a.price);
  else if (sortBy === "Top Rated") filtered = [...filtered].sort((a, b) => b.rating - a.rating);

  return (
    <div className="bg-gray-50 min-h-screen">

      {/* Hero */}
      <div className="bg-white border-b border-gray-100 py-10 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-2 mb-2">
            <Droplets className="w-5 h-5 text-sky-500" />
            <span className="text-xs font-semibold text-sky-500 uppercase tracking-widest">
              Our Collection
            </span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Find Your Perfect Bottle
              </h1>
              <p className="text-gray-400 text-sm mt-1">
                {products.length} products · Customizable · BPA-free
              </p>
            </div>
            {/* Sort + Filter */}
            <div className="flex items-center gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-200 bg-white text-gray-600 text-sm rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-300"
              >
                {sortOptions.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
              <button
                onClick={() => setShowFilter(true)}
                className="flex items-center gap-1.5 border border-gray-200 bg-white text-gray-600 text-sm rounded-xl px-3 py-2 hover:border-sky-300 transition"
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filter
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">

        {/* Category pills */}
        <div className="flex gap-2 flex-wrap mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-sky-500 text-white"
                  : "bg-white border border-gray-200 text-gray-500 hover:border-sky-300 hover:text-sky-500"
              }`}
            >
              {cat}
            </button>
          ))}
          <span className="ml-auto text-xs text-gray-400 self-center">
            {filtered.length} result{filtered.length !== 1 ? "s" : ""}
          </span>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:border-sky-200 hover:shadow-sm transition-all duration-200 flex flex-col group"
            >
              {/* Image */}
              <div className="relative">
                <img
                  src={product.img}
                  alt={product.name}
                  className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {product.tag && (
                  <span
                    className={`absolute top-2 left-2 ${product.tagColor} text-white text-[10px] font-semibold px-2 py-0.5 rounded-full`}
                  >
                    {product.tag}
                  </span>
                )}
              </div>

              {/* Info */}
              <div className="p-3 flex flex-col flex-1">
                <div className="flex items-start justify-between gap-1 mb-1">
                  <div>
                    <p className="text-xs text-gray-400">{product.category}</p>
                    <h3 className="text-sm font-semibold text-gray-800 leading-tight">
                      {product.name}
                    </h3>
                  </div>
                  <span className="text-xs text-gray-400 bg-gray-50 border border-gray-100 rounded-lg px-2 py-0.5 flex-shrink-0">
                    {product.size}
                  </span>
                </div>

                <p className="text-xs text-gray-400 leading-relaxed mb-3 line-clamp-2">
                  {product.desc}
                </p>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-3">
                  <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                  <span className="text-xs font-semibold text-gray-700">{product.rating}</span>
                  <span className="text-xs text-gray-400">({product.reviews})</span>

                  {/* Color dots */}
                  <div className="flex gap-1 ml-auto">
                    {product.colors.map((c) => (
                      <span
                        key={c}
                        className="w-2.5 h-2.5 rounded-full border border-white ring-1 ring-gray-200"
                        style={{ backgroundColor: c }}
                      />
                    ))}
                  </div>
                </div>

                {/* Price + CTA */}
                <div className="flex items-center justify-between mt-auto">
                  <div>
                    <p className="text-base font-bold text-gray-900">
                      Rs. {product.price.toLocaleString()}
                    </p>
                    {product.minCarton > 1 && (
                      <p className="text-[10px] text-gray-400">
                        Min. {product.minCarton} units
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => handleAdd(product)}
                    className={`flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-200 active:scale-95 ${
                      added[product.id]
                        ? "bg-emerald-500 text-white"
                        : "bg-sky-500 hover:bg-sky-600 text-white"
                    }`}
                  >
                    {added[product.id] ? (
                      "Added!"
                    ) : (
                      <>
                        <ShoppingCart className="w-3.5 h-3.5" />
                        Add
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <div className="w-14 h-14 rounded-2xl bg-sky-50 flex items-center justify-center mx-auto mb-4">
              <Droplets className="w-6 h-6 text-sky-400" />
            </div>
            <h3 className="text-base font-semibold text-gray-700 mb-1">No products found</h3>
            <p className="text-sm text-gray-400">Try a different category</p>
          </div>
        )}
      </div>

      {/* Filter Drawer */}
      {showFilter && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-[2px] z-40"
          onClick={() => setShowFilter(false)}
        />
      )}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white z-50 flex flex-col transform transition-transform duration-300 ease-in-out ${
          showFilter ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-sky-500" />
            <h2 className="text-sm font-semibold text-gray-800">Filter by Category</h2>
          </div>
          <button
            onClick={() => setShowFilter(false)}
            className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center transition"
          >
            <X className="w-4 h-4 text-gray-500" />
          </button>
        </div>
        <div className="p-4 flex flex-col gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => { setActiveCategory(cat); setShowFilter(false); }}
              className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-sky-50 text-sky-600 border border-sky-200"
                  : "text-gray-600 hover:bg-gray-50 border border-transparent"
              }`}
            >
              {cat}
              <span className="text-xs text-gray-400">
                {cat === "All"
                  ? products.length
                  : products.filter((p) => p.category === cat).length}{" "}
                items
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;