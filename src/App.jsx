import { useState, useEffect } from "react";
import { RouterProvider } from "react-router";
import { clientRoutes } from "./routes/ClientRoutes";
import { Provider } from "react-redux";
import { store } from "./store/store";
import OfflinePage from "./OfflinePage";

const App = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const goOnline = () => setIsOnline(true);
    const goOffline = () => setIsOnline(false);
    window.addEventListener("online", goOnline);
    window.addEventListener("offline", goOffline);
    return () => {
      window.removeEventListener("online", goOnline);
      window.removeEventListener("offline", goOffline);
    };
  }, []);

  return (
    <Provider store={store}>
      {isOnline ? <RouterProvider router={clientRoutes} /> : <OfflinePage />}
    </Provider>
  );
};

export default App;
