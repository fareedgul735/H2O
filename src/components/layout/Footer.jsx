import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">

          {/* Brand */}
          <div>
            <h5 className="font-bold text-lg mb-4 text-cyan-400">Brand</h5>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-400 hover:text-cyan-400">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/our-story" className="text-gray-400 hover:text-cyan-400">
                  Our Story
                </Link>
              </li>
              <li>
                <Link to="/sustainability" className="text-gray-400 hover:text-cyan-400">
                  Sustainability
                </Link>
              </li>
            </ul>
          </div>

          {/* Shop */}
          <div>
            <h5 className="font-bold text-lg mb-4 text-cyan-400">Shop</h5>
            <ul className="space-y-2">
              <li>
                <Link to="/shop" className="text-gray-400 hover:text-cyan-400">
                  Shop All
                </Link>
              </li>
              <li>
                <Link to="/custom" className="text-gray-400 hover:text-cyan-400">
                  Custom Bottles
                </Link>
              </li>
              <li>
                <Link to="/bulk-orders" className="text-gray-400 hover:text-cyan-400">
                  Bulk Orders
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h5 className="font-bold text-lg mb-4 text-cyan-400">Support</h5>
            <ul className="space-y-2">
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-cyan-400">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/faqs" className="text-gray-400 hover:text-cyan-400">
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="/shipping-returns" className="text-gray-400 hover:text-cyan-400">
                  Shipping & Returns
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h5 className="font-bold text-lg mb-4 text-cyan-400">Legal</h5>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy-policy" className="text-gray-400 hover:text-cyan-400">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-cyan-400">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/refund-policy" className="text-gray-400 hover:text-cyan-400">
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Social (ONLY a tags) */}
          <div>
            <h5 className="font-bold text-lg mb-4 text-cyan-400">Social</h5>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-cyan-500 rounded-full flex items-center justify-center hover:bg-cyan-600 transition text-white"
              >
                <FaFacebookF />
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-cyan-500 rounded-full flex items-center justify-center hover:bg-cyan-600 transition text-white"
              >
                <FaInstagram />
              </a>

              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-cyan-500 rounded-full flex items-center justify-center hover:bg-cyan-600 transition text-white"
              >
                <FaTiktok />
              </a>
            </div>
          </div>

        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>© 2026 H₂O Drop. All rights reserved. Stay Hydrated, Stay Healthy!</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
