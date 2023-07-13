import { useContext, useState } from "react";
import { Variants } from "framer-motion";
import {
  StyledAccordionItem,
  StyledAccordionHeader,
  ItemTitle,
  ItemDescription,
  AnimatedAccordionContent,
  AnimatedChevron,
  StyledAccordionTrigger,
} from "../Accordion/MainItemComponents";
import { DateTime } from "luxon";
import getAvailabilities from "../../../utils/dates/getAvailabilities";
import dummyBookings from "../../../data/dummyBookings";
import { ShopButtonPrimary } from "../../Button";
import styled from "styled-components";
import CartContext from "../../../contexts/cart/cart-context";
import { Text } from "rebass";

const Availabilities = styled(ItemDescription)`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap;
`;

const CrenelButton = styled(ShopButtonPrimary)`
  height: 28px;
  width: 57px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 8px 0;
`;

const variants: Variants = {
  open: {
    maxHeight: "300px",
    height: "inherit",
    transition: { duration: 0.5 },
  },
  closed: { height: "0", maxHeight: "0", transition: { duration: 0.3 } },
};

export default function MainItem({ day, id }: { day: DateTime; id: string }) {
  const [isOpen, setIsOpen] = useState(false); // Only for +/- symbol, modify with chevron ?
  const cartCtx = useContext(CartContext);
  const completeDayTitle = day.toLocaleString({
    weekday: "long",
    month: "long",
    day: "numeric",
  });
  const availabilities = getAvailabilities(
    day,
    dummyBookings,
    cartCtx.totalDuration
  );
  const crenels = availabilities.map((availability) => (
    <CrenelButton key={Math.random()}>
      {availability.start?.hour}h
      {availability.start?.minute === 0 ? "00" : "30"}
    </CrenelButton>
  ));

  return (
    <StyledAccordionItem value={id}>
      <StyledAccordionHeader onClick={() => setIsOpen(!isOpen)}>
        <StyledAccordionTrigger>
          <ItemTitle>{completeDayTitle}</ItemTitle>
          <AnimatedChevron
            strokeWidth={2}
            size={20}
            animate={{ rotate: isOpen ? "180deg" : "0" }}
          />
        </StyledAccordionTrigger>
      </StyledAccordionHeader>
      <AnimatedAccordionContent
        custom={isOpen}
        variants={variants}
        animate={isOpen ? "open" : "closed"}
      >
        {availabilities.length > 0 ? (
          <Availabilities>{crenels}</Availabilities>
        ) : (
          <Text>Pas de créneau disponible</Text>
        )}
      </AnimatedAccordionContent>
    </StyledAccordionItem>
  );
}
