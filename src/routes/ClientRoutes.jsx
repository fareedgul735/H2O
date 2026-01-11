import { createBrowserRouter, Navigate } from "react-router";
import PageWrapper from "../components/layout/PageWrapper";
import Home from "../pages/home/Home";
import FAQs from "../pages/InformationPage/Faqs";
import About from "../pages/InformationPage/About";
import BulkOrders from "../pages/InformationPage/BulkOrder";
import Sustainability from "../pages/InformationPage/Sustainability";
import ShippingReturns from "../pages/InformationPage/Shipping";
import OurStory from "../pages/InformationPage/OurStoryPage";
import CustomBottles from "../pages/customBottle/CustomBottles";
import Shop from "../pages/shop/Shop";
import ContactPage from "../pages/InformationPage/Contact";

export const clientRoutes = createBrowserRouter([
  {
    path: "/",
    element: <PageWrapper />,
    children: [
      { index: true, element: <Navigate to={"home"} replace={true} /> },
      { path: "home", element: <Home /> },
      { path: "faqs", element: <FAQs /> },
      { path: "about", element: <About /> },
      { path: "bulk-orders", element: <BulkOrders /> },
      { path: "sustainability", element: <Sustainability /> },
      { path: "shipping-returns", element: <ShippingReturns /> },
      { path: "our-story", element: <OurStory /> },
      { path: "contact", element: <ContactPage /> },
      { path: "custom", element: <CustomBottles /> },
      { path: "shop", element: <Shop /> },
    ],
  },
]);
