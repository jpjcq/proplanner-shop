import { useContext } from "react";
import {
  StyledToastAction,
  StyledToastDescription,
  StyledToastRoot,
  StyledToastTitle,
  StyledToastViewport,
} from "./components";
import { ShopButtonPrimary } from "../Button";
import ToastContext from "../../contexts/toast/toast-context";

export default function Toast() {
  const toastCtx = useContext(ToastContext);

  return (
    <>
      <StyledToastRoot
        open={toastCtx.isOpen}
        onOpenChange={() => toastCtx.dismissToast()}
      >
        <StyledToastTitle>{toastCtx.text.title}</StyledToastTitle>
        <StyledToastDescription>{toastCtx.text.text}</StyledToastDescription>
        <StyledToastAction altText="retour" asChild>
          <ShopButtonPrimary>Retour</ShopButtonPrimary>
        </StyledToastAction>
      </StyledToastRoot>
      <StyledToastViewport />
    </>
  );
}
