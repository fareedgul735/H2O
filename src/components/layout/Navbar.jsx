import { Link } from "react-router-dom";
import { Menu, ShoppingCart, X } from "lucide-react";
import { useState } from "react";
import logo from "../../../public/WhatsApp_Image_2026-01-07_at_11.12.20_AM-removebg-preview.png";
import { useDispatch, useSelector } from "react-redux";
import {
  decreaseCart,
  increaseCart,
  removeItem,
  toggleCart,
} from "../../store/CartSlice";

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

  const openDeleteModal = (id) => setDeleteId(id);

  return (
    <>
      <nav className="bg-sky shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center h-20">
            <img src={logo} alt="logo" className="w-16" />

            <div className="ml-auto flex items-center gap-4">
              <div
                onClick={() => dispatch(toggleCart(true))}
                className="relative cursor-pointer"
              >
                <div className="bg-sky-400 hover:bg-sky-500 p-2 rounded-full">
                  <ShoppingCart className="w-6 h-6 text-white" />
                </div>

                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-white text-sky-600 text-xs font-bold px-2 py-[2px] rounded-full shadow">
                    {cart.length}
                  </span>
                )}
              </div>

              <button onClick={() => setIsMenuOpen(true)} className="md:hidden">
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {isCartOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => dispatch(toggleCart(false))}
        />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-96 bg-white shadow-2xl z-50 transform transition-transform duration-300 z-999999 ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-5 border-b border-gray-300">
          <h2 className="text-lg font-semibold">Shopping Cart</h2>

          <button
            className="flex items-center gap-1 text-gray-600 hover:text-red-500"
            onClick={() => dispatch(toggleCart(false))}
          >
            <X size={18} />
            Close
          </button>
        </div>

        <div className="p-5 space-y-5 overflow-y-auto">
          {cart.length === 0 && (
            <div className="flex flex-col items-center text-center py-20">
              <div className="text-5xl mb-4">🛒</div>

              <h3 className="text-lg font-semibold mb-2">Your cart is empty</h3>

              <p className="text-gray-500 text-sm mb-6">
                Looks like you haven't added anything yet
              </p>

              <button
                onClick={() => dispatch(toggleCart(true))}
                className="bg-orange-500 text-white px-6 py-3 rounded-xl font-semibold"
              >
                Browse Products
              </button>
            </div>
          )}

          {cart.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center border-b border-gray-300 py-4"
            >
              <div className="flex gap-3 items-center">
                <img
                  src={item.img || "/placeholder.png"}
                  className="w-16 h-16 rounded-lg object-cover"
                />

                <div>
                  <h4 className="font-semibold">{item.name}</h4>
                  <p className="text-gray-500 text-sm">{item.size}</p>
                  <p className="font-semibold">Rs. {item.price}</p>
                </div>
              </div>

              <div className="flex items-center border rounded-full px-3 py-1 gap-3">
                {item.cartons === item.minCarton ? (
                  <button
                    onClick={() => openDeleteModal(item.id)}
                    className="text-red-500"
                  >
                    🗑
                  </button>
                ) : (
                  <button onClick={() => dispatch(decreaseCart(item.id))}>
                    -
                  </button>
                )}

                <span>{item.cartons}</span>

                <button onClick={() => dispatch(increaseCart(item.id))}>
                  +
                </button>
              </div>
            </div>
          ))}

          {cart.length > 0 && (
            <>
              <button
                onClick={() => dispatch(toggleCart(false))}
                className="w-full border py-3 rounded-xl"
              >
                + Add more items
              </button>

              <div className="pt-4 space-y-2">
                <div className="flex justify-between">
                  <span>Total</span>
                  <span>Rs. {subtotal}</span>
                </div>

                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span>Rs. {deliveryFee}</span>
                </div>

                <div className="flex justify-between font-bold text-lg">
                  <span>Grand Total</span>
                  <span>Rs. {grandTotal}</span>
                </div>
                <Link to={"/checkout"}>
                  <button className="w-full mt-4 bg-orange-500 text-white py-3 rounded-xl font-semibold">
                    Checkout
                  </button>
                </Link>
              </div>
            </>
          )}
        </div>
      </div>

      {deleteId && (
        <div className="fixed inset-0 z-[99999999] flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white w-[420px] rounded-2xl shadow-2xl p-6 relative">
            <button
              onClick={() => setDeleteId(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="bg-sky-100 text-sky-600 p-2 rounded-lg">🗑</div>

              <h3 className="text-lg font-semibold text-gray-800">
                Confirm Deletion
              </h3>
            </div>

            <p className="text-gray-500 text-sm mb-6">
              Are you sure you want to remove this product from the cart?
            </p>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => {
                  dispatch(removeItem(deleteId));
                  setDeleteId(null);
                }}
                className="bg-sky-500 hover:bg-sky-600 text-white px-5 py-2 rounded-lg"
              >
                Remove
              </button>

              <button
                onClick={() => setDeleteId(null)}
                className="bg-gray-500 hover:bg-gray-600 text-white px-5 py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {isMenuOpen && (
        <div
          onClick={() => setIsMenuOpen(false)}
          className="fixed inset-0 bg-black/40 z-40"
        />
      )}

      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white z-50 transform transition-transform duration-300 ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <img src={logo} className="w-20" />

          <button onClick={() => setIsMenuOpen(false)}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex flex-col p-4 gap-4 text-gray-700">
          <Link to="/" onClick={() => setIsMenuOpen(false)}>
            Home
          </Link>
          <Link to="/shop" onClick={() => setIsMenuOpen(false)}>
            Shop
          </Link>
          <Link to="/custom" onClick={() => setIsMenuOpen(false)}>
            Custom Bottles
          </Link>
          <Link to="/about" onClick={() => setIsMenuOpen(false)}>
            About
          </Link>
          <Link to="/contact" onClick={() => setIsMenuOpen(false)}>
            Contact
          </Link>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
