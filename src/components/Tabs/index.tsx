import { styled } from "styled-components";
import * as Tabs from "@radix-ui/react-tabs";

export const StyledTabRoot = styled(Tabs.Root)`
  display: flex;
  flex-direction: column;
`;

export const StyledTabList = styled(Tabs.List)<{ $isProfile?: boolean }>`
  flex-shrink: 0;
  display: flex;
  margin-bottom: ${({ $isProfile }) => ($isProfile ? "0" : "30px")};
  box-shadow: ${({ $isProfile, theme }) =>
    $isProfile ? theme.shadows.shallowShadow : "none"};
`;

export const StyledTabTrigger = styled(Tabs.Trigger)<{ $isProfile?: boolean }>`
  all: unset;
  font-size: 15px;
  font-weight: 600;
  line-height: 35px;
  color: ${({ theme }) => theme.textSecondary};
  border-bottom: ${({ $isProfile }) =>
    $isProfile ? "none" : "1px solid lightgrey"};

  padding: ${({$isProfile}) => $isProfile ? "5px 20px" : "0 20px"};
  height: 45px;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  line-height: 1;
  user-select: none;

  &:first-child {
    border-top-left-radius: 6px;
  }
  &:last-child {
    border-top-right-radius: 6px;
  }
  &:hover {
    color: #6e7d59;
  }
  &[data-state="active"] {
    color: #6e7d59;
    border-bottom: 2px solid #6e7d59;
  }
  &:focus {
    position: relative;
    border-bottom: 2px solid #6e7d59;
  }
`;

export const StyledTabContent = styled(Tabs.Content)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &[data-state="active"] {
    min-height: 250px;
  }
`;
