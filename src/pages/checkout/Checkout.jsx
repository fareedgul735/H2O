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

const PHONE_REGEX = /^\d{11}$/;

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
  });

  const [errors, setErrors] = useState({});
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
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Full name is required.";
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (!PHONE_REGEX.test(formData.phone.trim())) {
      newErrors.phone = "Phone number must be exactly 11 digits.";
    }
    if (!formData.address.trim()) newErrors.address = "Address is required.";
    if (
      formData.altPhone.trim() &&
      !PHONE_REGEX.test(formData.altPhone.trim())
    ) {
      newErrors.altPhone = "Alternate phone must be exactly 11 digits.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleOrder = async () => {
    if (!validate()) return;

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
      console.error("Error saving order", error);
      setPopup({ show: true, type: "error", message: "Something went wrong!" });
    } finally {
      setLoading(false);
    }
  };

  const fieldClass = (name) =>
    `border rounded-lg pl-10 pr-4 py-3 w-full text-sm transition-colors duration-200 focus:outline-none focus:ring-2 ${
      errors[name]
        ? "border-red-400 focus:ring-red-300 bg-red-50"
        : "border-gray-200 focus:ring-sky-300 bg-gray-50 hover:border-gray-300 focus:bg-white"
    }`;

  const iconClass = (name) =>
    `absolute top-3.5 left-3 w-4 h-4 ${errors[name] ? "text-red-400" : "text-gray-400"}`;

  const FieldWrapper = ({ label, required, name, children }) => (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
        {label}
        {required && <span className="text-red-400 ml-1">*</span>}
      </label>
      <div className="relative">{children}</div>
      {errors[name] && (
        <p className="text-xs text-red-500 mt-0.5">{errors[name]}</p>
      )}
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen">
      <ScrollOnTop />

      <div className="flex justify-center py-6 border-b border-gray-100 bg-white">
        <img
          src="https://dummyimage.com/100x100/000/fff&text=LOGO"
          className="w-16"
        />
      </div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 px-4 py-8 pb-16">
        {/* Left — Form */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800 mb-1">
              Delivery Details
            </h2>
            <p className="text-sm text-gray-400 mb-6">
              Enter your info below and we'll deliver to your doorstep.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Title */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Title
                </label>
                <select
                  name="title"
                  onChange={handleChange}
                  className="border border-gray-200 rounded-lg px-3 py-3 text-sm bg-gray-50 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:bg-white transition-colors duration-200"
                >
                  <option value="">Select title</option>
                  <option value="Mr">Mr</option>
                  <option value="Mrs">Mrs</option>
                </select>
              </div>

              {/* Name */}
              <FieldWrapper label="Full Name" required name="name">
                <User className={iconClass("name")} />
                <input
                  name="name"
                  value={formData.name}
                  placeholder="e.g. Ali Hassan"
                  onChange={handleChange}
                  className={fieldClass("name")}
                />
              </FieldWrapper>

              {/* Phone */}
              <FieldWrapper label="Phone Number" required name="phone">
                <Phone className={iconClass("phone")} />
                <input
                  name="phone"
                  value={formData.phone}
                  placeholder="03xxxxxxxxx"
                  onChange={handleChange}
                  maxLength={11}
                  className={fieldClass("phone")}
                />
              </FieldWrapper>

              {/* Alt Phone */}
              <FieldWrapper label="Alternate Phone" name="altPhone">
                <Phone className={iconClass("altPhone")} />
                <input
                  name="altPhone"
                  value={formData.altPhone}
                  placeholder="03xxxxxxxxx (optional)"
                  onChange={handleChange}
                  maxLength={11}
                  className={fieldClass("altPhone")}
                />
              </FieldWrapper>
            </div>

            {/* Address */}
            <div className="mt-4">
              <FieldWrapper label="Complete Address" required name="address">
                <MapPin className={iconClass("address")} />
                <input
                  name="address"
                  value={formData.address}
                  placeholder="House no, Street, Area, City"
                  onChange={handleChange}
                  className={fieldClass("address")}
                />
              </FieldWrapper>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {/* Landmark */}
              <FieldWrapper label="Nearest Landmark" name="landmark">
                <MapPin className={iconClass("landmark")} />
                <input
                  name="landmark"
                  value={formData.landmark}
                  placeholder="e.g. Near Askari Bank"
                  onChange={handleChange}
                  className={fieldClass("landmark")}
                />
              </FieldWrapper>

              {/* Email */}
              <FieldWrapper label="Email" name="email">
                <Mail className={iconClass("email")} />
                <input
                  name="email"
                  value={formData.email}
                  placeholder="you@example.com (optional)"
                  onChange={handleChange}
                  className={fieldClass("email")}
                />
              </FieldWrapper>
            </div>

            {/* Instructions */}
            <div className="mt-4">
              <FieldWrapper label="Delivery Instructions" name="instructions">
                <Info className={iconClass("instructions")} />
                <input
                  name="instructions"
                  value={formData.instructions}
                  placeholder="Any special instructions for delivery..."
                  onChange={handleChange}
                  className={fieldClass("instructions")}
                />
              </FieldWrapper>
            </div>
          </div>
        </div>

        {/* Right — Order Summary */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100">
              <h3 className="text-sm font-semibold text-gray-700">
                Order Summary
              </h3>
            </div>

            {cart.length === 0 ? (
              <div className="text-center py-10 text-sm text-gray-400">
                Your cart is empty
              </div>
            ) : (
              <div className="divide-y divide-gray-50">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 px-4 py-3"
                  >
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded-lg border border-gray-100 flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800 truncate">
                        {item.name}
                      </p>
                      <p className="text-xs text-gray-400">
                        {item.size} · Qty: {item.cartons}
                      </p>
                    </div>
                    <div className="text-sm font-semibold text-gray-700 flex-shrink-0">
                      Rs. {item.price * item.cartons}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {cart.length > 0 && (
            <div className="bg-white rounded-2xl border border-gray-100 p-4 space-y-2">
              <div className="flex justify-between text-sm text-gray-500">
                <span>Subtotal</span>
                <span>Rs. {subtotal}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-500">
                <span>Delivery Fee</span>
                <span>Rs. {deliveryFee}</span>
              </div>
              <div className="flex justify-between text-sm font-semibold text-gray-800 pt-2 border-t border-gray-100">
                <span>Grand Total</span>
                <span>Rs. {grandTotal}</span>
              </div>
            </div>
          )}

          {cart.length > 0 && (
            <button
              onClick={handleOrder}
              disabled={loading}
              className="w-full cursor-pointer bg-sky-500 hover:bg-sky-600 active:scale-95 text-white py-3 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2 shadow-sm"
            >
              {loading ? <ButtonLoader color="white" /> : "Place Order"}
            </button>
          )}

          <Link
            to="/home"
            className="text-sky-500 hover:text-sky-600 text-sm block text-center transition-colors"
          >
            ← Continue shopping
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
