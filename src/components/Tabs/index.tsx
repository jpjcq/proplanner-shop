import { styled } from "styled-components";
import * as Tabs from "@radix-ui/react-tabs";

export const StyledRoot = styled(Tabs.Root)`
  display: flex;
  flex-direction: column;
`;

export const StyledList = styled(Tabs.List)`
  flex-shrink: 0;
  display: flex;
  margin-bottom: 30px;

`;

export const StyledTrigger = styled(Tabs.Trigger)`
  all: unset;
  font-size: 15px;
  font-weight: 600;
  line-height: 35px;
  color: ${({ theme }) => theme.textSecondary};

  padding: 0 20px;
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

export const StyledContent = styled(Tabs.Content)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  &[data-state="active"]{
    min-height: 170px;
  }
`;
