import { ReactNode } from "react";
import Footer from "../components/Footer/Footer";
import { ShopNavbar } from "../components/Shop/Navbar";
import useSetIsConnected from "../hooks/useSetIsConnected";

export default function ShopPage({ children }: { children: ReactNode }) {
  useSetIsConnected();

  return (
    <>
      <ShopNavbar />
      {children}
      <Footer />
    </>
  );
}
