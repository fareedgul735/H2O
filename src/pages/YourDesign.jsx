import { useState } from "react";
import { collection, addDoc, db } from "../store/firebase.js";
import Carousel from "../components/ui/Carousel.jsx";

export default function YourDesign() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    bottleType: "500ml",
    quantity: "",
    design: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    await addDoc(collection(db, "customDesigns"), form);

    
    window.open(
      `https://wa.me/${form.phone}?text=Hi AquaForge, I want a custom bottle design. Quantity: ${form.quantity}`,
      "_blank",
    );

    alert("Design Request Sent!");
  };

  return (
    <div className="bg-gradient-to-br from-sky-50 via-blue-50 to-cyan-50">
      <Carousel />

      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold">Design Your Own Bottle</h1>
        <p className="text-gray-600 mt-2">
          Create your custom water bottle with your logo, color & style 💧
        </p>
      </div>

      <div className="grid md:grid-cols-4 gap-4 text-center mb-10">
        <div className="bg-sky-50 p-4 rounded">1. Choose Bottle</div>
        <div className="bg-sky-50 p-4 rounded">2. Add Design</div>
        <div className="bg-sky-50 p-4 rounded">3. Submit Request</div>
        <div className="bg-sky-50 p-4 rounded">4. We Create 🚀</div>
      </div>


      <div className="grid md:grid-cols-3 gap-6 mb-10">
        <div className="p-4 border rounded text-center">
          🧴 Bottle Type
          <p className="text-sm text-gray-500">500ml / 1500ml</p>
        </div>

        <div className="p-4 border rounded text-center">
          🎨 Custom Design
          <p className="text-sm text-gray-500">Logo, Color, Text</p>
        </div>

        <div className="p-4 border rounded text-center">
          🚀 Start Your Brand
          <p className="text-sm text-gray-500">We help you launch</p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow p-6 rounded-xl space-y-4"
      >
        <h2 className="text-xl font-semibold">Submit Your Design</h2>

        <input
          type="text"
          placeholder="Your Name"
          className="w-full border p-2 rounded"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          type="text"
          placeholder="WhatsApp Number"
          className="w-full border p-2 rounded"
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />

        <select
          className="w-full border p-2 rounded"
          onChange={(e) => setForm({ ...form, bottleType: e.target.value })}
        >
          <option value="500ml">500ml</option>
          <option value="1500ml">1500ml</option>
        </select>

        <input
          type="number"
          placeholder="Quantity"
          className="w-full border p-2 rounded"
          onChange={(e) => setForm({ ...form, quantity: e.target.value })}
        />

        <textarea
          placeholder="Describe your design (logo, color, text...)"
          className="w-full border p-2 rounded"
          onChange={(e) => setForm({ ...form, design: e.target.value })}
        />

        <button className="w-full bg-sky-500 text-white py-2 rounded hover:bg-sky-600 transition">
          Send Design Request
        </button>
      </form>

      <div className="text-center mt-10">
        <h2 className="text-xl font-semibold">
          Start Your Bottle Brand Today 🚀
        </h2>
      </div>
    </div>
  );
}
