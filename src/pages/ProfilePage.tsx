import { ReactNode } from "react";
import { ProfileNavbar } from "../components/Shop/Navbar";
import useSetIsConnected from "../hooks/useSetIsConnected";
import { Navigate } from "react-router-dom";

export default function ProfilePage({ children }: { children: ReactNode }) {
  const isConnected = useSetIsConnected();

  return (
    <>
      <ProfileNavbar />
      {isConnected ? children : <Navigate to="/shop/service" />}
    </>
  );
}
