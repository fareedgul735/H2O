import { Link } from "react-router-dom";
import { Menu, ShoppingCart, X } from "lucide-react";
import { useState } from "react";
import logo from "../../../public/WhatsApp_Image_2026-01-07_at_11.12.20_AM-removebg-preview.png";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <nav className="bg-sky shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-center items-center h-20">
            <div className="flex items-center">
              <img src={logo} alt="" className="w-15" />
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
