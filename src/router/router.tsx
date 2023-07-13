import { createBrowserRouter } from "react-router-dom";
import DatePicker from "../components/Shop/DatePicker";
import ServicePicker from "../components/Shop/ServicePicker";
import Welcome from "../components/Shop/Welcome";
import CartProvider from "../contexts/cart/CartProvider";
import ShopPage from "../pages/ShopPage";

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
]);

export default router;
