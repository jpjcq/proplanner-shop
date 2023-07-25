import { useContext } from "react";
import { Text } from "rebass";
import styled, { useTheme } from "styled-components";
import CartContext from "../../../contexts/cart/cart-context";

const IconWrapper = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  top: 12px;
  left: 12px;
`;

const Number = styled(Text)`
  position: absolute;
  margin: 0;
`;

export function QuantityIconRing() {
  const theme = useTheme();
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="none"
      stroke={theme.textPrimary}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="10" cy="10" r="7" fill="#FFFFFF"></circle>
      <circle cx="10" cy="10" r="7"></circle>
    </svg>
  );
}

export function QuantityIcon() {
  const cartCtx = useContext(CartContext);
  return (
    <IconWrapper>
      <QuantityIconRing />
      <Number fontSize={10} fontWeight={700}>
        {cartCtx.cartItems.length}
      </Number>
    </IconWrapper>
  );
}
