import { useState } from "react";
import { Phone, User, MessageSquare, Mail, MapPin, Clock } from "lucide-react";
import { collection, addDoc, db } from "../../store/firebase.js";
import Popup from "../../components/common/PopupMessage.jsx";
import { ButtonLoader } from "../../components/common/Loader.jsx";

const PHONE_REGEX = /^\d{11}$/;

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [popup, setPopup] = useState({
    show: false,
    type: "info",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (!PHONE_REGEX.test(formData.phone.trim())) {
      newErrors.phone = "Must be exactly 11 digits.";
    }
    if (!formData.message.trim()) newErrors.message = "Message is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      await addDoc(collection(db, "contact_messages"), formData);
      setPopup({
        show: true,
        type: "success",
        message: "Message sent successfully!",
      });
      setFormData({ name: "", phone: "", message: "" });
      setErrors({});
    } catch (err) {
      setPopup({
        show: true,
        type: "error",
        message: "Something went wrong. Please try again!",
      });
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fieldClass = (name) =>
    `w-full border rounded-xl pl-10 pr-4 py-3 text-sm transition-colors duration-200 focus:outline-none focus:ring-2 ${
      errors[name]
        ? "border-red-400 focus:ring-red-300 bg-red-50"
        : "border-gray-200 focus:ring-sky-300 bg-gray-50 hover:border-gray-300 focus:bg-white"
    }`;

  const iconClass = (name) =>
    `absolute top-3.5 left-3 w-4 h-4 ${errors[name] ? "text-red-400" : "text-gray-400"}`;

  const FieldWrapper = ({ label, name, children }) => (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
        {label} <span className="text-red-400">*</span>
      </label>
      <div className="relative">{children}</div>
      {errors[name] && (
        <p className="text-xs text-red-500 mt-0.5">{errors[name]}</p>
      )}
    </div>
  );

  const InfoItem = ({ icon: Icon, label, value }) => (
    <div className="flex items-start gap-3">
      <div className="w-9 h-9 rounded-xl bg-sky-50 flex items-center justify-center flex-shrink-0">
        <Icon className="w-4 h-4 text-sky-500" />
      </div>
      <div>
        <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">
          {label}
        </p>
        <p className="text-sm text-gray-700 mt-0.5">{value}</p>
      </div>
    </div>
  );

  return (
    <section className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900">Get in touch</h1>
          <p className="text-gray-400 text-sm mt-2">
            We usually respond within a few hours.
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-5">
          {/* Left — Contact Info */}
          <div className="md:col-span-2 bg-white rounded-2xl border border-gray-100 p-6 flex flex-col gap-5">
            {/* Brand */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-sky-500 flex items-center justify-center">
                <span className="text-white font-bold text-sm">AF</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800">
                  Aqua Forge
                </p>
                <p className="text-xs text-gray-400">Water Bottle Co.</p>
              </div>
            </div>

            <div className="h-px bg-gray-100" />

            <InfoItem icon={Phone} label="Phone" value="+92 318 3516990" />
            <InfoItem icon={Mail} label="Email" value="aquaforge2026@gmail.com" />
            <InfoItem
              icon={MapPin}
              label="Location"
              value="Karachi, Pakistan"
            />
            <InfoItem
              icon={Clock}
              label="Working Hours"
              value="Mon–Sunday, 9am – 12pm"
            />
          </div>

          {/* Right — Form */}
          <div className="md:col-span-3 bg-white rounded-2xl border border-gray-100 p-6">
            <h2 className="text-base font-semibold text-gray-800 mb-1">
              Send us a message
            </h2>
            <p className="text-xs text-gray-400 mb-6">
              Fill in the form and we'll get back to you shortly.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FieldWrapper label="Your Name" name="name">
                  <User className={iconClass("name")} />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Ali Hassan"
                    className={fieldClass("name")}
                  />
                </FieldWrapper>

                <FieldWrapper label="Phone Number" name="phone">
                  <Phone className={iconClass("phone")} />
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="03xxxxxxxxx"
                    maxLength={11}
                    className={fieldClass("phone")}
                  />
                </FieldWrapper>
              </div>

              <FieldWrapper label="Message" name="message">
                <MessageSquare className={iconClass("message")} />
                <textarea
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message here..."
                  className={`${fieldClass("message")} resize-none`}
                />
              </FieldWrapper>

              <button
                type="submit"
                disabled={loading}
                className="w-full cursor-pointer flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-600 active:scale-95 text-white py-3 rounded-xl text-sm font-semibold transition-all duration-200"
              >
                {loading ? (
                  <ButtonLoader color="white" size={20} />
                ) : (
                  "Send Message"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {popup.show && (
        <Popup
          type={popup.type}
          message={popup.message}
          onClose={() => setPopup({ ...popup, show: false })}
        />
      )}
    </section>
  );
};

export default Contact;
