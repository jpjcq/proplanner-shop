import * as Checkbox from "@radix-ui/react-checkbox";
import { styled } from "styled-components";

export const StyledCheckboxRoot = styled(Checkbox.Root)`
  background-color: white;
  width: 15px;
  height: 15px;
  border: none;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${({ theme }) => theme.shadows.shallowShadow};
`;

export const StyledCheckboxIndicator = styled(Checkbox.Indicator)`
  color: ${({ theme }) => theme.accent};
`;

export const StyledCheckboxLabel = styled.label`
  color: ${({theme}) => theme.textPrimary};
  font-weight: 500;
  padding-left: 15px;
`;
