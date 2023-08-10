import styled from "styled-components";
// import { Accordion } from "@reach/accordion";
import * as Accordion from "@radix-ui/react-accordion";
import getSevenDaysFromNow from "../../../utils/dates/getSevenDaysFromNow";
import MainItem from "./MainItemDate";
import { DateTime } from "luxon";

export const ListWrapper = styled.div``;

export default function MainList() {
  const weekendDays: ["dimanche", "lundi"] = ["dimanche", "lundi"];
  return (
    <ListWrapper>
      <Accordion.Root type="multiple">
        {getSevenDaysFromNow().map(
          (day) =>
            weekendDays.every(
              (weekendDay) => day.weekdayLong !== weekendDay
            ) && (
              <MainItem
                key={day.toLocaleString(DateTime.DATE_SHORT)}
                id={day.toLocaleString(DateTime.DATE_SHORT)}
                day={day}
              />
            )
        )}
      </Accordion.Root>
    </ListWrapper>
  );
}
