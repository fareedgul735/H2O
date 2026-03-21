import { RouterProvider } from "react-router";
import { clientRoutes } from "./routes/ClientRoutes";
import { Provider } from "react-redux";
import { store } from "./store/store";

const App = () => {
  return (
    <>
      <Provider store={store}>
        <RouterProvider router={clientRoutes} />
      </Provider>
    </>
  );
};

export default App;
