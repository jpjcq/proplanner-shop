import { ReactNode, useContext } from "react";
import Footer from "../components/Footer/Footer";
import { ShopNavbar } from "../components/Shop/Navbar";
import Toast from "../components/Toast";
import ToastContext from "../contexts/toast/toast-context";
import useSetIsConnected from "../hooks/useSetIsConnected";

export default function ShopPage({ children }: { children: ReactNode }) {
  useSetIsConnected();
  const toastCtx = useContext(ToastContext);

  return (
    <>
      <ShopNavbar />
      <Toast
        open={toastCtx.connectedToast}
        setOpen={() => toastCtx.dismissConnectedToast()}
        title="Connecté"
        description={`Bonjour ${toastCtx.firstName}`}
      />
      {children}
      <Footer />
    </>
  );
}
