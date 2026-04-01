import { useState } from "react";
import {
  Phone,
  User,
  Mail,
  MessageSquare,
  Loader as LoaderIcon,
} from "lucide-react";
import { collection, addDoc, db } from "../../store/firebase.js";
import Popup from "../../components/common/PopupMessage.jsx";
import { ButtonLoader } from "../../components/common/Loader.jsx";



const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [popup, setPopup] = useState({
    show: false,
    type: "info",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await addDoc(collection(db, "contact_messages"), formData);

      setPopup({
        show: true,
        type: "success",
        message: "Message sent successfully!",
      });

      setFormData({ name: "", email: "", phone: "", message: "" });
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

  return (
    <section className="py-20 bg-sky-50">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-sky-600 mb-4 text-center">
          Contact Bottle Verse 
        </h1>
        <p className="text-gray-600 text-lg text-center mb-10">
          Have questions about our water bottles or need order support? Send us
          a message and we’ll get back to you.
        </p>

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-xl rounded-2xl p-8 space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <label className="block text-gray-700 font-medium mb-2">
                Your Name
              </label>
              <User className="absolute top-11 left-3 text-gray-400" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="w-full border border-gray-300 rounded-lg px-10 py-3 focus:outline-none focus:ring-2 focus:ring-sky-500"
                required
              />
            </div>

            <div className="relative">
              <label className="block text-gray-700 font-medium mb-2">
                Email Address
              </label>
              <Mail className="absolute top-11 left-3 text-gray-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full border border-gray-300 rounded-lg px-10 py-3 focus:outline-none focus:ring-2 focus:ring-sky-500"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <label className="block text-gray-700 font-medium mb-2">
                Phone Number
              </label>
              <Phone className="absolute top-11 left-3 text-gray-400" />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                className="w-full border border-gray-300 rounded-lg px-10 py-3 focus:outline-none focus:ring-2 focus:ring-sky-500"
                required
              />
            </div>

            <div className="relative">
              <label className="block text-gray-700 font-medium mb-2">
                Message
              </label>
              <MessageSquare className="absolute top-11 left-3 text-gray-400" />
              <textarea
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message here..."
                className="w-full border border-gray-300 rounded-lg px-10 py-3 focus:outline-none focus:ring-2 focus:ring-sky-500 resize-none"
                required
              ></textarea>
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 cursor-pointer bg-gradient-to-r from-sky-500 to-cyan-500 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition"
            disabled={loading}
          >
            {loading ? (
              <ButtonLoader color="white" size={24} />
            ) : (
              "Send Message"
            )}
          </button>
        </form>
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
