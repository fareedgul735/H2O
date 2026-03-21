# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

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





