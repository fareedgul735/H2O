import { Link } from "react-router-dom";
import { Menu, ShoppingCart, X } from "lucide-react";
import { useState } from "react";
import logo from "../../../public/WhatsApp_Image_2026-01-07_at_11.12.20_AM-removebg-preview.png";
import { useCart } from "../../context/CardContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cart, removeItem, isCartOpen, setIsCartOpen } = useCart();

  return (
    <>
      <div className="relative">
        <nav className="bg-sky shadow-lg sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-center items-center h-20">
              <div className="flex items-center">
                <img src={logo} alt="logo" className="w-15" />
              </div>

              <div className="flex items-center gap-4">
                <ShoppingCart
                  className="w-6 h-6 text-gray-700 hover:text-cyan-600 cursor-pointer absolute right-4"
                  onClick={() => setIsCartOpen(true)}
                />

                <button
                  onClick={() => setIsMenuOpen(true)}
                  className="md:hidden"
                >
                  <Menu className="w-6 h-6 absolute left-4" />
                </button>
              </div>
            </div>
          </div>
        </nav>

        {isCartOpen && (
          <div
            className="fixed inset-0 bg-black/40 z-40"
            onClick={() => setIsCartOpen(false)}
          />
        )}

        <div
          className={`fixed z-9999 top-0 right-0 h-full w-96 bg-white shadow-2xl z-50 transform transition-transform duration-300 ${
            isCartOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between p-5 border-b border-gray-300">
            <h2 className="text-lg font-semibold">Your Cart</h2>

            <div
              className="flex cursor-pointer hover:text-red-500"
              onClick={() => setIsCartOpen(false)}
            >
              <X />
              <span>Close</span>
            </div>
          </div>

          <div className="p-5 space-y-5 overflow-y-auto h-[65%]">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center bg-white shadow p-4 mb-4"
              >
                <div>
                  <h3 className="font-bold">{item.name}</h3>
                  <p>Size: {item.size}</p>
                  <p>Cartons: {item.cartons}</p>
                  <p>Bottles per Carton: {item.bottlesPerCarton}</p>
                  <p>Cartons: {item.cartons}</p>
                  <p>Total Bottles: {item.cartons * item.bottlesPerCarton}</p>
                  <button onClick={() => increaseCart(item.id)}>+</button>
                  <button onClick={() => decreaseCart(item.id)}>-</button>
                </div>

                <button
                  onClick={() => removeItem(item.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="absolute bottom-0 w-full border-t border-gray-300 p-5 bg-white">
            <div className="flex justify-between mb-4 font-semibold">
              {/* <span>Subtotal</span>
              <span>${subtotal}</span> */}
            </div>

            <button className="w-full bg-black text-white py-3 rounded-xl mb-3 hover:opacity-90">
              Checkout
            </button>

            <button
              className="w-full border py-3 rounded-xl"
              onClick={() => setIsCartOpen(false)}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div
          onClick={() => setIsMenuOpen(false)}
          className="fixed inset-0 bg-black/40 z-40"
        />
      )}

      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white z-50 transform transition-transform duration-300
        ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <div className="text-lg text-cyan-600">
            <img src={logo} className="w-20" />
          </div>
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
            About Us
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
