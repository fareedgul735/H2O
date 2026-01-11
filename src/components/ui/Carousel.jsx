import { ChevronLeft, ChevronRight } from "lucide-react";
import carousel1 from "../../../public/WhatsApp Image 2026-01-07 at 11.05.58 PM.jpeg";
import { useEffect, useState } from "react";

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const carouselItems = [
    {
      title: "Premium Glass Bottles",
      subtitle: "Eco-Friendly & Stylish",
      emoji: carousel1,
      color: "from-sky-400 to-cyan-500",
    },
    {
      title: "Insulated Steel Bottles",
      subtitle: "Keeps Drinks Cold 24hrs",
      emoji: carousel1,
      color: "from-blue-400 to-sky-500",
    },
    {
      title: "Sports Collection",
      subtitle: "Perfect for Active Life",
      emoji: carousel1,
      color: "from-cyan-400 to-blue-500",
    },
    {
      title: "Custom Design",
      subtitle: "Your Style, Your Bottle",
      emoji: carousel1,
      color: "from-sky-500 to-cyan-600",
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
    <section id="home" className="relative overflow-hidden py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h2 className="text-5xl md:text-7xl font-bold mb-4">
              <span className="bg-gradient-to-r from-sky-600 to-cyan-600 bg-clip-text text-transparent">
                H2O Drop's
              </span>
            </h2>
            <h3 className="text-3xl md:text-5xl font-bold text-gray-800 mb-6">
              PREMIUM HYDRATION
            </h3>
            <p className="text-gray-600 text-lg mb-8">
              Experience the perfect blend of style and sustainability with our
              eco-friendly water bottles.
            </p>
            <button className="bg-gradient-to-r from-sky-500 to-cyan-500 text-white px-8 py-4 rounded-full font-semibold hover:shadow-xl transform hover:scale-105 transition">
              Shop Now
            </button>
          </div>

          <div className="md:w-1/2 flex justify-center">
            <div className="relative w-96 h-96">
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
                    <div
                      className={`w-full h-full bg-gradient-to-br ${item.color} flex flex-col items-center justify-center p-8`}
                    >
                      <div className="text-9xl mb-6 w-full">
                        <img src={item.emoji} className="w-full" />
                      </div>
                      <h4 className="text-3xl font-bold text-white text-center mb-2">
                        {item.title}
                      </h4>
                      <p className="text-xl text-white/90 text-center">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full shadow-lg transition z-10"
              >
                <ChevronLeft className="w-6 h-6 text-cyan-600" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full shadow-lg transition z-10"
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default Carousel;
