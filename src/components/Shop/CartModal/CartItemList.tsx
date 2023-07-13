import { useContext } from "react";
import styled from "styled-components";
import CartContext from "../../../contexts/cart/cart-context";
import ItemInfos from "./ItemInfos";
import { AnimatedQuantityCartButton } from "../../Button";

const ItemInfosWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ItemWithoutSeparator = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const ItemButtons = styled.div`
  display: flex;
  flex-wrap: nowrap;
  margin-left: 30px;
`;

const HorizontalSeparator = styled.div`
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.lightBorder};
  margin: 16px 0 10px 0;
`;

export default function CartItemList() {
  const cartCtx = useContext(CartContext);
  return (
    <>
      {cartCtx.cartItems.map((item, index, array) => (
        <ItemInfosWrapper key={item._id}>
          <ItemWithoutSeparator>
            <ItemInfos item={item} />
            <ItemButtons>
              <AnimatedQuantityCartButton
                onClick={() => cartCtx.removeItemFromCart(item._id)}
              >
                -
              </AnimatedQuantityCartButton>
              <AnimatedQuantityCartButton
                onClick={() => cartCtx.addItemToCart(item)}
                style={{ marginLeft: "10px" }}
              >
                +
              </AnimatedQuantityCartButton>
            </ItemButtons>
          </ItemWithoutSeparator>
          {index < array.length - 1 && <HorizontalSeparator />}
        </ItemInfosWrapper>
      ))}
    </>
  );
}
