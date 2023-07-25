import { Dispatch, SetStateAction } from "react";
import {
  StyledToastAction,
  StyledToastDescription,
  StyledToastRoot,
  StyledToastTitle,
  StyledToastViewport,
} from "./components";
import { ShopButtonPrimary } from "../Button";

interface ToastProps {
  title: string;
  description: string;
  open: boolean;
  setOpen?: Dispatch<SetStateAction<boolean>>;
}

export default function Toast({
  title,
  description,
  open,
  setOpen,
}: ToastProps) {

  return (
    <>
      <StyledToastRoot open={open} onOpenChange={setOpen}>
        <StyledToastTitle>{title}</StyledToastTitle>
        <StyledToastDescription>{description}</StyledToastDescription>
        <StyledToastAction altText="retour" asChild>
          <ShopButtonPrimary>Retour</ShopButtonPrimary>
        </StyledToastAction>
      </StyledToastRoot>
      <StyledToastViewport />
    </>
  );
}
