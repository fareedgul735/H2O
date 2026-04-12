import Carousel from "../../components/ui/Carousel";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/CartSlice.js";
import { useState, useEffect } from "react";
import { getGuestId } from "../../utils/helper.js";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { products } from "../../utils/Constant.js";
import { db } from "../../store/firebase.js";
import { Link } from "react-router-dom";
import {
  ShoppingCart,
  Eye,
  X,
  ChevronRight,
  Droplets,
  Package,
  Palette,
  Clock,
  CheckCircle,
  XCircle,
  Star,
  Zap,
  Shield,
  Truck,
  ChevronDown,
} from "lucide-react";

const StatusToast = ({ orders, onClose }) => {
  const pending = orders.filter((o) => o.status === "pending");
  const rejected = orders.filter((o) => o.status === "rejected");
  const delivered = orders.filter((o) => o.status === "delivered");
  const [open, setOpen] = useState(false);

  if (orders.length === 0) return null;

  const dominant =
    rejected.length > 0 ? "error" : pending.length > 0 ? "warning" : "success";

  const config = {
    error: {
      icon: XCircle,
      bg: "bg-red-50 border-red-200",
      icon_color: "text-red-500",
      label: "Order Rejected",
      count: rejected.length,
    },
    warning: {
      icon: Clock,
      bg: "bg-amber-50 border-amber-200",
      icon_color: "text-amber-500",
      label: "Pending Orders",
      count: pending.length,
    },
    success: {
      icon: CheckCircle,
      bg: "bg-emerald-50 border-emerald-200",
      icon_color: "text-emerald-500",
      label: "Delivered",
      count: delivered.length,
    },
  };

  const { icon: Icon, bg, icon_color, label, count } = config[dominant];

  return (
    <div className="fixed bottom-5 left-4 z-50 w-72">
      <div className={`${bg} border rounded-2xl shadow-lg overflow-hidden`}>
        <div
          className="flex items-center gap-3 px-4 py-3 cursor-pointer"
          onClick={() => setOpen((p) => !p)}
        >
          <div
            className={`w-8 h-8 rounded-xl flex items-center justify-center bg-white`}
          >
            <Icon className={`w-4 h-4 ${icon_color}`} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-gray-800">{label}</p>
            <p className="text-[11px] text-gray-400">
              {count} order{count > 1 ? "s" : ""}
            </p>
          </div>
          <ChevronDown
            className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          />
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="w-5 h-5 rounded-full hover:bg-black/10 flex items-center justify-center ml-1"
          >
            <X className="w-3 h-3 text-gray-400" />
          </button>
        </div>

        {open && (
          <div className="border-t border-black/5 max-h-52 overflow-y-auto">
            {orders.map((order) => {
              const s = order.status;
              const sConfig = {
                pending: {
                  color: "text-amber-600 bg-amber-50",
                  label: "Pending",
                },
                delivered: {
                  color: "text-emerald-600 bg-emerald-50",
                  label: "Delivered",
                },
                rejected: {
                  color: "text-red-600 bg-red-50",
                  label: "Rejected",
                },
              }[s] || { color: "text-gray-500 bg-gray-50", label: s };

              return (
                <div
                  key={order.id}
                  className="flex items-center justify-between px-4 py-2.5 bg-white/60 border-b border-black/5 last:border-0"
                >
                  <div>
                    <p className="text-xs font-medium text-gray-700">
                      {order.orderNo || "Order"}
                    </p>
                    <p className="text-[11px] text-gray-400">
                      {order.orderDate}
                    </p>
                  </div>
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${sConfig.color}`}
                  >
                    {sConfig.label}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

const perks = [
  { icon: Shield, text: "BPA-Free & Food Grade" },
  { icon: Zap, text: "Same-Day Karachi Delivery" },
  { icon: Star, text: "500+ Happy Brands" },
  { icon: Truck, text: "Nationwide Shipping" },
];

const Home = () => {
  const [orders, setOrders] = useState([]);
  const [showToast, setShowToast] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [added, setAdded] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    const guestId = getGuestId();
    const q = query(collection(db, "orders"), where("guestId", "==", guestId));
    const unsub = onSnapshot(q, (snap) => {
      const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setOrders(data);
      setShowToast(true);
    });
    return () => unsub();
  }, []);

  const handleAdd = (product) => {
    dispatch(addToCart({ ...product, cartons: product.minCarton }));
    setAdded((p) => ({ ...p, [product.id]: true }));
    setTimeout(() => setAdded((p) => ({ ...p, [product.id]: false })), 1500);
  };

  return (
    <div className="bg-white">
      {/* Carousel */}
      <Carousel />

      {/* Perks bar */}
      <div className="bg-sky-500 py-3 px-4">
        <div className="max-w-6xl mx-auto flex flex-wrap justify-center gap-x-8 gap-y-2">
          {perks.map(({ icon: Icon, text }) => (
            <div
              key={text}
              className="flex items-center gap-1.5 text-white text-xs font-medium"
            >
              <Icon className="w-3.5 h-3.5 text-sky-200" />
              {text}
            </div>
          ))}
        </div>
      </div>

      {/* Products section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <div className="flex items-end justify-between mb-8">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Droplets className="w-4 h-4 text-sky-500" />
                <span className="text-xs font-semibold text-sky-500 uppercase tracking-widest">
                  Our Collection
                </span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                Premium Bottles
              </h2>
            </div>
            <Link
              to="/products"
              className="flex items-center gap-1 text-sm text-sky-500 hover:text-sky-600 font-medium transition-colors"
            >
              View all <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:border-sky-200 hover:shadow-md transition-all duration-200 flex flex-col group"
              >
                {/* Image */}
                <div className="relative aspect-square overflow-hidden bg-gray-50">
                  <img
                    src={product.img}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                    <button
                      onClick={() => setSelectedProduct(product)}
                      className="w-9 h-9 bg-white rounded-xl flex items-center justify-center shadow-sm hover:bg-sky-50 transition active:scale-95"
                    >
                      <Eye className="w-4 h-4 text-gray-700" />
                    </button>
                    <button
                      onClick={() => handleAdd(product)}
                      className="w-9 h-9 bg-sky-500 rounded-xl flex items-center justify-center shadow-sm hover:bg-sky-600 transition active:scale-95"
                    >
                      <ShoppingCart className="w-4 h-4 text-white" />
                    </button>
                  </div>
                </div>

                {/* Info */}
                <div className="p-3 flex flex-col flex-1">
                  <p className="text-xs text-gray-400 mb-0.5">
                    {product.size || "500ml"}
                  </p>
                  <h4 className="text-sm font-semibold text-gray-800 mb-1 leading-tight">
                    {product.name}
                  </h4>
                  <div className="flex items-center gap-1 mb-3">
                    <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                    <span className="text-xs text-gray-500">4.8</span>
                  </div>
                  <div className="flex items-center justify-between mt-auto">
                    <p className="text-sm font-bold text-gray-900">
                      Rs. {product.price?.toLocaleString()}
                    </p>
                    <button
                      onClick={() => handleAdd(product)}
                      className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 active:scale-95 ${
                        added[product.id]
                          ? "bg-emerald-500 text-white"
                          : "bg-sky-500 hover:bg-sky-600 text-white"
                      }`}
                    >
                      {added[product.id] ? (
                        "Added!"
                      ) : (
                        <>
                          <ShoppingCart className="w-3 h-3" /> Add
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom + Bulk CTA */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <span className="text-xs font-semibold text-sky-500 uppercase tracking-widest">
              Services
            </span>
            <h2 className="text-2xl font-bold text-gray-900 mt-1">
              Build Your Brand With Us
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {/* Design your own */}
            <div className="relative bg-sky-50 border border-sky-100 rounded-2xl p-7 overflow-hidden group hover:border-sky-300 transition-all duration-200">
              <div className="absolute right-4 top-4 w-20 h-20 bg-sky-100 rounded-2xl flex items-center justify-center opacity-60 group-hover:opacity-100 transition">
                <Palette className="w-9 h-9 text-sky-400" />
              </div>
              <div className="relative z-10">
                <div className="w-10 h-10 bg-sky-500 rounded-xl flex items-center justify-center mb-4">
                  <Palette className="w-5 h-5 text-white" />
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">
                  Design Your Own
                </h4>
                <p className="text-sm text-gray-500 mb-5 leading-relaxed">
                  Create a custom bottle with your logo, colors, and style.
                  Perfect for personal brands, events, and gifting.
                </p>
                <Link to="/your-design">
                  <button className="flex items-center gap-2 bg-sky-500 hover:bg-sky-600 active:scale-95 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200">
                    Start Designing <ChevronRight className="w-4 h-4" />
                  </button>
                </Link>
              </div>
            </div>

            {/* Bulk orders */}
            <div className="relative bg-gray-900 rounded-2xl p-7 overflow-hidden group hover:bg-gray-800 transition-all duration-200">
              <div className="absolute right-4 top-4 w-20 h-20 bg-white/5 rounded-2xl flex items-center justify-center opacity-60 group-hover:opacity-100 transition">
                <Package className="w-9 h-9 text-white/40" />
              </div>
              <div className="relative z-10">
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center mb-4">
                  <Package className="w-5 h-5 text-white" />
                </div>
                <h4 className="text-lg font-bold text-white mb-2">
                  Bulk Orders
                </h4>
                <p className="text-sm text-gray-400 mb-5 leading-relaxed">
                  Order 20+ cartons and get free units. Best for corporate
                  events, retail stores, and brand launches.
                </p>
                <Link to="/bulk-orders">
                  <button className="flex items-center gap-2 bg-sky-500 hover:bg-sky-400 active:scale-95 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200">
                    Get Quote <ChevronRight className="w-4 h-4" />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Aqua Forge */}
      <section className="py-14 px-4 bg-gray-50 border-t border-gray-100">
        <div className="max-w-6xl mx-auto text-center">
          <span className="text-xs font-semibold text-sky-500 uppercase tracking-widest">
            Why Choose Us
          </span>
          <h2 className="text-2xl font-bold text-gray-900 mt-1 mb-8">
            The Aqua Forge Difference
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                icon: Shield,
                title: "BPA-Free",
                desc: "Food-grade certified materials only",
              },
              {
                icon: Palette,
                title: "Full Custom",
                desc: "Your logo, colors & shape",
              },
              {
                icon: Truck,
                title: "Fast Delivery",
                desc: "Same-day in Karachi",
              },
              {
                icon: Star,
                title: "500+ Brands",
                desc: "Trusted across Pakistan",
              },
            ].map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="bg-white border border-gray-100 rounded-2xl p-5 hover:border-sky-200 transition-all duration-200"
              >
                <div className="w-10 h-10 bg-sky-50 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Icon className="w-5 h-5 text-sky-500" />
                </div>
                <p className="text-sm font-semibold text-gray-800 mb-1">
                  {title}
                </p>
                <p className="text-xs text-gray-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Quick View Modal */}
      {selectedProduct && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-50 flex items-center justify-center px-4"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="bg-white rounded-2xl w-full max-w-lg shadow-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex gap-0">
              <div className="w-2/5 bg-gray-50">
                <img
                  src={selectedProduct.img}
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 p-6 flex flex-col">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="text-xs text-gray-400 mb-0.5">
                      {selectedProduct.size || "500ml"}
                    </p>
                    <h2 className="text-lg font-bold text-gray-900">
                      {selectedProduct.name}
                    </h2>
                  </div>
                  <button
                    onClick={() => setSelectedProduct(null)}
                    className="w-7 h-7 rounded-lg hover:bg-gray-100 flex items-center justify-center transition"
                  >
                    <X className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
                <p className="text-base font-bold text-sky-600 mb-3">
                  Rs. {selectedProduct.price?.toLocaleString()}
                </p>
                <p className="text-xs text-gray-500 leading-relaxed mb-5 flex-1">
                  {selectedProduct.des ||
                    "Premium quality, BPA-free water bottle. Perfect for daily hydration at work, gym, or on the go."}
                </p>
                <button
                  onClick={() => {
                    handleAdd(selectedProduct);
                    setSelectedProduct(null);
                  }}
                  className="w-full flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-600 active:scale-95 text-white py-3 rounded-xl text-sm font-semibold transition-all duration-200"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showToast && orders.length > 0 && (
        <StatusToast orders={orders} onClose={() => setShowToast(false)} />
      )}
    </div>
  );
};

export default Home;
