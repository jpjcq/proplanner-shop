import { useContext } from "react";
import styled from "styled-components";
import CartContext from "../../../contexts/cart/cart-context";
import { BodySmall, Caption, SmallSubHeader } from "../../../theme/text";
import { SecondaryServices } from "../../../types/services";
import toHours from "../../../utils/toHours";
import Box from "../../utils/Box";
import { AnimatedShopButtonPrimary } from "../../Button";
import ToastContext from "../../../contexts/toast/toast-context";

const Item = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  width: 85%;
  padding: 0.875rem 1.0625rem;
  border: 0.1px solid ${({ theme }) => theme.lightBorder};
  border-radius: 1px;
`;

const Title = styled(SmallSubHeader)`
  letter-spacing: 0.06em;
`;

const Description = styled(Caption)`
  padding: 13px 0 17px 0;
`;

const PriceTime = styled.span`
  display: flex;
  font-size: 0.875rem;
  font-weight: 400;
`;

const Price = styled(SmallSubHeader)``;

const Time = styled(BodySmall)`
  letter-spacing: 0;
`;

const VerticalLink = styled.div`
  border-left: 1px solid ${({ theme }) => theme.lightBorder};
  height: 11px;
`;

interface SercondaryItemProps {
  service: SecondaryServices;
  isLastItem: boolean;
}

export default function SecondaryItem({
  service,
  isLastItem,
}: SercondaryItemProps) {
  const cartCtx = useContext(CartContext);
  const toastCtx = useContext(ToastContext);
  function handleShopButtonClick(item: SecondaryServices) {
    const itemInCart = {
      ...item,
      quantity: 1,
    };
    cartCtx.addItemToCart(itemInCart);
    toastCtx.showToast({ title: "Ajouté", text: `1 ${item.title}` });
  }

  return (
    <>
      <Item>
        <Title>{service.title}</Title>
        <Description>{service.description}</Description>
        <Box style={{ width: "100%", justifyContent: "space-between" }}>
          <PriceTime>
            <Price>{service.price}€</Price> &nbsp;-&nbsp;
            <Time>{toHours(service.duration)}</Time>
          </PriceTime>
          <AnimatedShopButtonPrimary
            onClick={() => handleShopButtonClick(service)}
          >
            Ajouter
          </AnimatedShopButtonPrimary>
        </Box>
      </Item>
      {!isLastItem && <VerticalLink />}
    </>
  );
}
