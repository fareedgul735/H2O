import { Link } from "react-router-dom";
import { Menu, ShoppingCart, X } from "lucide-react";
import { useState } from "react";
import logo from "../../../public/WhatsApp_Image_2026-01-07_at_11.12.20_AM-removebg-preview.png";
import { useCart } from "../../context/CardContext";

const Navbar = () => {
  const [deleteId, setDeleteId] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {
    cart,
    removeItem,
    decreaseCart,
    increaseCart,
    isCartOpen,
    setIsCartOpen,
  } = useCart();

  const openDeleteModal = (id) => {
    setDeleteId(id);
  };

  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.cartons,
    0,
  );

  console.log(cart, "cart");

  const deliveryFee = cart.length > 0 ? 200 : 0;

  const grandTotal = subtotal + deliveryFee;

  return (
    <>
      <div className="relative">
        <nav className="bg-sky shadow-lg sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-center items-center h-20">
              <div className="flex items-center">
                <img src={logo} alt="logo" className="w-15" />
              </div>

              <div className="flex items-center gap-4">
                <div>
                  <ShoppingCart
                    className="w-6 h-6 text-gray-700 hover:text-cyan-600 cursor-pointer absolute right-4"
                    onClick={() => setIsCartOpen(true)}
                  />
                  {/* <span>{cart.length}</span> */}
                </div>

                <button
                  onClick={() => setIsMenuOpen(true)}
                  className="md:hidden"
                >
                  <Menu className="w-6 h-6 absolute left-4" />
                </button>
              </div>
            </div>
          </div>
        </nav>

        {isCartOpen && (
          <div
            className="fixed inset-0 bg-black/40 z-40"
            onClick={() => setIsCartOpen(false)}
          />
        )}

        <div
          className={`fixed z-9999 top-0 right-0 h-full w-96 bg-white shadow-2xl z-50 transform transition-transform duration-300 ${
            isCartOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between p-5 border-b border-gray-300">
            <h2 className="text-lg font-semibold">Shopping Cart</h2>

            <div
              className="flex cursor-pointer hover:text-red-500"
              onClick={() => setIsCartOpen(false)}
            >
              <X />
              <span>Close</span>
            </div>
          </div>

          <div className="p-5 space-y-5 overflow-y-auto ">
            {cart.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-center p-6">
                <div className="text-5xl mb-4">🛒</div>

                <h3 className="text-lg font-semibold mb-2">
                  Your cart is empty
                </h3>

                <p className="text-gray-500 text-sm mb-6">
                  Looks like you haven't added anything yet
                </p>

                <button
                  onClick={() => setIsCartOpen(false)}
                  className="bg-orange-500 text-white px-6 py-3 rounded-xl font-semibold"
                >
                  Browse Products
                </button>
              </div>
            )}

            {cart.map((item) => (
              <>
                <div
                  key={item.id}
                  className="flex justify-between items-center border-b py-4"
                >
                  <div className="flex gap-3 items-center">
                    <img
                      src={item.img || "/placeholder.png"}
                      className="w-16 h-16 rounded-lg object-cover"
                    />

                    <div>
                      <h4 className="font-semibold">{item.name}</h4>
                      <p className="text-gray-500 text-sm">{item.size}</p>
                      <p className="font-semibold">Rs. {item.price}</p>
                    </div>
                  </div>

                  <div className="flex items-center border rounded-full px-3 py-1 gap-3">
                    {item.cartons === item.minCarton ? (
                      <button
                        onClick={() => openDeleteModal(item.id)}
                        className="text-red-500 hover:text-red-600"
                      >
                        🗑
                      </button>
                    ) : (
                      <button
                        onClick={() => decreaseCart(item.id)}
                        className="text-gray-700 hover:text-black"
                      >
                        -
                      </button>
                    )}

                    <span>{item.cartons}</span>

                    <button onClick={() => increaseCart(item.id)}>+</button>
                  </div>
                </div>
              </>
            ))}
            <button
              onClick={() => setIsCartOpen(false)}
              className="w-full border py-3 rounded-xl mt-3"
            >
              + Add more items
            </button>
            <div className="pt-4">
              <div className="flex justify-between">
                <span>Total</span>
                <span>Rs. {subtotal}</span>
              </div>

              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span>Rs. {deliveryFee}</span>
              </div>

              <div className="flex justify-between font-bold">
                <span>Grand Total</span>
                <span>Rs. {grandTotal}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div
          onClick={() => setIsMenuOpen(false)}
          className="fixed inset-0 bg-black/40 z-40"
        />
      )}
      {deleteId && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white w-[420px] rounded-2xl shadow-2xl p-6 relative animate-scaleIn">
            {/* Close Button */}

            <button
              onClick={() => setDeleteId(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>

            {/* Header */}

            <div className="flex items-center gap-3 mb-4">
              <div className="bg-sky-100 text-sky-600 p-2 rounded-lg">🗑</div>

              <h3 className="text-lg font-semibold text-gray-800">
                Confirm Deletion
              </h3>
            </div>

            {/* Message */}

            <p className="text-gray-500 text-sm mb-6">
              Are you sure you want to remove this product from the cart?
            </p>

            {/* Buttons */}

            <div className="flex justify-center gap-4">
              <button
                onClick={() => {
                  removeItem(deleteId);
                  setDeleteId(null);
                }}
                className="flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white px-5 py-2 rounded-lg font-medium transition"
              >
                🗑 Remove
              </button>

              <button
                onClick={() => setDeleteId(null)}
                className="bg-gray-500 hover:bg-gray-600 text-white px-5 py-2 rounded-lg font-medium transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white z-50 transform transition-transform duration-300
        ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <div className="text-lg text-cyan-600">
            <img src={logo} className="w-20" />
          </div>
          <button onClick={() => setIsMenuOpen(false)}>
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex flex-col p-4 gap-4 text-gray-700">
          <Link to="/" onClick={() => setIsMenuOpen(false)}>
            Home
          </Link>
          <Link to="/shop" onClick={() => setIsMenuOpen(false)}>
            Shop
          </Link>
          <Link to="/custom" onClick={() => setIsMenuOpen(false)}>
            Custom Bottles
          </Link>
          <Link to="/about" onClick={() => setIsMenuOpen(false)}>
            About Us
          </Link>
          <Link to="/contact" onClick={() => setIsMenuOpen(false)}>
            Contact
          </Link>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
