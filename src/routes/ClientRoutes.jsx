import { createBrowserRouter, Navigate } from "react-router";
import PageWrapper from "../components/layout/PageWrapper";
import Home from "../pages/home/Home";

export const clientRoutes = createBrowserRouter([
  {
    path: "/",
    element: <PageWrapper />,
    children: [
      { index: true, element: <Navigate to={"home"} replace={true} /> },
      { path: "home", element: <Home /> },
    ],
  },
]);
