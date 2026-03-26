import { Link } from "react-router-dom";
import Carousel from "../../components/ui/Carousel";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/CartSlice.js";
import picuture from "../../../public/WhatsApp Image 2026-01-07 at 11.05.58 PM.jpeg";
import { FaShoppingCart, FaEye } from "react-icons/fa";
import { useState } from "react";
const Home = () => {
  const dispatch = useDispatch();
  const [hoverBtn, setHoverBtn] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const products = [
    {
      id: 1,
      img: picuture,
      des: "",
      name: "Bottle 500ml",
      price: 1200,
      size: "500ml",
      bottlesPerCarton: 12,
      minCarton: 5,
    },
    {
      id: 2,
      img: picuture,
      des: "",
      name: "Bottle 1500ml",
      price: 1500,
      size: "1500ml",
      bottlesPerCarton: 6,
      minCarton: 4,
    },
    // {
    //   id: 3,
    //   img: picuture,
    //   des: "",
    //   name: "Bottle 6 Liter",
    //   price: 1800,
    //   size: "6L",
    //   bottlesPerCarton: 2,
    //   minCarton: 3,
    // },
  ];

  return (
    <div className="bg-gradient-to-br from-sky-50 via-blue-50 to-cyan-50">
      <Carousel />
      <section id="shop" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-gradient-to-r from-sky-500 to-cyan-500 rounded-3xl p-8 mb-12">
            <h3 className="text-4xl font-bold text-white text-center">
              PREMIUM COLLECTION
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-gradient-to-br from-sky-50 to-cyan-50 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition transform hover:scale-105"
              >
                <div className="relative w-full h-88 rounded-xl mb-4 overflow-hidden group">
                  <img
                    src={product.img}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-4">
                    <button
                      onClick={() => setSelectedProduct(product)}
                      onMouseEnter={() => setHoverBtn(`view-${product.id}`)}
                      onMouseLeave={() => setHoverBtn(null)}
                      className="bg-white cursor-pointer text-black px-4 py-2 rounded-full flex items-center justify-center min-w-[120px]"
                    >
                      {hoverBtn === `view-${product.id}` ? <FaEye /> : "View"}
                    </button>
                    <button
                      onMouseEnter={() => setHoverBtn(`cart-${product.id}`)}
                      onMouseLeave={() => setHoverBtn(null)}
                      onClick={() =>
                        dispatch(
                          addToCart({
                            ...product,
                            cartons: product.minCarton,
                          }),
                        )
                      }
                      className="bg-cyan-500 cursor-pointer text-white px-4 py-2 rounded-full flex items-center justify-center min-w-[120px]"
                    >
                      {hoverBtn === `cart-${product.id}` ? (
                        <FaShoppingCart />
                      ) : (
                        "Add to Cart"
                      )}
                    </button>
                  </div>
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
                  className="w-full cursor-pointer bg-gradient-to-r from-sky-500 to-cyan-500 text-white p-8 rounded-full font-semibold relative flex items-center justify-center overflow-hidden group"
                >
                  <span className="absolute text-[22px] transition-all duration-300 group-hover:opacity-0">
                    Add to Cart
                  </span>

                  <FaShoppingCart size={22} className="absolute opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {selectedProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-[90%] max-w-3xl relative flex gap-6">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-3 right-3 text-gray-600 text-xl"
            >
              ✕
            </button>

            <div className="w-1/2">
              <img
                src={selectedProduct.img}
                alt=""
                className="w-full h-full object-cover rounded-xl"
              />
            </div>

            <div className="w-1/2 flex flex-col justify-center">
              <h2 className="text-2xl font-bold mb-2">
                {selectedProduct.name}
              </h2>

              <p className="text-cyan-600 font-semibold mb-4">
                Rs. {selectedProduct.price}
              </p>

              <p className="text-gray-600">
                {selectedProduct.des || "No description available."}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* <section id="custom" className="py-16">
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
      </section> */}
    </div>
  );
};

export default Home;
