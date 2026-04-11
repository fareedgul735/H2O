import { createBrowserRouter, Navigate } from "react-router";
import PageWrapper from "../components/layout/PageWrapper";
import Home from "../pages/home/Home";
import FAQs from "../pages/InformationPage/Faqs";
import About from "../pages/InformationPage/About";
import ContactPage from "../pages/InformationPage/Contact";
import Checkout from "../pages/checkout/Checkout";
import YourDesign from "../pages/YourDesign";
import BulkOrders from "../pages/BulkOrders";
import Products from "../pages/products/Products";

export const clientRoutes = createBrowserRouter([
  {
    path: "/",
    element: <PageWrapper />,
    children: [
      { index: true, element: <Navigate to={"home"} replace={true} /> },
      { path: "home", element: <Home /> },
      { path: "faqs", element: <FAQs /> },
      { path: "about", element: <About /> },
      { path: "products", element: <Products /> },
      { path: "bulk-orders", element: <BulkOrders /> },
      { path: "your-design", element: <YourDesign /> },
      { path: "contact", element: <ContactPage /> },
    ],
  },
  {
    path: "checkout",
    element: <Checkout />,
  },
]);
