import { ReactNode } from "react";
import Footer from "../components/Footer/Footer";
import { ShopNavbar } from "../components/Shop/Navbar";

export default function ShopPage({ children }: { children: ReactNode }) {
  return (
    <>
      <ShopNavbar />
      {children}
      <Footer />
    </>
  );
}
