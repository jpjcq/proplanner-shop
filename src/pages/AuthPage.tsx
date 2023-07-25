import { ReactNode } from "react";
import { ShopWelcomeNavbar } from "../components/Shop/Navbar";
import FixedCenteringWrapper from "../components/utils/FixedCenteringWrapper";
import useSetIsConnected from "../hooks/useSetIsConnected";
import { Navigate } from "react-router-dom";

export default function AuthPage({ children }: { children: ReactNode }) {
  const isConnected = useSetIsConnected();

  return (
    <>
      <ShopWelcomeNavbar />
      <FixedCenteringWrapper>
        {isConnected ? <Navigate to="/shop/service" /> : children}
      </FixedCenteringWrapper>
    </>
  );
}
