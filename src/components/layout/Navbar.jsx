import { Drawer } from "antd";
import { Link } from "react-router-dom";
import { Menu, ShoppingCart } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-20">
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
            <ShoppingCart className="w-6 h-6 text-gray-700 hover:text-cyan-600 cursor-pointer" />

            <button onClick={() => setIsMenuOpen(true)} className="md:hidden">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      <Drawer
        placement="left"
        open={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        closable={false}
        width={260}
      >
        <nav className="flex flex-col gap-4 text-lg">
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
      </Drawer>
    </nav>
  );
};

export default Navbar;
