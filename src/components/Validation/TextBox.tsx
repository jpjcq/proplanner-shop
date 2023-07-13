import { ReactNode } from "react";
import styled from "styled-components";
import { ValidationCaption } from "../../theme/text";
import WarningIcon from "./Icons/WarningIcon";

const WarningText = styled(ValidationCaption)`
  color: ${({ theme }) => theme.validation.orange.text};
  margin-left: 7px !important;
`;

const WarningDiv = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin-top: 18px !important;
  padding: 5px 10px;
  border: 1.5px solid ${({ theme }) => theme.validation.orange.regular};
  border-radius: 2px;
  background-color: ${({ theme }) => theme.validation.orange.light};
`;

export function WarningBox({ children }: { children: ReactNode }) {
  return (
    <WarningDiv>
      <WarningIcon />
      <WarningText>{children}</WarningText>
    </WarningDiv>
  );
}
