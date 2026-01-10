import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const messages = [
  "🚚 Free Shipping all over Karachi ",
  "🔥 Winter Sale – Up to 40% Off",
  "⭐ New Arrivals Just Dropped",
];

export default function AnnouncementBar() {
  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(true);

  const changeText = (direction = "next") => {
    setAnimate(false);
    setTimeout(() => {
      setIndex((prev) => {
        if (direction === "next") {
          return (prev + 1) % messages.length;
        }
        return (prev - 1 + messages.length) % messages.length;
      });
      setAnimate(true);
    }, 300);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      changeText("next");
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-sky-400 text-white flex items-center justify-between px-4 py-2 text-sm overflow-hidden">
      <button onClick={() => changeText("prev")}>
        <ChevronLeft className="w-4 h-4 opacity-70 hover:opacity-100 transition" />
      </button>

      <div className="relative flex-1 h-5 overflow-hidden text-center">
        <span
          className={`absolute inset-0 transition-all duration-300 ease-in-out
            ${
              animate ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
            }`}
        >
          {messages[index]}
        </span>
      </div>

      <button onClick={() => changeText("next")}>
        <ChevronRight className="w-4 h-4 opacity-70 hover:opacity-100 transition" />
      </button>
    </div>
  );
}
