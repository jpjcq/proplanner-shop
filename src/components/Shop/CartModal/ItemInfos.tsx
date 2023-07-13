import styled from "styled-components";
import {
  MediumHeader,
  SmallCaption,
  SmallCaptionBold,
} from "../../../theme/text";
import { ItemInCart } from "../../../contexts/cart/CartProvider";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ItemTitle = styled(MediumHeader)``;

const ItemDetailsWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
`;

const DetailTitlePrice = styled(SmallCaption)`
  margin-right: 3px !important;
  margin-left: 11px !important;
`;

const ItemDetail = styled.div`
  display: flex;
`;

const DetailTitleQuantity = styled(SmallCaption)`
  margin-right: 3px !important;
`;

interface ItemInfosProps {
  item: ItemInCart;
}

export default function ItemInfos({ item }: ItemInfosProps) {
  return (
    <Wrapper>
      <ItemTitle>{item.short}</ItemTitle>
      <ItemDetailsWrapper>
        <ItemDetail>
          <DetailTitleQuantity>Quantité: </DetailTitleQuantity>
          <SmallCaptionBold>{item.quantity}</SmallCaptionBold>
        </ItemDetail>
        <ItemDetail>
          <DetailTitlePrice>Sous-total: </DetailTitlePrice>
          <SmallCaptionBold>{item.quantity * item.price}€</SmallCaptionBold>
        </ItemDetail>
      </ItemDetailsWrapper>
    </Wrapper>
  );
}
