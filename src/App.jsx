import { RouterProvider } from "react-router";
import { clientRoutes } from "./routes/ClientRoutes";
import { CartProvider } from "./context/CardContext";

const App = () => {
  return (
    <>
      <CartProvider>
        <RouterProvider router={clientRoutes} />
      </CartProvider>
    </>
  );
};

export default App;
