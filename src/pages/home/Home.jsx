import { Link } from "react-router-dom";
import Carousel from "../../components/ui/Carousel";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/CartSlice.js";
import picuture from "../../../public/WhatsApp Image 2026-01-07 at 11.05.58 PM.jpeg";

const Home = () => {
  const dispatch = useDispatch();

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
      <Carousel />

      {/* NAVBAR */}
      <div className="hidden md:flex">
        <nav className="bg-white w-full shadow-lg sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-center items-center h-20">
              <div className="space-x-6">
                {["Home", "Shop", "Custom Bottles", "About Us", "Contact"].map(
                  (item, index) => (
                    <Link
                      key={index}
                      to={`#${item.toLowerCase().replace(" ", "")}`}
                      className="px-4 py-2 font-medium text-gray-700 hover:text-cyan-600 transition"
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

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
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
                  Rs. {product.price}
                </p>

                <button
                  onClick={() =>
                    dispatch(
                      addToCart({
                        ...product,
                        cartons: product.minCarton,
                      }),
                    )
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
              <h4 className="text-2xl font-bold mb-3">Design Your Own</h4>
              <p className="text-gray-600 mb-4">
                Create your custom bottle design.
              </p>

              <Link to="/your-design">
                <button className="bg-sky-500 text-white px-6 py-3 rounded-full">
                  Start Designing
                </button>
              </Link>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h4 className="text-2xl font-bold mb-3">Bulk Orders</h4>
              <p className="text-gray-600 mb-4">Best for corporate & events.</p>

              <Link to="/bulk-orders">
                <button className="bg-cyan-500 text-white px-6 py-3 rounded-full">
                  Get Quote
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
