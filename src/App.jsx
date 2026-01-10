import { RouterProvider } from "react-router";
import { clientRoutes } from "./routes/ClientRoutes";


const App = () => {
  return (
    <>
      <RouterProvider router={clientRoutes} />
    </>
  );
};

export default App;
