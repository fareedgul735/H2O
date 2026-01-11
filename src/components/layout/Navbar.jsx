import { Link } from "react-router-dom";
import { Menu, ShoppingCart, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-center items-center h-20">
            <div className="flex items-center">
              <div className="w-14 h-14 bg-gradient-to-br from-sky-400 to-cyan-500 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">H2O</span>
              </div>
              <div className="ml-3">
                <h1 className="text-xl font-bold bg-gradient-to-r from-sky-600 to-cyan-600 bg-clip-text text-transparent">
                  H2O Drop
                </h1>
                <p className="text-xs text-gray-600">Premium Water Bottles</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <ShoppingCart className="w-6 h-6 text-gray-700 hover:text-cyan-600 cursor-pointer absolute right-4" />

              <button onClick={() => setIsMenuOpen(true)} className="md:hidden">
                <Menu className="w-6 h-6 absolute left-4" />
              </button>
            </div>
          </div>
        </div>
      </nav>

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
          <h2 className="font-bold text-lg text-cyan-600">Menu</h2>
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
          <Link to="/tandoor" onClick={() => setIsMenuOpen(false)}>
            Tandoor
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
