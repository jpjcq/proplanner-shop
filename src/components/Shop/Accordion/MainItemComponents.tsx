import { Item, Header, Trigger, Content } from "@radix-ui/react-accordion";
import styled from "styled-components";
import { motion } from "framer-motion";
import { ChevronDown } from "react-feather";
import { Caption, Description, SubHeader } from "../../../theme/text";

export const StyledAccordionItem = styled(Item)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 1rem 0;
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
    rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
`;

export const StyledAccordionHeader = styled(Header)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: start;
  font-size: 1rem;
  font-weight: 600;
  margin: 1.3rem;
  border: none;
  background: inherit;
  cursor: pointer;
`;

export const StyledAccordionTrigger = styled(Trigger)`
  width: 100%;
  border: none;
  background-color: inherit;
  display: flex;
  justify-content: space-between;
`;

export const ItemTitle = styled(SubHeader)`

`;

export const ItemDescription = styled(Description)`
  padding: 0 36px 22px 36px;
  margin-bottom: 1.375rem;
  
`;

export const StyledAccordionContent = styled(Content)`
  overflow: hidden;
`;

export const AnimatedAccordionContent = motion(StyledAccordionContent);

export const AnimatedChevron = motion(ChevronDown);