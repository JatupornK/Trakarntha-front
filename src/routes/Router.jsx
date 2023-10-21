import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainPage from "../pages/MainPage";
import ProfilePage from "../pages/ProfilePage";
import PromotionPage from "../pages/PromotionPage";
import CollectionPage from "../pages/CollectionPage";
import AllProductPage from "../pages/AllProductPage";
import OurStoryPage from "../pages/OurStoryPage";
import MembershipPage from "../pages/MembershipPage";
import Header from "../layouts/Header";
import LoginPage from "../pages/LoginPage";
import RedirectIfNotAuthenticate from "../features/Login/RedirectIfNotAuthenticate";
import RedirectIfAuthenticate from "../features/Login/RedirectIfAuthenticate";
import OrderPage from "../pages/OrderPage";

const router = createBrowserRouter([
  {
    element: <Header />,
    children: [
      {
        path: "/",
        element: <MainPage />,
      },
      {
        path: "/profile",
        element: (
          <RedirectIfNotAuthenticate>
            <ProfilePage />
          </RedirectIfNotAuthenticate>
        ),
      },
      {
        path: "/promotion",
        element: <PromotionPage />,
      },
      {
        path: "/collection",
        element: <CollectionPage />,
      },
      {
        path: "/all-products",
        element: <AllProductPage />,
      },
      {
        path: "/our-story",
        element: <OurStoryPage />,
      },
      {
        path: "/membership",
        element: <MembershipPage />,
      },
      {
        path: "/login",
        element: (
          <RedirectIfAuthenticate>
            <LoginPage />
          </RedirectIfAuthenticate>
        ),
      },
      {
        path: "/order",
        element: (
          <RedirectIfNotAuthenticate>
            <OrderPage />
          </RedirectIfNotAuthenticate>
        ),
      },
    ],
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
