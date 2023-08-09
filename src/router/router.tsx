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
import ProfileModule from "../components/ProfileModule";
import ValidationBoxesProvider from "../contexts/validationBoxes/ValidationBoxesProvider";
import SummaryAndPayment from "../components/Shop/SummaryAndPayment";

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
    path: "/shop/summary",
    element: (
      <CartProvider>
        <ShopPage>
          <SummaryAndPayment />
        </ShopPage>
      </CartProvider>
    ),
  },
  {
    path: "/auth/login",
    element: (
      <ValidationBoxesProvider>
        <AuthPage>
          <LoginModule />
        </AuthPage>
      </ValidationBoxesProvider>
    ),
  },
  {
    path: "/reset-password",
    element: (
      <ValidationBoxesProvider>
        <ResetPasswordPage />
      </ValidationBoxesProvider>
    ),
  },
  {
    path: "/auth/signup",
    element: (
      <ValidationBoxesProvider>
        <AuthPage>
          <SignupModule />
        </AuthPage>
      </ValidationBoxesProvider>
    ),
  },
  {
    path: "/profile",
    element: (
      <ValidationBoxesProvider>
        <ProfilePage>
          <ProfileModule />
        </ProfilePage>
      </ValidationBoxesProvider>
    ),
  },
]);

export default router;
