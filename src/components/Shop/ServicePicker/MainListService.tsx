import styled from "styled-components";
import MainItem from "./MainItemService";
import services from "../../../data/services";
import * as Accordion from "@radix-ui/react-accordion";

export const ListWrapper = styled.div`
  margin-top: 8rem;
`;

export default function MainList() {
  // const services = (useRouteLoaderData("shop") as Services).services;

  return (
    <ListWrapper>
      <Accordion.Root type="multiple">
        {services.services.map((item) => (
          <MainItem key={item._id} service={item} />
        ))}
      </Accordion.Root>
    </ListWrapper>
  );
}
