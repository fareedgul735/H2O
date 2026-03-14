import { Link } from "react-router";
import Carousel from "../../components/ui/Carousel";
import { useCart } from "../../context/CardContext";
import picuture from "../../../public/WhatsApp Image 2026-01-07 at 11.05.58 PM.jpeg";

const Home = () => {
  const { addToCart } = useCart();
  const products = [
    {
      id: 1,
      img: picuture,
      name: "Bottle 500ml",
      price: 1200,
      size: "500ml",
      bottlesPerCarton: 12,
      minCarton: 5,
    },
    {
      id: 2,
      img: picuture,
      name: "Bottle 1500ml",
      price: 1500,
      size: "1500ml",
      bottlesPerCarton: 6,
      minCarton: 4,
    },
    {
      id: 3,
      img: picuture,
      name: "Bottle 6 Liter",
      price: 1800,
      size: "6L",
      bottlesPerCarton: 2,
      minCarton: 3,
    },
  ];

  return (
    <div className="bg-gradient-to-br from-sky-50 via-blue-50 to-cyan-50">
      <div className="carousel-section">
        <Carousel />
      </div>
      <div className="navbar hidden md:flex">
        <nav className="bg-white w-full shadow-lg sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-center items-center h-20">
              <div className="items-center space-x-6">
                {["Home", "Shop", "Custom Bottles", "About Us", "Contact"].map(
                  (item, index) => (
                    <Link
                      key={index}
                      href={`#${item.toLowerCase().replace(" ", "")}`}
                      className="relative px-4 py-2 font-medium text-gray-700
                transition-all duration-300
                before:absolute before:inset-0
                before:border before:border-cyan-500
                before:scale-0 before:opacity-0
                before:transition-all before:duration-300
                hover:before:scale-100 hover:before:opacity-100
                hover:text-cyan-600"
                    >
                      {item}
                    </Link>
                  ),
                )}
              </div>
            </div>
          </div>
        </nav>
      </div>

      <section id="shop" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-gradient-to-r from-sky-500 to-cyan-500 rounded-3xl p-8 mb-12">
            <h3 className="text-4xl font-bold text-white text-center">
              PREMIUM COLLECTION
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-gradient-to-br from-sky-50 to-cyan-50 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition transform hover:scale-105"
              >
                <div className="w-full h-48 bg-gradient-to-br from-sky-300 to-cyan-400 rounded-xl mb-4 flex items-center justify-center">
                  <div className="text-6xl">🍶</div>
                </div>
                <h4 className="text-xl font-bold text-gray-800 mb-2">
                  {product.name}
                </h4>
                <p className="text-cyan-600 font-semibold mb-4">
                  {product.price}
                </p>
                <button
                  onClick={() =>
                    addToCart({
                      ...product,
                      cartons: product.minCarton,
                    })
                  }
                  className="w-full bg-gradient-to-r from-sky-500 to-cyan-500 text-white py-2 rounded-full font-semibold hover:shadow-lg transition"
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section id="custom" className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-gradient-to-r from-cyan-500 to-sky-500 rounded-3xl p-8 mb-12">
            <h3 className="text-4xl font-bold text-white text-center">
              CUSTOM BOTTLES
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="w-full h-64 bg-gradient-to-br from-sky-200 to-cyan-300 rounded-xl mb-6 flex items-center justify-center">
                <div className="text-7xl">🎨</div>
              </div>
              <h4 className="text-2xl font-bold text-gray-800 mb-3">
                Design Your Own
              </h4>
              <p className="text-gray-600 mb-4">
                Create a unique water bottle with your custom design, logo, or
                text.
              </p>
              <button className="bg-gradient-to-r from-sky-500 to-cyan-500 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition">
                Start Designing
              </button>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="w-full h-64 bg-gradient-to-br from-cyan-200 to-sky-300 rounded-xl mb-6 flex items-center justify-center">
                <div className="text-7xl">📦</div>
              </div>
              <h4 className="text-2xl font-bold text-gray-800 mb-3">
                Bulk Orders
              </h4>
              <p className="text-gray-600 mb-4">
                Perfect for corporate gifts, events, and promotional
                merchandise.
              </p>
              <button className="bg-gradient-to-r from-cyan-500 to-sky-500 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition">
                Get Quote
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
