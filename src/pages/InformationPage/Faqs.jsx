import { useState } from "react";

const faqs = [
  {
    q: "How do I get started?",
    a: "When you sign up, you'll start with the Free plan. It's ideal for new teams and allows unlimited team members, but only 1 active editable project at a time. For more advanced features, check out our Basic, Premium, or Enterprise plans.",
  },
  {
    q: "What is included in the Free Plan?",
    a: "The Free plan includes unlimited team members, access to core features, 1 active editable project, and up to 5 GB of storage. It's perfect for individuals and small teams just getting started.",
  },
  {
    q: "How do I cancel my membership?",
    a: "You can cancel your membership at any time from your Account Settings page. Navigate to Billing → Subscription and click 'Cancel Plan'. Your access will remain active until the end of the billing period.",
  },
  {
    q: "How do I transfer my membership to a different account?",
    a: "Membership transfers are handled by our support team. Please contact us with your current account email and the email of the account you'd like to transfer to, and we'll process it within 2 business days.",
  },
  {
    q: "What is the refund policy?",
    a: "We offer a 30-day money-back guarantee for all paid plans. If you're not satisfied, reach out to support within 30 days of your purchase and we'll issue a full refund — no questions asked.",
  },
  {
    q: "Can I upgrade or downgrade my plan?",
    a: "Yes, you can change your plan at any time. Upgrades take effect immediately with prorated billing. Downgrades are applied at the start of the next billing cycle.",
  },
];

function SearchIcon() {
  return (
    <svg
      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function FAQItem({ item, isOpen, onClick, searchTerm }) {
  const highlight = (text) => {
    if (!searchTerm.trim()) return text;
    const regex = new RegExp(
      `(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`,
      "gi",
    );
    const parts = text.split(regex);
    return parts.map((part, i) =>
      regex.test(part) ? (
        <mark key={i} className="bg-yellow-200 rounded px-0.5">
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
      className={`bg-white rounded-2xl px-6 py-5 cursor-pointer transition-all duration-300 select-none
        ${isOpen ? "shadow-lg" : "shadow-sm hover:shadow-md hover:-translate-y-0.5"}`}
    >
      <div className="flex items-center justify-between gap-3">
        <span className="text-[15px] font-medium text-gray-900 leading-snug">
          {highlight(item.q)}
        </span>

        <div
          className={`w-8 h-8 rounded-full border flex items-center justify-center flex-shrink-0 text-xl leading-none
            transition-all duration-300
            ${
              isOpen
                ? "bg-gray-900 border-gray-900 text-white rotate-45"
                : "border-gray-300 text-gray-500"
            }`}
        >
          +
        </div>
      </div>

      <div
        className={`overflow-hidden transition-all duration-400 ease-in-out
          ${isOpen ? "max-h-96 opacity-100 mt-3" : "max-h-0 opacity-0"}`}
      >
        <p className="text-sm text-gray-500 leading-relaxed">
          {highlight(item.a)}
        </p>
      </div>
    </div>
  );
}

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(0);
  const [search, setSearch] = useState("");

  const filtered = faqs.filter((item) => {
    const term = search.toLowerCase().trim();
    if (!term) return true;
    return (
      item.q.toLowerCase().includes(term) || item.a.toLowerCase().includes(term)
    );
  });

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-sky-50 flex items-start justify-center px-4 py-12">
      <div className="w-full max-w-[620px]">
        <h1 className="text-3xl font-bold text-center text-sky-400 mb-7 tracking-tight">
          Frequently Asked Questions
        </h1>

        <div className="relative mb-7">
          <SearchIcon />
          <input
            type="search"
            placeholder="Search for a question…"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setOpenIndex(null);
            }}
            className="w-full pl-10 pr-4 py-3 rounded-full border border-gray-200 bg-white
              text-sm text-gray-700 placeholder-gray-400 outline-none
              focus:border-gray-400 focus:ring-2 focus:ring-black/5 transition-all"
          />
        </div>

        <div className="flex flex-col gap-2.5">
          {filtered.length > 0 ? (
            filtered.map((item, index) => (
              <FAQItem
                key={index}
                item={item}
                isOpen={openIndex === index}
                onClick={() => handleToggle(index)}
                searchTerm={search}
              />
            ))
          ) : (
            <p className="text-center text-gray-400 text-sm mt-8">
              No questions match your search.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
