import { useLocation, Link } from "react-router-dom";

const OrderSuccess = () => {
  const { state } = useLocation();

  if (!state) {
    return <div className="text-center py-20">No order found</div>;
  }

  const {
    customer,
    items,
    subtotal,
    deliveryFee,
    grandTotal,
    orderNo,
    orderDate,
  } = state;

  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-center mb-6">
          <img
            src="https://dummyimage.com/80x80/000/fff&text=LOGO"
            className="w-16"
          />
        </div>

        <div className="bg-green-500 text-white text-center p-6 rounded-t-xl">
          <h1 className="text-2xl font-bold">Thank You!</h1>

          <p>Your order has been placed successfully</p>
        </div>

        <div className="bg-white p-5 flex justify-between shadow rounded-b-xl mb-6">
          <span>
            Order No: <b>{orderNo}</b>
          </span>

          <span className="text-green-600">Accepted</span>
        </div>

        <div className="bg-white p-5 rounded-xl shadow mb-4">
          <h3 className="font-semibold mb-3">Customer Information</h3>

          <p>Name: {customer.name}</p>
          <p>Phone: {customer.phone}</p>
          <p>Email: {customer.email}</p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow mb-4">
          <h3 className="font-semibold mb-3">Delivery Information</h3>

          <p>Address: {customer.address}</p>
          <p>Landmark: {customer.landmark}</p>
          <p>Instructions: {customer.instructions}</p>
          <p>Order Date: {orderDate}</p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow mb-4">
          <h3 className="font-semibold mb-3">Products</h3>

          {items.map((item) => (
            <div key={item.id} className="flex justify-between border-b py-3">
              <div className="flex items-center gap-3">
                <img src={item.img} className="w-10 h-10 rounded" />

                <span>
                  {item.cartons} x {item.name}
                </span>
              </div>

              <span>Rs. {item.price * item.cartons}</span>
            </div>
          ))}
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <h3 className="font-semibold mb-3">Payment</h3>

          <p>Cash on Delivery</p>

          <div className="mt-4 border-t pt-4 space-y-2">
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

        <div className="text-center mt-6">
          <button
            onClick={() => window.print()}
            className="bg-orange-500 text-white px-5 py-2 rounded-lg"
          >
            Print
          </button>

          <div className="mt-4">
            <Link
              to="/"
              className="block bg-orange-500 text-white py-3 rounded-lg"
            >
              Place another order
            </Link>
          </div>
        </div>

        <div className="text-center mt-6 text-gray-500">Powered by Indolj</div>
      </div>
    </div>
  );
};

export default OrderSuccess;
