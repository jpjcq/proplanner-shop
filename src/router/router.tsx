import { createBrowserRouter } from "react-router-dom";
import DatePicker from "../components/Shop/DatePicker";
import ServicePicker from "../components/Shop/ServicePicker";
import Welcome from "../components/Shop/Welcome";
import CartProvider from "../contexts/cart/CartProvider";
import ShopPage from "../pages/ShopPage";
import ProfilePage from "../pages/ProfilePage";
import AuthPage from "../pages/AuthPage";
import SignupModule from "../components/Auth/SignupModule";
import LoginModule from "../components/Auth/LoginModule";
import ResetPasswordPage from "../pages/ResetPasswordPage";

const router = createBrowserRouter([
  {
    path: "/shop",
    id: "shop",
    element: <Welcome />,
  },
  {
    index: true,
    path: "/shop/service",
    element: (
      <CartProvider>
        <ShopPage>
          <ServicePicker />
        </ShopPage>
      </CartProvider>
    ),
  },
  {
    path: "/shop/date",
    element: (
      <CartProvider>
        <ShopPage>
          <DatePicker />
        </ShopPage>
      </CartProvider>
    ),
  },
  {
    path: "/auth/login",
    element: (
      <AuthPage>
        <LoginModule />
      </AuthPage>
    ),
  },
  {
    path: "/reset-password",
    element: <ResetPasswordPage />,
  },
  {
    path: "/auth/signup",
    element: (
      <AuthPage>
        <SignupModule />
      </AuthPage>
    ),
  },
  {
    path: "/profile",
    element: <ProfilePage />,
  },
]);

export default router;
