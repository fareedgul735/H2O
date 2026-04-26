import { ChevronLeft, ChevronRight } from "lucide-react";
import carousel1 from "../../../public/ChatGPT Image Apr 26, 2026, 11_29_39 AM.png";
import carousel2 from "../../../public/ChatGPT Image Apr 26, 2026, 11_49_33 AM.png";
import carousel3 from "../../../public/ChatGPT Image Apr 26, 2026, 12_00_58 PM.png";
import { useEffect, useState, useRef, useCallback } from "react";

const SLIDES = [
  {
    image: carousel1,
    title: "Premium Hydration",
    subtitle: "Pure. Fresh. Sustainable.",
    badge: "New Arrival",
  },
  {
    image: carousel2,
    title: "Eco Friendly Bottles",
    subtitle: "Designed for Everyday Life",
    badge: "Best Seller",
  },
  {
    image: carousel3,
    title: "Stay Hydrated",
    subtitle: "Style that lasts longer",
    badge: "Limited Edition",
  },
];

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState("next");
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  const goTo = useCallback(
    (index, dir = "next") => {
      if (isAnimating) return;
      setDirection(dir);
      setIsAnimating(true);
      setCurrentSlide(index);
      setTimeout(() => setIsAnimating(false), 600);
    },
    [isAnimating],
  );

  const nextSlide = useCallback(() => {
    goTo((currentSlide + 1) % SLIDES.length, "next");
  }, [currentSlide, goTo]);

  const prevSlide = useCallback(() => {
    goTo((currentSlide - 1 + SLIDES.length) % SLIDES.length, "prev");
  }, [currentSlide, goTo]);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextSlide, 4500);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  // Keyboard support
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "ArrowLeft") prevSlide();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [nextSlide, prevSlide]);

  // Touch / swipe support
  const handleTouchStart = (e) => {
    touchStartX.current = e.changedTouches[0].screenX;
  };
  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].screenX;
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      diff > 0 ? nextSlide() : prevSlide();
    }
  };

  return (
    <section
      id="home"
      className="relative w-full overflow-hidden bg-black select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-label="Product carousel"
    >
      {/* Fixed height across breakpoints */}
      <div className="relative w-full h-[320px] sm:h-[420px] md:h-[520px] lg:h-[620px]">
        {/* Slides */}
        {SLIDES.map((item, index) => {
          const isActive = index === currentSlide;
          const isPrev =
            direction === "next"
              ? index === (currentSlide - 1 + SLIDES.length) % SLIDES.length
              : index === (currentSlide + 1) % SLIDES.length;

          return (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-700 ease-[cubic-bezier(0.77,0,0.175,1)]
                ${
                  isActive
                    ? "opacity-100 translate-x-0 scale-100 z-10"
                    : isPrev
                      ? `opacity-0 z-5 ${direction === "next" ? "-translate-x-8" : "translate-x-8"} scale-[0.98]`
                      : `opacity-0 z-0 ${direction === "next" ? "translate-x-8" : "-translate-x-8"} scale-[0.98]`
                }`}
              aria-hidden={!isActive}
            >
              {/* Image */}
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-contain"
                draggable={false}
              />

              {/* Gradient overlay — bottom-focused for text legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              {/* Text content — animated in when active */}
              <div
                className={`absolute bottom-0 left-0 right-0 p-5 sm:p-8 md:p-12 transition-all duration-700 delay-100
                  ${isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
              >
                {/* Badge */}
                <span className="inline-block mb-2 px-3 py-1 text-[10px] sm:text-xs font-semibold tracking-widest uppercase rounded-full bg-cyan-500/90 text-white backdrop-blur-sm">
                  {item.badge}
                </span>

                {/* Title */}
                <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white leading-tight drop-shadow-md">
                  {item.title}
                </h2>

                {/* Subtitle */}
                <p className="mt-1 text-sm sm:text-base md:text-lg text-white/80 font-light tracking-wide">
                  {item.subtitle}
                </p>
              </div>
            </div>
          );
        })}

        {/* Prev Button */}
        <button
          onClick={prevSlide}
          aria-label="Previous slide"
          className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-20
            w-9 h-9 sm:w-11 sm:h-11 rounded-full
            bg-white/20 hover:bg-white/90 backdrop-blur-sm
            border border-white/30 hover:border-transparent
            flex items-center justify-center
            text-white hover:text-cyan-600
            shadow-lg transition-all duration-200 active:scale-90"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2.5} />
        </button>

        {/* Next Button */}
        <button
          onClick={nextSlide}
          aria-label="Next slide"
          className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-20
            w-9 h-9 sm:w-11 sm:h-11 rounded-full
            bg-white/20 hover:bg-white/90 backdrop-blur-sm
            border border-white/30 hover:border-transparent
            flex items-center justify-center
            text-white hover:text-cyan-600
            shadow-lg transition-all duration-200 active:scale-90"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2.5} />
        </button>

        {/* Progress bar (top) */}
        <div className="absolute top-0 left-0 right-0 z-20 flex gap-1 px-3 pt-2 sm:px-5 sm:pt-3">
          {SLIDES.map((_, index) => (
            <div
              key={index}
              className="flex-1 h-[2px] rounded-full bg-white/30 overflow-hidden"
            >
              <div
                className={`h-full rounded-full bg-white transition-all duration-300
                  ${index === currentSlide ? "w-full" : index < currentSlide ? "w-full opacity-60" : "w-0"}`}
                style={
                  index === currentSlide && !isPaused
                    ? { animation: "progress 4.5s linear forwards" }
                    : {}
                }
              />
            </div>
          ))}
        </div>

        {/* Dot indicators */}
        <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 z-20 flex items-center gap-1.5">
          {SLIDES.map((_, index) => (
            <button
              key={index}
              onClick={() =>
                goTo(index, index > currentSlide ? "next" : "prev")
              }
              aria-label={`Go to slide ${index + 1}`}
              className={`rounded-full transition-all duration-300 cursor-pointer
                ${
                  index === currentSlide
                    ? "w-6 h-2 bg-white"
                    : "w-2 h-2 bg-white/40 hover:bg-white/70"
                }`}
            />
          ))}
        </div>

        {/* Slide counter */}
        <div className="absolute top-3 right-4 sm:top-5 sm:right-5 z-20 text-white/70 text-xs sm:text-sm font-mono tracking-widest">
          {String(currentSlide + 1).padStart(2, "0")} /{" "}
          {String(SLIDES.length).padStart(2, "0")}
        </div>
      </div>

      {/* Progress animation keyframe */}
      <style>{`
        @keyframes progress {
          from { width: 0% }
          to { width: 100% }
        }
      `}</style>
    </section>
  );
};

export default Carousel;
