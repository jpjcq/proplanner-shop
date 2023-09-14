import { ReactNode, useContext } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { Text } from "rebass";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import CartContext from "../../../contexts/cart/cart-context";
import { MediumHeader, SmallHeadline } from "../../../theme/text";
import {
  AnimatedShopButtonPrimary,
  AnimatedShopButtonSecondary,
} from "../../Button";
import { WarningBox } from "../../Validation";
import CartItemList from "./CartItemList";
import { BREAKPOINTS } from "../../../theme/utils";

const StyledDialogOverlay = styled(Dialog.Overlay)`
  position: fixed;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #080b117f;
  z-index: 20;
`;

const StyledDialogContent = styled(Dialog.Content)`
  background-color: white;
  border-radius: 6px;
  box-shadow: hsl(206 22% 7% / 35%) 0px 10px 38px -10px,
    hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /* min-width: 350px; */
  max-height: 85vh;
  padding: 25px;
  animation: contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1);
  z-index: 30;

  &:focus {
    outline: none;
  }

  @media (max-width: ${BREAKPOINTS.mobileL}px) {
    max-width: 320px;
  }

  @media (min-width: ${BREAKPOINTS.mobileL}px) {
    max-width: 500px;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  padding: 17px 0;
`;

const MyCartTitle = styled(SmallHeadline)`
  padding-bottom: 30px;
`;

const ItemWrapper = styled.div`
  width: 100%;
  padding: 0 27px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const TotalAndButtonWrapper = styled.div`
  width: 100%;
  padding: 0 27px;
  margin-top: 30px;
`;

const Total = styled(MediumHeader)`
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-weight: 700 !important;
`;

const Buttons = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-top: 18px;
`;

interface CartModalProps {
  switchToDatePicker: () => void;
  switchToServicePicker: () => void;
  chooseServiceFirst: boolean;
  children: ReactNode;
}

export function CartModal({
  switchToServicePicker,
  switchToDatePicker,
  chooseServiceFirst,
  children,
}: CartModalProps) {
  const cartCtx = useContext(CartContext);
  const location = useLocation().pathname;
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <StyledDialogOverlay />
        <StyledDialogContent asChild>
          <Wrapper>
            <MyCartTitle>Mon panier</MyCartTitle>
            <Dialog.Close asChild>
              <button
                className="IconButton"
                aria-label="Close"
                style={{
                  border: "none",
                  backgroundColor: "transparent",
                  position: "absolute",
                  top: "25px",
                  right: "25px",
                }}
              >
                <Cross2Icon />
              </button>
            </Dialog.Close>
            <ItemWrapper>
              {cartCtx.cartItems.length > 0 ? (
                <CartItemList />
              ) : (
                <Text>Votre panier est vide</Text>
              )}
            </ItemWrapper>
            <TotalAndButtonWrapper>
              <Total>
                <span>Total:</span>
                <span>{cartCtx.cartAmount}€</span>
              </Total>
              <Buttons>
                {location === "/shop/service" &&
                  (cartCtx.cartItems.length > 0 ? (
                    <Dialog.Close asChild>
                      <AnimatedShopButtonPrimary
                        onClick={() => switchToDatePicker()}
                      >
                        Choisir une date
                      </AnimatedShopButtonPrimary>
                    </Dialog.Close>
                  ) : (
                    <AnimatedShopButtonPrimary
                      onClick={() => switchToDatePicker()}
                    >
                      Choisir une date
                    </AnimatedShopButtonPrimary>
                  ))}
                {location === "/shop/date" && (
                  <>
                    <Dialog.Close asChild>
                      <AnimatedShopButtonSecondary
                        onClick={() => switchToServicePicker()}
                      >
                        Retour aux prestations
                      </AnimatedShopButtonSecondary>
                    </Dialog.Close>
                    <Dialog.Close asChild>
                      <AnimatedShopButtonPrimary>
                        Continuer
                      </AnimatedShopButtonPrimary>
                    </Dialog.Close>
                  </>
                )}
              </Buttons>
            </TotalAndButtonWrapper>
            {chooseServiceFirst && cartCtx.cartItems.length === 0 && (
              <WarningBox>Veuillez d'abord choisir une prestation</WarningBox>
            )}
          </Wrapper>
        </StyledDialogContent>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
