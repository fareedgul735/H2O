import { useState } from "react";
import { User, Phone, Mail, MapPin, Info } from "lucide-react";
import Footer from "../../components/layout/Footer";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../../store/CartSlice.js";
import { Link, useNavigate } from "react-router-dom";
import { addDoc, collection, db } from "../../store/firebase.js";
import { getGuestId } from "../../utils/helper.js";
import ScrollOnTop from "../../utils/ScrollOnTop.js";
import Popup from "../../components/common/PopupMessage.jsx";
import { ButtonLoader } from "../../components/common/Loader.jsx";

const Checkout = () => {
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

  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState({
    show: false,
    type: "info",
    message: "",
  });

  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.cartons,
    0,
  );
  const deliveryFee = cart.length > 0 ? 200 : 0;
  const grandTotal = subtotal + deliveryFee;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateFields = () => {
    const requiredFields = ["name", "phone", "address"];
    const emptyFields = requiredFields.filter(
      (field) => !formData[field].trim(),
    );
    return emptyFields;
  };

  const handleOrder = async () => {
    const emptyFields = validateFields();
    if (emptyFields.length > 0) {
      setPopup({
        show: true,
        type: "error",
        message: "Please fill all required fields",
      });
      return;
    }

    setLoading(true);
    const guestId = getGuestId();
    const orderData = {
      customer: formData,
      guestId,
      items: cart,
      subtotal,
      deliveryFee,
      grandTotal,
      orderNo: "ORD-" + Math.random().toString(36).substring(2, 8),
      orderDate: new Date().toLocaleString(),
      createdAt: new Date(),
      status: "pending",
    };

    try {
      await addDoc(collection(db, "orders"), orderData);
      dispatch(clearCart());
      setPopup({
        show: true,
        type: "success",
        message: "Order placed successfully!",
      });
      setTimeout(() => navigate("/home"), 1500);
    } catch (error) {
      console.error("Error saving order ❌", error);
      setPopup({ show: true, type: "error", message: "Something went wrong!" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <ScrollOnTop />
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select
              name="title"
              onChange={handleChange}
              className="border p-3 rounded-lg focus:ring-2 focus:ring-sky-400"
            >
              <option>Title</option>
              <option>Mr</option>
              <option>Mrs</option>
            </select>

            <div className="relative">
              <User className="absolute top-3 left-3 text-gray-400" />
              <input
                name="name"
                placeholder="Full Name *"
                onChange={handleChange}
                className={`border p-3 rounded-lg pl-10 w-full focus:ring-2 focus:ring-sky-400 ${
                  !formData.name && popup.show && "border-red-500"
                }`}
              />
            </div>

            <div className="relative">
              <Phone className="absolute top-3 left-3 text-gray-400" />
              <input
                name="phone"
                placeholder="03xx-xxxxxxx *"
                onChange={handleChange}
                className={`border p-3 rounded-lg pl-10 w-full focus:ring-2 focus:ring-sky-400 ${
                  !formData.phone && popup.show && "border-red-500"
                }`}
              />
            </div>

            <div className="relative">
              <Phone className="absolute top-3 left-3 text-gray-400" />
              <input
                name="altPhone"
                placeholder="Alternate Phone"
                onChange={handleChange}
                className="border p-3 rounded-lg pl-10 w-full focus:ring-2 focus:ring-sky-400"
              />
            </div>
          </div>

          <div className="mt-4 relative">
            <MapPin className="absolute top-3 left-3 text-gray-400" />
            <input
              name="address"
              placeholder="Complete Address *"
              onChange={handleChange}
              className={`border p-3 rounded-lg pl-10 w-full focus:ring-2 focus:ring-sky-400 ${
                !formData.address && popup.show && "border-red-500"
              }`}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="relative">
              <MapPin className="absolute top-3 left-3 text-gray-400" />
              <input
                name="landmark"
                placeholder="Nearest Landmark"
                onChange={handleChange}
                className="border p-3 rounded-lg pl-10 w-full focus:ring-2 focus:ring-sky-400"
              />
            </div>

            <div className="relative">
              <Mail className="absolute top-3 left-3 text-gray-400" />
              <input
                name="email"
                placeholder="Email"
                onChange={handleChange}
                className="border p-3 rounded-lg pl-10 w-full focus:ring-2 focus:ring-sky-400"
              />
            </div>
          </div>

          <div className="mt-4 relative">
            <Info className="absolute top-3 left-3 text-gray-400" />
            <input
              name="instructions"
              placeholder="Delivery Instructions"
              onChange={handleChange}
              className="border p-3 rounded-lg pl-10 w-full focus:ring-2 focus:ring-sky-400"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white p-4 rounded-xl shadow">
            {cart.length === 0 ? (
              <div className="text-center py-6">No items yet</div>
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
              className="w-full bg-sky-400 cursor-pointer text-white py-3 rounded-lg mt-3 transform transition-transform hover:scale-105 flex items-center justify-center gap-2"
              disabled={loading}
            >
              {loading ? <ButtonLoader color="white" /> : "Place Order"}
            </button>
          )}

          <Link to="/home" className="text-blue-600 text-sm block text-center">
            ← continue to add more items
          </Link>
        </div>
      </div>

      {popup.show && (
        <Popup
          type={popup.type}
          message={popup.message}
          onClose={() => setPopup({ ...popup, show: false })}
        />
      )}

      <Footer />
    </div>
  );
};

export default Checkout;
