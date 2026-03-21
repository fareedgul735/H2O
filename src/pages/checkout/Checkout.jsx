import React, { useState } from "react";
import Footer from "../../components/layout/Footer";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../../store/CartSlice.js";
import { Link, useNavigate } from "react-router-dom";

const Checkout = () => {
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    name: "",
    phone: "",
    altPhone: "",
    address: "",
    landmark: "",
    email: "",
    instructions: "",
    change: "",
  });

  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.cartons,
    0,
  );

  const deliveryFee = cart.length > 0 ? 200 : 0;

  const grandTotal = subtotal + deliveryFee;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleOrder = () => {
    if (!formData.name || !formData.phone || !formData.address) {
      alert("Please fill required fields");
      return;
    }

    const orderData = {
      customer: formData,
      items: cart,
      subtotal,
      deliveryFee,
      grandTotal,
      orderNo: Math.random().toString(36).substring(7),
      orderDate: new Date().toLocaleString(),
    };

    navigate("/order-success", { state: orderData });

    dispatch(clearCart());
    navigate("/order-success", { state: orderData });
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="flex justify-center py-6">
        <img
          src="https://dummyimage.com/100x100/000/fff&text=LOGO"
          className="w-20"
        />
      </div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 px-4 pb-16">
        <div className="md:col-span-2 bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-bold mb-1">Checkout</h2>

          <p className="text-gray-500 text-sm mb-6">
            This is a <b>Delivery Order 🚚</b>
            <br />
            Just a last step, please enter your details:
          </p>

          <div className="grid grid-cols-2 gap-4">
            <select
              name="title"
              onChange={handleChange}
              className="border p-3 rounded-lg"
            >
              <option>Title</option>
              <option>Mr</option>
              <option>Mrs</option>
            </select>

            <input
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
              className="border p-3 rounded-lg"
            />

            <input
              name="phone"
              placeholder="03xx-xxxxxxx"
              onChange={handleChange}
              className="border p-3 rounded-lg"
            />

            <input
              name="altPhone"
              placeholder="Alternate Mobile Number"
              onChange={handleChange}
              className="border p-3 rounded-lg"
            />
          </div>

          <div className="mt-4">
            <input
              name="address"
              placeholder="Enter your complete address"
              onChange={handleChange}
              className="border p-3 rounded-lg w-full"
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <input
              name="landmark"
              placeholder="Nearest Landmark"
              onChange={handleChange}
              className="border p-3 rounded-lg"
            />

            <input
              name="email"
              placeholder="Enter your email"
              onChange={handleChange}
              className="border p-3 rounded-lg"
            />
          </div>

          <div className="mt-4">
            <input
              name="instructions"
              placeholder="Delivery Instructions"
              onChange={handleChange}
              className="border p-3 rounded-lg w-full"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white p-4 rounded-xl shadow">
            {cart.length === 0 ? (
              <div className="text-center py-6">
                <p>No items yet</p>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between border-b py-3"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-14 h-14 object-cover rounded-lg border"
                    />

                    <div>
                      <p className="font-medium text-sm">{item.name}</p>

                      <p className="text-gray-500 text-xs">{item.size}</p>

                      <p className="text-xs text-gray-500">
                        Qty: {item.cartons}
                      </p>
                    </div>
                  </div>

                  <div className="font-semibold text-sm">
                    Rs. {item.price * item.cartons}
                  </div>
                </div>
              ))
            )}
          </div>

          {cart.length > 0 && (
            <div className="bg-white p-4 rounded-xl shadow">
              <h3 className="font-semibold mb-3">Your Order</h3>

              <div className="flex justify-between text-sm">
                <span>Total</span>
                <span>Rs. {subtotal}</span>
              </div>

              <div className="flex justify-between text-sm">
                <span>Delivery Fee</span>
                <span>Rs. {deliveryFee}</span>
              </div>

              <div className="flex justify-between font-bold mt-2">
                <span>Grand Total</span>
                <span>Rs. {grandTotal}</span>
              </div>
            </div>
          )}

          {cart.length > 0 && (
            <button
              onClick={handleOrder}
              className="w-full bg-orange-500 text-white py-3 rounded-lg mt-3"
            >
              Place Order
            </button>
          )}

          <Link to="/home" className="text-blue-600 text-sm block text-center">
            ← continue to add more items
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Checkout;
