import { styled } from "styled-components";
import { BodySmall, SmallSubHeader } from "../../../theme/text";
import toHours from "../../../utils/toHours";
import { AnimatedShopButtonPrimary } from "../../Button";
import { useContext } from "react";
import CartContext from "../../../contexts/cart/cart-context";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Title = styled(SmallSubHeader)`
  margin-bottom: 10px !important;
`;

interface ServiceChosenProps {
  id: string;
  title: string;
  price: number;
  duration: number;
}

export default function ServiceChosen({
  id,
  title,
  price,
  duration,
}: ServiceChosenProps) {
  const cartCtx = useContext(CartContext);

  return (
    <Wrapper>
      <Row style={{ justifyContent: "space-between" }}>
        <Column>
          <Title>{title}</Title>
          <Row>
            <SmallSubHeader>{price}€</SmallSubHeader>
            <BodySmall>&nbsp;-&nbsp;{toHours(duration)}</BodySmall>
          </Row>
        </Column>
        <Column>
          <AnimatedShopButtonPrimary
            onClick={() => cartCtx.removeItemFromCart(id)}
          >
            supprimer
          </AnimatedShopButtonPrimary>
        </Column>
      </Row>
    </Wrapper>
  );
}
