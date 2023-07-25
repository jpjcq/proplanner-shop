import { ProfileNavbar } from "../components/Shop/Navbar";
import ProfileModule from "../components/ProfileModule";
import useSetIsConnected from "../hooks/useSetIsConnected";
import { Navigate } from "react-router-dom";

export default function ProfilePage() {
  const isConnected = useSetIsConnected();

  return (
    <>
      {isConnected ? (
        <>
          <ProfileNavbar />
          <ProfileModule />
        </>
      ) : (
        <Navigate to="/shop/service" />
      )}
    </>
  );
}
