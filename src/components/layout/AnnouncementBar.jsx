import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

const messages = [
  {
    text: "Free Shipping all over Karachi",
    icon: "🚚",
    action: null,
  },
  {
    text: "Chat with us on WhatsApp — +92 318 3516990",
    icon: "💬",
    action: () => window.open("https://wa.me/923183516990", "_blank"),
  },
  {
    text: "Customize your bottle today — your brand, your design",
    icon: "🔥",
    action: null,
  },
  {
    text: "Eco-friendly & BPA-free reusable bottles available",
    icon: "💧",
    action: null,
  },
];

export default function AnnouncementBar() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [animate, setAnimate] = useState(true);
  const [direction, setDirection] = useState("next");

  const changeTo = (dir) => {
    setDirection(dir);
    setAnimate(false);
    setTimeout(() => {
      setIndex((prev) =>
        dir === "next"
          ? (prev + 1) % messages.length
          : (prev - 1 + messages.length) % messages.length,
      );
      setAnimate(true);
    }, 250);
  };

  useEffect(() => {
    const interval = setInterval(() => changeTo("next"), 4500);
    return () => clearInterval(interval);
  }, []);

  if (!visible) return null;

  const current = messages[index];

  return (
    <div className="w-full bg-sky-500 text-white text-xs">
      <div className="max-w-7xl mx-auto px-3 py-2 flex items-center gap-2">
        {/* Prev */}
        <button
          onClick={() => changeTo("prev")}
          className="w-5 h-5 flex items-center justify-center rounded-md hover:bg-white/15 transition flex-shrink-0"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
        </button>

        {/* Message */}
        <div className="flex-1 overflow-hidden flex items-center justify-center">
          <button
            onClick={() => current.action?.()}
            className={`flex items-center gap-1.5 transition-all duration-250 ease-in-out ${
              animate
                ? "opacity-100 translate-y-0"
                : direction === "next"
                  ? "opacity-0 translate-y-1"
                  : "opacity-0 -translate-y-1"
            } ${current.action ? "hover:underline underline-offset-2 cursor-pointer" : "cursor-default"}`}
          >
            <span className="text-sm leading-none">{current.icon}</span>
            <span className="font-medium tracking-wide">{current.text}</span>
            {current.action && (
              <span className="bg-white/20 hover:bg-white/30 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full ml-1 transition">
                Tap here
              </span>
            )}
          </button>
        </div>
        <div className="hidden sm:flex items-center gap-1 flex-shrink-0">
          {messages.map((_, i) => (
            <button
              key={i}
              onClick={() => changeTo(i > index ? "next" : "prev")}
              className={`rounded-full transition-all duration-300 ${
                i === index ? "bg-white w-3 h-1.5" : "bg-white/40 w-1.5 h-1.5"
              }`}
            />
          ))}
        </div>
        <button
          onClick={() => changeTo("next")}
          className="w-5 h-5 flex items-center justify-center rounded-md hover:bg-white/15 transition flex-shrink-0"
        >
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={() => setVisible(false)}
          className="w-5 h-5 flex items-center justify-center rounded-md hover:bg-white/15 transition flex-shrink-0 ml-1"
        >
          <X className="w-3 h-3 opacity-70 hover:opacity-100" />
        </button>
      </div>
    </div>
  );
}
