import { createBrowserRouter, Navigate } from "react-router";
import { lazy, Suspense } from "react";
import PageWrapper from "../components/layout/PageWrapper";
import StoreLoader from "../components/common/StoreLoader";

const Home = lazy(() => import("../pages/home/Home"));
const FAQs = lazy(() => import("../pages/InformationPage/Faqs"));
const About = lazy(() => import("../pages/InformationPage/About"));
const ContactPage = lazy(() => import("../pages/InformationPage/Contact"));
const Checkout = lazy(() => import("../pages/checkout/Checkout"));
const Products = lazy(() => import("../pages/products/Products"));

const Wrap = ({ children }) => (
  <Suspense fallback={<StoreLoader />}>{children}</Suspense>
);

export const clientRoutes = createBrowserRouter([
  {
    path: "/",
    element: <PageWrapper />,
    children: [
      { index: true, element: <Navigate to="home" replace /> },
      {
        path: "home",
        element: (
          <Wrap>
            <Home />
          </Wrap>
        ),
      },
      {
        path: "faqs",
        element: (
          <Wrap>
            <FAQs />
          </Wrap>
        ),
      },
      {
        path: "about",
        element: (
          <Wrap>
            <About />
          </Wrap>
        ),
      },
      {
        path: "products",
        element: (
          <Wrap>
            <Products />
          </Wrap>
        ),
      },
      {
        path: "contact",
        element: (
          <Wrap>
            <ContactPage />
          </Wrap>
        ),
      },
    ],
  },
  {
    path: "checkout",
    element: (
      <Wrap>
        <Checkout />
      </Wrap>
    ),
  },
]);
