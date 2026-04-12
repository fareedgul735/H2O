import { Link } from "react-router-dom";
import {
  Edit,
  Home,
  Info,
  Layers,
  Menu,
  Phone,
  ShoppingCart,
  X,
  Droplets,
  Trash2,
  Plus,
  Minus,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  decreaseCart,
  increaseCart,
  removeItem,
  toggleCart,
} from "../../store/CartSlice";

const navLinks = [
  { name: "Home", path: "/home", icon: Home },
  { name: "Your Design", path: "/your-design", icon: Edit },
  { name: "Bulk Orders", path: "/bulk-orders", icon: Layers },
  { name: "About", path: "/about", icon: Info },
  { name: "Contact", path: "/contact", icon: Phone },
];

const Navbar = () => {
  const [deleteId, setDeleteId] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const isCartOpen = useSelector((state) => state.cart.isCartOpen);

  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.cartons,
    0,
  );
  const deliveryFee = cart.length > 0 ? 200 : 0;
  const grandTotal = subtotal + deliveryFee;

  return (
    <>
      {/* ── NAVBAR ── */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center h-16 gap-6">
            {/* Logo */}
            <Link to="/home" className="flex items-center gap-2 flex-shrink-0">
              <div className="w-8 h-8 rounded-lg bg-sky-500 flex items-center justify-center">
                <Droplets className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-gray-900 text-base tracking-tight">
                Aqua Forge
              </span>
            </Link>

            {/* Desktop Links */}
            <div className="hidden md:flex flex-1 justify-center items-center gap-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <NavLink
                    key={link.name}
                    to={link.path}
                    className={({ isActive }) =>
                      `relative flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? "bg-sky-50 text-sky-500"
                          : "text-gray-500 hover:text-gray-800 hover:bg-gray-50"
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <Icon className="w-3.5 h-3.5" />
                        {link.name}
                        {isActive && (
                          <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-sky-500" />
                        )}
                      </>
                    )}
                  </NavLink>
                );
              })}
            </div>

            {/* Right actions */}
            <div className="ml-auto flex items-center gap-2">
              {/* Cart button */}
              <button
                onClick={() => dispatch(toggleCart(true))}
                className="relative flex items-center gap-2 bg-sky-500 hover:bg-sky-600 active:scale-95 text-white pl-3 pr-4 py-2 rounded-xl text-sm font-medium transition-all duration-200"
              >
                <ShoppingCart className="w-4 h-4" />
                <span className="hidden sm:inline">Cart</span>
                {cart.length > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-white text-sky-600 text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border border-sky-100">
                    {cart.length}
                  </span>
                )}
              </button>

              {/* Hamburger */}
              <button
                onClick={() => setIsMenuOpen(true)}
                className="md:hidden w-9 h-9 flex items-center justify-center rounded-xl border border-gray-200 hover:bg-gray-50 transition"
              >
                <Menu className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* ── OVERLAYS ── */}
      {(isCartOpen || isMenuOpen) && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-[2px] z-40 transition-opacity duration-300"
          onClick={() => {
            dispatch(toggleCart(false));
            setIsMenuOpen(false);
          }}
        />
      )}

      {/* ── CART DRAWER ── */}
      <div
        className={`fixed  top-0 right-0 h-full w-full sm:w-96 bg-white z-99 flex flex-col transform transition-transform duration-300 ease-in-out ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Cart header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-sky-500" />
            <h2 className="text-base font-semibold text-gray-800">Your Cart</h2>
            {cart.length > 0 && (
              <span className="bg-sky-50 text-sky-600 text-xs font-semibold px-2 py-0.5 rounded-full">
                {cart.length} item{cart.length > 1 ? "s" : ""}
              </span>
            )}
          </div>
          <button
            onClick={() => dispatch(toggleCart(false))}
            className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center transition"
          >
            <X className="w-4 h-4 text-gray-500" />
          </button>
        </div>

        {/* Cart body */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-16">
              <div className="w-16 h-16 rounded-2xl bg-sky-50 flex items-center justify-center mb-4">
                <ShoppingCart className="w-7 h-7 text-sky-400" />
              </div>
              <h3 className="text-base font-semibold text-gray-800 mb-1">
                Your cart is empty
              </h3>
              <p className="text-gray-400 text-sm mb-6">
                Add some bottles to get started
              </p>
              <button
                onClick={() => dispatch(toggleCart(false))}
                className="flex items-center gap-1.5 bg-sky-500 hover:bg-sky-600 active:scale-95 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200"
              >
                Browse Products <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="flex gap-3 bg-gray-50 rounded-2xl p-3 border border-gray-100"
              >
                <img
                  src={item.img || "/placeholder.png"}
                  className="w-16 h-16 rounded-xl object-cover flex-shrink-0 border border-gray-100"
                  alt={item.name}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-800 truncate">
                    {item.name}
                  </p>
                  <p className="text-xs text-gray-400 mb-2">{item.size}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-bold text-sky-600">
                      Rs. {item.price * item.cartons}
                    </p>
                    <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-lg px-1 py-0.5">
                      <button
                        onClick={() =>
                          item.cartons === item.minCarton
                            ? setDeleteId(item.id)
                            : dispatch(decreaseCart(item.id))
                        }
                        className="w-6 h-6 rounded-md hover:bg-red-50 flex items-center justify-center transition"
                      >
                        {item.cartons === item.minCarton ? (
                          <Trash2 className="w-3 h-3 text-red-400" />
                        ) : (
                          <Minus className="w-3 h-3 text-gray-500" />
                        )}
                      </button>
                      <span className="text-xs font-semibold text-gray-700 w-5 text-center">
                        {item.cartons}
                      </span>
                      <button
                        onClick={() => dispatch(increaseCart(item.id))}
                        className="w-6 h-6 rounded-md hover:bg-sky-50 flex items-center justify-center transition"
                      >
                        <Plus className="w-3 h-3 text-gray-500" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Cart footer */}
        {cart.length > 0 && (
          <div className="px-5 py-4 border-t border-gray-100 space-y-3">
            <div className="bg-gray-50 rounded-2xl p-4 space-y-2">
              <div className="flex justify-between text-sm text-gray-500">
                <span>Subtotal</span>
                <span>Rs. {subtotal}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-500">
                <span>Delivery Fee</span>
                <span>Rs. {deliveryFee}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-gray-800 pt-2 border-t border-gray-200">
                <span>Grand Total</span>
                <span>Rs. {grandTotal}</span>
              </div>
            </div>
            <button
              onClick={() => dispatch(toggleCart(false))}
              className="w-full border border-gray-200 text-gray-600 hover:bg-gray-50 py-2.5 rounded-xl text-sm font-medium transition"
            >
              + Add more items
            </button>
            <Link to="/checkout" onClick={() => dispatch(toggleCart(false))}>
              <button className="w-full bg-sky-500 hover:bg-sky-600 active:scale-95 text-white py-3 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2">
                Proceed to Checkout <ChevronRight className="w-4 h-4" />
              </button>
            </Link>
          </div>
        )}
      </div>

      {/* ── MOBILE MENU DRAWER ── */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-white z-50 flex flex-col transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-sky-500 flex items-center justify-center">
              <Droplets className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-gray-900 text-sm">Aqua Forge</span>
          </div>
          <button
            onClick={() => setIsMenuOpen(false)}
            className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center transition"
          >
            <X className="w-4 h-4 text-gray-500" />
          </button>
        </div>

        {/* Drawer links */}
        <nav className="flex flex-col p-3 gap-1 flex-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-sky-50 text-sky-600"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-800"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span
                      className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        isActive ? "bg-sky-500" : "bg-gray-100"
                      }`}
                    >
                      <Icon
                        className={`w-4 h-4 ${isActive ? "text-white" : "text-gray-500"}`}
                      />
                    </span>
                    {link.name}
                    {isActive && (
                      <ChevronRight className="w-3.5 h-3.5 text-sky-400 ml-auto" />
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <p className="text-xs text-gray-400 text-center">
            © 2026 Aqua Forge · Smlo LLC
          </p>
        </div>
      </div>

      {/* ── DELETE CONFIRM MODAL ── */}
      {deleteId && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center px-4">
          <div className="bg-white w-full max-w-sm rounded-2xl border border-gray-100 p-6 relative">
            <button
              onClick={() => setDeleteId(null)}
              className="absolute top-4 right-4 w-7 h-7 rounded-lg hover:bg-gray-100 flex items-center justify-center transition"
            >
              <X className="w-4 h-4 text-gray-400" />
            </button>

            <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center mb-4">
              <Trash2 className="w-5 h-5 text-red-500" />
            </div>

            <h3 className="text-base font-semibold text-gray-800 mb-1">
              Remove item?
            </h3>
            <p className="text-sm text-gray-400 mb-6">
              This item will be removed from your cart.
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 border border-gray-200 text-gray-600 hover:bg-gray-50 py-2.5 rounded-xl text-sm font-medium transition"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  dispatch(removeItem(deleteId));
                  setDeleteId(null);
                }}
                className="flex-1 bg-red-500 hover:bg-red-600 active:scale-95 text-white py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
