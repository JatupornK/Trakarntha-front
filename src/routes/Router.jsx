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
        element: <ProfilePage />,
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
        element: <LoginPage />,
      },
    ],
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
