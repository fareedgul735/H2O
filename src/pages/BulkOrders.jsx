import { useState } from "react";
import { useDispatch } from "react-redux";
import { submitBulkOrder } from "../store/BulkOrderSlice";
import Carousel from "../components/ui/Carousel";

export default function BulkOrders() {
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    quantity: "",
    bottleType: "500ml",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(submitBulkOrder(form));
    alert("Request Sent!");
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">

      <Carousel />


      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold">
          Bulk Water Bottles for Businesses
        </h1>
        <p className="text-gray-600 mt-2">
          Order in bulk & get FREE cartons with every order 🚀
        </p>
      </div>

      {/* Offer Section */}
      <div className="bg-sky-50 p-6 rounded-xl shadow mb-10">
        <h2 className="text-xl font-semibold mb-4">🔥 Bulk Offers</h2>

        <ul className="space-y-2 text-gray-700">
          <li>20 Cartons → 1 FREE</li>
          <li>30 Cartons → 2 FREE</li>
          <li>50 Cartons → 3 FREE</li>
          <li>100 Cartons → 5 FREE</li>
        </ul>

        <p className="mt-4 text-sm text-gray-500">
          Available for both 500ml (5 cartons max/unit) & 1500ml (4 cartons
          max/unit)
        </p>
      </div>

      {/* Process */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-4">How it Works</h2>
        <div className="grid md:grid-cols-4 gap-4 text-center">
          <div>1. Choose Bottle</div>
          <div>2. Select Quantity</div>
          <div>3. Confirm Order</div>
          <div>4. Fast Delivery 🚚</div>
        </div>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow p-6 rounded-xl space-y-4"
      >
        <h2 className="text-xl font-semibold">Request Bulk Order</h2>

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
          placeholder="Quantity (Cartons)"
          className="w-full border p-2 rounded"
          onChange={(e) => setForm({ ...form, quantity: e.target.value })}
        />

        <button className="w-full bg-sky-500 text-white py-2 rounded hover:bg-sky-600 transition">
          Submit Order
        </button>
      </form>
    </div>
  );
}
