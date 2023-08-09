import { useContext } from "react";
import { Navigate } from "react-router-dom";
import CartContext from "../../../contexts/cart/cart-context";
import SelectionScreen from "../SelectionScreen";
import Detail from "./Detail";
import ServiceChosen from "./ServiceChosen";
import { styled } from "styled-components";

const Separator = styled.div`
  height: 2px;
  width: 50%;
  align-self: center;
  border-bottom: 1px solid ${({ theme }) => theme.lightBorder};
  margin-top: 20px;
  margin-bottom: 20px;
`;

export default function SummaryAndPayment() {
  const cartCtx = useContext(CartContext);

  const ServiceChosenList = cartCtx.cartItems.flatMap(
    (itemInCart, index, array) => {
      return (
        <>
          {Array.from({ length: itemInCart.quantity }).map(
            (_, index, array) => (
              <>
                <ServiceChosen
                  key={index}
                  id={itemInCart._id}
                  title={itemInCart.title}
                  price={itemInCart.price}
                  duration={itemInCart.duration}
                />
                {index < array.length - 1 ? <Separator /> : null}
              </>
            )
          )}
          {index < array.length - 1 ? <Separator /> : null}
        </>
      );
    }
  );

  if (cartCtx.isEmpty) {
    return <Navigate to="/shop/service" />;
  } else {
    return (
      <>
        <SelectionScreen activePicker="summary" />
        <Detail title="Préstations choisies">{ServiceChosenList}</Detail>
      </>
    );
  }
}
