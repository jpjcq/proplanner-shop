import { useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import CartContext from "../../../contexts/cart/cart-context";
import SelectionScreen from "../SelectionScreen";
import Detail from "./Detail";
import ServiceChosen from "./ServiceChosen";
import { styled } from "styled-components";
import { BodySmall, SmallSubHeader } from "../../../theme/text";
import { AnimatedShopButtonPrimary } from "../../Button";

const Separator = styled.div`
  height: 2px;
  width: 50%;
  align-self: center;
  border-bottom: 1px solid ${({ theme }) => theme.lightBorder};
  margin-top: 20px;
  margin-bottom: 20px;
`;

const Title = styled(SmallSubHeader)`
  margin-bottom: 10px !important;
`;

const Row = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export default function SummaryAndPayment() {
  const cartCtx = useContext(CartContext);
  const navigate = useNavigate();

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
        <Detail title="Date et heure choisies">
          <Row>
            <Column>
              <Title>
                {cartCtx.chosenDate?.start?.setLocale("fr").toLocaleString({
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </Title>
              <BodySmall>
                {cartCtx.chosenDate?.start
                  ?.setLocale("fr")
                  .toLocaleString({ hour: "numeric", minute: "numeric" })}
              </BodySmall>
            </Column>
            <Column>
              <AnimatedShopButtonPrimary
                onClick={() => {
                  cartCtx.removeDateFromCart();
                  navigate("/shop/date");
                }}
              >
                modifier
              </AnimatedShopButtonPrimary>
            </Column>
          </Row>
        </Detail>
      </>
    );
  }
}
