import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa";
import { Droplets, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-950 text-white pt-14 pb-6">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-10 border-b border-white/10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-sky-500 flex items-center justify-center">
                <Droplets className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                Aqua Forge
              </span>
            </div>

            <p className="text-gray-400 text-sm leading-relaxed mb-5">
              Custom water bottle manufacturing & brand launches — from design
              and production to your own online store.
            </p>

            <div className="flex gap-2">
              <a
                href="https://www.facebook.com/share/1EsZHzf5rD/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/5 hover:bg-sky-500 flex items-center justify-center transition-colors duration-200"
              >
                <FaFacebookF className="text-sm" />
              </a>

              <a
                href="https://www.instagram.com/h2odropwaters?igsh=MWFuaDZrNnFicXF0bg=="
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/5 hover:bg-sky-500 flex items-center justify-center transition-colors duration-200"
              >
                <FaInstagram className="text-sm" />
              </a>

              <a
                href="https://www.tiktok.com/@ho.drop?_r=1&_t=ZS-92yUr2rrOrs"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white/5 hover:bg-sky-500 flex items-center justify-center transition-colors duration-200"
              >
                <FaTiktok className="text-sm" />
              </a>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h5 className="text-sm font-semibold text-white uppercase tracking-widest mb-4">
              Explore
            </h5>
            <ul className="space-y-3">
              {[
                { label: "Home", to: "/home" },
                { label: "About Us", to: "/about" },
                { label: "Products", to: "/products" },
              ].map(({ label, to }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-gray-400 hover:text-sky-400 text-sm transition-colors duration-150 flex items-center gap-1.5 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-sky-500 opacity-0 group-hover:opacity-100 transition-opacity duration-150" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h5 className="text-sm font-semibold text-white uppercase tracking-widest mb-4">
              Support
            </h5>
            <ul className="space-y-3">
              {[
                { label: "Contact Us", to: "/contact" },
                { label: "FAQs", to: "/faqs" },
              ].map(({ label, to }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-gray-400 hover:text-sky-400 text-sm transition-colors duration-150 flex items-center gap-1.5 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-sky-500 opacity-0 group-hover:opacity-100 transition-opacity duration-150" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h5 className="text-sm font-semibold text-white uppercase tracking-widest mb-4">
              Contact
            </h5>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-sky-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-400 text-sm">+92 300 0000000</span>
              </li>

              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-sky-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-400 text-sm">
                  hello@aquaforge.pk
                </span>
              </li>

              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-sky-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-400 text-sm">Karachi, Pakistan</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-500 text-xs">
            © 2026 Aqua Forge — A{" "}
            <span className="text-sky-400 font-medium">Smlo LLC</span> Company.
            All rights reserved.
          </p>

          <p className="text-gray-600 text-xs">
            Crafted for purity, performance & planet-friendly hydration.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
