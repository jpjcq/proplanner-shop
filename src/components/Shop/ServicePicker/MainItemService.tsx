import { useState } from "react";
import { Variants } from "framer-motion";
import { Service } from "../../../types/services";

import SecondaryList from "./SecondaryListService";
import {
  StyledAccordionItem,
  StyledAccordionHeader,
  ItemTitle,
  ItemDescription,
  AnimatedAccordionContent,
  AnimatedChevron,
  StyledAccordionTrigger,
} from "../Accordion/MainItemComponents";
import { useTheme } from "styled-components";

export default function MainItem({ service }: { service: Service }) {
  const theme = useTheme();
  const [isOpen, setIsOpen] = useState(false); // Only for +/- symbol, modify with chevron ?

  const variants: Variants = {
    open: {
      maxHeight: "1500px",
      height: "inherit",
      transition: { duration: 0.5 },
    },
    closed: { height: "0", maxHeight: "0", transition: { duration: 0.3 } },
  };

  return (
    <StyledAccordionItem value={service._id}>
      <StyledAccordionHeader onClick={() => setIsOpen(!isOpen)}>
        <StyledAccordionTrigger>
          <ItemTitle>{service.title}</ItemTitle>
          <AnimatedChevron
            strokeWidth={2}
            size={20}
            animate={{ rotate: isOpen ? "180deg" : "0" }}
            color={theme.textPrimary}
          />
        </StyledAccordionTrigger>
      </StyledAccordionHeader>
      <AnimatedAccordionContent
        custom={isOpen}
        variants={variants}
        animate={isOpen ? "open" : "closed"}
      >
        <ItemDescription>{service.description}</ItemDescription>
        <SecondaryList service={service} />
      </AnimatedAccordionContent>
    </StyledAccordionItem>
  );
}
