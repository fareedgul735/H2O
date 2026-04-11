import { useState } from "react";
import {
  MessageCircle,
  ChevronDown,
  Search,
  Droplets,
  ChevronRight,
} from "lucide-react";

const faqs = [
  {
    category: "Getting Started",
    q: "What exactly does Aqua Forge do?",
    a: "Aqua Forge is a custom water bottle manufacturer and brand builder. We help businesses, entrepreneurs, and individuals create their own branded water bottles — from logo printing and custom colors to full-scale bulk production. We also build complete e-commerce stores with admin panels for those who want to sell their own bottle brand online.",
  },
  {
    category: "Getting Started",
    q: "How do I start my own water bottle brand with Aqua Forge?",
    a: "It's simple. Contact us via WhatsApp or our contact form, share your brand idea, and our team will guide you through the design process, material selection, and production timeline.",
  },
  {
    category: "Customization",
    q: "What customization options are available for bottles?",
    a: "We offer full customization including logo, colors, bottle shape, cap style, materials, and sizes.",
  },
  {
    category: "Customization",
    q: "What is the minimum order quantity?",
    a: "Minimum order starts at 50 units. Bulk pricing available for larger quantities.",
  },
  {
    category: "Online Store",
    q: "Can you build an online store?",
    a: "Yes — we build full e-commerce stores with admin panels so you can manage everything easily.",
  },
  {
    category: "Shipping & Delivery",
    q: "Do you deliver across Pakistan?",
    a: "Yes, we deliver nationwide with fast shipping options.",
  },
  {
    category: "Quality & Materials",
    q: "Are bottles BPA-free?",
    a: "Yes, all bottles are BPA-free and food-grade certified.",
  },
];

const categories = [
  "All",
  "Getting Started",
  "Customization",
  "Online Store",
  "Shipping & Delivery",
  "Quality & Materials",
];

const INITIAL_SHOW = 4;

function FAQItem({ item, isOpen, onClick, searchTerm }) {
  const highlight = (text) => {
    if (!searchTerm.trim()) return text;

    const regex = new RegExp(
      `(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`,
      "gi",
    );

    return text.split(regex).map((part, i) =>
      regex.test(part) ? (
        <mark key={i} className="bg-yellow-200 px-1 rounded">
          {part}
        </mark>
      ) : (
        part
      ),
    );
  };

  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-2xl border cursor-pointer transition-all ${
        isOpen ? "border-sky-200 shadow-sm" : "border-gray-100"
      }`}
    >
      <div className="flex justify-between px-5 py-4">
        <div className="flex gap-3">
          <div
            className={`w-6 h-6 rounded-lg flex items-center justify-center ${
              isOpen ? "bg-sky-500" : "bg-gray-100"
            }`}
          >
            <MessageCircle
              className={`w-3 h-3 ${isOpen ? "text-white" : "text-gray-400"}`}
            />
          </div>

          <span className="text-sm font-medium text-gray-800">
            {highlight(item.q)}
          </span>
        </div>

        <ChevronDown
          className={`w-4 h-4 transition ${
            isOpen ? "rotate-180 text-sky-500" : "text-gray-400"
          }`}
        />
      </div>

      {isOpen && (
        <div className="px-5 pb-5 ml-9">
          <p className="text-sm text-gray-500 mb-3">{highlight(item.a)}</p>

          <a
            href="/contact"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1 text-xs text-sky-500 hover:text-sky-600"
          >
            Still have questions?
            <ChevronRight className="w-3 h-3" />
          </a>
        </div>
      )}
    </div>
  );
}

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(null);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [showAll, setShowAll] = useState(false);

  const filtered = faqs.filter((item) => {
    const term = search.toLowerCase();

    return (
      (!term ||
        item.q.toLowerCase().includes(term) ||
        item.a.toLowerCase().includes(term)) &&
      (activeCategory === "All" || item.category === activeCategory)
    );
  });

  const displayed =
    showAll || search ? filtered : filtered.slice(0, INITIAL_SHOW);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-white py-12 text-center">
        <Droplets className="mx-auto mb-3 text-sky-500" />
        <h1 className="text-2xl font-bold mb-2">Frequently Asked Questions</h1>

        <input
          type="search"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mt-4 px-4 py-2 border rounded-lg w-full max-w-md"
        />
      </div>

      <div className="max-w-2xl mx-auto p-4">
        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1 rounded-full text-xs ${
                activeCategory === cat
                  ? "bg-sky-500 text-white"
                  : "bg-white border"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FAQ */}
        <div className="flex flex-col gap-3">
          {displayed.map((item, i) => (
            <FAQItem
              key={i}
              item={item}
              isOpen={openIndex === i}
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              searchTerm={search}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10 text-center bg-sky-500 p-6 rounded-xl">
          <h3 className="text-white font-semibold mb-2">Still need help?</h3>

          <div className="flex justify-center gap-3">
            <a
              href="/contact"
              className="bg-white text-sky-600 px-4 py-2 rounded"
            >
              Contact
            </a>

            <a
              href="https://wa.me/923183516990"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-sky-400 text-white px-4 py-2 rounded"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
