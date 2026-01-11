import { ChevronLeft, ChevronRight } from "lucide-react";
import carousel1 from "../../../public/WhatsApp Image 2026-01-07 at 11.05.58 PM.jpeg";
import { useEffect, useState } from "react";

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const carouselItems = [
    {
      image: carousel1,
      title: "Premium Hydration",
      subtitle: "Pure. Fresh. Sustainable.",
    },
    {
      image: carousel1,
      title: "Eco Friendly Bottles",
      subtitle: "Designed for Everyday Life",
    },
    {
      image: carousel1,
      title: "Stay Hydrated",
      subtitle: "Style that lasts longer",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselItems.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselItems.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + carouselItems.length) % carouselItems.length
    );
  };

  return (
    <section id="home" className="relative w-full h-screen overflow-hidden">
      <div className="w-full h-full">
        <div className="absolute inset-0 overflow-hidden rounded-3xl shadow-2xl">
          {carouselItems.map((item, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                index === currentSlide
                  ? "opacity-100 translate-x-0"
                  : index < currentSlide
                  ? "opacity-0 -translate-x-full"
                  : "opacity-0 translate-x-full"
              }`}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />

              <div className="absolute inset-0 bg-black/40"></div>

              {/* <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
                <h4 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
                  {item.title}
                </h4>
                <p className="text-lg md:text-xl text-white/90 max-w-md drop-shadow">
                  {item.subtitle}
                </p>
              </div> */}
            </div>
          ))}
        </div>

        <button
          onClick={prevSlide}
          className="absolute cursor-pointer left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full shadow-lg transition z-10"
        >
          <ChevronLeft className="w-6 h-6 text-cyan-600" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute cursor-pointer right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full shadow-lg transition z-10"
        >
          <ChevronRight className="w-6 h-6 text-cyan-600" />
        </button>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
          {carouselItems.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition ${
                index === currentSlide ? "bg-white w-8" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Carousel;
