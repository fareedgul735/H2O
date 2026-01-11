import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div>
            <h5 className="font-bold text-lg mb-3 text-sky-400">Brand</h5>
            <p className="text-gray-400 text-sm mb-4">
              Premium reusable water bottles designed for hydration,
              sustainability, and everyday lifestyle.
            </p>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-400 hover:text-sky-400">
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/our-story"
                  className="text-gray-400 hover:text-sky-400"
                >
                  Our Story
                </Link>
              </li>
              <li>
                <Link
                  to="/sustainability"
                  className="text-gray-400 hover:text-sky-400"
                >
                  Sustainability
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-lg mb-3 text-sky-400">Shop</h5>
            <p className="text-gray-400 text-sm mb-4">
              Explore durable, stylish, and eco-friendly water bottles for daily
              hydration.
            </p>
            <ul className="space-y-2">
              <li>
                <Link to="/shop" className="text-gray-400 hover:text-sky-400">
                  Shop All
                </Link>
              </li>
              <li>
                <Link to="/custom" className="text-gray-400 hover:text-sky-400">
                  Custom Bottles
                </Link>
              </li>
              <li>
                <Link
                  to="/bulk-orders"
                  className="text-gray-400 hover:text-sky-400"
                >
                  Bulk Orders
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-lg mb-3 text-sky-400">Support</h5>
            <p className="text-gray-400 text-sm mb-4">
              Need help choosing the right bottle or order support? We’re here
              for you.
            </p>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/contact"
                  className="text-gray-400 hover:text-sky-400"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/faqs" className="text-gray-400 hover:text-sky-400">
                  FAQs
                </Link>
              </li>
              <li>
                <Link
                  to="/shipping-returns"
                  className="text-gray-400 hover:text-sky-400"
                >
                  Shipping & Returns
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-lg mb-3 text-sky-400">Social</h5>
            <p className="text-gray-400 text-sm mb-4">
              Join our hydration journey & stay updated with new bottle designs.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/share/1EsZHzf5rD/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-sky-500 rounded-full flex items-center justify-center hover:bg-sky-600 transition"
              >
                <FaFacebookF />
              </a>

              <a
                href="https://www.instagram.com/h2odropwaters?igsh=MWFuaDZrNnFicXF0bg=="
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-sky-500 rounded-full flex items-center justify-center hover:bg-sky-600 transition"
              >
                <FaInstagram />
              </a>

              <a
                href="https://www.tiktok.com/@ho.drop?_r=1&_t=ZS-92yUr2rrOrs"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-sky-500 rounded-full flex items-center justify-center hover:bg-sky-600 transition"
              >
                <FaTiktok />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-sky-800 mt-10 pt-6 text-center text-gray-400">
          <p>
            © 2026 H₂O Drop. Crafted for purity, performance & planet-friendly
            hydration.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
