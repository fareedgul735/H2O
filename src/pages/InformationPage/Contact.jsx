const Contact = () => {
  return (
    <section className="py-20 bg-sky-50">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-sky-600 mb-4 text-center">
          Contact H₂O Drop
        </h1>
        <p className="text-gray-600 text-lg text-center mb-10">
          Have questions about our water bottles or need order support? Send us
          a message and we’ll get back to you.
        </p>

        <form className="bg-white shadow-xl rounded-2xl p-8 space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Your Name
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Message
            </label>
            <textarea
              rows="5"
              placeholder="Write your message here..."
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-500 resize-none"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full cursor-pointer bg-gradient-to-r from-sky-500 to-cyan-500 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
